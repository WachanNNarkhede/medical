"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddIpdPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (patientData: any) => void;
}

export default function AddIpdPatientModal({
  isOpen,
  onClose,
  onSave,
}: AddIpdPatientModalProps) {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [formData, setFormData] = useState({
    // Medical vitals
    height: "",
    weight: "",
    bp: "",
    pulse: "",
    temperature: "",
    respiration: "",

    // Symptoms
    symptomsType: "",
    symptomsTitle: "",
    symptomsDescription: "",
    note: "",

    // Admission details
    admissionDate: "",
    case: "",
    casualty: "No",
    oldPatient: "No",
    tpa: "",
    creditLimit: "20000",
    reference: "",
    consultantDoctor: "",
    bedGroup: "",
    bedNumber: "",
    liveConsultation: "No",

    // New patient details (if creating new)
    name: "",
    guardianName: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
    bloodGroup: "",
    maritalStatus: "",
    address: "",
    allergies: "",
    nationalId: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Sample existing patients for dropdown
  const existingPatients = [
    { id: 1, name: "Neha Singh", age: 32, phone: "762726727" },
    { id: 2, name: "John Smith", age: 45, phone: "9876543210" },
    { id: 3, name: "Sarah Johnson", age: 32, phone: "8765432109" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePatientSelect = (patientName: string) => {
    setSelectedPatient(patientName);
    if (patientName) {
      const patient = existingPatients.find((p) => p.name === patientName);
      if (patient) {
        setFormData((prev) => ({
          ...prev,
          name: patient.name,
          age: patient.age.toString(),
          phone: patient.phone,
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, selectedPatient, isNewPatient });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Admit Patient to IPD</h2>
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
            {/* Patient Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Patient Selection */}
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select Patient or Add New
                  </Label>
                  <div className="flex space-x-4">
                    <select
                      value={selectedPatient}
                      onChange={(e) => handlePatientSelect(e.target.value)}
                      className="flex-1 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Existing Patient</option>
                      {existingPatients.map((patient) => (
                        <option key={patient.id} value={patient.name}>
                          {patient.name} ({patient.age})
                        </option>
                      ))}
                    </select>
                    <Button
                      type="button"
                      onClick={() => setIsNewPatient(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      + New Patient
                    </Button>
                  </div>
                </div>

                {/* Selected Patient Details */}
                {selectedPatient && !isNewPatient && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-4">
                      {selectedPatient}
                    </h3>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <User className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">NO IMAGE</p>
                          <p className="text-xs text-gray-500">AVAILABLE</p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">👤 Female</span>
                          </div>
                          <div>
                            <span className="text-gray-500">🩸 B+</span>
                          </div>
                          <div>
                            <span className="text-gray-500">💍 Married</span>
                          </div>
                          <div>
                            <span className="text-gray-500">
                              📅 30 Year 6 Month 21 Days
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">📞 762726727</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p>
                            <strong>Any Known Allergies:</strong>
                          </p>
                          <p>
                            <strong>Remarks:</strong>
                          </p>
                          <p>
                            <strong>TPA ID:</strong>
                          </p>
                          <p>
                            <strong>TPA Validity:</strong>
                          </p>
                          <p>
                            <strong>National Identification Number:</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* New Patient Form */}
                {isNewPatient && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">
                      New Patient Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Patient name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guardianName">Guardian Name</Label>
                        <Input
                          id="guardianName"
                          name="guardianName"
                          value={formData.guardianName}
                          onChange={handleChange}
                          placeholder="Guardian name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="Age"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <select
                          id="bloodGroup"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
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
                    </div>
                  </div>
                )}

                {/* Medical Vitals */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">
                    Medical Vitals
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="Height"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Weight"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bp">BP</Label>
                      <Input
                        id="bp"
                        name="bp"
                        value={formData.bp}
                        onChange={handleChange}
                        placeholder="Blood Pressure"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pulse">Pulse</Label>
                      <Input
                        id="pulse"
                        name="pulse"
                        value={formData.pulse}
                        onChange={handleChange}
                        placeholder="Pulse"
                      />
                    </div>
                    <div>
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input
                        id="temperature"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        placeholder="Temperature"
                      />
                    </div>
                    <div>
                      <Label htmlFor="respiration">Respiration</Label>
                      <Input
                        id="respiration"
                        name="respiration"
                        value={formData.respiration}
                        onChange={handleChange}
                        placeholder="Respiration"
                      />
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Symptoms</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="symptomsType">Symptoms Type</Label>
                        <select
                          id="symptomsType"
                          name="symptomsType"
                          value={formData.symptomsType}
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
                        <Label htmlFor="symptomsTitle">Symptoms Title</Label>
                        <Input
                          id="symptomsTitle"
                          name="symptomsTitle"
                          value={formData.symptomsTitle}
                          onChange={handleChange}
                          placeholder="Symptoms Title"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="symptomsDescription">
                        Symptoms Description
                      </Label>
                      <Textarea
                        id="symptomsDescription"
                        name="symptomsDescription"
                        value={formData.symptomsDescription}
                        onChange={handleChange}
                        placeholder="Detailed symptoms description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="note">Note</Label>
                      <Textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Additional notes"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Admission Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">
                    Admission Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="admissionDate">Admission Date *</Label>
                      <Input
                        id="admissionDate"
                        name="admissionDate"
                        type="date"
                        value={formData.admissionDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="case">Case</Label>
                      <Input
                        id="case"
                        name="case"
                        value={formData.case}
                        onChange={handleChange}
                        placeholder="Case"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="casualty">Casualty</Label>
                        <select
                          id="casualty"
                          name="casualty"
                          value={formData.casualty}
                          onChange={handleChange}
                          className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="oldPatient">Old Patient</Label>
                        <select
                          id="oldPatient"
                          name="oldPatient"
                          value={formData.oldPatient}
                          onChange={handleChange}
                          className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tpa">TPA</Label>
                        <select
                          id="tpa"
                          name="tpa"
                          value={formData.tpa}
                          onChange={handleChange}
                          className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="TPA1">TPA Option 1</option>
                          <option value="TPA2">TPA Option 2</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="creditLimit">
                          Credit Limit (Rs.) *
                        </Label>
                        <Input
                          id="creditLimit"
                          name="creditLimit"
                          value={formData.creditLimit}
                          onChange={handleChange}
                          placeholder="20000"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reference">Reference</Label>
                        <Input
                          id="reference"
                          name="reference"
                          value={formData.reference}
                          onChange={handleChange}
                          placeholder="Reference"
                        />
                      </div>
                      <div>
                        <Label htmlFor="consultantDoctor">
                          Consultant Doctor *
                        </Label>
                        <select
                          id="consultantDoctor"
                          name="consultantDoctor"
                          value={formData.consultantDoctor}
                          onChange={handleChange}
                          className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                          required
                        >
                          <option value="">Select</option>
                          <option value="TANWEER ALAM (DOC1)">
                            TANWEER ALAM (DOC1)
                          </option>
                          <option value="ANKIT SINGHANIA (DOC021)">
                            ANKIT SINGHANIA (DOC021)
                          </option>
                          <option value="ANKUR MISHRA (263726)">
                            ANKUR MISHRA (263726)
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bedGroup">Bed Group</Label>
                        <select
                          id="bedGroup"
                          name="bedGroup"
                          value={formData.bedGroup}
                          onChange={handleChange}
                          className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="General Ward">General Ward</option>
                          <option value="Private Ward">Private Ward</option>
                          <option value="VIP Ward">VIP Ward</option>
                          <option value="ICU">ICU</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="bedNumber">Bed Number *</Label>
                        <select
                          id="bedNumber"
                          name="bedNumber"
                          value={formData.bedNumber}
                          onChange={handleChange}
                          className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                          required
                        >
                          <option value="">Select</option>
                          <option value="101">101</option>
                          <option value="102">102</option>
                          <option value="103">103</option>
                          <option value="104">104</option>
                          <option value="110">110</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="liveConsultation">
                        Live Consultation
                      </Label>
                      <select
                        id="liveConsultation"
                        name="liveConsultation"
                        value={formData.liveConsultation}
                        onChange={handleChange}
                        className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
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
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save & Admit Patient
          </Button>
        </div>
      </div>
    </div>
  );
}
