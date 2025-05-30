"use client"

import PageHeader from "@/components/layout/page-header"
import ContentWrapper from "@/components/layout/content-wrapper"
import HealthMetrics from "@/components/opdComp/HealthMetrics"
import PatientTable from "@/components/opdComp/PatientTable"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from "lucide-react"

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back, Dr. Emma Shelton. Here's what's happening today."
        actions={
          <>
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Patient</span>
            </Button>
          </>
        }
      />

      

      {/* Main Content */}

      <ContentWrapper>
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
               
                <h2 className="text-xl font-semibold mb-2">
                  Good morning, <span className="text-blue-100">Dr. Emma Shelton</span>
                </h2>
                <p className="text-blue-200 mb-4">Have a nice day and don&apos;t forget to take care of your health!</p>
                <Button variant="secondary" className="bg-emerald-400"  size="sm">
                  View Schedule →
                </Button>
              </div>
              <div className="hidden md:block">
                <img src="/doctors/Doctor1.jpg?height=120&width=120" alt="Doctor illustration" className="w-32 h-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <HealthMetrics />

        {/* Patient Table */}
        <div className="mt-6">
          <PatientTable />
        </div>
      </ContentWrapper>
    </>
  )
}
// Compare this snippet from app/page.tsx:
