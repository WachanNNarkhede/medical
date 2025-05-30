import PageHeader from "@/components/layout/page-header"
import ContentWrapper from "@/components/layout/content-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Download, AlertTriangle, Package } from "lucide-react"

const medicines = [
  { id: 1, name: "Paracetamol 500mg", category: "Tablet", stock: 150, minStock: 50, price: 2.5, status: "In Stock" },
  { id: 2, name: "Amoxicillin 250mg", category: "Capsule", stock: 25, minStock: 30, price: 5.0, status: "Low Stock" },
  { id: 3, name: "Ibuprofen 400mg", category: "Tablet", stock: 200, minStock: 100, price: 3.75, status: "In Stock" },
  { id: 4, name: "Cough Syrup", category: "Syrup", stock: 5, minStock: 20, price: 8.5, status: "Critical" },
]

export default function PharmacyPage() {
  return (
    <>
      <PageHeader
        title="Pharmacy - Medicine Inventory"
        description="Manage medicine stock, pricing, and inventory levels"
        actions={
          <>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Medicine</span>
            </Button>
          </>
        }
      />

      <ContentWrapper>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Medicines</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-yellow-600">23</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">₹2,45,670</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Medicine Inventory Table */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Medicine Inventory</h2>
            </div>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input type="text" placeholder="Search medicines..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Medicine Name</TableHead>
                  <TableHead className="font-semibold text-gray-900">Category</TableHead>
                  <TableHead className="font-semibold text-gray-900">Current Stock</TableHead>
                  <TableHead className="font-semibold text-gray-900">Min Stock</TableHead>
                  <TableHead className="font-semibold text-gray-900">Price (₹)</TableHead>
                  <TableHead className="font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.map((medicine) => (
                  <TableRow key={medicine.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{medicine.name}</TableCell>
                    <TableCell>{medicine.category}</TableCell>
                    <TableCell>{medicine.stock}</TableCell>
                    <TableCell>{medicine.minStock}</TableCell>
                    <TableCell>₹{medicine.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                          medicine.status === "In Stock"
                            ? "badge-green"
                            : medicine.status === "Low Stock"
                              ? "badge-yellow"
                              : "badge-red"
                        }`}
                      >
                        {medicine.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Restock
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}
