import { getAllPosts } from '@/src/entities/post/api/post'
import BlogPage from '@/src/screens/blog/Blog'
import { Card, CardContent } from '@/src/shared/ui/Card'

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <div>
      <Card>
        <CardContent>
          <BlogPage posts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}
