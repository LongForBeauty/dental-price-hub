import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const HIGH_VALUE = ['dental-implant', 'adult-braces-orthodontics', 'root-canal-molar', 'porcelain-crown']
const MID_VALUE  = ['wisdom-tooth-removal', 'deep-cleaning-scaling']

function getLeadValue(procedureSlug: string, insurance: string): number {
  const hasInsurance = insurance && insurance !== 'none'
  if (HIGH_VALUE.includes(procedureSlug)) return hasInsurance ? 150 : 100
  if (MID_VALUE.includes(procedureSlug))  return hasInsurance ? 75  : 50
  return 25
}

async function sendLeadNotification(lead: {
  first_name: string, last_name: string, email: string, phone: string,
  procedure_slug: string, city: string, state: string,
  insurance: string, lead_value: number, id: string
}) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey || resendKey === 'FILL_ME_IN') return // skip if not configured

  const procedureLabel = lead.procedure_slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const insuranceLabel = lead.insurance === 'none' ? 'No insurance' : lead.insurance

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DentalPriceHub Leads <leads@dentalpricehub.org>',
      to: ['michaelwang9053@gmail.com'],
      subject: `🦷 New Lead: ${lead.first_name} — ${procedureLabel} in ${lead.city}, ${lead.state} ($${lead.lead_value})`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
          <h2 style="color:#1d4ed8;">New Lead — $${lead.lead_value} value</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;color:#6b7280;width:120px;">Name</td><td style="padding:8px;font-weight:bold;">${lead.first_name} ${lead.last_name}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;color:#6b7280;">Phone</td><td style="padding:8px;">${lead.phone || '—'}</td></tr>
            <tr><td style="padding:8px;color:#6b7280;">Email</td><td style="padding:8px;">${lead.email || '—'}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;color:#6b7280;">Procedure</td><td style="padding:8px;">${procedureLabel}</td></tr>
            <tr><td style="padding:8px;color:#6b7280;">Location</td><td style="padding:8px;">${lead.city}, ${lead.state}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;color:#6b7280;">Insurance</td><td style="padding:8px;">${insuranceLabel}</td></tr>
            <tr><td style="padding:8px;color:#6b7280;">Lead Value</td><td style="padding:8px;font-weight:bold;color:#16a34a;">$${lead.lead_value}</td></tr>
          </table>
          <p style="margin-top:20px;font-size:12px;color:#9ca3af;">Lead ID: ${lead.id} · DentalPriceHub.org</p>
        </div>
      `,
    }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      first_name, last_name = '', email = '', phone = '',
      zip_code = '', city, state,
      procedure_slug, insurance = 'none', notes = ''
    } = body

    // Require name + procedure + at least one contact method
    if (!first_name || !procedure_slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!email && !phone) {
      return NextResponse.json({ error: 'Email or phone required' }, { status: 400 })
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const lead_value = getLeadValue(procedure_slug, insurance)

    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([{
        first_name, last_name, email, phone,
        zip_code, city, state,
        procedure_slug, insurance, notes,
        status: 'new',
        lead_value,
      }])
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Send real-time notification (non-blocking)
    sendLeadNotification({
      first_name, last_name, email, phone,
      procedure_slug, city, state, insurance,
      lead_value, id: data?.id,
    }).catch(e => console.error('Notification error:', e))

    return NextResponse.json({ success: true, lead_id: data?.id })

  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
