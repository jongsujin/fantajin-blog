import { MDXImageProps } from '@/src/entities/post/model/types'
import Image from 'next/image'
import { useState } from 'react'

export function MDXImage({ src, alt, width, height }: MDXImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // public 폴더 내 이미지 경로 확인
  const imageSrc = src.startsWith('/') ? src : `/${src}`

  return (
    <span className="relative my-6 block">
      <Image
        src={imageSrc}
        alt={alt}
        width={width || 1000}
        height={height || 500}
        className={`mx-auto rounded-lg transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        style={{ objectFit: 'contain' }}
      />
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-800/20">
          <span className="border-t-hoverColor h-8 w-8 animate-spin rounded-full border-4 border-gray-300"></span>
        </span>
      )}
    </span>
  )
}
