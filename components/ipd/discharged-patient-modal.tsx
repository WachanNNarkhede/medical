"use client"

import { useState, useRef, useEffect } from "react"
import { X, Search, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DischargedPatient {
  id: number
  name: string
  patientId: string
  caseId: string
  gender: string
  phone: string
  consultant: string
  admissionDate: string
  dischargedDate: string
  tax: number
  netAmount: number
  totalAmount: number
}

interface DischargedPatientsModalProps {
  isOpen: boolean
  onClose: () => void
  patients: DischargedPatient[]
}

export default function DischargedPatientsModal({ isOpen, onClose, patients }: DischargedPatientsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(patients)
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

  useEffect(() => {
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.consultant.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredPatients(filtered)
  }, [searchTerm, patients])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">IPD Discharged Patients</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-blue-600 rounded-full h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search and Actions */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search discharged patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <select className="h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm">
              <option value="100">100</option>
              <option value="50">50</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900">Name</TableHead>
                <TableHead className="font-semibold text-gray-900">Patient ID</TableHead>
                <TableHead className="font-semibold text-gray-900">Case ID</TableHead>
                <TableHead className="font-semibold text-gray-900">Gender</TableHead>
                <TableHead className="font-semibold text-gray-900">Phone</TableHead>
                <TableHead className="font-semibold text-gray-900">Consultant</TableHead>
                <TableHead className="font-semibold text-gray-900">Admission Date</TableHead>
                <TableHead className="font-semibold text-gray-900">Discharged Date</TableHead>
                <TableHead className="font-semibold text-gray-900">Tax (Rs.)</TableHead>
                <TableHead className="font-semibold text-gray-900">Net Amount (Rs.)</TableHead>
                <TableHead className="font-semibold text-gray-900">Total (Rs.)</TableHead>
                <TableHead className="font-semibold text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">{patient.name}</TableCell>
                  <TableCell>{patient.patientId}</TableCell>
                  <TableCell>{patient.caseId}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{patient.consultant}</TableCell>
                  <TableCell>{patient.admissionDate}</TableCell>
                  <TableCell>{patient.dischargedDate}</TableCell>
                  <TableCell>₹{patient.tax.toFixed(2)}</TableCell>
                  <TableCell>₹{patient.netAmount.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">₹{patient.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-600">
            Records: 1 to {filteredPatients.length} of {patients.length}
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              &lt;
            </Button>
            <span className="text-sm">1</span>
            <Button variant="outline" size="sm">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
// This component renders a modal for displaying discharged patients in the IPD management system.
// It includes a search bar, a table of patients, and actions for exporting data and viewing details.