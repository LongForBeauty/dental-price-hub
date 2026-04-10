import { Metadata } from 'next'
import { PROCEDURES } from '@/lib/procedures'

export const metadata: Metadata = {
  title: 'Dental Cost Guide 2026 – Compare Prices by City | DentalPriceHub',
  description:
    'Compare dental procedure costs in 50+ US cities. Find the average cost of implants, crowns, root canals, braces, and more. Free dental price quotes near you.',
  alternates: { canonical: 'https://dentalpricehub.org' },
}

// Cities grouped by US region — better UX + geographic SEO semantics
const CITIES_BY_REGION = [
  {
    region: 'Northeast',
    cities: [
      { city: 'New York',     state: 'NY' },
      { city: 'Boston',       state: 'MA' },
      { city: 'Philadelphia', state: 'PA' },
      { city: 'Baltimore',    state: 'MD' },
    ],
  },
  {
    region: 'Southeast',
    cities: [
      { city: 'Miami',          state: 'FL' },
      { city: 'Atlanta',        state: 'GA' },
      { city: 'Tampa',          state: 'FL' },
      { city: 'Orlando',        state: 'FL' },
      { city: 'Jacksonville',   state: 'FL' },
      { city: 'Charlotte',      state: 'NC' },
      { city: 'Raleigh',        state: 'NC' },
      { city: 'Nashville',      state: 'TN' },
      { city: 'Memphis',        state: 'TN' },
      { city: 'New Orleans',    state: 'LA' },
      { city: 'Virginia Beach', state: 'VA' },
      { city: 'Richmond',       state: 'VA' },
    ],
  },
  {
    region: 'Midwest',
    cities: [
      { city: 'Chicago',      state: 'IL' },
      { city: 'Minneapolis',  state: 'MN' },
      { city: 'Columbus',     state: 'OH' },
      { city: 'Cleveland',    state: 'OH' },
      { city: 'Indianapolis', state: 'IN' },
      { city: 'Milwaukee',    state: 'WI' },
      { city: 'Kansas City',  state: 'MO' },
      { city: 'Omaha',        state: 'NE' },
      { city: 'Wichita',      state: 'KS' },
      { city: 'Louisville',   state: 'KY' },
    ],
  },
  {
    region: 'South & Southwest',
    cities: [
      { city: 'Houston',     state: 'TX' },
      { city: 'Dallas',      state: 'TX' },
      { city: 'Austin',      state: 'TX' },
      { city: 'San Antonio', state: 'TX' },
      { city: 'Fort Worth',  state: 'TX' },
      { city: 'Arlington',   state: 'TX' },
      { city: 'Phoenix',     state: 'AZ' },
      { city: 'Tucson',      state: 'AZ' },
      { city: 'Albuquerque', state: 'NM' },
    ],
  },
  {
    region: 'West',
    cities: [
      { city: 'Los Angeles',     state: 'CA' },
      { city: 'San Francisco',   state: 'CA' },
      { city: 'San Diego',       state: 'CA' },
      { city: 'San Jose',        state: 'CA' },
      { city: 'Sacramento',      state: 'CA' },
      { city: 'Oakland',         state: 'CA' },
      { city: 'Long Beach',      state: 'CA' },
      { city: 'Anaheim',         state: 'CA' },
      { city: 'Fresno',          state: 'CA' },
      { city: 'Bakersfield',     state: 'CA' },
      { city: 'Seattle',         state: 'WA' },
      { city: 'Portland',        state: 'OR' },
      { city: 'Las Vegas',       state: 'NV' },
      { city: 'Denver',          state: 'CO' },
      { city: 'Colorado Springs',state: 'CO' },
    ],
  },
]

const ALL_PROCEDURES = Object.values(PROCEDURES)

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Schema: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DentalPriceHub',
            url: 'https://dentalpricehub.org',
            description:
              'Compare dental procedure costs across 20+ US cities. Free price comparison tool for implants, crowns, root canals, and more.',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'hello@dentalpricehub.com',
              contactType: 'customer support',
            },
          }),
        }}
      />

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          How Much Does Dental Work Cost{' '}
          <span className="text-blue-700">Near You?</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Compare real dental prices by city. Stop overpaying — find out what
          implants, crowns, root canals, cleanings, and braces actually cost in
          your area.
        </p>
        <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
          <span>✅ 20+ cities covered</span>
          <span>✅ 6 procedures</span>
          <span>✅ Free quotes</span>
        </div>
      </div>

      {/* All Procedures */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Browse Dental Costs by Procedure
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Click any procedure to compare prices across 20 US cities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_PROCEDURES.map(proc => (
            <a
              key={proc.slug}
              href={`/${proc.slug}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 text-lg mb-1">
                    {proc.displayName} Cost
                  </h3>
                  <p className="text-sm text-gray-500">{proc.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">National avg</div>
                  <div className="text-xl font-bold text-blue-700">
                    ${proc.avgNational.toLocaleString()}
                  </div>
                </div>
              </div>
              <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1 mt-3">
                {proc.insuranceNote}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* City Links — grouped by region */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dental Implant Cost by City
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Implant costs vary by 30–50% between cities. Select your city to see local pricing and get free quotes.
        </p>
        {CITIES_BY_REGION.map(({ region, cities }) => (
          <div key={region} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">
              {region}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {cities.map(city => {
                const citySlug = city.city
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '')
                return (
                  <a
                    key={`${city.city}-${city.state}`}
                    href={`/dental-implant/${citySlug}-${city.state.toLowerCase()}`}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm hover:border-blue-400 hover:text-blue-700 transition-colors text-center font-medium"
                  >
                    {city.city}, {city.state}
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Trust signals */}
      <section className="bg-blue-50 rounded-2xl p-8 text-center mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          How We Get Our Price Data
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our prices are based on the American Dental Association&apos;s annual fee survey,
          regional cost-of-living data, and direct practice research. Prices are updated
          regularly and represent the range you can expect to pay in each market.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500">
          <div>📊 ADA Fee Survey Data</div>
          <div>🏙️ 20 Cities Covered</div>
          <div>🔄 Updated 2026</div>
          <div>💰 Free Quotes</div>
        </div>
      </section>

      {/* FAQ Schema for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How much does a dental implant cost in the US?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The national average cost of a dental implant is $2,050, ranging from $1,200 to $3,500 depending on the city, dentist, and materials used.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does dental insurance cover implants?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most standard dental insurance does not cover implants. Some premium plans may cover 50% of the cost. Dental savings plans like Careington offer 20–40% discounts.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does a dental crown cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A dental crown costs $800–$1,700 on average, with a national average of $1,275. Most insurance plans cover 50% after a deductible.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why do dental prices vary by city?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dental prices vary based on local cost of living, real estate costs for dental practices, competition among dentists, and regional insurance reimbursement rates.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}
