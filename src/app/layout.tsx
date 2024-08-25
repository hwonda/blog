import './globals.css';
import ThemeProvider from '@/layouts/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategoryDetailList } from '@/utils/categoryUtils';
import { GoogleAnalytics } from '@next/third-parties/google';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoryList = await getCategoryDetailList();

  return (
    <html lang='en' suppressHydrationWarning>
      <body className='flex flex-col'>
        <ThemeProvider>
          <Header categoryList={categoryList || []} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId='G-VL5HPPKVP9' />
    </html>
  );
}
