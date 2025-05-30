"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, X, Plus } from "lucide-react"

interface AppointmentPanelProps {
  isOpen: boolean
  onClose: () => void
}

const upcomingAppointments = [
  {
    id: 1,
    patient: "John Smith",
    time: "10:00 AM",
    type: "Checkup",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    time: "2:30 PM",
    type: "Follow-up",
    status: "pending",
  },
  {
    id: 3,
    patient: "Robert Davis",
    time: "4:00 PM",
    type: "Consultation",
    status: "confirmed",
  },
]

export default function AppointmentPanel({ isOpen, onClose }: AppointmentPanelProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [patientName, setPatientName] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle appointment creation
    console.log({
      date: selectedDate,
      time: selectedTime,
      patient: patientName,
      type: appointmentType,
      notes,
    })
    // Reset form
    setSelectedDate("")
    setSelectedTime("")
    setPatientName("")
    setAppointmentType("")
    setNotes("")
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Appointment Panel */}
      <div
        className={`
        fixed lg:relative top-0 right-0 h-full w-80 bg-gradient-to-b from-blue-900 to-blue-800 text-white
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        ${!isOpen ? "lg:w-0 lg:overflow-hidden" : "lg:w-80"}
      `}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Appointments</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-blue-800 lg:hidden">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Profile Section */}
          <div className="bg-blue-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/globe.svg?height=48&width=48"
                alt="Emma Shelton"
                className="w-12 h-12 rounded-full border-2 border-blue-600"
              />
              <div>
                <h3 className="font-semibold">Emma Shelton</h3>
                <p className="text-blue-200 text-sm">Cardiologist</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-700 rounded-lg p-2">
                <p className="text-lg font-bold">53</p>
                <p className="text-xs text-blue-200">kg</p>
              </div>
              <div className="bg-blue-700 rounded-lg p-2">
                <p className="text-lg font-bold">165</p>
                <p className="text-xs text-blue-200">cm</p>
              </div>
              <div className="bg-blue-700 rounded-lg p-2">
                <p className="text-lg font-bold">30</p>
                <p className="text-xs text-blue-200">BMI</p>
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-blue-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">April 2024</h3>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-1">
                  ←
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-1">
                  →
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-blue-200 p-1">
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => (
                <button
                  key={i}
                  className={`p-1 rounded hover:bg-blue-700 ${i === 14 ? "bg-white text-blue-900 font-semibold" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Today&apos;s Appointments</h3>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-blue-800 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{appointment.patient}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === "confirmed" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex items-center text-blue-200 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {appointment.time} • {appointment.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Appointment Form */}
          <div className="bg-blue-800 rounded-2xl p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="patient" className="text-sm text-blue-200">
                  Patient Name
                </Label>
                <Input
                  id="patient"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="bg-blue-700 border-blue-600 text-white placeholder-blue-300"
                  placeholder="Enter patient name"
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-sm text-blue-200">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-blue-700 border-blue-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="time" className="text-sm text-blue-200">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="bg-blue-700 border-blue-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="type" className="text-sm text-blue-200">
                  Appointment Type
                </Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger className="bg-blue-700 border-blue-600 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Regular Checkup</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm text-blue-200">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-blue-700 border-blue-600 text-white placeholder-blue-300 resize-none"
                  placeholder="Additional notes..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                Schedule Appointment
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
