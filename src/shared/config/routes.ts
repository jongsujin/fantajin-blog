export const SITE_PATHS = {
  home: '/',
  blog: '/blog',
  about: '/about',
  life: '/life',
  tags: '/tags',
  developmentTag: `/tags/${encodeURIComponent('개발')}`,
} as const
