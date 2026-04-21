import LifePage from '@/src/screens/life/Life'
import { getAllPosts } from '@/src/entities/post/api/post'

export default async function Life() {
  const posts = await getAllPosts()

  return <LifePage posts={posts} />
}
