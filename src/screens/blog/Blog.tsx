import { Post } from '@/src/entities/post/model/types'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'
import RecentPost from '@/src/widget/recent-post/ui/RecentPost'

interface BlogPageProps {
  posts: Post[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const recentPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div className="mx-auto w-full px-4 py-8">
      {recentPost && <RecentPost post={recentPost} />}

      <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {remainingPosts &&
          remainingPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
      </div>
    </div>
  )
}
