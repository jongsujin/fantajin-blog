'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 컴포넌트가 마운트된 후에만 실행
    setMounted(true)

    // 로컬 스토리지에서 테마 가져오기
    const savedTheme = localStorage.getItem('theme') as Theme | null

    let activeTheme: Theme

    if (savedTheme) {
      activeTheme = savedTheme
    } else {
      // 시스템 설정 확인
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      activeTheme = prefersDark ? 'dark' : 'light'
    }

    console.log('activeTheme', activeTheme)

    // 테마 적용
    document.body.setAttribute('data-theme', activeTheme)
    setTheme(activeTheme)
    localStorage.setItem('theme', activeTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // 마운트되기 전에는 아무것도 렌더링하지 않음 (hydration 오류 방지)
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
