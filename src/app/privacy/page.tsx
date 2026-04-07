export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

      <div className="prose prose-lg">
        <h2>Information We Collect</h2>
        <p>
          When you submit a quote request through DentalPriceHub, we collect the information
          you provide including your name, email address, phone number, ZIP code, and details
          about the dental procedure you are interested in.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use your information solely to connect you with local dental practices that can
          provide pricing and appointment availability for the procedure you requested. We may
          share your contact information with up to 3 dental practices in your area.
        </p>

        <h2>We Do Not Sell Your Data</h2>
        <p>
          We do not sell, rent, or trade your personal information to third parties for
          marketing purposes. Your information is only shared with dental practices for the
          purpose of fulfilling your quote request.
        </p>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to operate the website. We do not use tracking cookies
          or third-party advertising cookies without your consent.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this privacy policy, contact us at{' '}
          <a href="mailto:privacy@dentalpricehub.com" className="text-blue-600">
            privacy@dentalpricehub.com
          </a>
        </p>
      </div>
    </main>
  )
}
