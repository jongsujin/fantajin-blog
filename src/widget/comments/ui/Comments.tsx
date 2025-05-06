'use client'

import { useTheme } from '@/src/_app/providers/ThemeContext'
import { CommentsProps } from '@/src/entities/post/model/types'
import React, { useEffect, useRef } from 'react'

export function Comments({ slug }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

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
    // theme 값(light/dark)을 직접 지정
    script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light')
    script.setAttribute('data-lang', 'ko')
    script.setAttribute('crossorigin', 'anonymous')

    commentsRef.current.appendChild(script)

    return () => {
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [slug, theme]) // slug 또는 theme이 변경될 때마다 댓글 다시 로드

  // theme이 바뀔 때마다 Giscus iframe에 postMessage로 테마 동기화
  useEffect(() => {
    const iframe = document.querySelector(
      'iframe.giscus-frame',
    ) as HTMLIFrameElement | null
    if (!iframe) return
    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: theme === 'dark' ? 'dark' : 'light',
          },
        },
      },
      'https://giscus.app',
    )
  }, [theme])

  return (
    <div className="mt-10">
      <div ref={commentsRef} className="giscus-container" />
    </div>
  )
}
