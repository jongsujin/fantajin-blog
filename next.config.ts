import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 클라이언트 번들에서 서버 전용 모듈 제외
      config.resolve.fallback = {
        fs: false,
        path: false,
      }
    }
    return config
  },
}

export default nextConfig
