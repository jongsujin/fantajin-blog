import { getAllPosts } from '@/src/entities/post/api/post'
import { siteConfig, toAbsoluteUrl } from '@/src/shared/config/site'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
    .map((post) => {
      const postUrl = toAbsoluteUrl(`/blog/${post.slug}`)
      const categories = post.tags
        .map((tag: string) => `<category>${escapeXml(tag)}</category>`)
        .join('')

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${postUrl}</link>
          <guid>${postUrl}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${escapeXml(post.description)}</description>
          ${categories}
        </item>
      `.trim()
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.siteUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${toAbsoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
