import type React from "react"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

export default function PageHeader({ title, description, children, actions }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center space-x-3">{actions}</div>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
