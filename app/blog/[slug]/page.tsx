import type { Metadata } from 'next'
import { getPostBySlug, getPostMetadataBySlug } from '@/src/entities/post/api/post'
import { PostPageProps } from '@/src/entities/post/model/types'
import PostDetail from '@/src/screens/blog/post-detail/PostDetail'
import { notFound } from 'next/navigation'
import { siteConfig, toAbsoluteUrl } from '@/src/shared/config/metadata'
import React from 'react'

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
    const canonicalPath = `/blog/${encodeURIComponent(post.slug)}`
    const image = post.thumbnail || siteConfig.defaultOgImage
    const articleJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: toAbsoluteUrl(canonicalPath),
      image: [toAbsoluteUrl(image)],
      keywords: post.tags,
      articleSection: post.tags,
      inLanguage: siteConfig.locale,
      author: {
        '@type': 'Person',
        name: siteConfig.author,
      },
      publisher: {
        '@type': 'Person',
        name: siteConfig.author,
      },
      isPartOf: {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.siteUrl,
      },
    })
    const breadcrumbJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '홈',
          item: siteConfig.siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '블로그',
          item: toAbsoluteUrl('/blog'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: toAbsoluteUrl(canonicalPath),
        },
      ],
    })

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
        />
        <PostDetail post={post} />
      </>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}
