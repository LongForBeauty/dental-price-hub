'use client'
import { useState } from 'react'

interface Props {
  procedureSlug: string
  procedureName: string
  city: string
  state: string
}

export default function LeadForm({ procedureSlug, procedureName, city, state }: Props) {
  const [step, setStep] = useState<'form' | 'submitting' | 'success' | 'error'>('form')
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    zip_code: '', insurance: 'none', notes: ''
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep('submitting')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          city,
          state,
          procedure_slug: procedureSlug,
        }),
      })

      if (res.ok) {
        setStep('success')
        // Fire GA4 conversion event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          ;(window as any).gtag('event', 'lead_submitted', {
            event_category: 'lead',
            event_label: procedureSlug,
            procedure: procedureSlug,
            city: city,
            state: state,
          })
        }
      } else {
        setStep('error')
      }
    } catch {
      setStep('error')
    }
  }

  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re all set!</h3>
        <p className="text-gray-600">
          We&apos;ll match you with up to 3 {city} dentists for your {procedureName}.
          Expect a call or email within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            required
            type="text"
            value={form.first_name}
            onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Jane"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            required
            type="text"
            value={form.last_name}
            onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Smith"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="jane@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
          <input
            required
            type="text"
            maxLength={5}
            value={form.zip_code}
            onChange={e => setForm(f => ({ ...f, zip_code: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="60601"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dental Insurance</label>
          <select
            value={form.insurance}
            onChange={e => setForm(f => ({ ...f, insurance: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="none">No insurance</option>
            <option value="delta">Delta Dental</option>
            <option value="cigna">Cigna</option>
            <option value="aetna">Aetna</option>
            <option value="metlife">MetLife</option>
            <option value="united">United Healthcare</option>
            <option value="other">Other insurance</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Any specific concerns or questions..."
        />
      </div>

      <button
        type="submit"
        disabled={step === 'submitting'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {step === 'submitting' ? 'Submitting...' : `Get Free ${procedureName} Quotes in ${city}`}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to be contacted by up to 3 local dental practices.
        No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}
