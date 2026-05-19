import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '../src/_app/providers/Provider'
import { Header } from '@/src/widget/header/ui/Header'
import { ThemeProvider } from '@/src/_app/providers/ThemeContext'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { siteConfig, toAbsoluteUrl } from '@/src/shared/config/metadata'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const websiteJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  description: siteConfig.description,
  inLanguage: siteConfig.locale,
  publisher: {
    '@type': 'Person',
    name: siteConfig.author,
  },
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [toAbsoluteUrl(siteConfig.defaultOgImage)],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [toAbsoluteUrl(siteConfig.defaultOgImage)],
  },
}

const themeInitScript = `
  try {
    const savedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    document.body.setAttribute('data-theme', savedTheme || systemTheme)
  } catch (error) {
    document.body.setAttribute('data-theme', 'light')
  }
`

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
        {process.env.GOOGLE_SITE_VERIFICATION ? (
          <meta
            name="google-site-verification"
            content={process.env.GOOGLE_SITE_VERIFICATION}
          />
        ) : null}
        {process.env.NAVER_SITE_VERIFICATION ? (
          <meta
            name="naver-site-verification"
            content={process.env.NAVER_SITE_VERIFICATION}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
        />
      </head>
      <body
        data-theme="light"
        suppressHydrationWarning
        className={`${geistMono.variable} font-pretendard antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
