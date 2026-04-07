import { MetadataRoute } from 'next'
import { PROCEDURES, TARGET_CITIES_FULL } from '@/lib/procedures'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dentalpricehub.com'
  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ]

  // Procedure index pages
  for (const proc of Object.values(PROCEDURES)) {
    entries.push({
      url: `${baseUrl}/${proc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  }

  // City × procedure pages
  for (const proc of Object.values(PROCEDURES)) {
    for (const city of TARGET_CITIES_FULL) {
      const citySlug = city.city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      entries.push({
        url: `${baseUrl}/${proc.slug}/${citySlug}-${city.state.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return entries
}
