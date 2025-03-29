import { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content?: MDXRemoteSerializeResult
  thumbnail?: string
}
