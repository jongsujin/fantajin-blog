import type { Metadata } from 'next'
import { getPostBySlug, getPostMetadataBySlug } from '@/src/entities/post/api/post'
import { PostPageProps } from '@/src/entities/post/model/types'
import PostDetail from '@/src/screens/blog/post-detail/PostDetail'
import { notFound } from 'next/navigation'
import { siteConfig, toAbsoluteUrl } from '@/src/shared/config/metadata'

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params

  if (!resolvedParams?.slug) {
    return {}
  }

  try {
    const post = await getPostMetadataBySlug(decodeSlug(resolvedParams.slug))
    const canonicalPath = `/blog/${encodeURIComponent(post.slug)}`
    const image = post.thumbnail || siteConfig.defaultOgImage

    return {
      title: post.title,
      description: post.description,
      keywords: [...post.tags, '개발 블로그', 'Fanta Jin'],
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: toAbsoluteUrl(canonicalPath),
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
        images: [toAbsoluteUrl(image)],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [toAbsoluteUrl(image)],
      },
    }
  } catch {
    return {}
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params

  if (!resolvedParams || !resolvedParams.slug) {
    notFound()
  }

  try {
    const post = await getPostBySlug(decodeSlug(resolvedParams.slug))
    return <PostDetail post={post} />
  } catch (error) {
    console.error(error)
    notFound()
  }
}
