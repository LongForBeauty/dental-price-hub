import { PROCEDURES, TARGET_CITIES_FULL } from '@/lib/procedures'

const TOP_PROCEDURES = ['dental-implant', 'porcelain-crown', 'root-canal-molar', 'teeth-cleaning-adult']
const TOP_CITIES = TARGET_CITIES_FULL.slice(0, 12)

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          How Much Does Dental Work Cost <span className="text-blue-700">Near You?</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Compare real dental prices by city. Stop overpaying — find out what
          implants, crowns, root canals, and cleanings actually cost in your area.
        </p>
      </div>

      {/* Procedure Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Procedure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOP_PROCEDURES.map(slug => {
            const proc = PROCEDURES[slug]
            return (
              <a
                key={slug}
                href={`/${slug}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-700 text-lg mb-1">
                      {proc.displayName}
                    </h3>
                    <p className="text-sm text-gray-500">{proc.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Avg. national</div>
                    <div className="text-xl font-bold text-blue-700">
                      ${proc.avgNational.toLocaleString()}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1 mt-3">
                  {proc.insuranceNote}
                </p>
              </a>
            )
          })}
        </div>
      </section>

      {/* City Links */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dental Implant Cost by City</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {TOP_CITIES.map(city => {
            const citySlug = city.city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            return (
              <a
                key={`${city.city}-${city.state}`}
                href={`/dental-implant/${citySlug}-${city.state.toLowerCase()}`}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm hover:border-blue-400 hover:text-blue-700 transition-colors"
              >
                {city.city}, {city.state}
              </a>
            )
          })}
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">How We Get Our Price Data</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our prices are based on the American Dental Association&apos;s annual fee survey,
          regional cost-of-living data, and direct practice research. Prices are updated
          regularly and represent the range you can expect to pay in each market.
        </p>
        <div className="flex justify-center gap-8 mt-6 text-sm text-gray-500">
          <div>📊 ADA Fee Survey Data</div>
          <div>🏙️ 50+ Cities Covered</div>
          <div>🔄 Updated 2025</div>
        </div>
      </section>
    </main>
  )
}
