import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Post } from '@/src/entities/post/model/types'
import { Card, CardContent } from '@/src/shared/ui/Card'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full transition-transform hover:scale-105">
        <CardContent>
          <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
          <p className="mb-4 text-sm text-gray-500">
            {format(parseISO(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
          </p>
          <p className="mb-4">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-backgroundColor rounded-full px-3 py-1 text-xs text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
