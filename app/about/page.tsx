import type { Metadata } from 'next'
import AboutPage from '@/src/screens/about/About'
import { createPageMetadata } from '@/src/shared/config/metadata'

export const metadata: Metadata = createPageMetadata({
  title: '소개',
  description: 'Fanta Jin의 소개와 경력, 활동을 정리한 페이지입니다.',
  path: '/about',
})

export default function About() {
  return <AboutPage />
}
