import { getPostBySlug } from '@/src/entities/post/api/post'
import { PostPageProps } from '@/src/entities/post/model/types'
import PostDetail from '@/src/screens/blog/post-detail/PostDetail'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: PostPageProps) {
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
