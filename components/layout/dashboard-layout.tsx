"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "@/components/layout/sidebar"
import TopNav from "@/components/layout/top-nav"
import AppointmentPanel from "@/components/opdComp/AppointmentPanel"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isAppointmentPanelOpen, setIsAppointmentPanelOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav
          onToggleAppointments={() => setIsAppointmentPanelOpen(!isAppointmentPanelOpen)}
          isAppointmentPanelOpen={isAppointmentPanelOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Animated Right Appointment Panel */}
      <AppointmentPanel isOpen={isAppointmentPanelOpen} onClose={() => setIsAppointmentPanelOpen(false)} />
    </div>
  )
}
