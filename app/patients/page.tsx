import PageHeader from "@/components/layout/page-header"
import ContentWrapper from "@/components/layout/content-wrapper"
import PatientManagement from "@/components/patient-management/patient-management"
import { Button } from "@/components/ui/button"
import { Plus, Download, Filter } from "lucide-react"

export default function PatientsPage() {
  return (
    <>
      <PageHeader
        title="OPD - Patient Management"
        description="Manage outpatient department patients and their records"
        actions={
          <>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Patient</span>
            </Button>
          </>
        }
      />

      <ContentWrapper>
        <PatientManagement />
      </ContentWrapper>
    </>
  )
}
