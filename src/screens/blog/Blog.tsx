import Link from 'next/link'
import { Post } from '@/src/entities/post/model/types'
import CategoryBox from '@/src/entities/category/ui/CategoryBox'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'

interface BlogPageProps {
  posts: Post[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const encodedTag = encodeURIComponent('개발')

  // '개발' 태그가 있는 게시글만 필터링
  const devPosts = posts.filter((post) => post.tags.includes('개발'))

  // 최대 9개의 게시글만 표시
  const previewPosts = devPosts.slice(0, 9)

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
            className="tag-border hover:bg-hoverColor rounded-lg px-6 py-2 font-semibold shadow transition-colors duration-200 focus:ring-2 focus:outline-none"
          >
            개발 관련 글 더보기
          </Link>
        </div>
      </div>
    </div>
  )
}
