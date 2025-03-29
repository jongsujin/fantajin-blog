import { getAllPosts } from '@/src/entities/post/api/post'
import TagItem from '@/src/pages/tag/TagItem'

export default async function TagPostsPage({
  params,
}: {
  params: { tag: string }
}) {
  const posts = await getAllPosts()
  return <TagItem tag={params.tag} posts={posts} />
}
