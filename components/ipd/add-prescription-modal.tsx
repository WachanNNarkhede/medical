"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface IpdPatient {
  id: number
  name: string
  age: number
  ipdNo: string
}

interface AddPrescriptionModalProps {
  isOpen: boolean
  onClose: () => void
  patient: IpdPatient | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (prescriptionData: any) => void
}

interface Medicine {
  id: string
  category: string
  medicine: string
  dose: string
  interval: string
  duration: string
  instruction: string
}

export default function AddPrescriptionModal({ isOpen, onClose, patient, onSave }: AddPrescriptionModalProps) {
  const [formData, setFormData] = useState({
    headerNote: "",
    findingCategory: "",
    findingList: "",
    findingDescription: "",
    findingPrint: false,
    footerNote: "",
    pathology: "",
    radiology: "",
    notifications: {
      admin: false,
      accountant: false,
      doctor: false,
      pharmacist: false,
      pathologist: false,
      radiologist: false,
      superAdmin: true,
      receptionist: false,
      nurse: false,
      websitePro: false,
      clinicAdmin: false,
    },
  })

  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "1",
      category: "",
      medicine: "",
      dose: "",
      interval: "",
      duration: "",
      instruction: "",
    },
  ])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      if (name.startsWith("notification-")) {
        const notificationKey = name.replace("notification-", "")
        setFormData((prev) => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [notificationKey]: checkbox.checked,
          },
        }))
      } else {
        setFormData((prev) => ({ ...prev, [name]: checkbox.checked }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleMedicineChange = (id: string, field: string, value: string) => {
    setMedicines((prev) => prev.map((med) => (med.id === id ? { ...med, [field]: value } : med)))
  }

  const addMedicine = () => {
    const newMedicine: Medicine = {
      id: Date.now().toString(),
      category: "",
      medicine: "",
      dose: "",
      interval: "",
      duration: "",
      instruction: "",
    }
    setMedicines((prev) => [...prev, newMedicine])
  }

  const removeMedicine = (id: string) => {
    if (medicines.length > 1) {
      setMedicines((prev) => prev.filter((med) => med.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, medicines, patientId: patient?.id })
    onClose()
  }

  if (!isOpen || !patient) return null

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Add Prescription - {patient.name} ({patient.ipdNo})
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-blue-600 rounded-full h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Header Note and Findings */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header Note */}
                <div>
                  <Label htmlFor="headerNote" className="text-sm font-medium text-gray-700 mb-2 block">
                    Header Note
                  </Label>
                  <div className="border border-gray-300 rounded-md">
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex items-center space-x-2">
                      <select className="text-sm border-none bg-transparent">
                        <option>Normal text</option>
                      </select>
                      <Button type="button" variant="ghost" size="sm" className="p-1">
                        <strong>B</strong>
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="p-1">
                        <em>I</em>
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="p-1">
                        <u>U</u>
                      </Button>
                    </div>
                    <Textarea
                      id="headerNote"
                      name="headerNote"
                      value={formData.headerNote}
                      onChange={handleChange}
                      className="border-none resize-none"
                      rows={4}
                      placeholder="Enter header note..."
                    />
                  </div>
                </div>

                {/* Findings */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Findings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="findingCategory">Finding Category</Label>
                      <select
                        id="findingCategory"
                        name="findingCategory"
                        value={formData.findingCategory}
                        onChange={handleChange}
                        className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="General">General</option>
                        <option value="Cardiac">Cardiac</option>
                        <option value="Respiratory">Respiratory</option>
                        <option value="Neurological">Neurological</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="findingList">Finding List</Label>
                      <Input
                        id="findingList"
                        name="findingList"
                        value={formData.findingList}
                        onChange={handleChange}
                        placeholder="Finding list"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="findingPrint"
                          checked={formData.findingPrint}
                          onChange={handleChange}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">Finding Print</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="findingDescription">Finding Description</Label>
                    <Textarea
                      id="findingDescription"
                      name="findingDescription"
                      value={formData.findingDescription}
                      onChange={handleChange}
                      placeholder="Enter finding description..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Medicines */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Medicines</h3>
                    <Button
                      type="button"
                      onClick={addMedicine}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    >
                      + Add Medicine
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {medicines.map((medicine, index) => (
                      <div key={medicine.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Medicine {index + 1}</span>
                          {medicines.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMedicine(medicine.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                          <div>
                            <Label className="text-xs">Medicine Category</Label>
                            <select
                              value={medicine.category}
                              onChange={(e) => handleMedicineChange(medicine.id, "category", e.target.value)}
                              className="w-full h-8 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
                            >
                              <option value="">Select</option>
                              <option value="Tablet">Tablet</option>
                              <option value="Capsule">Capsule</option>
                              <option value="Syrup">Syrup</option>
                              <option value="Injection">Injection</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-xs">Medicine</Label>
                            <select
                              value={medicine.medicine}
                              onChange={(e) => handleMedicineChange(medicine.id, "medicine", e.target.value)}
                              className="w-full h-8 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
                            >
                              <option value="">Select</option>
                              <option value="Paracetamol">Paracetamol</option>
                              <option value="Ibuprofen">Ibuprofen</option>
                              <option value="Amoxicillin">Amoxicillin</option>
                              <option value="Lisinopril">Lisinopril</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-xs">Dose</Label>
                            <select
                              value={medicine.dose}
                              onChange={(e) => handleMedicineChange(medicine.id, "dose", e.target.value)}
                              className="w-full h-8 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
                            >
                              <option value="">Select</option>
                              <option value="500mg">500mg</option>
                              <option value="250mg">250mg</option>
                              <option value="100mg">100mg</option>
                              <option value="10mg">10mg</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-xs">Dose Interval</Label>
                            <select
                              value={medicine.interval}
                              onChange={(e) => handleMedicineChange(medicine.id, "interval", e.target.value)}
                              className="w-full h-8 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
                            >
                              <option value="">Select</option>
                              <option value="Once daily">Once daily</option>
                              <option value="Twice daily">Twice daily</option>
                              <option value="Three times daily">Three times daily</option>
                              <option value="Four times daily">Four times daily</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-xs">Dose Duration</Label>
                            <select
                              value={medicine.duration}
                              onChange={(e) => handleMedicineChange(medicine.id, "duration", e.target.value)}
                              className="w-full h-8 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
                            >
                              <option value="">Select</option>
                              <option value="3 days">3 days</option>
                              <option value="7 days">7 days</option>
                              <option value="14 days">14 days</option>
                              <option value="1 month">1 month</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-3">
                          <Label className="text-xs">Instruction</Label>
                          <Input
                            value={medicine.instruction}
                            onChange={(e) => handleMedicineChange(medicine.id, "instruction", e.target.value)}
                            placeholder="Enter instructions..."
                            className="text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Note */}
                <div>
                  <Label htmlFor="footerNote" className="text-sm font-medium text-gray-700 mb-2 block">
                    Footer Note
                  </Label>
                  <div className="border border-gray-300 rounded-md">
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex items-center space-x-2">
                      <select className="text-sm border-none bg-transparent">
                        <option>Normal text</option>
                      </select>
                      <Button type="button" variant="ghost" size="sm" className="p-1">
                        <strong>B</strong>
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="p-1">
                        <em>I</em>
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="p-1">
                        <u>U</u>
                      </Button>
                    </div>
                    <Textarea
                      id="footerNote"
                      name="footerNote"
                      value={formData.footerNote}
                      onChange={handleChange}
                      className="border-none resize-none"
                      rows={4}
                      placeholder="Enter footer note..."
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Pathology, Radiology & Notifications */}
              <div className="space-y-6">
                {/* Pathology & Radiology */}
                <div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pathology">Pathology</Label>
                      <select
                        id="pathology"
                        name="pathology"
                        value={formData.pathology}
                        onChange={handleChange}
                        className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Blood Test">Blood Test</option>
                        <option value="Urine Test">Urine Test</option>
                        <option value="Stool Test">Stool Test</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="radiology">Radiology</Label>
                      <select
                        id="radiology"
                        name="radiology"
                        value={formData.radiology}
                        onChange={handleChange}
                        className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="CT Scan">CT Scan</option>
                        <option value="MRI">MRI</option>
                        <option value="Ultrasound">Ultrasound</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notification To */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Notification To</h3>
                  <div className="space-y-3">
                    {Object.entries(formData.notifications).map(([key, value]) => (
                      <label key={key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name={`notification-${key}`}
                          checked={value}
                          onChange={handleChange}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end space-x-2 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
            Save Prescription
          </Button>
        </div>
      </div>
    </div>
  )
}
