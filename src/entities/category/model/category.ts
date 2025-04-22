import { ReactNode } from 'react'

export interface Category {
  id: string
  title: string
  description: string
  icon: ReactNode
  href: string
  color: string
}

export const categories: Category[] = [
  {
    id: 'about',
    title: '내 소개',
    description: '개발자 소개 및 이력',
    icon: null, // 아이콘은 BlogPage에서 import해서 할당
    href: '/about',
    color: 'from-green-500/20 to-green-700/20',
  },
  {
    id: 'development',
    title: '개발',
    description: '프로그래밍 및 개발 관련 글',
    icon: null,
    href: '', // 나중에 BlogPage에서 동적으로 할당
    color: 'from-blue-500/20 to-blue-700/20',
  },
  {
    id: 'life',
    title: '잡담',
    description: '재테크 및 생각 정리',
    icon: null,
    href: '/life',
    color: 'from-yellow-500/20 to-yellow-700/20',
  },
]
