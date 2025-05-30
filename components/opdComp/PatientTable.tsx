"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Trash2, Search } from "lucide-react"
import PatientDetailModal from "@/components/patientdetil/patientdetailsmodule"

const patients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    guardianName: "Robert Smith",
    phone: "9876543210",
    email: "john@example.com",
    address: "123 Main St, City",
    diagnosedBy: "Dr. Emma Shelton",
    prescription: "Lisinopril 10mg",
    symptoms: "Hypertension, Chest Pain",
    disease: "Cardiovascular Disease",
    status: "Active",
    lastVisit: "2024-01-15",
    allergies: "Penicillin",
    findings: "Elevated blood pressure, irregular heartbeat",
    consultantDoctor: "TANWEER ALAM (DOC1)",
    bloodGroup: "O+",
    maritalStatus: "Married",
    height: "175",
    weight: "80",
    bp: "140/90",
    pulse: "85",
    temperature: "98.6",
    respiration: "18",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    guardianName: "Michael Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    address: "456 Oak Ave, Town",
    diagnosedBy: "Dr. Michael Brown",
    prescription: "Metformin 500mg",
    symptoms: "Frequent Urination, Fatigue",
    disease: "Type 2 Diabetes",
    status: "Monitoring",
    lastVisit: "2024-01-12",
    allergies: "None",
    findings: "High blood glucose levels",
    consultantDoctor: "DR. MICHAEL BROWN (DOC2)",
    bloodGroup: "A+",
    maritalStatus: "Single",
    height: "165",
    weight: "65",
    bp: "120/80",
    pulse: "72",
    temperature: "98.4",
    respiration: "16",
  },
  {
    id: 3,
    name: "Neha Singh",
    age: 32,
    gender: "Female",
    guardianName: "Ashutosh Singh",
    phone: "762726727",
    email: "neha@example.com",
    address: "789 Pine St, Village",
    diagnosedBy: "Dr. Emma Shelton",
    prescription: "Atorvastatin 20mg",
    symptoms: "Atopic Dermatitis (Eczema)",
    disease: "Skin Condition",
    status: "Stable",
    lastVisit: "2024-01-10",
    allergies: "Dust, Pollen",
    findings: "Skin inflammation, redness",
    consultantDoctor: "TANWEER ALAM (DOC1)",
    bloodGroup: "B+",
    maritalStatus: "Married",
    height: "160",
    weight: "55",
    bp: "118/75",
    pulse: "68",
    temperature: "98.2",
    respiration: "15",
  },
  {
    id: 4,
    name: "Maria Garcia",
    age: 29,
    gender: "Female",
    guardianName: "Carlos Garcia",
    phone: "7654321098",
    email: "maria@example.com",
    address: "321 Elm St, City",
    diagnosedBy: "Dr. Lisa Wilson",
    prescription: "Albuterol Inhaler",
    symptoms: "Shortness of Breath, Wheezing",
    disease: "Asthma",
    status: "Active",
    lastVisit: "2024-01-08",
    allergies: "Shellfish",
    findings: "Reduced lung function",
    consultantDoctor: "DR. LISA WILSON (DOC3)",
    bloodGroup: "AB+",
    maritalStatus: "Single",
    height: "162",
    weight: "58",
    bp: "115/70",
    pulse: "76",
    temperature: "98.1",
    respiration: "20",
  },
  {
    id: 5,
    name: "James Wilson",
    age: 67,
    gender: "Male",
    guardianName: "Mary Wilson",
    phone: "6543210987",
    email: "james@example.com",
    address: "654 Maple Dr, Town",
    diagnosedBy: "Dr. Emma Shelton",
    prescription: "Warfarin 5mg",
    symptoms: "Irregular Heartbeat",
    disease: "Atrial Fibrillation",
    status: "Critical",
    lastVisit: "2024-01-14",
    allergies: "Aspirin",
    findings: "Irregular heart rhythm",
    consultantDoctor: "DR. EMMA SHELTON (DOC4)",
    bloodGroup: "O-",
    maritalStatus: "Married",
    height: "178",
    weight: "85",
    bp: "150/95",
    pulse: "90",
    temperature: "98.8",
    respiration: "22",
  },
]

export default function PatientTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(patients)
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term.toLowerCase()) ||
        patient.disease.toLowerCase().includes(term.toLowerCase()) ||
        patient.diagnosedBy.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredPatients(filtered)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "badge-green"
      case "critical":
        return "badge-red"
      case "monitoring":
        return "badge-yellow"
      case "stable":
        return "badge-blue"
      default:
        return "badge-gray"
    }
  }

  const handleAddNewPatient = () => {
    router.push("/patients")
  }

  const handleViewPatient = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient)
    setIsDetailModalOpen(true)
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
            <Button onClick={handleAddNewPatient} className="bg-blue-600 hover:bg-blue-700 text-white">
              Add New Patient
            </Button>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900">Patient Name</TableHead>
                <TableHead className="font-semibold text-gray-900">Age</TableHead>
                <TableHead className="font-semibold text-gray-900">Diagnosed By</TableHead>
                <TableHead className="font-semibold text-gray-900">Prescription</TableHead>
                <TableHead className="font-semibold text-gray-900">Symptoms</TableHead>
                <TableHead className="font-semibold text-gray-900">Disease</TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900">Last Visit</TableHead>
                <TableHead className="font-semibold text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt={patient.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{patient.diagnosedBy}</TableCell>
                  <TableCell>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                      {patient.prescription}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-gray-600 truncate" title={patient.symptoms}>
                      {patient.symptoms}
                    </p>
                  </TableCell>
                  <TableCell className="font-medium">{patient.disease}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(patient.status)}`}
                    >
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">{patient.lastVisit}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewPatient(patient)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
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
            Showing {filteredPatients.length} of {patients.length} patients
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

      {/* Patient Detail Modal */}
      <PatientDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        patient={selectedPatient}
      />
    </>
  )
}
