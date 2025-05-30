"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Edit, Plus, UserMinus, Pill } from "lucide-react"
import AddIpdPatientModal from "./add-ipd-patient-modal"
import IpdPatientDetailModal from "@/components/ipd/ipd-patient-detail-modal"
import DischargedPatientsModal from "@/components/ipd/discharged-patient-modal"
import AddPrescriptionModal from "./add-prescription-modal"

const ipdPatients = [
  {
    id: 1,
    ipdNo: "IPD05",
    caseId: "38",
    name: "Anuradha Kumari",
    age: 26,
    gender: "Female",
    phone: "7744774433",
    consultant: "TANWEER ALAM (DOC1)",
    bed: "110-General Ward-Ground Floor",
    creditLimit: 20000.0,
    admissionDate: "2024-01-15",
    status: "Admitted",
    bloodGroup: "B+",
    guardianName: "Rajesh Kumari",
    email: "anuradha@example.com",
    address: "123 Main St, City",
    allergies: "None",
    height: "162",
    weight: "55",
    bp: "120/80",
    pulse: "72",
    temperature: "98.6",
    respiration: "16",
  },
  {
    id: 2,
    ipdNo: "IPD04",
    caseId: "42",
    name: "Nilam Kumari",
    age: 30,
    gender: "Female",
    phone: "7365356536",
    consultant: "TANWEER ALAM (DOC1)",
    bed: "104-Private Ward-1st Floor",
    creditLimit: 20000.0,
    admissionDate: "2024-01-12",
    status: "Admitted",
    bloodGroup: "A+",
    guardianName: "Suresh Kumari",
    email: "nilam@example.com",
    address: "456 Oak Ave, Town",
    allergies: "Penicillin",
    height: "158",
    weight: "52",
    bp: "118/75",
    pulse: "68",
    temperature: "98.4",
    respiration: "15",
  },
  {
    id: 3,
    ipdNo: "IPD03",
    caseId: "33",
    name: "Monika Singh",
    age: 20,
    gender: "Female",
    phone: "9378647866373",
    consultant: "ANKIT SINGHANIA (DOC021)",
    bed: "110-General Ward-Ground Floor",
    creditLimit: 20000.0,
    admissionDate: "2024-01-10",
    status: "Critical",
    bloodGroup: "O+",
    guardianName: "Ramesh Singh",
    email: "monika@example.com",
    address: "789 Pine St, Village",
    allergies: "Dust, Pollen",
    height: "165",
    weight: "58",
    bp: "125/85",
    pulse: "75",
    temperature: "99.1",
    respiration: "18",
  },
  {
    id: 4,
    ipdNo: "IPD02",
    caseId: "41",
    name: "Alia Kumari",
    age: 29,
    gender: "Female",
    phone: "8748747676763",
    consultant: "ANKUR MISHRA (263726)",
    bed: "101-VIP Ward-Ground Floor",
    creditLimit: 20000.0,
    admissionDate: "2024-01-08",
    status: "Stable",
    bloodGroup: "AB-",
    guardianName: "Vikash Kumari",
    email: "alia@example.com",
    address: "321 Elm St, City",
    allergies: "Shellfish",
    height: "160",
    weight: "53",
    bp: "115/70",
    pulse: "70",
    temperature: "98.2",
    respiration: "14",
  },
]

const dischargedPatients = [
  {
    id: 1,
    name: "Abhinash Kumar",
    patientId: "27",
    caseId: "39",
    gender: "Male",
    phone: "9474757757",
    consultant: "TANWEER ALAM (DOC1)",
    admissionDate: "10-08-2022 05:16 PM",
    dischargedDate: "11-08-2022 07:39 AM",
    tax: 250.0,
    netAmount: 5000.0,
    totalAmount: 5250.0,
  },
]

export default function IpdManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(ipdPatients)
  const [selectedPatient, setSelectedPatient] = useState<(typeof ipdPatients)[0] | null>(null)
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false)
  const [isPatientDetailModalOpen, setIsPatientDetailModalOpen] = useState(false)
  const [isDischargedPatientsModalOpen, setIsDischargedPatientsModalOpen] = useState(false)
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = ipdPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term.toLowerCase()) ||
        patient.ipdNo.toLowerCase().includes(term.toLowerCase()) ||
        patient.consultant.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredPatients(filtered)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "admitted":
        return "badge-blue"
      case "critical":
        return "badge-red"
      case "stable":
        return "badge-green"
      default:
        return "badge-gray"
    }
  }

  const handleViewPatient = (patient: (typeof ipdPatients)[0]) => {
    setSelectedPatient(patient)
    setIsPatientDetailModalOpen(true)
  }

  const handleAddPrescription = (patient: (typeof ipdPatients)[0]) => {
    setSelectedPatient(patient)
    setIsPrescriptionModalOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSavePatient = (patientData: any) => {
    console.log("Saving IPD patient data:", patientData)
    // Here you would typically save the patient data to your backend
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSavePrescription = (prescriptionData: any) => {
    console.log("Saving prescription data:", prescriptionData)
    // Here you would typically save the prescription data to your backend
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">IPD - Inpatient Department</h1>
            <p className="text-gray-600 mt-1">Manage admitted patients and their treatments</p>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={() => setIsDischargedPatientsModalOpen(true)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <UserMinus className="w-4 h-4" />
              <span>Discharged Patients</span>
            </Button>
            <Button
              onClick={() => setIsAddPatientModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Patient</span>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Admitted</p>
              <p className="text-2xl font-bold text-blue-600">{ipdPatients.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Cases</p>
              <p className="text-2xl font-bold text-red-600">
                {ipdPatients.filter((p) => p.status === "Critical").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Beds</p>
              <p className="text-2xl font-bold text-green-600">24</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserMinus className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today&apos;s Discharges</p>
              <p className="text-2xl font-bold text-purple-600">3</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-2xl shadow-sm">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Current IPD Patients</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900">IPD No</TableHead>
                <TableHead className="font-semibold text-gray-900">Case ID</TableHead>
                <TableHead className="font-semibold text-gray-900">Name</TableHead>
                <TableHead className="font-semibold text-gray-900">Gender</TableHead>
                <TableHead className="font-semibold text-gray-900">Phone</TableHead>
                <TableHead className="font-semibold text-gray-900">Consultant</TableHead>
                <TableHead className="font-semibold text-gray-900">Bed</TableHead>
                <TableHead className="font-semibold text-gray-900">Credit Limit (Rs.)</TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">{patient.ipdNo}</TableCell>
                  <TableCell>{patient.caseId}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt={patient.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <span>{patient.name}</span>
                        <p className="text-sm text-gray-500">({patient.age})</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{patient.consultant}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm truncate" title={patient.bed}>
                      {patient.bed}
                    </p>
                  </TableCell>
                  <TableCell className="font-medium">₹{patient.creditLimit.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(patient.status)}`}
                    >
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewPatient(patient)}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAddPrescription(patient)}
                        title="Add Prescription"
                      >
                        <Pill className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                        title="Discharge"
                      >
                        <UserMinus className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredPatients.length} of {ipdPatients.length} patients
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddIpdPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSave={handleSavePatient}
      />

      <IpdPatientDetailModal
        isOpen={isPatientDetailModalOpen}
        onClose={() => setIsPatientDetailModalOpen(false)}
        patient={selectedPatient}
      />

      <DischargedPatientsModal
        isOpen={isDischargedPatientsModalOpen}
        onClose={() => setIsDischargedPatientsModalOpen(false)}
        patients={dischargedPatients}
      />

      <AddPrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        patient={selectedPatient}
        onSave={handleSavePrescription}
      />
    </div>
  )
}
