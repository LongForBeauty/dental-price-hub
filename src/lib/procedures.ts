// Procedure metadata - mirrors the DB but available at build time
// (avoids extra DB call during static generation)

export const PROCEDURES: Record<string, {
  cdtCode: string
  displayName: string
  slug: string
  category: string
  avgNational: number
  insuranceNote: string
  seoKeywords: string[]
}> = {
  'dental-implant': {
    cdtCode: 'D6010',
    displayName: 'Dental Implant',
    slug: 'dental-implant',
    category: 'Implants',
    avgNational: 2050,
    insuranceNote: 'Usually NOT covered by insurance. Some premium plans cover 50%.',
    seoKeywords: ['dental implant cost', 'how much does a dental implant cost', 'dental implant price'],
  },
  'porcelain-crown': {
    cdtCode: 'D2740',
    displayName: 'Dental Crown',
    slug: 'porcelain-crown',
    category: 'Restorative',
    avgNational: 1275,
    insuranceNote: 'Usually covered 50% after deductible. Expect $600–$900 out-of-pocket.',
    seoKeywords: ['dental crown cost', 'how much does a crown cost', 'tooth crown price'],
  },
  'root-canal-molar': {
    cdtCode: 'D3330',
    displayName: 'Root Canal (Molar)',
    slug: 'root-canal-molar',
    category: 'Endodontic',
    avgNational: 1285,
    insuranceNote: 'Typically covered 50–80%. Most plans cover after deductible.',
    seoKeywords: ['root canal cost', 'how much does a root canal cost', 'molar root canal price'],
  },
  'teeth-cleaning-adult': {
    cdtCode: 'D1110',
    displayName: 'Teeth Cleaning',
    slug: 'teeth-cleaning-adult',
    category: 'Preventive',
    avgNational: 98,
    insuranceNote: 'Usually covered 100%, twice per year, with no deductible.',
    seoKeywords: ['teeth cleaning cost', 'dental cleaning price', 'how much is teeth cleaning without insurance'],
  },
  'wisdom-tooth-removal': {
    cdtCode: 'D7240',
    displayName: 'Wisdom Tooth Removal',
    slug: 'wisdom-tooth-removal',
    category: 'Oral Surgery',
    avgNational: 395,
    insuranceNote: 'Usually covered 50–80%. Full set extraction often $1,000–$3,000 total.',
    seoKeywords: ['wisdom tooth removal cost', 'wisdom teeth extraction price', 'how much to remove wisdom teeth'],
  },
  'adult-braces-orthodontics': {
    cdtCode: 'D8080',
    displayName: 'Adult Braces / Orthodontics',
    slug: 'adult-braces-orthodontics',
    category: 'Orthodontics',
    avgNational: 5850,
    insuranceNote: 'Limited adult coverage. Some plans cover up to $1,500 lifetime.',
    seoKeywords: ['braces cost for adults', 'orthodontics price', 'how much do braces cost'],
  },
}

export const TARGET_CITIES_FULL = [
  { city: 'New York',      state: 'NY', stateSlug: 'new-york' },
  { city: 'Los Angeles',   state: 'CA', stateSlug: 'california' },
  { city: 'Chicago',       state: 'IL', stateSlug: 'illinois' },
  { city: 'Houston',       state: 'TX', stateSlug: 'texas' },
  { city: 'Phoenix',       state: 'AZ', stateSlug: 'arizona' },
  { city: 'Philadelphia',  state: 'PA', stateSlug: 'pennsylvania' },
  { city: 'San Antonio',   state: 'TX', stateSlug: 'texas' },
  { city: 'San Diego',     state: 'CA', stateSlug: 'california' },
  { city: 'Dallas',        state: 'TX', stateSlug: 'texas' },
  { city: 'Austin',        state: 'TX', stateSlug: 'texas' },
  { city: 'Seattle',       state: 'WA', stateSlug: 'washington' },
  { city: 'Denver',        state: 'CO', stateSlug: 'colorado' },
  { city: 'Boston',        state: 'MA', stateSlug: 'massachusetts' },
  { city: 'Atlanta',       state: 'GA', stateSlug: 'georgia' },
  { city: 'Miami',         state: 'FL', stateSlug: 'florida' },
  { city: 'Nashville',     state: 'TN', stateSlug: 'tennessee' },
  { city: 'Portland',      state: 'OR', stateSlug: 'oregon' },
  { city: 'Las Vegas',     state: 'NV', stateSlug: 'nevada' },
  { city: 'Minneapolis',   state: 'MN', stateSlug: 'minnesota' },
  { city: 'San Francisco', state: 'CA', stateSlug: 'california' },
]

export function buildSlug(procedure: string, city: string, state: string): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `${procedure}-cost-${citySlug}-${state.toLowerCase()}`
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}
