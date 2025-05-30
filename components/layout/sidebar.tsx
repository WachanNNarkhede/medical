"use client"

import {
  Home,
  UserPlus,
  Building2,
  Pill,
  TestTube,
  Zap,
  CreditCard,
  BarChart3,
  Settings,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MenuItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  label: string
  href: string
}

const menuItems: MenuItem[] = [
  { icon: Home, label: "OPD", href: "/" },
  { icon: UserPlus, label: "appointment", href: "/patients" },
  { icon: Building2, label: "IPD", href: "/ipd" },
  { icon: Pill, label: "Pharmacy", href: "/pharmacy" },
  { icon: TestTube, label: "Pathology", href: "/pathology" },
  { icon: Zap, label: "Radiology", href: "/radiology" },
  { icon: CreditCard, label: "Finance", href: "/finance" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">MediCare</h2>
            <p className="text-sm text-gray-500">Health Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-medium text-gray-900">Dr. Emma Shelton</p>
            <p className="text-xs text-gray-500">Cardiologist</p>
          </div>
        </div>
      </div>
    </div>
  )
}
