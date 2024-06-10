import type { Metadata } from 'next';
import './globals.css';
import ThemeLayout from '@/layouts/ThemeLayout';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: '훤다log',
  description: '드디어 블로그 개설?',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='flex flex-col'>
        <ThemeLayout>
          <Header />
          {children}
        </ThemeLayout>
      </body>
    </html>
  );
}
