export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

      <div className="prose prose-lg">
        <h2>Pricing Information</h2>
        <p>
          All dental cost estimates on DentalPriceHub are based on regional data from the
          American Dental Association fee surveys and public sources. Prices are estimates only
          and may not reflect actual costs at any specific dental practice. Always confirm
          pricing directly with your dentist before proceeding with treatment.
        </p>

        <h2>Lead Referral Service</h2>
        <p>
          By submitting a quote request, you consent to being contacted by up to 3 dental
          practices in your area. DentalPriceHub acts as a referral service and is not
          responsible for the quality, pricing, or availability of services provided by
          referred dental practices.
        </p>

        <h2>No Medical Advice</h2>
        <p>
          Content on this website is for informational purposes only and does not constitute
          medical or dental advice. Always consult a licensed dental professional for diagnosis
          and treatment recommendations.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          DentalPriceHub is not liable for any damages arising from your use of this website
          or reliance on pricing information provided herein.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email{' '}
          <a href="mailto:hello@dentalpricehub.com" className="text-blue-600">
            hello@dentalpricehub.com
          </a>
        </p>
      </div>
    </main>
  )
}
