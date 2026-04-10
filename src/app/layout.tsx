import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'DentalPriceHub – Compare Dental Costs by City',
    template: '%s | DentalPriceHub',
  },
  description: 'Compare dental procedure costs in your city. Find affordable dentists near you. Free price comparison for implants, crowns, cleanings, and more.',
  keywords: ['dental cost', 'dental price comparison', 'how much does dental cost', 'dentist prices'],
  robots: { index: true, follow: true },
  verification: {
    google: ['cG6L-sTPyQwixjfJ5hxu5eJICGr74UvzzCf4-g0wJC4', 'IdYLOfJV7egkOxYkoXJqXZgkvVJQ6RMWwdxlt9L6Dhw'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6H0VZBB8CQ" />
        <Script id="ga4">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-6H0VZBB8CQ');`}
        </Script>
        {/* Microsoft Clarity — heatmaps + session recordings */}
        <Script id="clarity">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","w9crhjmco5");`}
        </Script>
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
              <span>🦷</span>
              <span>DentalPriceHub</span>
            </a>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="/dental-implant" className="hover:text-blue-700">Implants</a>
              <a href="/porcelain-crown" className="hover:text-blue-700">Crowns</a>
              <a href="/root-canal-molar" className="hover:text-blue-700">Root Canals</a>
              <a href="/teeth-cleaning-adult" className="hover:text-blue-700">Cleanings</a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-gray-800 text-gray-400 mt-16 py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <h3 className="text-white font-semibold mb-3">Procedures</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/dental-implant" className="hover:text-white">Dental Implants</a></li>
                  <li><a href="/porcelain-crown" className="hover:text-white">Dental Crowns</a></li>
                  <li><a href="/root-canal-molar" className="hover:text-white">Root Canals</a></li>
                  <li><a href="/wisdom-tooth-removal" className="hover:text-white">Wisdom Teeth</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Top Cities</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/dental-implant/new-york-ny" className="hover:text-white">New York</a></li>
                  <li><a href="/dental-implant/los-angeles-ca" className="hover:text-white">Los Angeles</a></li>
                  <li><a href="/dental-implant/chicago-il" className="hover:text-white">Chicago</a></li>
                  <li><a href="/dental-implant/houston-tx" className="hover:text-white">Houston</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 text-sm text-center">
              <p>© {new Date().getFullYear()} DentalPriceHub. Prices are estimates based on regional ADA data. Consult a dentist for exact pricing.</p>
              <p className="mt-1">
                <a href="/privacy" className="hover:text-white mx-2">Privacy Policy</a>
                <a href="/terms" className="hover:text-white mx-2">Terms</a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
