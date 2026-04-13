import type { Metadata } from 'next'
import { getAllPosts } from '@/src/entities/post/api/post'
import BlogPage from '@/src/screens/blog/Blog'
import { createPageMetadata } from '@/src/shared/config/metadata'

export const metadata: Metadata = createPageMetadata({
  title: '블로그 글 목록',
  description: 'Fanta Jin 블로그의 전체 글 목록입니다.',
  path: '/',
  noIndex: true,
})

export default async function Page() {
  const posts = await getAllPosts()

  return <BlogPage posts={posts} />
}
