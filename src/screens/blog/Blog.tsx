import { Post } from '@/src/entities/post/model/types'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/src/entities/category/model/category'

interface BlogPageProps {
  posts: Post[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <div className="mx-auto my-10 w-[80%] max-w-7xl px-4 py-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {posts && posts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>

      {/* 카테고리 박스 */}
      <div className="mt-12">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <div
                className={`bg-cardColor hover:border-hoverColor/30 group flex h-full flex-col rounded-xl bg-gradient-to-br p-5 shadow-lg transition-all duration-300 hover:shadow-xl ${category.color}`}
              >
                <div className="mb-3">{category.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{category.title}</h3>
                <p className="mb-4 text-sm text-gray-400">
                  {category.description}
                </p>
                <div className="text-hoverColor mt-auto flex items-center text-sm transition-transform duration-300 group-hover:translate-x-1">
                  <span className="mr-1 font-medium">바로가기</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
