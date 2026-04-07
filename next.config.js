/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate all 15,000 pages at build time
  output: 'standalone',

  // Enable ISR for price updates without full rebuild
  experimental: {
    // Incremental Static Regeneration
  },

  // Redirect bare domain to www
  async redirects() {
    return []
  },

  // SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
