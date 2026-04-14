import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/src/entities/post/api/post'
import { siteConfig, toAbsoluteUrl } from '@/src/shared/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort()
  const latestPostDate = posts[0]?.date

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
      lastModified: latestPostDate || new Date().toISOString(),
    },
    {
      url: toAbsoluteUrl('/about'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: toAbsoluteUrl('/blog'),
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: latestPostDate || new Date().toISOString(),
    },
    {
      url: toAbsoluteUrl('/tags'),
      changeFrequency: 'weekly',
      priority: 0.7,
      lastModified: latestPostDate || new Date().toISOString(),
    },
    {
      url: toAbsoluteUrl('/feed.xml'),
      changeFrequency: 'daily',
      priority: 0.4,
      lastModified: latestPostDate || new Date().toISOString(),
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    changeFrequency: 'monthly',
    priority: 0.9,
    lastModified: post.date,
  }))

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: toAbsoluteUrl(`/tags/${encodeURIComponent(tag)}`),
    changeFrequency: 'weekly',
    priority: 0.6,
    lastModified: latestPostDate || new Date().toISOString(),
  }))

  return [...staticRoutes, ...postRoutes, ...tagRoutes]
}
