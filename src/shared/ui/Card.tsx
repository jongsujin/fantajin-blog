import { CardProps } from '@/src/entities/post/model/types'
import React from 'react'

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
