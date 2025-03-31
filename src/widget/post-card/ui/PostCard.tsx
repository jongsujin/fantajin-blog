import Link from 'next/link'
import Image from 'next/image'
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
      <Card className="no-border-light hover:border-hoverColor/30 group bg-cardColor/90 h-full border border-gray-800/60 shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-xl">
        <CardContent>
          {post.thumbnail ? (
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ) : (
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-700/50" />
          )}
          <div className="my-3 flex items-center gap-2 text-gray-500">
            <Calendar size={14} />
            <span className="text-xs">
              {format(parseISO(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </span>
          </div>

          <h2 className="group-hover:text-hoverColor mb-3 text-xl font-bold transition-colors">
            {post.title}
          </h2>

          <p className="0 mb-4 line-clamp-2 text-sm">{post.description}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>

          <div className="text-hoverColor mt-auto flex items-center text-sm transition-transform duration-300 group-hover:translate-x-1">
            <span className="mr-1 font-medium">읽기</span>
            <ArrowRight size={14} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
