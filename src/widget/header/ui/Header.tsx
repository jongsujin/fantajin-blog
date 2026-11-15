'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { HEADER_TAB_LIST } from '../config/HeaderList'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/src/_app/providers/ThemeContext'

export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') {
      return pathname === '/' || pathname.startsWith('/blog')
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md transition-colors duration-200 dark:border-gray-800 dark:bg-[#171717]/90">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            aria-label="Fanta Jin 블로그 홈"
          >
            <div className="text-base font-bold whitespace-nowrap sm:text-lg">
              <p>
                <span className="text-blue-600 dark:text-blue-400">F</span>anta
                Jin
              </p>
            </div>
          </Link>
        </div>

        <nav
          aria-label="메인 내비게이션"
          className="flex items-center space-x-1 sm:space-x-4 md:space-x-6"
        >
          {HEADER_TAB_LIST.map((header) => {
            const active = isActive(header.href)
            return (
              <Link
                href={header.href}
                key={header.id}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-1 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none sm:px-3 sm:text-base ${
                  active
                    ? 'font-semibold text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {header.title}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="cursor-pointer rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label={
              theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
            }
            title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
