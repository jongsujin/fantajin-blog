import { Post } from '@/src/entities/post/model/types'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'

import CategoryBox from '@/src/entities/category/ui/CategoryBox'

interface BlogPageProps {
  posts: Post[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <div className="mx-auto w-[80%] max-w-7xl">
      <CategoryBox />
      <div className="my-10 py-8">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts &&
            posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </div>
  )
}
