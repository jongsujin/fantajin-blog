import { getAllPosts } from '@/src/entities/post/api/post'
import TagItem from '@/src/screens/tag/TagItem'
import { notFound } from 'next/navigation'

interface TagPostsPageProps {
  params: Promise<{ tag: string }>
}

export default async function TagPostsPage({ params }: TagPostsPageProps) {
  const resolvedParams = await params

  if (!resolvedParams || !resolvedParams.tag) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const tag = decodeURIComponent(resolvedParams.tag)

  // 태그에 해당하는 게시물이 있는지 확인
  const hasTaggedPosts = allPosts.some((post) => post.tags.includes(tag))

  if (!hasTaggedPosts) {
    notFound()
  }

  return <TagItem tag={tag} posts={allPosts} />
}

// 정적 경로 생성을 위한 함수
export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = [...new Set(posts.flatMap((post) => post.tags))]

  return tags.map((tag) => ({
    tag,
  }))
}
