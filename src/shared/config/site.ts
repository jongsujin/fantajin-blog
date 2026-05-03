export const siteConfig = {
  name: 'Fanta Jin 블로그',
  description: 'Fantajin의 개발 블로그입니다.',
  author: 'Fanta Jin',
  locale: 'ko_KR',
  defaultOgImage: '/logo/Logo.png',
  keywords: ['Fanta Jin', '프론트엔드', 'Next.js', 'React', '개발 블로그'],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fantajin.com',
} as const

export function toAbsoluteUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString()
}
