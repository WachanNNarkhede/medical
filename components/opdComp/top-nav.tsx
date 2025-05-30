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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
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

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
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
            <span>Appointments</span>
          </Button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  )
}
