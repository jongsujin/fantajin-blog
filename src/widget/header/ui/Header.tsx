'use client'

import Link from 'next/link'
import { CircleIcon, Moon, Sun } from 'lucide-react'
import { HEADER_TAB_LIST } from '../config/HeaderList'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
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
                  ? 'text-textColor border-b-2 border-white'
                  : 'text-gray-400'
              }`}
            >
              {header.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => {}}
            className="hover:bg-hoverColor rounded-lg p-2"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="text-textColor h-5 w-5" onClick={toggleTheme} />
            ) : (
              <Sun className="text-textColor h-5 w-5" onClick={toggleTheme} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
