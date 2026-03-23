# 훤다 블로그

프론트엔드를 중심으로 다양한 기술을 탐구하는 MDX 기반 커스텀 기술 블로그

🔗 [블로그 바로가기](https://www.hwonda.com/blog) · [GitHub](https://github.com/hwonda)

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | TailwindCSS |
| Content | MDX (next-mdx-remote, gray-matter) |
| State | React Context, Redux |
| Infra | Vercel, Firebase |
| CI/CD | GitHub Actions |

## 주요 기능

### MDX 기반 커스텀 컨텐츠 관리 시스템

- gray-matter와 next-mdx-remote를 활용해 마크다운 내 JSX 컴포넌트 삽입이 가능한 유연한 작성 환경 구현
- rehype-pretty-code, rehype-slug 등 플러그인을 통한 코드 하이라이팅 및 Heading ID 자동 생성
- 카테고리별 포스트 분류 (Next, React, TypeScript, Project, Etc)

### 검색 엔진 최적화 및 배포 자동화

- 빌드 시점에 Sitemap, RSS/Atom/JSON Feed를 자동 생성하는 커스텀 스크립트 구현
- Next.js Metadata API를 활용한 동적 OpenGraph 및 Twitter Card 설정으로 소셜 공유 시인성 증대
- `generateStaticParams()`를 통한 전체 포스트 SSG 적용

### 그 외

- next-themes 기반 다크/라이트 테마 전환
- 클라이언트 사이드 포스트 검색
- Giscus를 활용한 GitHub Discussions 기반 댓글
- Vercel Microfrontends로 포트폴리오 사이트와 통합

## 프로젝트 구조

```
src/
├── app/            # App Router 페이지 및 API
├── components/     # 재사용 컴포넌트
├── layouts/        # 페이지 레이아웃
├── contexts/       # React Context
├── hooks/          # 커스텀 훅
├── types/          # TypeScript 타입 정의
├── utils/          # 유틸리티 함수
└── constants/      # 블로그 메타데이터
posts/              # MDX 콘텐츠 (카테고리별)
scripts/            # RSS, sitemap 생성 스크립트
```

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 린트
npm run lint
```

## 개발 기간

2024.07 ~ 2025.01 (6개월)
