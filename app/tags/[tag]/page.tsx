import type { Metadata } from 'next'
import { getAllPosts } from '@/src/entities/post/api/post'
import { TagPageProps } from '@/src/entities/post/model/types'
import TagList from '@/src/screens/tag/TagList'
import { notFound } from 'next/navigation'
import { createPageMetadata } from '@/src/shared/config/metadata'

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  return createPageMetadata({
    title: `${decodedTag} 태그`,
    description: `${decodedTag} 태그가 달린 글만 모아볼 수 있는 페이지입니다.`,
    path: `/tags/${encodeURIComponent(decodedTag)}`,
    keywords: [decodedTag, '태그', '블로그', 'Fanta Jin'],
  })
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getAllPosts()

  // 태그에 해당하는 게시물이 있는지 확인
  const hasTaggedPosts = posts.some((post) => post.tags.includes(decodedTag))

  if (!hasTaggedPosts) {
    notFound()
  }

  return <TagList posts={posts} tag={decodedTag} />
}

// 정적 경로 생성을 위한 함수
export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = [...new Set(posts.flatMap((post) => post.tags))]

  return tags.map((tag) => ({
    tag,
  }))
}
