// app/sitemap.ts — tells Google every URL this site has, with priority and
// change frequency hints. Automatically served at /sitemap.xml by Next.js.
// Having a sitemap is the single most direct signal to Googlebot that these
// pages exist. Without it, /last-minute can only be discovered via crawl.

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://planner.ai'

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/last-minute`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
