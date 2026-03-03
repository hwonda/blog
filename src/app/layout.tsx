import { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/layouts/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { getCategoryDetailList } from '@/utils/categoryUtils';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SearchProvider } from '@/contexts/SearchContext';
import { fontPretendard } from '@/utils/fontUtils';
import { blogMetadata } from '@/constants';

export const metadata: Metadata = {
  metadataBase: new URL(blogMetadata.url),
  title: blogMetadata.name,
  description: blogMetadata.description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: blogMetadata.name,
    description: blogMetadata.description,
    siteName: blogMetadata.name,
    images: [blogMetadata.thumbnailURL],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: blogMetadata.name,
    description: blogMetadata.description,
    images: [blogMetadata.thumbnailURL],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const categoryList = await getCategoryDetailList();

  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={`flex flex-col items-center ${ fontPretendard.variable }`}>
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
