import type { Metadata } from 'next'
import { getAllPosts } from '@/src/entities/post/api/post'
import BlogPage from '@/src/screens/blog/Blog'
import { createPageMetadata, siteConfig } from '@/src/shared/config/metadata'

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: '/',
  absoluteTitle: true,
})

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>
}) {
  const posts = await getAllPosts()
  const { q, page } = await searchParams
  return (
    <div className="bg-backgroundColor min-h-screen">
      <BlogPage
        posts={posts}
        query={Array.isArray(q) ? q[0] : q}
        page={Array.isArray(page) ? page[0] : page}
      />
    </div>
  )
}
