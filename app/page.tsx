import { getAllPosts } from '@/src/entities/post/api/post'
import BlogPage from '@/src/screens/blog/Blog'

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <div className="bg-backgroundColor min-h-screen">
      <BlogPage posts={posts} />
    </div>
  )
}
