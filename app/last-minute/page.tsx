// /last-minute — dedicated BoFu landing page
// Targets: "last minute assignment planner", "assignment planner for tight deadlines",
//          "finish assignment fast", "3 day essay plan", "quick study planner"
//
// This page has its own metadata, h1, and copy written specifically for
// panic-state users. The tool is identical — just the framing differs.
// Each keyword cluster gets its own h2 so Google can surface this page
// for multiple long-tail queries from a single URL.

import type { Metadata } from 'next'
import { Suspense } from 'react'
import HourlyPlannerIsland from '@/components/HourlyPlannerIsland'

export const metadata: Metadata = {
  title: 'Last-Minute Assignment Planner — Hour-by-Hour Plan | Planner.ai',
  description:
    'Deadline tonight or in 24 hours? Free last-minute assignment planner that creates an hour-by-hour schedule based on your exact deadline time and timezone. No signup.',
  keywords: [
    'last minute assignment planner',
    'assignment planner for tight deadlines',
    'finish assignment fast',
    '3 day essay plan',
    'how to plan an essay in 3 days',
    'quick study planner',
    'assignment planner tonight',
    '24 hour essay planner',
    'fast assignment schedule',
    'assignment due tomorrow',
    'write essay overnight',
    'hour by hour study plan',
    'tight deadline assignment help',
    'procrastination assignment planner',
  ],
  authors: [{ name: 'Planner.ai' }],
  alternates: {
    canonical: 'https://planner.ai/last-minute',
  },
  openGraph: {
    title: 'Last-Minute Assignment Planner — Hour-by-Hour Plan',
    description:
      'Deadline tonight? Get a free hour-by-hour assignment plan built around your exact deadline time. No signup.',
    url: 'https://planner.ai/last-minute',
    type: 'website',
    siteName: 'Planner.ai',
    images: [
      {
        url: '/logo.png',
        width: 438,
        height: 440,
        alt: 'Planner.ai — Last-Minute Assignment Planner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Last-Minute Assignment Planner — Hour-by-Hour Plan',
    description: 'Deadline tonight? Free hour-by-hour plan built around your exact deadline time.',
  },
}

// Separate JSON-LD for this page — its own FAQPage targeting urgency queries
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://planner.ai/last-minute',
      name: 'Last-Minute Assignment Planner',
      description: 'Free online planner for students facing tight or last-minute assignment deadlines.',
      url: 'https://planner.ai/last-minute',
      isPartOf: { '@id': 'https://planner.ai/#app' },
      breadcrumb: { '@id': 'https://planner.ai/last-minute#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://planner.ai/last-minute#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://planner.ai' },
        { '@type': 'ListItem', position: 2, name: 'Last-Minute Planner', item: 'https://planner.ai/last-minute' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://planner.ai/last-minute#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I write an assignment due tomorrow?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Set your due date to tomorrow in the planner above. It will divide your remaining hours into phases: a short research block, a focused writing session, and time for a final proofread. The key is to skip perfectionism — write a complete draft first, then fix it. A finished imperfect essay beats an unfinished perfect one.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I plan an essay in 3 days?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Day 1: 2–3 hours of focused research, then write a full outline. Day 2: write the entire first draft without stopping to edit. Day 3: revise for clarity and argument strength in the morning, then proofread and fix citations in the afternoon. Enter your 3-day window in the planner — it generates the exact time split automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should I do first when I have a last-minute assignment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Open this planner, enter today and your real deadline, and generate your schedule before doing anything else. Students who start without a plan waste their most valuable hours deciding what to do next. With a plan in place, every hour has a job.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I finish a research paper in a week?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — select "Research Paper" and set your deadline to 7 days out. The planner will allocate roughly 2 days to research, 1.5 days to analysis, 2 days to writing, and 1.5 days to revision. The critical move is limiting your sources: 6–8 strong sources beats 20 shallow ones every time.',
          },
        },
      ],
    },
  ],
}

export default function LastMinutePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', position: 'relative', overflowX: 'hidden' }}>

      {/* Background */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Red-tinted orbs to signal urgency */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', maxWidth: 560, maxHeight: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,63,94,0.10) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '40vw', height: '40vw', maxWidth: 440, maxHeight: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)' }} />
      </div>

      {/* JSON-LD for this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'rgba(12,14,20,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Planner.ai logo"
            width={32}
            height={32}
            style={{ borderRadius: 6, display: 'block', flexShrink: 0 }}
          />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Planner<span style={{ color: '#f43f5e' }}>.ai</span>
          </span>
        </a>
        <a href="/" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border-mid)', transition: 'color 0.15s' }}>
          ← Back to main planner
        </a>
      </nav>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 580, margin: '0 auto', padding: '40px 20px 0' }}>

        {/* Hero — urgency-first copy */}
        <header style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 99, background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', marginBottom: 22 }}>
            <span aria-hidden style={{ fontSize: '0.75rem' }}>🚨</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#f43f5e', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tight Deadline Mode</span>
          </div>

          {/* h1 — primary BoFu keyword for this page */}
          <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.6rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 14, color: 'var(--text-primary)' }}>
            Last-minute{' '}
            <span style={{ background: 'linear-gradient(135deg, #f43f5e, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              assignment planner
            </span>
          </h1>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            The free assignment planner for tight deadlines. Enter your exact deadline time and timezone — get an instant, hour-by-hour schedule built around how much time you actually have left.
          </p>

          {/* Urgency-specific trust signals */}
          <ul aria-label="Why students use this under pressure" style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 20px', marginTop: 20 }}>
            {[
              { icon: '⚡', text: 'Plan generated in seconds' },
              { icon: '🎯', text: 'Works for 1-day deadlines' },
              { icon: '🔗', text: 'Share plan with your tutor' },
              { icon: '📅', text: 'Export to Google Calendar' },
            ].map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span aria-hidden style={{ fontSize: '0.8rem' }}>{f.icon}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{f.text}</span>
              </li>
            ))}
          </ul>
        </header>

        {/* Hour-by-hour planner — sub-24h mode */}
        <Suspense fallback={
          <div style={{ height: 420, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, marginBottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, border: '2px solid var(--border-mid)', borderTopColor: '#f43f5e', borderRadius: '50%', animation: 'spinnerRotate 0.7s linear infinite' }} />
          </div>
        }>
          <HourlyPlannerIsland />
        </Suspense>

        {/* Tips section — targets "how to finish assignment fast" informational queries */}
        <section aria-labelledby="last-minute-tips" style={{ borderTop: '1px solid var(--border)', paddingTop: 48, paddingBottom: 48 }}>
          <h2 id="last-minute-tips" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' }}>
            How to finish a last-minute assignment
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
            The biggest mistake students make under deadline pressure is spending too long on research. Here is the order that works when time is short.
          </p>
          <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { n: '01', label: 'Step 1', title: 'Generate your plan first (2 minutes)', body: 'Enter your deadline above before you do anything else. Students who plan before starting finish significantly faster than those who dive straight in.' },
              { n: '02', label: 'Step 2', title: 'Time-box your research ruthlessly', body: 'Set a hard stop on research. For a 1-day deadline: 90 minutes maximum. For 3 days: half of day one. When the time is up, stop — you have enough.' },
              { n: '03', label: 'Step 3', title: 'Write the draft without editing', body: 'Write from start to finish without going back. Every minute spent re-reading your own half-written sentences is a minute not spent finishing. Draft first, edit second.' },
              { n: '04', label: 'Step 4', title: 'Leave 10% of your time for proofreading', body: 'A proofread essay that is 85% as good as it could be will always outperform an unproofread essay that is 95% as good. Reserve the time.' },
            ].map((step) => (
              <li key={step.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span
                  aria-label={step.label}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: '#f43f5e', background: 'rgba(244,63,94,0.08)', padding: '4px 8px', borderRadius: 6, flexShrink: 0, marginTop: 2 }}
                >{step.n}</span>
                <div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{step.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Quick-deadline guides — targets time-specific BoFu keywords */}
        <section aria-labelledby="deadline-guides" style={{ borderTop: '1px solid var(--border)', paddingTop: 48, paddingBottom: 48 }}>
          <h2 id="deadline-guides" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Quick deadline guides
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>
            Exactly how to split your remaining time — depending on what you have left.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                deadline: '24 hours',
                split: '2h research · 6h draft · 2h edit',
                note: 'Skip the outline. Research only what you need for your argument. Write without stopping. Edit once.',
                color: '#f43f5e',
                bg: 'rgba(244,63,94,0.06)',
                border: 'rgba(244,63,94,0.15)',
              },
              {
                deadline: '3 days',
                split: 'Day 1: research + outline · Day 2: full draft · Day 3: revise + proofread',
                note: 'The outline on day 1 is the single biggest time-saver for a 3-day window.',
                color: '#f59e0b',
                bg: 'rgba(245,158,11,0.06)',
                border: 'rgba(245,158,11,0.15)',
              },
              {
                deadline: '1 week',
                split: '2d research · 1d outline · 2.5d write · 0.5d edit',
                note: 'A week is enough for a solid essay if you do not lose the first two days to procrastination.',
                color: '#34d399',
                bg: 'rgba(52,211,153,0.06)',
                border: 'rgba(52,211,153,0.15)',
              },
              {
                deadline: '2 weeks',
                split: '3d research · 1d outline · 5d write · 3d revise',
                note: 'Two weeks is the ideal window — enough to let your argument develop between sessions.',
                color: '#4f8ef7',
                bg: 'rgba(79,142,247,0.06)',
                border: 'rgba(79,142,247,0.15)',
              },
            ].map((g) => (
              <div key={g.deadline} style={{ padding: '14px 18px', background: g.bg, border: `1px solid ${g.border}`, borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: g.color }}>{g.deadline}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{g.split}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{g.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ — all questions target urgency-intent BoFu queries */}
        <section aria-labelledby="lm-faq" style={{ borderTop: '1px solid var(--border)', paddingTop: 48, paddingBottom: 64 }}>
          <h2 id="lm-faq" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24, letterSpacing: '-0.02em' }}>
            Frequently asked questions
          </h2>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                q: 'How do I write an assignment due tomorrow?',
                a: 'Set your due date to tomorrow in the planner above. It will divide your remaining hours into phases: a short research block, a focused writing session, and time for a final proofread. The key is to skip perfectionism — write a complete draft first, then fix it. A finished imperfect essay beats an unfinished perfect one.',
              },
              {
                q: 'How do I plan an essay in 3 days?',
                a: 'Day 1: 2–3 hours of focused research, then write a full outline. Day 2: write the entire first draft without stopping to edit. Day 3: revise for clarity and argument strength in the morning, then proofread and fix citations in the afternoon. Enter your 3-day window in the planner — it generates the exact time split automatically.',
              },
              {
                q: 'What should I do first when I have a last-minute assignment?',
                a: 'Open this planner, enter today and your real deadline, and generate your schedule before doing anything else. Students who start without a plan waste their most valuable hours deciding what to do next. With a plan in place, every hour has a job.',
              },
              {
                q: 'Can I finish a research paper in a week?',
                a: 'Yes — select "Research Paper" and set your deadline to 7 days out. The planner will allocate roughly 2 days to research, 1.5 days to analysis, 2 days to writing, and 1.5 days to revision. The critical move is limiting your sources: 6–8 strong sources beats 20 shallow ones every time.',
              },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
                <dt style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{item.q}</dt>
                <dd style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

      </main>

      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--border)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <nav aria-label="Site navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
            <a href="/" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>← Main Assignment Planner</a>
            <a href="/last-minute" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Last-Minute Planner</a>
            <a href="/#faq" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>FAQ</a>
          </nav>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Planner.ai — free last-minute assignment planner for students fighting procrastination.
            Hour-by-hour plans for deadlines within 24 hours. No signup, completely free.
          </p>
        </div>
      </footer>
    </div>
  )
}
