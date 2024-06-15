import type { Metadata } from 'next';
import './globals.css';
import ThemeLayout from '@/layouts/ThemeLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategoryDetailList } from '@/utils/categoryUtils';

export const metadata: Metadata = {
  title: 'Hwonda Blog',
  description: '드디어 블로그 개설?',
};

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
    </html>
  );
}
