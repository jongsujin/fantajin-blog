import { Post } from '@/src/entities/post/model/types'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
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
        <div className="no-border-light group bg-cardColor hover:border-hoverColor/50 overflow-hidden rounded-xl border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              {/* 왼쪽: 썸네일 이미지 */}
              <div className="from-hoverColor/20 to-backgroundColor flex h-48 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br shadow-inner md:h-auto md:w-2/5 lg:max-w-[320px] xl:max-w-[380px] 2xl:max-w-[420px]">
                {post.thumbnail ? (
                  <div className="relative h-48 w-full md:h-[180px] lg:h-[200px] xl:h-[220px] 2xl:h-[240px]">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, (max-width: 1600px) 380px, 420px"
                      priority
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full overflow-hidden bg-gray-700/50 md:h-[180px] lg:h-[200px] xl:h-[220px] 2xl:h-[240px]" />
                )}
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

                  <h3 className="group-hover:text-hoverColor mb-4 text-2xl font-bold transition-colors md:text-3xl">
                    {post.title}
                  </h3>

                  <p className="mb-6 line-clamp-3">{post.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <div
                        key={tag}
                        className="tag-gradient order-borderColor bg-backgroundColor flex items-center gap-1 rounded-full border px-3 py-1 shadow-2xl"
                      >
                        <TagIcon size={12} className="text-hoverColor" />
                        <span className="text-xs">{tag}</span>
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
