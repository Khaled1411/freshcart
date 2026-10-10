import { Headset, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import React from 'react'

const features = [
  { icon: Truck, title: 'Free Shipping', text: 'On orders over 500 EGP', color: 'bg-blue-100 text-blue-600' },
  { icon: ShieldCheck, title: 'Secure Payment', text: '100% secure transactions', color: 'bg-green-100 text-green-600' },
  { icon: RotateCcw, title: 'Easy Returns', text: '14-day return policy', color: 'bg-orange-100 text-orange-600' },
  { icon: Headset, title: '24/7 Support', text: 'Dedicated support team', color: 'bg-purple-100 text-purple-600' },
]

export default function FeaturesStrip() {
  return (
    <div className="container mx-auto xl:max-w-7xl px-4 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map(({ icon: Icon, title, text, color }) => (
        <div
          key={title}
          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
        >
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${color}`}>
            <Icon className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-800">{title}</p>
            <p className="text-xs text-gray-500">{text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
