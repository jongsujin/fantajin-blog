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

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <div className="bg-backgroundColor min-h-screen">
      <BlogPage posts={posts} />
    </div>
  )
}
