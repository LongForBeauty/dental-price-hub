import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROCEDURES, TARGET_CITIES_FULL, formatPrice } from '@/lib/procedures'

export async function generateStaticParams() {
  return Object.values(PROCEDURES).map(p => ({ procedure: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { procedure: string }
}): Promise<Metadata> {
  const proc = PROCEDURES[params.procedure]
  if (!proc) return {}
  return {
    title: `${proc.displayName} Cost by City (2026) – Compare Prices`,
    description: `Compare ${proc.displayName.toLowerCase()} costs across 20+ US cities. National average: ${formatPrice(proc.avgNational)}. Find the most affordable options near you.`,
  }
}

export default function ProcedureIndexPage({
  params,
}: {
  params: { procedure: string }
}) {
  const proc = PROCEDURES[params.procedure]
  if (!proc) notFound()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        {proc.displayName} Cost by City (2026)
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The national average cost of a {proc.displayName.toLowerCase()} is{' '}
        <strong className="text-blue-700">{formatPrice(proc.avgNational)}</strong>.
        Prices vary significantly by city — select yours to see local rates and get free quotes.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-amber-800">
          <strong>Insurance:</strong> {proc.insuranceNote}
        </p>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your City</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TARGET_CITIES_FULL.map(city => {
          const citySlug = city.city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          const href = `/${proc.slug}/${citySlug}-${city.state.toLowerCase()}`
          return (
            <a
              key={`${city.city}-${city.state}`}
              href={href}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-blue-400 hover:shadow-sm transition-all group"
            >
              <span className="font-medium text-gray-800 group-hover:text-blue-700">
                {city.city}, {city.state}
              </span>
              <span className="text-sm text-blue-600 font-semibold">
                See prices →
              </span>
            </a>
          )
        })}
      </div>
    </main>
  )
}
