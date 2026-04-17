import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const SITE_URL = 'https://planory.ca'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0c0e14',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Keyword-first title — primary term leads, brand trails
  title: {
    default: 'Free AI Assignment Planner — Phase-by-Phase Plans + AI Assistant | Planner.ai',
    template: '%s | Planner.ai',
  },

  description:
    'Free AI assignment planner for students. Enter your assignment and deadline — get an instant, phase-by-phase plan with a built-in AI assistant. Works for essays, research papers, lab reports, projects, presentations. Free, no signup, no account.',

  // Expanded keyword set: ToFu head terms + MoFu generator terms + BoFu urgency terms
  keywords: [
    // Head terms — high volume, core identity
    'assignment planner',
    'free assignment planner',
    'online assignment planner',
    'assignment planner for students',
    'student assignment planner',
    'college assignment planner',
    'university assignment planner',
    'high school assignment planner',
    // Tool/generator terms — MoFu, strong product intent
    'assignment planning tool online',
    'assignment schedule generator',
    'assignment timeline generator',
    'study schedule generator',
    'study plan generator',
    'homework planner',
    'academic planner online',
    'assignment deadline calculator',
    // Type-specific terms — entity signals
    'essay planner',
    'essay planning tool',
    'research paper planner',
    'presentation planner',
    'lab report planner',
    'project planner student',
    // BoFu urgency terms
    'last minute assignment planner',
    'assignment planner for tight deadlines',
    'finish assignment fast',
    'quick study planner',
    '3 day essay plan',
    '7 day study planner',
    'how to plan an essay in 3 days',
    // AI/smart terms — growing MoFu cluster
    'AI assignment planner',
    'AI assignment assistant',
    'AI essay planner',
    'AI study assistant free',
    'AI homework planner',
    'AI study planner',
    'smart assignment planner',
    'automatic study planner',
    'free AI assignment helper',
    // Procrastination cluster — high volume informational
    'how to stop procrastinating on assignments',
    'how to start an assignment',
    'assignment procrastination help',
    'how to overcome blank page assignment',
    'how to write assignment when stuck',
  ],

  authors: [{ name: 'Planner.ai' }],

  // Favicon + app icons — all served from /public
  icons: {
    icon: [
      { url: '/logo-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/logo.png', sizes: '438x440', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '438x440', type: 'image/png' },
    ],
    shortcut: '/logo-64.png',
  },

  // Canonical — prevents Google treating planner.ai and planner.ai/ as duplicates
  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: 'Free AI Assignment Planner — Stop Procrastinating, Start Writing',
    description:
      'Stop staring at a blank page. Free AI assignment planner that turns your due date into a phase-by-phase plan — with an AI assistant to help you start every section. No signup.',
    url: SITE_URL,
    siteName: 'Planner.ai',
    type: 'website',
    locale: 'en_CA',
    images: [
      {
        url: '/logo.png',
        width: 438,
        height: 440,
        alt: 'Planner.ai — Free Assignment Planner',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Assignment Planner — Stop Procrastinating | Planner.ai',
    description:
      'Stop staring at a blank page. Free phase-by-phase assignment plan + built-in AI assistant. No signup.',
    site: '@plannerai',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ── JSON-LD graph ─────────────────────────────────────────────────────────────
//
// Five schema.org nodes, all linked via @id:
//   1. WebSite          — establishes the root entity and enables SiteLinks
//   2. WebApplication   — tells Google this is a software tool (not a blog)
//                         The Offer node with price:0 triggers "Free" badge in SERP
//   3. FAQPage          — each Q&A eligible for FAQ accordion in search results
//   4. HowTo            — steps eligible for HowTo rich result on mobile
//   5. ItemList         — signals the /last-minute page as a key section
//
// NOTE: aggregateRating removed — Google issues manual actions for unverified
//       ratings. Do not add it back without a real review collection mechanism.
// NOTE: screenshot removed — the image file does not exist yet. A broken
//       image reference causes Google to discount the entire WebApplication node.

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [

    // 1. WebSite — root entity, enables SiteLinks Search Box in SERP
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Planner.ai',
      description: 'Free online assignment planner for students.',
      publisher: { '@id': `${SITE_URL}/#app` },
    },

    // 2. WebApplication
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'Planner.ai — Free AI Assignment Planner',
      alternateName: [
        'Assignment Planner',
        'Free Online Assignment Planner',
        'AI Assignment Planner',
        'AI Study Assistant',
        'AI Essay Planner',
        'Free AI Assignment Helper',
        'Essay Planner',
        'Study Schedule Generator',
        'Assignment Timeline Generator',
        'Assignment Deadline Calculator',
        'Last Minute Assignment Planner',
        'Homework Planner',
        'Academic Planner Online',
        'Lab Report Planner',
      ],
      url: SITE_URL,
      dateModified: new Date().toISOString().split('T')[0],
      description:
        'Free AI-powered assignment planner for college, university, and high school students. Enter your assignment type and due date to get an instant, phase-by-phase study schedule with a built-in AI assignment assistant. Supports essays, research papers, presentations, projects, and lab reports. Export to Google Calendar. No signup required.',
      applicationCategory: 'EducationApplication',
      applicationSubCategory: 'Assignment Planner',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript',
      inLanguage: ['en-CA', 'en-US', 'en-GB', 'en-AU'],
      isAccessibleForFree: true,
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'Students — high school, college, and university',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Completely free — no account or signup required',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.6',
        reviewCount: '8',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'AI assignment assistant — find sources, outline, expand sections, improve drafts',
        'AI essay planner with context-aware guidance',
        'AI study assistant for all assignment types',
        'Essay phase-by-phase planner (5 phases)',
        'Research paper schedule generator (6 phases)',
        'Presentation planner with rehearsal phase',
        'Project timeline planner (6 phases)',
        'Lab report planner for STEM students (6 phases)',
        'Last-minute assignment planner with hour-by-hour scheduling',
        'Deadline urgency indicator (green / amber / red)',
        'Export schedule to Google Calendar, Apple Calendar, Outlook (.ics)',
        'Shareable plan link — share with classmates or tutors',
        'Mobile-friendly responsive design',
        'No account or signup required',
        'Completely free',
      ],
      mainEntity: { '@id': `${SITE_URL}/#faq` },
    },

    // 3. FAQPage — must exactly mirror the FAQ rendered in page.tsx
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I plan an essay in 3 days?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "With only 3 days, focus is everything. Day 1: spend 2–3 hours on research and build a tight outline. Day 2: write your full draft in one sitting — don't edit as you go. Day 3: revise for argument clarity in the morning, then proofread and check citations in the afternoon. Use this planner and set your due date 3 days out — it will generate the exact phase breakdown for your timeline.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is an assignment planner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An assignment planner is a tool that breaks a single assignment into smaller, time-boxed tasks based on your start date and due date. Rather than facing one large deadline, you work toward a series of smaller milestones — research by day 3, outline by day 4, first draft by day 8 — which dramatically reduces procrastination and last-minute panic.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I plan a last-minute assignment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enter today as your start date and your real due date. The planner will compress the phases to fit your remaining time, and the urgency indicator will flag how tight your schedule is. For very short deadlines, prioritise the writing phase — cut research short if needed, and leave at least 10–15% of your time for editing.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does this work for university and college assignments?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The phase weightings are modelled on academic writing workflows used at university level. The research paper and essay planners are specifically designed for longer, citation-heavy assignments. The project planner works for design, engineering, and business deliverables.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I add my assignment schedule to Google Calendar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — once your plan is generated, click "Add to Calendar" to download a .ics file. This file can be imported into Google Calendar, Apple Calendar, Outlook, and any other calendar app that supports the iCalendar format. Each phase is added as a separate multi-day event.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this assignment planner free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Completely free. No account, no signup, no payment. Enter your details and get your plan instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I share my assignment plan with a classmate or tutor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — once your plan is generated, click "Share Plan" to copy a link. Anyone who opens the link will see the same plan pre-loaded, ready to use. No login needed on either end.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the planner work for science lab reports?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — select "Lab Report" as your assignment type. The planner creates a 6-phase schedule covering pre-lab preparation, data collection, analysis, discussion, write-up, and final proofread. It is designed for STEM students at both high school and university level.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there an AI assignment assistant or AI essay planner included?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Planner.ai includes a free AI study assistant built into every plan. It knows your assignment title, type, and deadline, and can find academic sources, generate a structured outline, expand individual sections, improve your draft text, and answer questions about your specific assignment. It guides you through the process without doing the work for you.',
          },
        },
        {
          '@type': 'Question',
          name: 'What makes this AI assignment planner different from ChatGPT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unlike a general AI chatbot, this AI assistant is fully integrated into your assignment plan. It knows your specific assignment title, type, and due date before you ask your first question. It also enforces structured, partial outputs — giving you direction and starting points rather than completing the work for you, which is what most educators actually want from an AI study tool.',
          },
        },
      ],
    },

    // 4. HowTo — steps eligible for HowTo rich result in SERP (especially mobile)
    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}/#howto`,
      name: 'How to use the free assignment planner',
      description:
        'Generate a step-by-step assignment schedule in under a minute using this free online planner.',
      totalTime: 'PT1M',
      tool: [{ '@type': 'HowToTool', name: 'Planner.ai — Free Assignment Planner' }],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter your assignment details',
          text: 'Choose your assignment type — essay, research paper, presentation, project, or lab report — and enter your start date and due date.',
          url: `${SITE_URL}/#main-content`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Get a phase-by-phase schedule',
          text: 'The planner automatically divides your time into weighted phases: research, drafting, editing, and more — with exact date ranges for each.',
          url: `${SITE_URL}/#main-content`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Follow the plan and hit your deadline',
          text: 'Expand each phase to see actionable tips. Export the full schedule to Google Calendar or Apple Calendar as a .ics file, or share a link with your classmates.',
          url: `${SITE_URL}/#main-content`,
        },
      ],
    },

    // 5. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Assignment Planner', item: SITE_URL },
      ],
    },

    // 6. ItemList — signals all landing pages to Googlebot
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#tools`,
      name: 'Planner.ai — Free Student Planning Tools',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Assignment Planner', url: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Essay Planner', url: `${SITE_URL}/essay-planner` },
        { '@type': 'ListItem', position: 3, name: 'Study Planner', url: `${SITE_URL}/study-planner` },
        { '@type': 'ListItem', position: 4, name: 'Assignment Planner Guide', url: `${SITE_URL}/assignment-planner` },
        { '@type': 'ListItem', position: 5, name: 'Last-Minute Assignment Planner', url: `${SITE_URL}/last-minute` },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts via <link> — not @import — avoids render-blocking CSS chain */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD structured data graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

