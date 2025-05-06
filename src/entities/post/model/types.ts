import { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { ReactNode } from 'react'

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content?: MDXRemoteSerializeResult
  thumbnail?: string
}
export interface CardProps {
  className?: string
  children: React.ReactNode
}

export interface MDXImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface CategoryProps {
  id: string
  title: string
  description: string
  icon: ReactNode
  href: string
  color: string
}

export interface PostDetailProps {
  post: Post
}

export interface TagProps {
  tag: string
}

export interface TagListProps {
  posts: Post[]
  tag?: string
}

export interface TagItemProps extends TagProps {
  posts: Post[]
}

export interface PaginationProps extends TagProps {
  posts: Post[]
  itemsPerPage?: number
}

// page interace

export interface BlogPageProps {
  posts: Post[]
}

export interface TagPageProps {
  params: {
    tag: string
  }
}

export interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export interface CommentsProps {
  slug: string
}
