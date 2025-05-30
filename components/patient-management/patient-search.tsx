"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, User, Calendar, Phone, Mail, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Patient {
  id: number
  name: string
  age: string
  gender: string
  phone: string
  email: string
  maritalStatus: string
  allergies: string
  tpaId: string
  tpaValidity: string
  nationalId: string
  height: string
  weight: string
  bp: string
  pulse: string
  temperature: string
  respiration: string
}

interface PatientSearchProps {
  onAddNewClick: () => void
}

export default function PatientSearch({ onAddNewClick }: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Sample patient data
  const patients: Patient[] = [
    {
      id: 1,
      name: "Ankita Kumari",
      age: "32",
      gender: "Female",
      phone: "9876543210",
      email: "ankita@example.com",
      maritalStatus: "Married",
      allergies: "Penicillin",
      tpaId: "TPA12345",
      tpaValidity: "2025-12-31",
      nationalId: "ABCDE1234F",
      height: "165",
      weight: "53",
      bp: "120/80",
      pulse: "72",
      temperature: "98.6",
      respiration: "16",
    },
    {
      id: 2,
      name: "John Smith",
      age: "45",
      gender: "Male",
      phone: "8765432109",
      email: "john@example.com",
      maritalStatus: "Married",
      allergies: "None",
      tpaId: "TPA67890",
      tpaValidity: "2024-10-15",
      nationalId: "FGHIJ5678K",
      height: "178",
      weight: "82",
      bp: "130/85",
      pulse: "68",
      temperature: "98.4",
      respiration: "14",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      age: "28",
      gender: "Female",
      phone: "7654321098",
      email: "sarah@example.com",
      maritalStatus: "Single",
      allergies: "Pollen, Dust",
      tpaId: "TPA54321",
      tpaValidity: "2025-06-30",
      nationalId: "LMNOP9012Q",
      height: "162",
      weight: "58",
      bp: "118/75",
      pulse: "76",
      temperature: "98.2",
      respiration: "15",
    },
  ]

  // Handle search
  const handleSearch = () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const results = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.nationalId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSearchResults(results)
      setShowResults(true)
      setIsSearching(false)
    }, 500)
  }

  // Handle patient selection
  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowResults(false)
  }

  // Close patient details
  const handleClosePatientDetails = () => {
    setSelectedPatient(null)
  }

  // Handle click outside to close results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Patient Management</h2>
        <Button onClick={onAddNewClick} className="bg-blue-600 hover:bg-blue-700 text-white">
          + New Patient
        </Button>
      </div>

      {/* Search Bar */}
      <div ref={searchRef} className="relative mb-6">
        <div className="flex">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter Patient Name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <ul className="max-h-60 overflow-auto py-1">
              {searchResults.map((patient) => (
                <li
                  key={patient.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{patient.name}</p>
                    <p className="text-sm text-gray-500">
                      ID: {patient.nationalId} • {patient.gender} • {patient.age} years
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showResults && searchResults.length === 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center">
            <p className="text-gray-500">No patients found. Try a different search or add a new patient.</p>
            <Button onClick={onAddNewClick} variant="outline" className="mt-2">
              Add New Patient
            </Button>
          </div>
        )}
      </div>

      {/* Selected Patient Details */}
      {selectedPatient && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-50 p-4 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Patient Details</h3>
            <Button variant="ghost" size="icon" onClick={handleClosePatientDetails} className="text-gray-500">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              {/* Left Column - Basic Info */}
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h4>
                    <p className="text-gray-600">
                      {selectedPatient.gender}, {selectedPatient.age} years
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">Marital Status: {selectedPatient.maritalStatus}</span>
                  </div>
                  {selectedPatient.allergies && (
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <div>
                        <span className="text-gray-700 font-medium">Known Allergies:</span>
                        <p className="text-gray-700">{selectedPatient.allergies}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-700 mb-2">Identification</h5>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-500">TPA ID:</span> {selectedPatient.tpaId}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">TPA Validity:</span> {selectedPatient.tpaValidity}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">National ID:</span> {selectedPatient.nationalId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Medical Info */}
              <div className="md:w-2/3 md:pl-6 md:border-l border-gray-200">
                <h5 className="font-medium text-gray-700 mb-4">Medical Information</h5>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="text-lg font-medium">{selectedPatient.height} cm</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-lg font-medium">{selectedPatient.weight} kg</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Blood Pressure</p>
                    <p className="text-lg font-medium">{selectedPatient.bp} mmHg</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Pulse</p>
                    <p className="text-lg font-medium">{selectedPatient.pulse} bpm</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-lg font-medium">{selectedPatient.temperature} °F</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Respiration</p>
                    <p className="text-lg font-medium">{selectedPatient.respiration} bpm</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Schedule Appointment</Button>
                  <Button variant="outline">View Medical History</Button>
                  <Button variant="outline">Edit Patient</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
