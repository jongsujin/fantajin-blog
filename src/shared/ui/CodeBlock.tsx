'use client'

import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const textInput = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    setCopied(true)
    if (textInput.current) {
      // textContent gets the raw text without HTML tags
      navigator.clipboard.writeText(textInput.current.textContent ?? '')
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <div className="group relative my-4">
      <pre
        ref={textInput}
        {...props}
        className={`overflow-x-auto rounded-lg p-4 ${props.className || ''}`}
      >
        {children}
      </pre>
      <button
        onClick={onCopy}
        className="absolute right-3 top-3 rounded-md border border-gray-600 bg-gray-800 p-1.5 text-gray-300 opacity-0 transition-all hover:bg-gray-700 focus:opacity-100 group-hover:opacity-100 dark:bg-gray-700"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}
