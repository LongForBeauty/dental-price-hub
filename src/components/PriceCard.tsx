'use client'
import { formatPrice } from '@/lib/procedures'

interface Props {
  procedureName: string
  city: string
  state: string
  priceLow: number
  priceAvg: number
  priceHigh: number
  insuranceNote: string
}

export default function PriceCard({
  procedureName, city, priceLow, priceAvg, priceHigh, insuranceNote
}: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-white font-semibold text-lg">
          {procedureName} Cost in {city}
        </h2>
        <p className="text-blue-100 text-sm">Based on ADA regional fee data · Updated 2025</p>
      </div>

      {/* Price Range */}
      <div className="px-6 py-6">
        <div className="flex items-end gap-6 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Low</div>
            <div className="text-2xl font-bold text-gray-700">{formatPrice(priceLow)}</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-sm text-blue-600 font-medium mb-1">Average</div>
            <div className="text-4xl font-extrabold text-blue-700">{formatPrice(priceAvg)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">High</div>
            <div className="text-2xl font-bold text-gray-700">{formatPrice(priceHigh)}</div>
          </div>
        </div>

        {/* Visual bar */}
        <div className="relative h-3 bg-gray-100 rounded-full mb-6">
          <div className="absolute inset-y-0 left-[15%] right-[15%] bg-blue-200 rounded-full" />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow"
            style={{ left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
          />
        </div>

        {/* Insurance note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800">
            <strong>Insurance:</strong> {insuranceNote}
          </p>
        </div>
      </div>
    </div>
  )
}
