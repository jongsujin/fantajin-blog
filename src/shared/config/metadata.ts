import type { Metadata } from 'next'

const fallbackSiteUrl = 'https://fantajin-blog.vercel.app'

export const siteConfig = {
  name: 'Fanta Jin 블로그',
  description: 'Fantajin의 개발 블로그입니다.',
  author: 'Fanta Jin',
  locale: 'ko_KR',
  defaultOgImage: '/logo/Logo.png',
  keywords: ['Fanta Jin', '프론트엔드', 'Next.js', 'React', '개발 블로그'],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl,
} as const

export function toAbsoluteUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString()
}

type MetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
  absoluteTitle?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.defaultOgImage,
  keywords = [...siteConfig.keywords],
  noIndex = false,
  absoluteTitle = false,
}: MetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [toAbsoluteUrl(image)],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [toAbsoluteUrl(image)],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  }
}
