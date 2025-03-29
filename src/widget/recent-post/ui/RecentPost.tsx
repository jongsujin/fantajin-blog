import { Post } from '@/src/entities/post/model/types'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { ArrowRight, Calendar, Tag as TagIcon } from 'lucide-react'

interface RecentPostProps {
  post: Post
}

export default function RecentPost({ post }: RecentPostProps) {
  return (
    <div className="mb-12 w-full">
      <Link href={`/blog/${post.slug}`}>
        <div className="group bg-cardColor hover:border-hoverColor/50 overflow-hidden rounded-xl border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-8 md:flex-row">
              {/* 왼쪽: 그래디언트 배경 */}
              <div className="from-hoverColor/20 to-backgroundColor flex h-48 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br shadow-inner md:h-auto md:w-2/5">
                <div className="aspect-video w-full overflow-hidden bg-gray-700/50" />
              </div>

              {/* 오른쪽: 콘텐츠 */}
              <div className="flex flex-col justify-between md:w-3/5">
                <div>
                  <div className="mb-3 flex items-center gap-3 text-gray-400">
                    <Calendar size={16} />
                    <span className="text-sm">
                      {format(parseISO(post.date), 'yyyy년 MM월 dd일', {
                        locale: ko,
                      })}
                    </span>
                  </div>

                  <h3 className="group-hover:text-hoverColor mb-4 text-2xl font-bold text-white transition-colors md:text-3xl">
                    {post.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-gray-300">
                    {post.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <div
                        key={tag}
                        className="border-borderColor bg-backgroundColor flex items-center gap-1 rounded-full border px-3 py-1 shadow-2xl"
                      >
                        <TagIcon size={12} className="text-hoverColor" />
                        <span className="text-xs text-gray-300">{tag}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-hoverColor flex items-center transition-transform duration-300 group-hover:translate-x-1">
                    <span className="mr-2 font-medium">자세히 보기</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
