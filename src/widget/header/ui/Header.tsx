'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { HEADER_TAB_LIST } from '../config/HeaderList'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/src/_app/providers/ThemeContext'

export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-backgroundColor bg-opacity-90 sticky top-0 z-50 w-full border-b border-gray-800 transition-opacity duration-300">
      <div className="flex h-16 w-full items-center justify-between space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center space-x-4">
          <Link href="/" className="ml-5 flex items-center space-x-2">
            <div className="ml-1 text-lg font-bold">
              <p>
                <span className="text-blue-800">F</span>anta Jin
              </p>
            </div>
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          {HEADER_TAB_LIST.map((header) => (
            <Link
              href={header.href}
              key={header.id}
              className={`hover:text-hoverColor text-body font-medium transition-colors ${
                pathname === header.href ? 'text-textColor border-b-3' : ''
              }`}
            >
              {header.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="hover:bg-hoverColor/20 cursor-pointer rounded-lg p-2 transition-colors"
            aria-label="테마 전환"
          >
            {theme === 'dark' ? (
              <Sun className="text-textColor h-5 w-5" />
            ) : (
              <Moon className="text-textColor h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
