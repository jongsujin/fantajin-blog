import { getAllPosts } from '@/src/entities/post/api/post'
import BlogPage from '@/src/pages/blog/Blog'

export default async function Page() {
  const posts = await getAllPosts()

  return <BlogPage posts={posts} />
}
