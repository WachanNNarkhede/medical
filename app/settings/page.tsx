import PageHeader from "@/components/layout/page-header"
import ContentWrapper from "@/components/layout/content-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, User, Building, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your application settings and preferences"
        actions={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </Button>
        }
      />

      <ContentWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <nav className="space-y-2">
                <a
                  href="#profile"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Profile</span>
                </a>
                <a
                  href="#hospital"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Building className="w-4 h-4" />
                  <span className="text-sm font-medium">Hospital Info</span>
                </a>
                <a
                  href="#notifications"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">Notifications</span>
                </a>
                <a
                  href="#security"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Security</span>
                </a>
                <a
                  href="#appearance"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Palette className="w-4 h-4" />
                  <span className="text-sm font-medium">Appearance</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="space-y-8">
                {/* Profile Settings */}
                <div id="profile">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Emma" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Shelton" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="emma.shelton@medicare.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input id="specialization" defaultValue="Cardiologist" />
                    </div>
                    <div>
                      <Label htmlFor="license">License Number</Label>
                      <Input id="license" defaultValue="MD-12345" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      defaultValue="Experienced cardiologist with over 10 years of practice in cardiovascular medicine."
                    />
                  </div>
                </div>

                {/* Hospital Information */}
                <div id="hospital" className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input id="hospitalName" defaultValue="MediCare General Hospital" />
                    </div>
                    <div>
                      <Label htmlFor="hospitalCode">Hospital Code</Label>
                      <Input id="hospitalCode" defaultValue="MCH-001" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="hospitalAddress">Address</Label>
                      <Textarea
                        id="hospitalAddress"
                        rows={3}
                        defaultValue="123 Healthcare Avenue, Medical District, City, State 12345"
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div id="notifications" className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                      </div>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Critical Alerts</p>
                        <p className="text-sm text-gray-500">Immediate alerts for critical patients</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}
// This code defines a settings page for a healthcare application, allowing users to manage their profile, hospital information, and notification preferences. It includes a navigation sidebar and a content area with forms for updating settings.
// The page is structured with a header, content wrapper, and a grid layout for settings navigation and content. It uses components like `PageHeader`, `ContentWrapper`, `Button`, `Input`, `Label`, and `Textarea` to create a user-friendly interface.