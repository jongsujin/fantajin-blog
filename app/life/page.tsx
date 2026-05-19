import LifePage from '@/src/screens/life/Life'
import { getAllPosts } from '@/src/entities/post/api/post'
import type { Metadata } from 'next'
import { createPageMetadata } from '@/src/shared/config/metadata'

export const metadata: Metadata = createPageMetadata({
  title: '라이프',
  description: '회고, 커리어, 일상처럼 시간이 지나도 다시 꺼내보고 싶은 글을 모아둔 페이지입니다.',
  path: '/life',
})

export default async function Life() {
  const posts = await getAllPosts()

  return <LifePage posts={posts} />
}
