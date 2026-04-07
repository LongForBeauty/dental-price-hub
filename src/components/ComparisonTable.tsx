import { formatPrice } from '@/lib/procedures'

interface Row {
  city: string
  state: string
  price_low: number
  price_avg: number
  price_high: number
}

interface Props {
  procedureName: string
  currentCity: string
  rows: Row[]
}

export default function ComparisonTable({ procedureName, currentCity, rows }: Props) {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {procedureName} Cost Comparison by City
      </h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">City</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Low</th>
              <th className="text-right px-4 py-3 font-semibold text-blue-700">Average</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">High</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.city}
                className={`border-b border-gray-100 ${
                  row.city === currentCity ? 'bg-blue-50 font-semibold' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-3 text-gray-800">
                  {row.city}, {row.state}
                  {row.city === currentCity && (
                    <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">You</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">{formatPrice(row.price_low)}</td>
                <td className="px-4 py-3 text-right text-blue-700 font-bold">{formatPrice(row.price_avg)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{formatPrice(row.price_high)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
