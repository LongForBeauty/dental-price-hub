import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Public client - for frontend reads
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client - for API routes (server-side only, never expose to frontend)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// ── Types ────────────────────────────────────────────────────────────────────

export interface PriceRow {
  id: number
  city: string
  state: string
  city_tier: string
  cdt_code: string
  procedure_name: string
  price_low: number
  price_avg: number
  price_high: number
  confidence: string
  source: string
  multiplier: number
  updated_at: string
}

export interface Procedure {
  id: number
  cdt_code: string
  display_name: string
  slug: string
  category: string
  avg_national: number
  insurance_note: string
}

export interface Lead {
  first_name: string
  last_name: string
  email: string
  phone: string
  zip_code: string
  city: string
  state: string
  procedure_slug: string
  insurance: string
  notes?: string
}

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getPriceForCityProcedure(
  city: string,
  state: string,
  cdtCode: string
): Promise<PriceRow | null> {
  const { data, error } = await supabase
    .from('prices')
    .select('*')
    .ilike('city', city)
    .eq('state', state.toUpperCase())
    .eq('cdt_code', cdtCode)
    .single()

  if (error) return null
  return data
}

export async function getCityPrices(city: string, state: string): Promise<PriceRow[]> {
  const { data, error } = await supabase
    .from('prices')
    .select('*')
    .ilike('city', city)
    .eq('state', state.toUpperCase())
    .order('cdt_code')

  if (error) return []
  return data || []
}

export async function getAllProcedures(): Promise<Procedure[]> {
  const { data } = await supabase
    .from('procedures')
    .select('*')
    .order('category')
  return data || []
}

export async function submitLead(lead: Lead): Promise<{ success: boolean; id?: number }> {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert([{
      ...lead,
      status: 'new',
      lead_value: calculateLeadValue(lead.procedure_slug, lead.insurance),
    }])
    .select('id')
    .single()

  if (error) return { success: false }
  return { success: true, id: data?.id }
}

function calculateLeadValue(procedureSlug: string, insurance: string): number {
  const highValue = ['dental-implant', 'implant-crown', 'adult-braces-orthodontics',
                     'root-canal-molar', 'root-canal-anterior', 'porcelain-crown']
  const midValue  = ['surgical-tooth-extraction', 'wisdom-tooth-removal', 'upper-denture',
                     'lower-denture', 'deep-cleaning-scaling']

  if (highValue.includes(procedureSlug)) return insurance === 'none' ? 150 : 100
  if (midValue.includes(procedureSlug))  return insurance === 'none' ? 75  : 50
  return 25
}
