import { Post } from '@/src/entities/post/model/types'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'

import CategoryBox from '@/src/entities/category/ui/CategoryBox'
import Link from 'next/link'

interface BlogPageProps {
  posts: Post[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const encodedTag = encodeURIComponent('개발')
  const previewPosts = posts.slice(0, 9)
  return (
    <div className="mx-auto w-[80%] max-w-7xl">
      <CategoryBox />
      <div className="my-10 py-8">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {previewPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/tags/${encodedTag}`}
            className="hover:bg-hoverColor rounded-lg border border-[color:var(--tag-border)] px-6 py-2 font-semibold shadow transition-colors duration-200 focus:ring-2 focus:outline-none"
          >
            더보기
          </Link>
        </div>
      </div>
    </div>
  )
}
