'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, List } from 'lucide-react'

export interface TOCProps {
  variant?: 'sidebar' | 'inline'
  className?: string
}

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TOC({ variant = 'sidebar', className = '' }: TOCProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Find all headings within the prose container
    const elements = Array.from(
      document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4'),
    ).filter((el) => el.id)

    if (elements.length === 0) return

    const headingData = elements.map((el) => ({
      id: el.id,
      text: el.textContent?.trim() || '',
      level: Number(el.tagName.replace('H', '')),
    }))
    setHeadings(headingData)

    if (window.location.hash) {
      let hashId = window.location.hash.slice(1)
      try {
        hashId = decodeURIComponent(hashId)
      } catch {
        // 잘못 인코딩된 외부 링크도 목차 렌더링을 막지 않도록 한다.
      }
      if (elements.some((el) => el.id === hashId)) {
        setActiveId(hashId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -60% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  const minLevel = Math.min(...headings.map((h) => h.level))

  const handleClick = (id: string) => {
    setActiveId(id)
  }

  if (variant === 'inline') {
    return (
      <details
        className={`group rounded-xl border border-gray-200 bg-gray-50/70 p-4 transition-colors dark:border-gray-800 dark:bg-gray-900/40 ${className}`}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-md text-sm font-semibold text-gray-900 select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:text-gray-100">
          <span className="flex items-center gap-2">
            <List
              className="h-4 w-4 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
            <span>목차</span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-normal text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {headings.length}
            </span>
          </span>
          <ChevronDown
            className="h-4 w-4 text-gray-500 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <nav
          aria-label="본문 목차 (모바일)"
          className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-800"
        >
          <ul className="flex flex-col space-y-2 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{
                  paddingLeft: `${Math.max(0, heading.level - minLevel) * 0.75}rem`,
                }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={() => handleClick(heading.id)}
                  aria-current={
                    activeId === heading.id ? 'location' : undefined
                  }
                  className={`block py-0.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeId === heading.id
                      ? 'font-semibold text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    )
  }

  return (
    <nav
      aria-label="본문 목차"
      className={`sticky top-24 max-h-[calc(100vh-7rem)] w-64 self-start overflow-y-auto pr-2 ${className}`}
    >
      <div className="mb-4 flex items-center gap-2">
        <List
          className="h-4 w-4 text-blue-600 dark:text-blue-400"
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-gray-100">
          목차
        </h2>
      </div>
      <ul className="flex flex-col space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${Math.max(0, heading.level - minLevel) * 0.75}rem`,
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={() => handleClick(heading.id)}
              aria-current={activeId === heading.id ? 'location' : undefined}
              className={`line-clamp-2 block py-0.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                activeId === heading.id
                  ? 'font-semibold text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
