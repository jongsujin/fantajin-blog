import { getAllPosts } from '@/src/entities/post/api/post'
import TagList from '@/src/screens/tag/TagList'

export default async function TagsPage() {
  const posts = await getAllPosts()
  return <TagList posts={posts} />
}
