// src/widget/comments/ui/Comments.tsx
'use client' // Next.js 13 이상에서 클라이언트 컴포넌트 선언

import React, { useEffect, useRef } from 'react'

interface CommentsProps {
  slug: string
}

export function Comments({ slug }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 이미 로드된 스크립트가 있다면 제거
    const existingScript = document.getElementById('giscus-script')
    if (existingScript) {
      existingScript.remove()
    }

    if (!commentsRef.current) return

    const script = document.createElement('script')
    script.id = 'giscus-script' // ID 추가하여 중복 방지
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.setAttribute('data-repo', 'jongsujin/fantajin-blog')
    script.setAttribute('data-repo-id', 'R_kgDOOJGRjA')
    script.setAttribute('data-category', 'Comments')
    script.setAttribute('data-category-id', 'DIC_kwDOOJGRjM4ComEU')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '0')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('crossorigin', 'anonymous')

    commentsRef.current.appendChild(script)

    return () => {
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [slug]) // slug가 변경될 때마다 댓글 다시 로드

  return (
    <div className="mt-10">
      <div ref={commentsRef} className="giscus-container" />
    </div>
  )
}
