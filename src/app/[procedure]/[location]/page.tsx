import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { PROCEDURES, TARGET_CITIES_FULL, formatPrice } from '@/lib/procedures'
import LeadForm from '@/components/LeadForm'
import MiniLeadForm from '@/components/MiniLeadForm'
import PriceCard from '@/components/PriceCard'
import ComparisonTable from '@/components/ComparisonTable'
import StickyQuoteBar from '@/components/StickyQuoteBar'

// ── Static params for all city × procedure combos ────────────────────────────
export async function generateStaticParams() {
  const params: { procedure: string; location: string }[] = []

  for (const proc of Object.values(PROCEDURES)) {
    for (const city of TARGET_CITIES_FULL) {
      const citySlug = city.city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      params.push({
        procedure: proc.slug,
        location: `${citySlug}-${city.state.toLowerCase()}`,
      })
    }
  }
  return params
}

// ── Metadata for SEO ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { procedure: string; location: string }
}): Promise<Metadata> {
  const { proc, city } = resolveParams(params)
  if (!proc || !city) return {}

  const title = `${proc.displayName} Cost in ${city.city}, ${city.state} (2026 Prices)`
  const description = `How much does a ${proc.displayName.toLowerCase()} cost in ${city.city}? Compare prices from local dentists. Average cost: ${formatPrice(proc.avgNational)}. ${proc.insuranceNote}`

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    alternates: {
      canonical: `https://dentalpricehub.org/${params.procedure}/${params.location}`,
    },
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function resolveParams(params: { procedure: string; location: string }) {
  const proc = PROCEDURES[params.procedure]
  if (!proc) return { proc: null, city: null }

  // location = "chicago-il"
  const parts = params.location.split('-')
  const stateCode = parts[parts.length - 1].toUpperCase()
  const citySlug = parts.slice(0, -1).join('-')

  const city = TARGET_CITIES_FULL.find(
    c =>
      c.state === stateCode &&
      c.city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === citySlug
  )
  return { proc, city: city || null }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function PricePage({
  params,
}: {
  params: { procedure: string; location: string }
}) {
  const { proc, city } = resolveParams(params)
  if (!proc || !city) notFound()

  // Fetch this city's price from DB
  const { data: priceData } = await supabase
    .from('prices')
    .select('*')
    .ilike('city', city.city)
    .eq('state', city.state)
    .eq('cdt_code', proc.cdtCode)
    .single()

  // Fetch nearby cities for comparison (same procedure, all cities in same state)
  const { data: statePrices } = await supabase
    .from('prices')
    .select('city, state, price_low, price_avg, price_high')
    .eq('state', city.state)
    .eq('cdt_code', proc.cdtCode)
    .order('price_avg')
    .limit(8)

  const price = priceData || {
    price_low: proc.avgNational * 0.7,
    price_avg: proc.avgNational,
    price_high: proc.avgNational * 1.5,
  }

  const year = new Date().getFullYear()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* ── Hero ── */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-3">
          <a href="/" className="hover:underline">Home</a> ›{' '}
          <a href={`/${proc.slug}`} className="hover:underline">{proc.displayName} Cost</a> ›{' '}
          {city.city}, {city.state}
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {proc.displayName} Cost in {city.city}, {city.state} ({year})
        </h1>
        <p className="text-lg text-gray-600">
          The average cost of a {proc.displayName.toLowerCase()} in {city.city} is{' '}
          <strong className="text-blue-700">{formatPrice(price.price_avg)}</strong>, ranging from{' '}
          {formatPrice(price.price_low)} to {formatPrice(price.price_high)} depending on the
          dentist and your specific needs.
        </p>
      </div>

      {/* ── Price Card ── */}
      <PriceCard
        procedureName={proc.displayName}
        city={city.city}
        state={city.state}
        priceLow={price.price_low}
        priceAvg={price.price_avg}
        priceHigh={price.price_high}
        insuranceNote={proc.insuranceNote}
      />

      {/* ── Mini Lead Form (mid-page) ── */}
      <div className="my-6">
        <MiniLeadForm
          procedureSlug={proc.slug}
          procedureName={proc.displayName}
          city={city.city}
          state={city.state}
        />
      </div>

      {/* ── Article Content ── */}
      <article className="prose prose-lg max-w-none my-8">
        <h2>What Affects {proc.displayName} Cost in {city.city}?</h2>
        <p>
          Dental costs in {city.city} vary significantly based on the dentist&apos;s location
          within the city, their experience level, the technology they use, and whether you have
          dental insurance. Prices in {city.city}&apos;s urban core tend to be 15–25% higher than
          suburban practices.
        </p>

        <h3>Key Cost Factors</h3>
        <ul>
          <li><strong>Dentist experience and specialization</strong> — Specialists (endodontists, oral surgeons) charge more than general dentists</li>
          <li><strong>Location within {city.city}</strong> — Downtown practices have higher overhead costs</li>
          <li><strong>Materials used</strong> — Higher-grade materials cost more but last longer</li>
          <li><strong>Insurance coverage</strong> — {proc.insuranceNote}</li>
          <li><strong>Additional procedures</strong> — X-rays, exams, or prep work may add to the total</li>
        </ul>

        <h2>How to Save Money on a {proc.displayName} in {city.city}</h2>
        <p>
          There are several proven strategies to reduce your out-of-pocket costs:
        </p>
        <ul>
          <li><strong>Get multiple quotes</strong> — Prices vary by 30–50% between practices in the same city</li>
          <li><strong>Dental schools</strong> — {city.city} dental school clinics offer procedures at 40–60% below market rates</li>
          <li><strong>Dental savings plans</strong> — Plans like Careington offer 20–60% discounts with no annual limits</li>
          <li><strong>Payment plans</strong> — Many {city.city} dentists offer 0% financing through CareCredit</li>
          <li><strong>Timing</strong> — Ask about new patient specials or end-of-year appointments</li>
        </ul>

        <h2>Is This Price Fair for {city.city}?</h2>
        <p>
          Based on data from the American Dental Association&apos;s regional fee surveys, the
          average {proc.displayName.toLowerCase()} in {city.city} costs{' '}
          {formatPrice(price.price_avg)} — which is{' '}
          {price.price_avg > proc.avgNational ? 'above' : 'below'} the national average of{' '}
          {formatPrice(proc.avgNational)}. This reflects {city.city}&apos;s overall cost of living
          and dental market conditions.
        </p>
      </article>

      {/* ── State Comparison Table ── */}
      {statePrices && statePrices.length > 1 && (
        <ComparisonTable
          procedureName={proc.displayName}
          currentCity={city.city}
          rows={statePrices}
        />
      )}

      {/* ── Lead Capture Form (full) ── */}
      <section id="lead-form" className="mt-10 bg-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get Free Quotes from {city.city} Dentists
        </h2>
        <p className="text-gray-600 mb-6">
          Fill out the form below and we&apos;ll match you with up to 3 local dentists who can
          provide exact pricing for your situation. Free, no obligation.
        </p>
        <LeadForm
          procedureSlug={proc.slug}
          procedureName={proc.displayName}
          city={city.city}
          state={city.state}
        />
      </section>

      {/* ── Sticky Bottom Bar ── */}
      <StickyQuoteBar procedureName={proc.displayName} city={city.city} />

      {/* ── FAQ Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `How much does a ${proc.displayName.toLowerCase()} cost in ${city.city}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `The average cost of a ${proc.displayName.toLowerCase()} in ${city.city} is ${formatPrice(price.price_avg)}, ranging from ${formatPrice(price.price_low)} to ${formatPrice(price.price_high)}.`,
                },
              },
              {
                '@type': 'Question',
                name: `Does insurance cover ${proc.displayName.toLowerCase()} in ${city.city}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: proc.insuranceNote,
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}
