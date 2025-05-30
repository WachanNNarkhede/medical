"use client"

import { useState, useRef, useEffect } from "react"
import { X, User, Calendar, AlertCircle, FileText, Activity, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface Patient {
  id: number
  name: string
  age: number
  gender: string
  guardianName: string
  phone: string
  email: string
  address: string
  allergies: string
  findings: string
  symptoms: string
  consultantDoctor: string
  bloodGroup: string
  maritalStatus: string
  height: string
  weight: string
  bp: string
  pulse: string
  temperature: string
  respiration: string
}

interface PatientDetailModalProps {
  isOpen: boolean
  onClose: () => void
  patient: Patient | null
}

const medicalHistoryData = [
  { year: "2021", OPD: 0, Pharmacy: 0, Pathology: 0, Radiology: 0, BloodBank: 0, Ambulance: 0 },
  { year: "2021.5", OPD: 0.1, Pharmacy: 0, Pathology: 0, Radiology: 0, BloodBank: 0, Ambulance: 0 },
  { year: "2022", OPD: 1.0, Pharmacy: 0, Pathology: 0, Radiology: 0, BloodBank: 0, Ambulance: 0 },
]

const visitData = [
  {
    opdNo: "OPDN33",
    caseId: "44",
    appointmentDate: "29-08-2022",
    appointmentTime: "07:29 AM",
    consultant: "TANWEER ALAM (DOC1)",
    reference: "",
    symptoms: "Atopic Dermatitis (Eczema)",
  },
]

export default function PatientDetailModal({ isOpen, onClose, patient }: PatientDetailModalProps) {
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
    { id: "visits", label: "Visits", icon: Calendar },
    { id: "lab", label: "Lab Investigation", icon: Activity },
    { id: "treatment", label: "Treatment History", icon: FileText },
    { id: "timeline", label: "Timeline", icon: Clock },
  ]

  return (
    <div className="fixed inset-0 bg-transparent   bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {patient.name.toUpperCase()} ({patient.age})
          </h2>
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
                          <p className="text-sm font-medium text-gray-700">Age</p>
                          <p className="text-gray-900">{patient.age} Year 6 Month 21 Days</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Guardian Name</p>
                        <p className="text-gray-900">{patient.guardianName || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-gray-900">{patient.phone}</p>
                      </div>
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

                {/* Findings */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <h3 className="font-medium text-gray-900">Findings:</h3>
                  </div>
                  <p className="text-gray-700 ml-6">{patient.findings || "No findings recorded"}</p>
                </div>

                {/* Symptoms */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <h3 className="font-medium text-gray-900">Symptoms:</h3>
                  </div>
                  <div className="ml-6">
                    <ul className="list-disc list-inside space-y-1">
                      <li className="text-gray-700">
                        <strong>Atopic Dermatitis (Eczema)</strong> Atopic dermatitis usually develops in early
                        childhood and its more common in people who have a family history of the condition
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Consultant Doctor */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">CONSULTANT DOCTOR</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-600">{patient.consultantDoctor}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">TIMELINE</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-500 text-center">No timeline data available</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Medical History & Visit Details */}
              <div className="space-y-6">
                {/* Medical History Chart */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">MEDICAL HISTORY</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-600">OPD</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-green-500 rounded"></div>
                        <span className="text-sm text-gray-600">Pharmacy</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-red-500 rounded"></div>
                        <span className="text-sm text-gray-600">Pathology</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-purple-500 rounded"></div>
                        <span className="text-sm text-gray-600">Radiology</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-red-600 rounded"></div>
                        <span className="text-sm text-gray-600">Blood Bank</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-orange-500 rounded"></div>
                        <span className="text-sm text-gray-600">Ambulance</span>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={medicalHistoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis domain={[0, 1]} />
                          <Line type="monotone" dataKey="OPD" stroke="#3B82F6" strokeWidth={2} />
                          <Line type="monotone" dataKey="Pharmacy" stroke="#10B981" strokeWidth={2} />
                          <Line type="monotone" dataKey="Pathology" stroke="#EF4444" strokeWidth={2} />
                          <Line type="monotone" dataKey="Radiology" stroke="#8B5CF6" strokeWidth={2} />
                          <Line type="monotone" dataKey="BloodBank" stroke="#DC2626" strokeWidth={2} />
                          <Line type="monotone" dataKey="Ambulance" stroke="#F59E0B" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Visit Details */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">VISIT DETAILS</h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">OPD No</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Appointment Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Consultant
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Reference
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {visitData.map((visit, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-blue-600 font-medium">{visit.opdNo}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{visit.caseId}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {visit.appointmentDate}
                                <br />
                                <span className="text-gray-500">{visit.appointmentTime}</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{visit.consultant}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{visit.reference || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visits Tab */}
          {activeTab === "visits" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Visits</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Visit
                </Button>
              </div>

              <div className="mb-4">
                <Input placeholder="Search..." className="max-w-md" />
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">OPD No</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Appointment Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Consultant</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symptoms</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {visitData.map((visit, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-blue-600 font-medium">{visit.opdNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{visit.caseId}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {visit.appointmentDate} {visit.appointmentTime}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{visit.consultant}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{visit.reference || "-"}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{visit.symptoms}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-200">Records: 1 to 1 of 1</div>
              </div>
            </div>
          )}

          {/* Lab Investigation Tab */}
          {activeTab === "lab" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Lab Investigation</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Investigation
                </Button>
              </div>

              <div className="mb-4">
                <Input placeholder="Search..." className="max-w-md" />
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lab</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Sample Collected
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Expected Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approved By</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Activity className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">Add new record or search with different criteria</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-200">Records: 0 to 0 of 0</div>
              </div>
            </div>
          )}

          {/* Treatment History Tab */}
          {activeTab === "treatment" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Treatment History</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Treatment
                </Button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No treatment history available</p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Timeline
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-blue-600 font-medium">No Record Found</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
