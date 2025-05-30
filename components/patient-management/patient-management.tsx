"use client"

import { useState } from "react"
import PatientSearch from "./patient-search"
import AddPatientModal from "./add-patient-modal"

export default function PatientManagement() {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false)

  const handleAddNewPatient = () => {
    setIsAddPatientModalOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSavePatient = (patientData: any) => {
    console.log("Saving patient data:", patientData)
    // Here you would typically save the patient data to your backend
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PatientSearch onAddNewClick={handleAddNewPatient} />

      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSave={handleSavePatient}
      />
    </div>
  )
}
// This component serves as the main entry point for patient management,