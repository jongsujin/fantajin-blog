'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TOC() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Find all headings within the prose container
    const elements = Array.from(
      document.querySelectorAll('.prose h1, .prose h2, .prose h3')
    ).filter((el) => el.id)

    const headingData = elements.map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: Number(el.tagName.replace('H', '')),
    }))
    setHeadings(headingData)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 w-64 self-start">
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
        목차
      </h4>
      <ul className="flex flex-col space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id + heading.text}
            style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block transition-colors hover:text-blue-500 ${
                activeId === heading.id
                  ? 'font-medium text-blue-500'
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
