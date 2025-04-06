import React from 'react'

export interface CardProps {
  className?: string
  children: React.ReactNode
}

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={`overflow-hidden rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ className = '', children }: CardProps) {
  return (
    <div className={`bg-cardColor overflow-hidden p-4 ${className}`}>
      {children}
    </div>
  )
}
