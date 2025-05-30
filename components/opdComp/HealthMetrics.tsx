import { Activity, Droplets, Heart, Thermometer } from "lucide-react"

const metrics = [
  {
    icon: Heart,
    label: "Heart Rate",
    value: "102",
    unit: "bpm",
    status: "normal",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Thermometer,
    label: "Temperature",
    value: "36.6",
    unit: "°C",
    status: "normal",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Activity,
    label: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Droplets,
    label: "Glucose",
    value: "90",
    unit: "mg/dL",
    status: "normal",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
]

export default function HealthMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{metric.status}</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              {metric.value}
              <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
            </p>
            <p className="text-sm text-gray-600">{metric.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
