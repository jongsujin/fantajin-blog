import BlogPage from '@/src/pages/blog/Blog'
import { Card, CardContent } from '@/src/shared/ui/Card'

export default function Home() {
  return (
    <div>
      <Card>
        <CardContent>
          <BlogPage />
          <div>
            <h1>안녕</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
