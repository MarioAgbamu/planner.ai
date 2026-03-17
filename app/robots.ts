// app/robots.ts — served at /robots.txt by Next.js App Router.
// The Sitemap directive is the key part — it tells Googlebot exactly where
// to find the sitemap without requiring manual Google Search Console submission.

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://planner.ai/sitemap.xml',
    host: 'https://planner.ai',
  }
}
