import {
  Activity,
  Calendar,
  FileText,
  Heart,
  Home,
  MessageSquare,
  Settings,
  Shield,
  Stethoscope,
  UserPlus,
  Building2,
} from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: Home, label: "OPD", active: true, href: "/" },
  { icon: UserPlus, label: "OPD", href: "/patients" },
  { icon: Building2, label: "IPD", href: "/ipd" },
  { icon: Calendar, label: "Appointments" },
  { icon: FileText, label: "Medical Records" },
  { icon: Activity, label: "Analytics" },
  { icon: Heart, label: "Health Monitoring" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Shield, label: "Insurance" },
  { icon: Settings, label: "Settings" },
]

export default function Sidebar() {
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
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    item.active
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ) : (
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    item.active
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )}
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
// This Sidebar component serves as a navigation menu for the application.
// It includes links to various sections such as Dashboard, OPD, IPD, Appointments, Medical Records, Analytics, Health Monitoring, Messages, Insurance, and Settings.