import lunr from 'lunr';
import { SearchDocument } from '@/types/search';

// 빌드 시 인덱스에 사용된 koTokenizer를 클라이언트에서도 등록
const koTokenizer = (token: lunr.Token) => {
  return token.update((word: string) => {
    return word
      .normalize('NFC')
      .replace(/^[^\w가-힣]+/, '')
      .replace(/[^\w가-힣]+$/, '');
  });
};

lunr.Pipeline.registerFunction(koTokenizer, 'koTokenizer');

interface SearchIndex {
  index: object;
  documents: SearchDocument[];
}

let cachedIndex: lunr.Index | null = null;
let cachedDocuments: SearchDocument[] = [];

const searchFields = [
  { key: 'title' as const, boost: 10 },
  { key: 'desc' as const, boost: 8 },
];

export async function loadSearchIndex(): Promise<{ index: lunr.Index; documents: SearchDocument[] }> {
  if (cachedIndex) {
    return { index: cachedIndex, documents: cachedDocuments };
  }

  const response = await fetch('/blog/search-index.json');
  const data: SearchIndex = await response.json();

  cachedIndex = lunr.Index.load(data.index);
  cachedDocuments = data.documents;

  return { index: cachedIndex, documents: cachedDocuments };
}

function calculateScore(doc: SearchDocument, queryLower: string): number {
  return searchFields.reduce((score, { key, boost }) => {
    const value = (doc[key] || '').toLowerCase();
    return score + ((value.split(queryLower).length - 1) * boost);
  }, 0);
}

function performFallbackSearch(documents: SearchDocument[], queryLower: string): SearchDocument[] {
  const matched = documents.filter((doc) =>
    searchFields.some(({ key }) => {
      const value = doc[key]?.toLowerCase() || '';
      return value.includes(queryLower);
    }),
  );

  return matched
    .map((doc) => ({ doc, score: calculateScore(doc, queryLower) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.doc);
}

export async function searchPosts(query: string): Promise<SearchDocument[]> {
  if (!query.trim()) return [];

  const { index, documents } = await loadSearchIndex();
  const queryLower = query.toLowerCase();
  const words = queryLower.trim().split(/\s+/);

  const searchQueries = [
    `"${ query }"`,
    `${ query }*`,
    `*${ query }`,
    `${ query }~1`,
    ...words.filter((word) => word.length > 1).flatMap((word) => [word, `${ word }*`, `${ word }~1`]),
  ];

  try {
    const allResults = searchQueries.flatMap((q) => {
      try {
        return index.search(q);
      } catch {
        return [];
      }
    });

    const uniqueResults = Array.from(
      allResults.reduce((map, result) => {
        const existing = map.get(result.ref);
        if (!existing || existing.score < result.score) {
          map.set(result.ref, result);
        }
        return map;
      }, new Map<string, lunr.Index.Result>()),
    ).map(([, result]) => result);

    if (uniqueResults.length === 0) {
      return performFallbackSearch(documents, queryLower);
    }

    const scoredResults = uniqueResults
      .map((result) => {
        const doc = documents[parseInt(result.ref)];
        const exactScore = calculateScore(doc, queryLower);
        return { doc, score: result.score + exactScore };
      })
      .sort((a, b) => b.score - a.score)
      .map((item) => item.doc);

    return scoredResults;
  } catch {
    return performFallbackSearch(documents, queryLower);
  }
}
