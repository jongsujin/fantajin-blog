import { getAllPosts } from '@/src/entities/post/api/post'
import BlogPage from '@/src/pages/blog/Blog'
import { Card, CardContent } from '@/src/shared/ui/Card'

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <div>
      <Card>
        <CardContent>
          <BlogPage posts={posts} />
          <div>
            <h1>안녕</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
