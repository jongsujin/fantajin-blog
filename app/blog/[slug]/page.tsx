import { getPostBySlug } from '@/src/entities/post/api/post'
import { PostDetail } from '@/src/pages/blog/post-detail/PostDetail'
import { notFound } from 'next/navigation'

export interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  // params를 await 합니다
  const resolvedParams = await params

  if (!resolvedParams || !resolvedParams.slug) {
    notFound()
  }

  try {
    const post = await getPostBySlug(resolvedParams.slug)
    return <PostDetail post={post} />
  } catch (error) {
    console.error(error)
    notFound()
  }
}
