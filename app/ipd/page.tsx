"use client";

import PageHeader from "@/components/layout/page-header";
import ContentWrapper from "@/components/layout/content-wrapper";
import IpdManagement from "@/components/ipd/ipd-managment"; // Update the import path
import { Button } from "@/components/ui/button";
import { Plus, UserMinus, Building2, BarChart3 } from "lucide-react";

export default function IpdPage() {
  return (
    <>
      <PageHeader
        title="IPD - Inpatient Department"
        description="Manage admitted patients, bed allocation, and inpatient care"
        actions={
          <>
            <Button variant="outline" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Bed Status</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Reports</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <UserMinus className="w-4 h-4" />
              <span>Discharged</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Admit Patient</span>
            </Button>
          </>
        }
      />

      <ContentWrapper>
        <IpdManagement />
      </ContentWrapper>
    </>
  );
}