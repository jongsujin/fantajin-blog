import { Post } from '@/src/entities/post/model/types'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'
import Link from 'next/link'
import { BookOpen, Coffee, User, ArrowRight } from 'lucide-react'

interface BlogPageProps {
  posts: Post[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const developmentTags = encodeURIComponent('개발')

  // 카테고리 정의
  const categories = [
    {
      id: 'all',
      title: '모든 글',
      description: '모든 글 보기',
      icon: <BookOpen className="h-6 w-6 text-gray-400" />,
      href: '/',
      color: 'from-gray-500/20 to-gray-700/20',
    },
    {
      id: 'about',
      title: '내 소개',
      description: '개발자 소개 및 이력',
      icon: <User className="h-6 w-6 text-green-400" />,
      href: '/about',
      color: 'from-green-500/20 to-green-700/20',
    },
    {
      id: 'development',
      title: '개발',
      description: '프로그래밍 및 개발 관련 글',
      icon: <BookOpen className="h-6 w-6 text-blue-400" />,
      href: `/tags/${developmentTags}`,
      color: 'from-blue-500/20 to-blue-700/20',
    },
    {
      id: 'life',
      title: '잡담',
      description: '재테크 및 생각 정리',
      icon: <Coffee className="h-6 w-6 text-yellow-400" />,
      href: '/life',
      color: 'from-yellow-500/20 to-yellow-700/20',
    },
  ]

  return (
    <div className="mx-auto my-10 w-full max-w-7xl px-4 py-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts && posts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>

      {/* 카테고리 박스 */}
      <div className="mt-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
