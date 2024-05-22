import type { Metadata } from 'next'
import './globals.css'
import Theme from '@/src/layouts/Theme'
import Header from '@/src/layouts/Header'

export const metadata: Metadata = {
  title: '훤다log',
  description: '드디어 블로그 개설?',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Theme>
          <Header />
          {children}
        </Theme>
      </body>
    </html>
  )
}
