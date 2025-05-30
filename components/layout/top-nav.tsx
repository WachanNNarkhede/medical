"use client"

import { Bell, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TopNavProps {
  onToggleAppointments: () => void
  isAppointmentPanelOpen: boolean
}

export default function TopNav({ onToggleAppointments, isAppointmentPanelOpen }: TopNavProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left Side - Search */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search patients, appointments..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="text-center">
              <p className="text-gray-500">Today&apos;s Patients</p>
              <p className="font-semibold text-blue-600">24</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Pending</p>
              <p className="font-semibold text-yellow-600">8</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Critical</p>
              <p className="font-semibold text-red-600">2</p>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* Appointments Toggle */}
          <Button
            onClick={onToggleAppointments}
            variant={isAppointmentPanelOpen ? "default" : "outline"}
            className="flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Appointments</span>
          </Button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">Dr. Emma Shelton</p>
              <p className="text-xs text-gray-500">Cardiologist</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-8 h-8 rounded-full" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
