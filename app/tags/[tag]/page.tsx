import { getAllPosts } from '@/src/entities/post/api/post'
import TagItem from '@/src/pages/tag/TagItem'

interface TagPostsPageProps {
  params: Promise<{ tag: string }>
}

export default async function TagPostsPage({ params }: TagPostsPageProps) {
  const resolvedParams = await params

  if (!resolvedParams || !resolvedParams.tag) {
    throw new Error('태그가 없습니다')
  }

  const posts = await getAllPosts()
  return <TagItem tag={resolvedParams.tag} posts={posts} />
}
