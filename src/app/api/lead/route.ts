import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Admin client initialized server-side only
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const HIGH_VALUE = ['dental-implant', 'implant-crown', 'adult-braces-orthodontics',
                    'root-canal-molar', 'root-canal-anterior', 'porcelain-crown']
const MID_VALUE  = ['surgical-tooth-extraction', 'wisdom-tooth-removal', 'upper-denture',
                    'lower-denture', 'deep-cleaning-scaling']

function getLeadValue(procedureSlug: string, insurance: string): number {
  if (HIGH_VALUE.includes(procedureSlug)) return insurance === 'none' ? 150 : 100
  if (MID_VALUE.includes(procedureSlug))  return insurance === 'none' ? 75  : 50
  return 25
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      first_name, last_name, email, phone,
      zip_code, city, state,
      procedure_slug, insurance, notes
    } = body

    // Basic validation
    if (!email || !first_name || !zip_code || !procedure_slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const lead_value = getLeadValue(procedure_slug, insurance)

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([{
        first_name,
        last_name,
        email,
        phone,
        zip_code,
        city,
        state,
        procedure_slug,
        insurance,
        notes,
        status: 'new',
        lead_value,
      }])
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Notify you via email (simple fetch to email service)
    // In production, replace with SendGrid/Resend API call
    console.log(`🦷 NEW LEAD: ${first_name} ${last_name} | ${procedure_slug} | ${city}, ${state} | Value: $${lead_value} | ID: ${data?.id}`)

    return NextResponse.json({
      success: true,
      lead_id: data?.id,
      message: 'Lead submitted successfully'
    })

  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
