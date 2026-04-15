import { Metadata } from 'next';
import './tailwind.css';
import ThemeProvider from '@/layouts/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { getCategoryDetailList } from '@/utils/categoryUtils';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SearchProvider } from '@/contexts/SearchContext';
import { fontPretendard } from '@/utils/fontUtils';
import { blogMetadata } from '@/constants';

export const metadata: Metadata = {
  metadataBase: new URL(blogMetadata.siteUrl),
  title: blogMetadata.name,
  description: blogMetadata.description,
  keywords: ['프론트엔드', '기술 블로그', '웹 개발', 'AI'],
  authors: [{ name: blogMetadata.author.name }],
  creator: blogMetadata.author.name,
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: blogMetadata.siteUrl,
  },
  openGraph: {
    title: blogMetadata.name,
    description: blogMetadata.description,
    url: blogMetadata.siteUrl,
    siteName: blogMetadata.name,
    locale: 'ko_KR',
    images: [blogMetadata.thumbnailURL],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: blogMetadata.name,
    description: blogMetadata.description,
    images: [blogMetadata.thumbnailURL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const categoryList = await getCategoryDetailList();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': blogMetadata.name,
    'url': blogMetadata.siteUrl,
    'description': blogMetadata.description,
    'author': {
      '@type': 'Person',
      'name': blogMetadata.author.name,
      'url': blogMetadata.author.contacts.github,
    },
  };

  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={`flex flex-col items-center ${ fontPretendard.variable }`}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <h1 className='sr-only'>{'주다훤 블로그'}</h1>
        <ThemeProvider>
          <SearchProvider>
            <Header />
            {children}
            <Footer />
          </SearchProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId='G-VL5HPPKVP9' />
    </html>
  );
}
