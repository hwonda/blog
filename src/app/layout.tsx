import './globals.css';
import ThemeLayout from '@/layouts/ThemeLayout';
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
        <ThemeLayout>
          <Header categoryList={categoryList || []} />
          {children}
          <Footer />
        </ThemeLayout>
      </body>
      <GoogleAnalytics gaId='G-VL5HPPKVP9' />
    </html>
  );
}
