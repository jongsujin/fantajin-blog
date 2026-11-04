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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>
}) {
  const posts = await getAllPosts()
  const { q, page } = await searchParams

  return (
    <BlogPage
      posts={posts}
      query={Array.isArray(q) ? q[0] : q}
      page={Array.isArray(page) ? page[0] : page}
      basePath="/blog"
    />
  )
}
