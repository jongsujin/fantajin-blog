'use client'

import {
  MDXHeadingProps,
  MDXListProps,
  PostDetailProps,
} from '@/src/entities/post/model/types'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { MDXRemote } from 'next-mdx-remote'
import { Card, CardContent } from '@/src/shared/ui/Card'
import { Comments } from '@/src/widget/comments/ui/Comments'
import { MDXImage } from '@/src/shared/ui/MDXImage'

const components = {
  img: MDXImage,
  h1: ({ children, ...props }: MDXHeadingProps) => (
    <h1 className="mt-8 mb-4 text-4xl font-bold" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: MDXHeadingProps) => (
    <h2 className="mt-6 mb-3 text-3xl font-bold" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: MDXHeadingProps) => (
    <h3 className="mt-5 mb-2 text-2xl font-bold" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: MDXHeadingProps) => (
    <p className="my-4 text-xl leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: MDXListProps) => (
    <ul className="my-4 text-xl list-disc pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({
    children,
    className,
    ...props
  }: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className={`my-4 text-xl list-decimal pl-6 ${className || ''}`} {...props}>
      {children}
    </ol>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="rounded-lg overflow-auto p-4" {...props}>
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
 
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="postcard-border">
        <CardContent className="prose prose-invert max-w-none">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-500">
              {format(parseISO(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-backgroundColor/80 rounded-full border border-gray-400 px-3 py-1 text-xs text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            {post.content && (
              <MDXRemote
                {...post.content}
                components={components}
         
              />
            )}
          </div>
          <Comments slug={post.slug} />
        </CardContent>
      </Card>
    </div>
  )
}
