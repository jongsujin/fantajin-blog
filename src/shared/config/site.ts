export const siteConfig = {
  name: 'Fanta Jin 블로그',
  description: 'Fantajin의 개발 블로그입니다.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://fantajin-blog.vercel.app',
} as const

export function toAbsoluteUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString()
}
