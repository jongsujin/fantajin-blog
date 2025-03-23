import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Post } from '@/src/entities/post/model/types'
import { Card, CardContent } from '@/src/shared/ui/Card'
import { Calendar, ArrowRight } from 'lucide-react'
import { Tag } from '../../tag/ui/Tag'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full transition-all duration-300 hover:scale-102 hover:shadow-xl shadow-lg border border-gray-800/60 hover:border-hoverColor/30 group bg-cardColor/90">
        <CardContent>
          <div className="flex items-center gap-2 mb-3 text-gray-500">
            <Calendar size={14} />
            <span className="text-xs">
              {format(parseISO(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </span>
          </div>
          
          <h2 className="mb-3 text-xl font-bold text-gray-100 group-hover:text-hoverColor transition-colors">
            {post.title}
          </h2>
          
          <p className="mb-4 text-gray-400 line-clamp-2 text-sm">
            {post.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
          
          <div className="flex items-center text-hoverColor text-sm group-hover:translate-x-1 transition-transform duration-300 mt-auto">
            <span className="font-medium mr-1">읽기</span>
            <ArrowRight size={14} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}