import type React from "react"

interface ContentWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function ContentWrapper({ children, className = "" }: ContentWrapperProps) {
  return <div className={`p-6 ${className}`}>{children}</div>
}
