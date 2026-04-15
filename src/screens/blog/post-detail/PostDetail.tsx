import { PostDetailProps } from '@/src/entities/post/model/types'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Card, CardContent } from '@/src/shared/ui/Card'
import { Comments } from '@/src/widget/comments/ui/Comments'
import { MDXImage } from '@/src/shared/ui/MDXImage'
import type { ComponentProps } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { CodeBlock } from '@/src/shared/ui/CodeBlock'

import React from 'react'

const components = {
  img: MDXImage,
  pre: CodeBlock as React.FC<React.HTMLAttributes<HTMLPreElement>>,
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }] as const,
    rehypeHighlight,
  ],
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="w-full px-4 py-8">
      <Card className="postcard-border w-full">
        <CardContent className="w-full">
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

          <div className="prose prose-invert w-full max-w-none">
            {post.content && (
              <MDXRemote
                source={post.content}
                components={components}
                options={{
                  mdxOptions:
                    mdxOptions as NonNullable<
                      ComponentProps<typeof MDXRemote>['options']
                    >['mdxOptions'],
                }}
              />
            )}
          </div>
          <Comments slug={post.slug} />
        </CardContent>
      </Card>
    </div>
  )
}
