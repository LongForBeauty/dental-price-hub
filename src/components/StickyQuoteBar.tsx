'use client'
import { useEffect, useState } from 'react'

interface Props {
  procedureName: string
  city: string
}

export default function StickyQuoteBar({ procedureName, city }: Props) {
  const [visible, setVisible] = useState(false)
  const [nearForm, setNearForm] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 300

      // Hide bar when user is near/at the lead form
      const form = document.getElementById('lead-form')
      if (form) {
        const rect = form.getBoundingClientRect()
        setNearForm(rect.top < window.innerHeight + 100)
      }

      setVisible(scrolled)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible || nearForm) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-2xl border-t-2 border-blue-500">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm md:text-base truncate">
            💰 Get free {procedureName} quotes in {city}
          </p>
          <p className="text-blue-200 text-xs hidden md:block">
            Up to 3 local dentists · No obligation · Takes 30 seconds
          </p>
        </div>
        <a
          href="#lead-form"
          onClick={e => {
            e.preventDefault()
            document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="shrink-0 bg-white text-blue-600 font-bold px-5 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors"
        >
          Get Quotes →
        </a>
      </div>
    </div>
  )
}
