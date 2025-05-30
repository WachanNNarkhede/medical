"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AddPatientModalProps {
  isOpen: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (patientData: any) => void
}

export default function AddPatientModal({ isOpen, onClose, onSave }: AddPatientModalProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState({
    name: "",
    guardianName: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    bloodGroup: "",
    maritalStatus: "",
    phone: "",
    email: "",
    address: "",
    remarks: "",
    allergies: "",
    tpaId: "",
    tpaValidity: "",
    nationalId: "",
    height: "",
    weight: "",
    bp: "",
    pulse: "",
    temperature: "",
    respiration: "",
    appointmentDate: "",
    case: "",
    casualty: "No",
    oldPatient: "No",
    reference: "",
    consultantDoctor: "",
    chargeCategory: "",
    charge: "",
    tax: "",
    standardCharge: "",
    appliedCharge: "",
    amount: "",
    paymentMode: "Cash",
    paidAmount: "",
    liveConsultation: "No",
  })

  const modalRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle click outside to close
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

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  // Handle file upload click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Patient</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-blue-600 rounded-full h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 px-6 py-2 flex space-x-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium rounded-t-lg ${
              activeTab === "basic"
                ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Information
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t-lg ${
              activeTab === "medical"
                ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("medical")}
          >
            Medical Details
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-t-lg ${
              activeTab === "payment"
                ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment Information
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Patient full name"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="guardianName" className="text-sm font-medium text-gray-700 mb-1 block">
                    Guardian Name
                  </Label>
                  <Input
                    id="guardianName"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    placeholder="Guardian name"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1 block">
                    Gender
                  </Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 mb-1 block">
                      Date of Birth
                    </Label>
                  </div>
                  <div>
                    <select
                      name="dobYear"
                      onChange={handleChange}
                      className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      name="dobMonth"
                      onChange={handleChange}
                      className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Month</option>
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month, index) => (
                        <option key={month} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      name="dobDay"
                      onChange={handleChange}
                      className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-gray-700 mb-1 block">
                    Age (yy-mm-dd)
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="bloodGroup" className="text-sm font-medium text-gray-700 mb-1 block">
                    Blood Group
                  </Label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700 mb-1 block">
                    Marital Status
                  </Label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="patientPhoto" className="text-sm font-medium text-gray-700 mb-1 block">
                    Patient Photo
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUploadClick}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Drop a file here or click</span>
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => console.log(e.target.files)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1 block">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full address"
                    className="w-full"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="remarks" className="text-sm font-medium text-gray-700 mb-1 block">
                    Remarks
                  </Label>
                  <Textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Any remarks"
                    className="w-full"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="allergies" className="text-sm font-medium text-gray-700 mb-1 block">
                    Any Known Allergies
                  </Label>
                  <Textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="List allergies"
                    className="w-full"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="tpaId" className="text-sm font-medium text-gray-700 mb-1 block">
                    TPA ID
                  </Label>
                  <Input
                    id="tpaId"
                    name="tpaId"
                    value={formData.tpaId}
                    onChange={handleChange}
                    placeholder="TPA ID"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="tpaValidity" className="text-sm font-medium text-gray-700 mb-1 block">
                    TPA Validity
                  </Label>
                  <Input
                    id="tpaValidity"
                    name="tpaValidity"
                    type="date"
                    value={formData.tpaValidity}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="nationalId" className="text-sm font-medium text-gray-700 mb-1 block">
                    National Identification Number
                  </Label>
                  <Input
                    id="nationalId"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    placeholder="National ID"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Medical Details Tab */}
            {activeTab === "medical" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="height" className="text-sm font-medium text-gray-700 mb-1 block">
                    Height
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Height"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="weight" className="text-sm font-medium text-gray-700 mb-1 block">
                    Weight
                  </Label>
                  <Input
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Weight"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="bp" className="text-sm font-medium text-gray-700 mb-1 block">
                    BP
                  </Label>
                  <Input
                    id="bp"
                    name="bp"
                    value={formData.bp}
                    onChange={handleChange}
                    placeholder="Blood Pressure"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="pulse" className="text-sm font-medium text-gray-700 mb-1 block">
                    Pulse
                  </Label>
                  <Input
                    id="pulse"
                    name="pulse"
                    value={formData.pulse}
                    onChange={handleChange}
                    placeholder="Pulse"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="temperature" className="text-sm font-medium text-gray-700 mb-1 block">
                    Temperature
                  </Label>
                  <Input
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="Temperature"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="respiration" className="text-sm font-medium text-gray-700 mb-1 block">
                    Respiration
                  </Label>
                  <Input
                    id="respiration"
                    name="respiration"
                    value={formData.respiration}
                    onChange={handleChange}
                    placeholder="Respiration"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="symptomsType" className="text-sm font-medium text-gray-700 mb-1 block">
                    Symptoms Type
                  </Label>
                  <select
                    id="symptomsType"
                    name="symptomsType"
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="general">General</option>
                    <option value="cardiac">Cardiac</option>
                    <option value="respiratory">Respiratory</option>
                    <option value="gastrointestinal">Gastrointestinal</option>
                    <option value="neurological">Neurological</option>
                    <option value="musculoskeletal">Musculoskeletal</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="symptomsTitle" className="text-sm font-medium text-gray-700 mb-1 block">
                    Symptoms Title
                  </Label>
                  <Input
                    id="symptomsTitle"
                    name="symptomsTitle"
                    onChange={handleChange}
                    placeholder="Symptoms Title"
                    className="w-full"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <Label htmlFor="symptomsDescription" className="text-sm font-medium text-gray-700 mb-1 block">
                    Symptoms Description
                  </Label>
                  <Textarea
                    id="symptomsDescription"
                    name="symptomsDescription"
                    onChange={handleChange}
                    placeholder="Detailed description of symptoms"
                    className="w-full"
                    rows={4}
                  />
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <Label htmlFor="note" className="text-sm font-medium text-gray-700 mb-1 block">
                    Note
                  </Label>
                  <Textarea
                    id="note"
                    name="note"
                    onChange={handleChange}
                    placeholder="Additional notes"
                    className="w-full"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Payment Information Tab */}
            {activeTab === "payment" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="appointmentDate" className="text-sm font-medium text-gray-700 mb-1 block">
                    Appointment Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="case" className="text-sm font-medium text-gray-700 mb-1 block">
                    Case
                  </Label>
                  <Input
                    id="case"
                    name="case"
                    value={formData.case}
                    onChange={handleChange}
                    placeholder="Case"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="casualty" className="text-sm font-medium text-gray-700 mb-1 block">
                    Casualty
                  </Label>
                  <select
                    id="casualty"
                    name="casualty"
                    value={formData.casualty}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="oldPatient" className="text-sm font-medium text-gray-700 mb-1 block">
                    Old Patient
                  </Label>
                  <select
                    id="oldPatient"
                    name="oldPatient"
                    value={formData.oldPatient}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="tpa" className="text-sm font-medium text-gray-700 mb-1 block">
                    TPA
                  </Label>
                  <select
                    id="tpa"
                    name="tpa"
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="tpa1">TPA 1</option>
                    <option value="tpa2">TPA 2</option>
                    <option value="tpa3">TPA 3</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="reference" className="text-sm font-medium text-gray-700 mb-1 block">
                    Reference
                  </Label>
                  <Input
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="Reference"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="consultantDoctor" className="text-sm font-medium text-gray-700 mb-1 block">
                    Consultant Doctor <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="consultantDoctor"
                    name="consultantDoctor"
                    value={formData.consultantDoctor}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select</option>
                    <option value="dr1">Dr. Emma Shelton</option>
                    <option value="dr2">Dr. Michael Brown</option>
                    <option value="dr3">Dr. Lisa Wilson</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="chargeCategory" className="text-sm font-medium text-gray-700 mb-1 block">
                    Charge Category
                  </Label>
                  <select
                    id="chargeCategory"
                    name="chargeCategory"
                    value={formData.chargeCategory}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="category1">Consultation</option>
                    <option value="category2">Procedure</option>
                    <option value="category3">Investigation</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="charge" className="text-sm font-medium text-gray-700 mb-1 block">
                    Charge <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="charge"
                    name="charge"
                    value={formData.charge}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select</option>
                    <option value="charge1">Standard Consultation</option>
                    <option value="charge2">Specialist Consultation</option>
                    <option value="charge3">Emergency Consultation</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="tax" className="text-sm font-medium text-gray-700 mb-1 block">
                    Tax
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="tax"
                      name="tax"
                      value={formData.tax}
                      onChange={handleChange}
                      placeholder="Tax percentage"
                      className="w-full"
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="standardCharge" className="text-sm font-medium text-gray-700 mb-1 block">
                    Standard Charge (Rs.)
                  </Label>
                  <Input
                    id="standardCharge"
                    name="standardCharge"
                    value={formData.standardCharge}
                    onChange={handleChange}
                    placeholder="Standard charge"
                    className="w-full"
                    readOnly
                  />
                </div>

                <div>
                  <Label htmlFor="appliedCharge" className="text-sm font-medium text-gray-700 mb-1 block">
                    Applied Charge (Rs.) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="appliedCharge"
                    name="appliedCharge"
                    value={formData.appliedCharge}
                    onChange={handleChange}
                    placeholder="Applied charge"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-1 block">
                    Amount (Rs.) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Total amount"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="paymentMode" className="text-sm font-medium text-gray-700 mb-1 block">
                    Payment Mode
                  </Label>
                  <select
                    id="paymentMode"
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="paidAmount" className="text-sm font-medium text-gray-700 mb-1 block">
                    Paid Amount (Rs.) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="paidAmount"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleChange}
                    placeholder="Paid amount"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="liveConsultation" className="text-sm font-medium text-gray-700 mb-1 block">
                    Live Consultation
                  </Label>
                  <select
                    id="liveConsultation"
                    name="liveConsultation"
                    value={formData.liveConsultation}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end space-x-2 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
