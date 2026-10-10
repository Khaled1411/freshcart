import React from 'react'

// breaks out of the centered container so the background spans the whole screen
export default function FullBleed({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative left-1/2 w-screen -translate-x-1/2 ${className}`}>{children}</div>
  )
}
