import type { MetadataRoute } from 'next'
import { siteConfig, toAbsoluteUrl } from '@/src/shared/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: siteConfig.siteUrl,
    sitemap: [toAbsoluteUrl('/sitemap.xml')],
  }
}
