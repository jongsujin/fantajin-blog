'use client'

import Link from 'next/link'
import { CircleIcon, Moon, Sun } from 'lucide-react'
import { HEADER_TAB_LIST } from '../config/HeaderList'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // 초기 테마 설정 (로컬 스토리지 또는 시스템 설정에서 가져옴)
  useEffect(() => {
    // 로컬 스토리지에서 테마 설정 가져오기
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

    // 저장된 테마가 있으면 사용, 없으면 시스템 설정 확인
    if (savedTheme) {
      const correctTheme = savedTheme === 'light' ? 'light' : 'dark'
      setTheme(correctTheme)
      document.body.setAttribute('data-theme', correctTheme)
    } else {
      // 시스템 설정이 다크 모드인지 확인
      const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      const initialTheme = isDarkMode ? 'dark' : 'light'

      setTheme(initialTheme)
      document.body.setAttribute('data-theme', initialTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)

    // body 요소에 data-theme 속성 설정
    document.body.setAttribute('data-theme', newTheme)

    // 로컬 스토리지에 테마 설정 저장
    localStorage.setItem('theme', newTheme)
  }

  return (
    <header className="bg-backgroundColor bg-opacity-90 sticky top-0 z-50 w-full border-b border-gray-800 transition-opacity duration-300">
      <div className="container flex h-16 items-center justify-between space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center space-x-4">
          <Link href="/" className="ml-5 flex items-center space-x-2">
            <CircleIcon className="h-6 w-6 text-gray-400" />
            <div className="ml-1 text-gray-400">
              <p>Fanta Jin</p>
            </div>
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          {HEADER_TAB_LIST.map((header) => (
            <Link
              href={header.href}
              key={header.id}
              className={`hover:text-hoverColor text-sm font-medium transition-colors ${
                pathname === header.href
                  ? 'text-textColor border-b-2'
                  : 'text-gray-400'
              }`}
            >
              {header.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="hover:bg-hoverColor/20 rounded-lg p-2 transition-colors"
            aria-label="테마 전환"
          >
            {theme === 'light' ? (
              <Moon className="text-textColor h-5 w-5" />
            ) : (
              <Sun className="text-textColor h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
