import { getAllPosts } from '@/src/entities/post/api/post'
import { TagPageProps } from '@/src/entities/post/model/types'
import TagList from '@/src/screens/tag/TagList'
import { notFound } from 'next/navigation'

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
