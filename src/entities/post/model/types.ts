import { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { HTMLProps, ReactNode } from 'react'

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content?: MDXRemoteSerializeResult
  thumbnail?: string
}

export type MDXHeadingProps = HTMLProps<HTMLHeadingElement> & {
  children?: ReactNode
  className?: string
}

export type MDXListProps = HTMLProps<HTMLUListElement | HTMLOListElement> & {
  children?: ReactNode
  className?: string
}

export type MDXCodeProps = HTMLProps<HTMLElement> & {
  children?: ReactNode
  className?: string
}
export type MDXPreProps = HTMLProps<HTMLPreElement> & {
  children?: ReactNode
  className?: string
}

export interface PostDetailProps {
  post: Post
}
