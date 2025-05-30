"use client"

import { useState, useRef, useEffect } from "react"
import { X, User, Calendar, AlertCircle, Activity, Clock, Plus, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface IpdPatient {
  id: number
  ipdNo: string
  name: string
  age: number
  gender: string
  guardianName: string
  phone: string
  email: string
  address: string
  allergies: string
  consultant: string
  bed: string
  bloodGroup: string
  admissionDate: string
  status: string
  height: string
  weight: string
  bp: string
  pulse: string
  temperature: string
  respiration: string
}

interface IpdPatientDetailModalProps {
  isOpen: boolean
  onClose: () => void
  patient: IpdPatient | null
}

const treatmentData = [
  { date: "2024-01-15", vitals: 85, medication: 90, recovery: 75 },
  { date: "2024-01-16", vitals: 88, medication: 92, recovery: 78 },
  { date: "2024-01-17", vitals: 90, medication: 95, recovery: 82 },
  { date: "2024-01-18", vitals: 92, medication: 96, recovery: 85 },
]

const dailyVisits = [
  {
    date: "2024-01-18",
    time: "09:00 AM",
    doctor: "TANWEER ALAM (DOC1)",
    notes: "Patient showing improvement, continue current medication",
    vitals: { bp: "120/80", pulse: "72", temp: "98.6" },
  },
  {
    date: "2024-01-17",
    time: "02:30 PM",
    doctor: "TANWEER ALAM (DOC1)",
    notes: "Adjusted medication dosage, monitor for side effects",
    vitals: { bp: "125/85", pulse: "75", temp: "99.1" },
  },
]

export default function IpdPatientDetailModal({ isOpen, onClose, patient }: IpdPatientDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !patient) return null

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "treatment", label: "Treatment Progress", icon: Activity },
    { id: "visits", label: "Daily Visits", icon: Calendar },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "timeline", label: "Timeline", icon: Clock },
  ]

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {patient.name.toUpperCase()} ({patient.age})
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {patient.ipdNo}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm -medium ${
                patient.status === "Critical"
                  ? "bg-red-100 text-red-800"
                  : patient.status === "Stable"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {patient.status}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 px-6 py-2 flex space-x-1 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center space-x-2 px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 border-t-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Patient Details */}
              <div className="space-y-6">
                {/* Patient Photo and Basic Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">NO IMAGE</p>
                        <p className="text-xs text-gray-500">AVAILABLE</p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Gender</p>
                          <p className="text-gray-900">{patient.gender}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Blood Group</p>
                          <p className="text-gray-900">{patient.bloodGroup}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Guardian Name</p>
                        <p className="text-gray-900">{patient.guardianName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-gray-900">{patient.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Bed Assignment</p>
                        <p className="text-gray-900">{patient.bed}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Vitals */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Current Vitals</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-700">Blood Pressure</p>
                      <p className="text-xl font-bold text-blue-900">{patient.bp} mmHg</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-700">Pulse</p>
                      <p className="text-xl font-bold text-green-900">{patient.pulse} bpm</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-yellow-700">Temperature</p>
                      <p className="text-xl font-bold text-yellow-900">{patient.temperature}°F</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-purple-700">Respiration</p>
                      <p className="text-xl font-bold text-purple-900">{patient.respiration} bpm</p>
                    </div>
                  </div>
                </div>

                {/* Known Allergies */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <h3 className="font-medium text-gray-900">Known Allergies:</h3>
                  </div>
                  <p className="text-gray-700 ml-6">{patient.allergies || "No known allergies"}</p>
                </div>

                {/* Consultant Doctor */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">ATTENDING PHYSICIAN</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-600">{patient.consultant}</p>
                      <p className="text-sm text-gray-600">Primary Care Physician</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Treatment Progress & Admission Info */}
              <div className="space-y-6">
                {/* Admission Information */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">ADMISSION DETAILS</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admission Date:</span>
                      <span className="font-medium">{patient.admissionDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Days Admitted:</span>
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date().getTime() - new Date(patient.admissionDate).getTime()) / (1000 * 3600 * 24),
                        )}{" "}
                        days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">Inpatient Department</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room/Bed:</span>
                      <span className="font-medium">{patient.bed}</span>
                    </div>
                  </div>
                </div>

                {/* Treatment Progress Chart */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">TREATMENT PROGRESS</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-600">Vitals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-green-500 rounded"></div>
                        <span className="text-sm text-gray-600">Medication Response</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-purple-500 rounded"></div>
                        <span className="text-sm text-gray-600">Recovery Progress</span>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={treatmentData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 100]} />
                          <Line type="monotone" dataKey="vitals" stroke="#3B82F6" strokeWidth={2} />
                          <Line type="monotone" dataKey="medication" stroke="#10B981" strokeWidth={2} />
                          <Line type="monotone" dataKey="recovery" stroke="#8B5CF6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Prescription
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Discharge Patient
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Treatment Progress Tab */}
          {activeTab === "treatment" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Treatment Progress</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Treatment Note
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Daily Progress Chart</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={treatmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Line type="monotone" dataKey="recovery" stroke="#10B981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Treatment Milestones</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-800">Day 3 - Vitals Stabilized</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">Blood pressure and heart rate within normal range</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-blue-800">Day 2 - Medication Adjusted</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">Dosage modified based on patient response</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-yellow-800">Day 1 - Treatment Started</span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        Initial assessment completed, treatment plan initiated
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Daily Visits Tab */}
          {activeTab === "visits" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Daily Visits & Rounds</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Visit Note
                </Button>
              </div>

              <div className="space-y-4">
                {dailyVisits.map((visit, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {visit.date} - {visit.time}
                        </h4>
                        <p className="text-blue-600 font-medium">{visit.doctor}</p>
                      </div>
                      <div className="flex space-x-4 text-sm">
                        <span>
                          <strong>BP:</strong> {visit.vitals.bp}
                        </span>
                        <span>
                          <strong>Pulse:</strong> {visit.vitals.pulse}
                        </span>
                        <span>
                          <strong>Temp:</strong> {visit.vitals.temp}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{visit.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medications Tab */}
          {activeTab === "medications" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Current Medications</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Prescription
                </Button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Lisinopril</td>
                        <td className="px-4 py-3 text-sm text-gray-900">10mg</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Once daily</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Ongoing</td>
                        <td className="px-4 py-3">
                          <span className="badge-green text-xs px-2 py-1 rounded-full">Active</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Stop
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Metformin</td>
                        <td className="px-4 py-3 text-sm text-gray-900">500mg</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Twice daily</td>
                        <td className="px-4 py-3 text-sm text-gray-900">7 days</td>
                        <td className="px-4 py-3">
                          <span className="badge-green text-xs px-2 py-1 rounded-full">Active</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Stop
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Patient Timeline</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Timeline Entry
                </Button>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center relative z-10">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">Admission</h4>
                        <span className="text-sm text-gray-500">{patient.admissionDate}</span>
                      </div>
                      <p className="text-gray-700">
                        Patient admitted to {patient.bed} under {patient.consultant}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center relative z-10">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">Treatment Started</h4>
                        <span className="text-sm text-gray-500">Day 1</span>
                      </div>
                      <p className="text-gray-700">Initial assessment completed, treatment plan initiated</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center relative z-10">
                      <Pill className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">Medication Adjustment</h4>
                        <span className="text-sm text-gray-500">Day 2</span>
                      </div>
                      <p className="text-gray-700">Medication dosage adjusted based on patient response</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
