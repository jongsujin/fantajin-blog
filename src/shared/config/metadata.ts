import type { Metadata } from 'next'
import { siteConfig, toAbsoluteUrl } from './site'

export { siteConfig, toAbsoluteUrl }

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
