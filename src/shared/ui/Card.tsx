import React from 'react'

export interface CardProps {
    className?: string
    children: React.ReactNode
  }

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={`rounded-lg shadow-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ className = '', children }: CardProps) {
  return (
    <div className={`overflow-hidden p-6 bg-cardColor border border-gray-800 shadow-2xl ${className}`}>
      {children}
    </div>
  )
}
