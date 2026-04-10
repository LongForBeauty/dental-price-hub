'use client'
import { useState } from 'react'

interface Props {
  procedureSlug: string
  procedureName: string
  city: string
  state: string
}

export default function MiniLeadForm({ procedureSlug, procedureName, city, state }: Props) {
  const [step, setStep] = useState<'form' | 'submitting' | 'success' | 'error'>('form')
  const [form, setForm] = useState({ first_name: '', email: '', phone: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep('submitting')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          last_name: '',
          zip_code: '',
          insurance: 'none',
          city,
          state,
          procedure_slug: procedureSlug,
        }),
      })
      setStep(res.ok ? 'success' : 'error')
    } catch {
      setStep('error')
    }
  }

  if (step === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
        <div className="text-3xl mb-2">✅</div>
        <p className="font-semibold text-green-800">Request received!</p>
        <p className="text-green-700 text-sm mt-1">
          We&apos;ll match you with up to 3 {city} dentists. Check your email shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white">
      <p className="font-bold text-lg mb-1">
        💰 What will your {procedureName} cost in {city}?
      </p>
      <p className="text-blue-100 text-sm mb-4">
        Get exact quotes from local dentists — free, no obligation.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          required
          type="text"
          placeholder="Your name"
          value={form.first_name}
          onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
          className="flex-1 rounded-lg px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          required
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="flex-1 rounded-lg px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="flex-1 rounded-lg px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          disabled={step === 'submitting'}
          className="shrink-0 bg-white text-blue-600 font-bold px-6 py-2 rounded-lg text-sm hover:bg-blue-50 disabled:opacity-60 transition-colors"
        >
          {step === 'submitting' ? '...' : 'Get Quotes'}
        </button>
      </form>
      <p className="text-blue-200 text-xs mt-2">
        🔒 No spam. Your info is only shared with dentists you choose.
      </p>
    </div>
  )
}
