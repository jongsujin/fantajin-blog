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
import Link from 'next/link'

import { CodeBlock } from '@/src/shared/ui/CodeBlock'
import { TOC } from '@/src/widget/toc/ui/TOC'

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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 xl:flex-row">
      <article className="min-w-0 flex-1">
        <Card className="postcard-border w-full">
          <CardContent className="w-full p-5 sm:p-8">
            <header className="mb-8">
              <h1 className="mb-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.date}>
                  {format(parseISO(post.date), 'yyyy년 MM월 dd일', {
                    locale: ko,
                  })}
                </time>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div
                  aria-label="태그 목록"
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-500 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* 모바일 목차: 화면 너비가 xl 미만일 때 본문 상단에 표시 */}
            <div className="mb-8 xl:hidden">
              <TOC variant="inline" />
            </div>

            <div className="prose prose-invert w-full max-w-none">
              {post.content && (
                <MDXRemote
                  source={post.content}
                  components={components}
                  options={{
                    mdxOptions: mdxOptions as NonNullable<
                      ComponentProps<typeof MDXRemote>['options']
                    >['mdxOptions'],
                  }}
                />
              )}
            </div>
            <Comments slug={post.slug} />
          </CardContent>
        </Card>
      </article>

      {/* 데스크톱 목차: xl 이상에서 우측 사이드바로 표시 */}
      <aside
        aria-label="데스크톱 목차"
        className="hidden w-64 shrink-0 xl:block"
      >
        <TOC variant="sidebar" />
      </aside>
    </div>
  )
}
