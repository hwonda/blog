import './globals.css';
import ThemeProvider from '@/layouts/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategoryDetailList } from '@/utils/categoryUtils';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SearchProvider } from '@/contexts/SearchContext';
import { fontPretendard } from '@/utils/fontUtils';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoryList = await getCategoryDetailList();

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="WHeQXAs9lHffv42lDKMLtDAotCpQlVpqe63FjZ27Wks" />
      </head>
      <body className={`flex flex-col items-center ${ fontPretendard.variable }`}>
        <ThemeProvider>
          <SearchProvider>
            <Header categoryList={categoryList} />
            {children}
            <Footer />
          </SearchProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId='G-VL5HPPKVP9' />
    </html>
  );
}
