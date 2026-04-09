// ─────────────────────────────────────────────────────────────────────────────
// /assignment-planner — SEO Landing Page (informational + tool)
// Target keyword: "assignment planner" / "online assignment planner" / "how to plan an assignment"
// Monthly search volume est: 20,000–60,000 (global, English)
// Intent: broad — students searching for a planner tool OR how to plan an assignment
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import { Suspense } from 'react'
import PlannerIsland from '@/components/PlannerIsland'

export const metadata: Metadata = {
  title: 'Assignment Planner — How to Plan Any Assignment (Free Tool) | Planner.ai',
  description:
    'Free online assignment planner for students. Learn how to plan any assignment step-by-step — then use the tool to generate your plan instantly. Works for essays, research papers, projects, lab reports. No signup.',
  alternates: { canonical: 'https://planner.ai/assignment-planner' },
  openGraph: {
    title: 'Free Online Assignment Planner — Plan Any Assignment Step by Step',
    description: 'Free assignment planner that turns your deadline into a phase-by-phase plan. AI assistant included. No signup.',
    url: 'https://planner.ai/assignment-planner',
    type: 'website',
    siteName: 'Planner.ai',
  },
}

const S = {
  section: { marginBottom: 48 } as React.CSSProperties,
  h2: { fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.02em' } as React.CSSProperties,
  body: { fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8 } as React.CSSProperties,
  card: { background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px' } as React.CSSProperties,
}

export default function AssignmentPlannerPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', overflowX: 'hidden' }}>

      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-12%', left: '-5%', width: '48vw', height: '48vw', maxWidth: 520, maxHeight: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-8%', width: '42vw', height: '42vw', maxWidth: 460, maxHeight: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.10) 0%, transparent 70%)' }} />
      </div>

      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid var(--border)', background: 'rgba(12,14,20,0.80)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Planner.ai logo" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: '0.93rem', color: 'var(--text-primary)' }}>
            Planner<span style={{ color: 'var(--accent-blue)' }}>.ai</span>
          </span>
        </a>
        <a href="/" style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>← All planners</a>
      </nav>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 600, margin: '0 auto', padding: '44px 20px 80px' }}>

        {/* ── Hero ── */}
        <header style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 99, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', marginBottom: 22 }}>
            <span aria-hidden style={{ fontSize: '0.73rem' }}>🗂️</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-emerald)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Online Assignment Planner</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 6vw, 2.7rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--text-primary)' }}>
            How to plan any assignment —{' '}
            <span style={{ background: 'linear-gradient(135deg, #34d399, #4f8ef7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              free tool included
            </span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 490, margin: '0 auto', lineHeight: 1.8 }}>
            A complete guide to planning any assignment — plus a free online assignment planner that does the planning for you. Enter your deadline and get a phase-by-phase plan with AI assistant support built in. No signup, no cost.
          </p>
        </header>

        {/* ── Tool ── */}
        <Suspense fallback={
          <div style={{ height: 420, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, marginBottom: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, border: '2px solid var(--border-mid)', borderTopColor: 'var(--accent-emerald)', borderRadius: '50%', animation: 'spinnerRotate 0.7s linear infinite' }} />
          </div>
        }>
          <PlannerIsland />
        </Suspense>

        {/* ── Guide: How to plan an assignment ── */}
        <section aria-labelledby="how-to-plan" style={S.section}>
          <h2 id="how-to-plan" style={S.h2}>How to plan an assignment — a complete guide</h2>
          <p style={S.body}>
            Effective assignment planning has one non-negotiable rule: plan before you start writing. Students who generate a plan first consistently produce better work, meet deadlines more reliably, and report less stress. This guide walks through the exact process — and the free tool above automates every step.
          </p>
        </section>

        {/* ── Step-by-step guide ── */}
        <section aria-labelledby="planning-steps" style={S.section}>
          <h2 id="planning-steps" style={S.h2}>Step-by-step assignment planning process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                step: 'Step 1',
                title: 'Read and understand the brief',
                body: 'Before anything else, re-read the assignment brief and identify exactly what is being asked. Many students lose marks because they answered a related question — not the one set. Highlight key verbs: "analyse", "evaluate", "compare". These tell you what kind of thinking is required.',
              },
              {
                step: 'Step 2',
                title: 'Identify your assignment type',
                body: 'Is this an essay, a research paper, a presentation, a project, or a lab report? Each has a different workflow with different phase weightings. An essay is research-heavy then writing-heavy. A lab report follows data collection and analysis. Knowing your type is the first input this planner needs.',
              },
              {
                step: 'Step 3',
                title: 'Count your available days',
                body: 'Work backward from the due date. Count the days you actually have available — accounting for other commitments, class time, and weekends. Be realistic. The planner does this calculation for you and shows you an urgency indicator: green (comfortable), amber (tight), red (last-minute).',
              },
              {
                step: 'Step 4',
                title: 'Divide time into phases',
                body: 'Allocate your days across the phases your assignment needs. Different assignments have different optimal ratios — do not guess. Use the phase weightings built into this planner, which are calibrated for each assignment type and validated against academic writing research.',
              },
              {
                step: 'Step 5',
                title: 'Identify your first concrete action',
                body: 'Every plan must end with a specific first task — not "start research" but "find 3 sources on X using Google Scholar". The AI assistant in this planner generates your first concrete action for each phase automatically.',
              },
              {
                step: 'Step 6',
                title: 'Export to calendar and start',
                body: 'Export your plan to Google Calendar so every phase start is visible alongside your other commitments. Then start Phase 1 immediately — even for 30 minutes. Starting is the hardest part. Everything after that is continuation.',
              },
            ].map((s) => (
              <div key={s.step} style={{ ...S.card }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 4 }}>{s.step}</p>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 }}>{s.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Common mistakes ── */}
        <section aria-labelledby="planning-mistakes" style={S.section}>
          <h2 id="planning-mistakes" style={S.h2}>The 4 most common assignment planning mistakes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { title: 'Starting without a plan', body: 'Opening a blank document and hoping ideas come is the most reliable way to spend 3 hours producing nothing. A 20-minute planning session saves hours of unfocused work.' },
              { title: 'Over-researching', body: 'Students consistently spend too much time researching and too little time writing. For a standard essay, 4–6 sources is enough. Research gets 25% of your time in this planner — not 60%.' },
              { title: 'Skipping the outline', body: 'An outline takes 20–30 minutes. Students who skip it typically rewrite their essays at least once, often more. The 20-minute investment prevents 3 hours of restructuring.' },
              { title: 'Leaving no time for editing', body: 'The difference between a B and an A is almost always editing. If you have run out of time to edit, you ran out of time during the research or drafting phase. The planner enforces a dedicated editing allocation.' },
            ].map((m) => (
              <div key={m.title} style={{ ...S.card }}>
                <h3 style={{ fontSize: '0.87rem', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: 4 }}>✗ {m.title}</h3>
                <p style={{ fontSize: '0.79rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How the tool automates this ── */}
        <section aria-labelledby="tool-section" style={S.section}>
          <h2 id="tool-section" style={S.h2}>How this free assignment planner automates the process</h2>
          <p style={{ ...S.body, marginBottom: 16 }}>
            The tool above handles steps 2–6 of the planning process automatically. Select your assignment type, enter your start and due dates, and get a complete phase-by-phase plan. The AI assistant then activates to help with step 5 — giving you a concrete first action for every phase.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 10 }}>
            {[
              { icon: '⏱️', title: 'Phase time calculator', body: 'Calculates the exact number of days for each phase based on your assignment type and deadline.' },
              { icon: '🎯', title: 'Urgency indicator', body: 'Shows green, amber, or red based on how tight your timeline is — so you can adjust your approach accordingly.' },
              { icon: '📅', title: 'Google Calendar export', body: 'One click exports all phases as calendar events with reminders. Every phase start appears in your calendar automatically.' },
              { icon: '🤖', title: 'AI assistant', body: 'Context-aware AI that knows your assignment. Generates sources, outlines, starter paragraphs, and draft improvements.' },
              { icon: '🔗', title: 'Share your plan', body: 'Copy a link to your specific plan and share it with study group members or your tutor.' },
            ].map((f) => (
              <article key={f.title} style={S.card}>
                <p style={{ fontSize: '1rem', marginBottom: 6 }} aria-hidden>{f.icon}</p>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{f.title}</h3>
                <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="ap-faq" style={S.section}>
          <h2 id="ap-faq" style={S.h2}>Assignment planner FAQ</h2>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { q: 'What is an assignment planner?', a: 'An assignment planner is a tool that breaks a single assignment into smaller, time-boxed tasks based on your start date and due date. Instead of facing one large deadline, you work toward a series of smaller milestones — research done by day 3, outline by day 4, first draft by day 8. This structure dramatically reduces procrastination and last-minute panic.' },
              { q: 'How do I plan an assignment step by step?', a: 'Step 1: Read the brief carefully and confirm what is being asked. Step 2: Identify your assignment type. Step 3: Count your available days. Step 4: Divide time into phases using the correct ratios for your assignment type. Step 5: Identify your first concrete action. Step 6: Export to calendar and start. Use the planner above to automate steps 2–6 in under a minute.' },
              { q: 'How early should I start planning an assignment?', a: 'As early as possible — but the minimum depends on the length and complexity. A 2,000-word essay needs at least 4–5 days for quality work. A research paper or dissertation chapter needs 2–3 weeks. Enter your deadline in the planner to see your urgency level and recommended approach.' },
              { q: 'How do I plan an assignment when I have no idea where to start?', a: 'Open this planner, generate your plan, and then open the AI assistant before you do anything else. The assistant will give you 3 sources to start with, an outline structure, and a first paragraph to build from. You need a concrete first action — not motivation. The plan gives you that.' },
              { q: 'Is this assignment planner free?', a: 'Yes. Completely free, no signup, no payment, no account. Enter your assignment details and your plan is ready instantly. The AI assistant is also included at no cost.' },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 18 }}>
                <dt style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 7 }}>{item.q}</dt>
                <dd style={{ ...S.body, margin: 0, fontSize: '0.82rem' }}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Internal links ── */}
        <div style={{ padding: '16px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>More free planning tools</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px' }}>
            <a href="/" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Assignment Planner (tool)</a>
            <a href="/essay-planner" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Essay Planner</a>
            <a href="/study-planner" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Study Planner</a>
            <a href="/last-minute" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Last-Minute Planner</a>
          </div>
        </div>

      </main>

      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Planner.ai</a> — Free online assignment planner for students. No signup required.
        </p>
      </footer>
    </div>
  )
}
