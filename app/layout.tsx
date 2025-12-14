import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '../src/_app/providers/Provider'
import { Header } from '@/src/widget/header/ui/Header'
import { ThemeProvider } from '@/src/_app/providers/ThemeContext'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Fanta Jin 블로그',
  description: 'Fantajin의 개발 블로그입니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className={`${geistMono.variable} font-pretendard antialiased`}>
        <ThemeProvider>
          <Providers>
            <Header />
            <SpeedInsights />
            {children}
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
