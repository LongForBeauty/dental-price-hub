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

  const keywords = proc.seoKeywords.join(', ')

  return {
    title: `${proc.displayName} Cost by City (2026) – Compare Prices`,
    description: `How much does a ${proc.displayName.toLowerCase()} cost? National average: ${formatPrice(proc.avgNational)}. Compare prices across 20 US cities and get free quotes near you.`,
    keywords: proc.seoKeywords,
    alternates: {
      canonical: `https://dentalpricehub.org/${proc.slug}`,
    },
    openGraph: {
      title: `${proc.displayName} Cost by City (2026)`,
      description: `Compare ${proc.displayName.toLowerCase()} costs across 20+ US cities. National average: ${formatPrice(proc.avgNational)}. Free quotes.`,
      type: 'website',
    },
  }
}

export default function ProcedureIndexPage({
  params,
}: {
  params: { procedure: string }
}) {
  const proc = PROCEDURES[params.procedure]
  if (!proc) notFound()

  const otherProcs = Object.values(PROCEDURES).filter(p => p.slug !== proc.slug)

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dentalpricehub.org' },
              { '@type': 'ListItem', position: 2, name: `${proc.displayName} Cost`, item: `https://dentalpricehub.org/${proc.slug}` },
            ],
          }),
        }}
      />

      <nav className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:underline">Home</a> › {proc.displayName} Cost by City
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        {proc.displayName} Cost by City (2026)
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        The national average cost of a {proc.displayName.toLowerCase()} is{' '}
        <strong className="text-blue-700">{formatPrice(proc.avgNational)}</strong>.
        Prices vary significantly by city — select yours to see local rates and get free quotes.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-amber-800">
          <strong>Insurance:</strong> {proc.insuranceNote}
        </p>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Select Your City
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
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

      {/* What affects cost */}
      <section className="prose prose-lg max-w-none mb-10">
        <h2>What Affects {proc.displayName} Cost?</h2>
        <p>
          The cost of a {proc.displayName.toLowerCase()} varies widely based on where you live,
          your dentist's experience and specialization, and whether you have dental insurance.
          Cities with higher costs of living — like New York, San Francisco, and Boston — tend
          to have dental prices 25–40% above the national average, while cities like Houston,
          Phoenix, and Las Vegas often come in below average.
        </p>
        <p>
          The best way to ensure you&apos;re paying a fair price is to get quotes from multiple
          dentists in your city. Prices for the same procedure can vary by 30–50% within the
          same zip code.
        </p>
      </section>

      {/* Other Procedures */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Compare Other Procedures</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {otherProcs.map(p => (
            <a
              key={p.slug}
              href={`/${p.slug}`}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm hover:border-blue-400 hover:text-blue-700 transition-colors"
            >
              <div className="font-medium">{p.displayName}</div>
              <div className="text-gray-500 text-xs">avg {formatPrice(p.avgNational)}</div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
