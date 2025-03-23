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
    <div className="w-full mb-12">
      <Link href={`/blog/${post.slug}`}>
        <div className="group bg-cardColor rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-hoverColor/50">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* 왼쪽: 그래디언트 배경 */}
              <div className="md:w-2/5 h-48 md:h-auto rounded-lg overflow-hidden bg-gradient-to-br from-hoverColor/20 to-backgroundColor flex items-center justify-center shadow-inner">
                <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                  ✨
                </div>
              </div>
              
              {/* 오른쪽: 콘텐츠 */}
              <div className="md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 text-gray-400">
                    <Calendar size={16} />
                    <span className="text-sm">
                      {format(parseISO(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-hoverColor transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {post.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-1 border border-borderColor bg-backgroundColor px-3 py-1 rounded-full shadow-2xl">
                        <TagIcon size={12} className="text-hoverColor" />
                        <span className="text-xs text-gray-300">{tag}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-hoverColor group-hover:translate-x-1 transition-transform duration-300">
                    <span className="font-medium mr-2">자세히 보기</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}