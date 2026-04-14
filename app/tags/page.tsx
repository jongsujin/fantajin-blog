import type { Metadata } from 'next'
import { getAllPosts } from '@/src/entities/post/api/post'
import TagList from '@/src/screens/tag/TagList'
import { createPageMetadata } from '@/src/shared/config/metadata'

export const metadata: Metadata = createPageMetadata({
  title: '태그 목록',
  description: '블로그에 사용된 태그와 주제별 글 모음을 확인할 수 있습니다.',
  path: '/tags',
})

export default async function TagsPage() {
  const posts = await getAllPosts()
  return <TagList posts={posts} />
}
