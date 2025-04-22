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
      <Card className="group bg-cardColor/90 postcard-border h-full shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border">
        <CardContent className="p-4">
          {post.thumbnail ? (
            <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-700/20">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-700/50" />
          )}
          <div className="my-2 flex items-center gap-2 text-gray-500">
            <Calendar size={14} />
            <span className="text-xs">
              {format(parseISO(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </span>
          </div>

          <h2 className="group-hover:text-hoverColor mb-2 line-clamp-2 text-lg font-bold transition-colors">
            {post.title}
          </h2>

          <p className="mb-3 line-clamp-2 text-xs text-gray-300">
            {post.description}
          </p>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>

          <div className="text-hoverColor mt-auto flex items-center text-xs transition-transform duration-300 group-hover:translate-x-1">
            <span className="mr-1 font-medium">읽기</span>
            <ArrowRight size={12} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
