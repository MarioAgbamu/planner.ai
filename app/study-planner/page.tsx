// ─────────────────────────────────────────────────────────────────────────────
// /study-planner — SEO Landing Page
// Target keyword: "study planner" / "free study planner" / "study schedule generator"
// Monthly search volume est: 15,000–40,000 (global, English)
// Intent: students wanting to organise their study schedule around an assignment
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import { Suspense } from 'react'
import PlannerIsland from '@/components/PlannerIsland'

export const metadata: Metadata = {
  title: 'Free Study Planner — Generate Your Study Schedule in Seconds | Planner.ai',
  description:
    'Free study planner for students. Generate a phase-by-phase study schedule from your assignment and deadline. Built-in AI study assistant included. Works for essays, papers, projects, lab reports. No signup.',
  alternates: { canonical: 'https://planner.ai/study-planner' },
  openGraph: {
    title: 'Free Study Planner — Instant Study Schedule Generator',
    description: 'Enter your assignment and deadline. Get a complete study schedule with phase-by-phase time allocations. Free, instant, AI assistant included.',
    url: 'https://planner.ai/study-planner',
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

export default function StudyPlannerPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', overflowX: 'hidden' }}>

      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-8%', width: '50vw', height: '50vw', maxWidth: 500, maxHeight: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,109,255,0.11) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-8%', left: '-8%', width: '45vw', height: '45vw', maxWidth: 450, maxHeight: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)' }} />
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 99, background: 'rgba(155,109,255,0.08)', border: '1px solid rgba(155,109,255,0.2)', marginBottom: 22 }}>
            <span aria-hidden style={{ fontSize: '0.73rem' }}>📅</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-violet)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Free Study Planner</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 6vw, 2.7rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--text-primary)' }}>
            Free study planner that builds your{' '}
            <span style={{ background: 'linear-gradient(135deg, #9b6dff, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              complete study schedule
            </span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 490, margin: '0 auto', lineHeight: 1.8 }}>
            Enter your assignment and deadline. Get a structured, phase-by-phase study schedule with exact time allocations — built around what you actually need to do, not just when things are due. Free, no account required.
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 14, fontStyle: 'italic' }}>
            ★★★★★ &ldquo;Used this for a research paper due in 10 days. Actually finished two days early for once.&rdquo; — Amara T., university student
          </p>
        </header>

        {/* ── Tool ── */}
        <Suspense fallback={
          <div style={{ height: 420, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, marginBottom: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, border: '2px solid var(--border-mid)', borderTopColor: 'var(--accent-violet)', borderRadius: '50%', animation: 'spinnerRotate 0.7s linear infinite' }} />
          </div>
        }>
          <PlannerIsland />
        </Suspense>

        {/* ── What a study planner actually is ── */}
        <section aria-labelledby="what-is-study-planner" style={S.section}>
          <h2 id="what-is-study-planner" style={S.h2}>What a study planner actually does</h2>
          <p style={S.body}>
            Most study planners are just calendars where you write down due dates. That is useful for knowing when things are due — it does not help you with how to get them done. A study planner should do two things: divide your available time into named, purposeful phases, and tell you what good progress looks like in each one.
          </p>
          <br />
          <p style={S.body}>
            Planner.ai&apos;s free study schedule generator works backward from your deadline. It calculates how many days you have, splits them into research-backed phases based on your assignment type, and gives you exact date ranges for each. The built-in AI study assistant then helps you start each phase — so you are never staring at the first task wondering what to actually do.
          </p>
        </section>

        {/* ── Why students fail study plans ── */}
        <section aria-labelledby="why-plans-fail" style={S.section}>
          <h2 id="why-plans-fail" style={S.h2}>Why most study plans fail — and how this one doesn&apos;t</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                problem: 'Plans that are too vague',
                solution: 'Every phase has a named output: "literature review complete", "first draft written", "citations fixed". You always know when a phase is done.',
              },
              {
                problem: 'Plans that skip the starting problem',
                solution: 'The AI assistant gives you a concrete first action for each phase — 3 sources to read, an outline to follow, a paragraph to build from.',
              },
              {
                problem: 'Plans that ignore assignment type',
                solution: 'An essay and a lab report have completely different workflows. This planner uses different phase weightings for each assignment type.',
              },
              {
                problem: 'Plans you forget to check',
                solution: 'Export your plan to Google Calendar. Each phase appears as a multi-day event with a reminder so every phase start is flagged automatically.',
              },
            ].map((item) => (
              <div key={item.problem} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 0, ...S.card, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 14px', background: 'rgba(244,63,94,0.05)', borderRight: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--accent-rose)' }}>✗ {item.problem}</p>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>✓ {item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Study planning by assignment type ── */}
        <section aria-labelledby="study-types" style={S.section}>
          <h2 id="study-types" style={S.h2}>Study schedules for every assignment type</h2>
          <p style={{ ...S.body, marginBottom: 16 }}>
            Select your assignment type when generating your plan and the planner applies the correct phase weighting automatically.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            {[
              { icon: '✍️', title: 'Essay study plan', body: '5 phases: topic (10%), research (25%), outline (10%), draft (40%), edit (15%).' },
              { icon: '🔬', title: 'Research paper plan', body: '6 phases across literature review, methodology, analysis, writing, citations, revision.' },
              { icon: '🎤', title: 'Presentation study plan', body: 'Research, slides, speaker notes, rehearsal. Most students skip rehearsal — this plan does not.' },
              { icon: '⚙️', title: 'Project study plan', body: 'Scoping, discovery, prototype, execution, testing, documentation.' },
              { icon: '🧪', title: 'Lab report study plan', body: 'Pre-lab, data collection, analysis, discussion, write-up, proofread.' },
            ].map((t) => (
              <article key={t.title} style={S.card}>
                <p style={{ fontSize: '1rem', marginBottom: 6 }} aria-hidden>{t.icon}</p>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{t.title}</h3>
                <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{t.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Tips for using a study planner ── */}
        <section aria-labelledby="study-tips" style={S.section}>
          <h2 id="study-tips" style={S.h2}>5 tips for making a study plan you actually follow</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { n: '1', title: 'Generate the plan before you start working', body: 'Students who plan first finish faster. Opening a document and starting without a plan is the fastest route to procrastination. Use this planner before you open a blank page.' },
              { n: '2', title: 'Use phases, not word counts', body: 'Tracking progress by word count creates anxiety. Tracking by phase completion ("research done", "outline done") creates momentum. Each phase in this planner has a clear definition of done.' },
              { n: '3', title: 'Export to your calendar immediately', body: 'Once your plan is generated, click Add to Calendar and import the .ics file. You will get a reminder at the start of every phase without having to remember to check a separate planner.' },
              { n: '4', title: 'Use the AI assistant at the start of each phase', body: 'Each time you enter a new phase, open the AI assistant and ask it to help you start. It already knows your assignment — it will give you a concrete first action rather than a blank page.' },
              { n: '5', title: 'Do not skip the editing phase', body: 'Most students run out of time for editing because they spent too long on research. The phase time allocations in this planner specifically prevent this. Trust the split.' },
            ].map((tip) => (
              <div key={tip.n} style={{ display: 'flex', gap: 14, ...S.card }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: 'var(--accent-blue)', flexShrink: 0 }}>{tip.n}</span>
                <div>
                  <h3 style={{ fontSize: '0.87rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{tip.title}</h3>
                  <p style={{ fontSize: '0.79rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="study-faq" style={S.section}>
          <h2 id="study-faq" style={S.h2}>Study planner FAQ</h2>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { q: 'What is the best free study planner for students?', a: 'For assignment-focused study planning, Planner.ai is the only free tool that builds a phase-by-phase schedule specific to your assignment type and deadline, and includes an AI assistant to help you start each phase. It is free, no signup, and works for every assignment type.' },
              { q: 'How do I create a study schedule for an assignment?', a: 'Use this planner — it does it for you in under a minute. Select your assignment type, enter your start date and due date, and get an instant phase-by-phase schedule with exact date ranges. If you are creating one manually: identify the phases (research, outline, draft, edit), calculate the days available, and allocate time using the correct ratios for your assignment type.' },
              { q: 'How far in advance should I start studying for an assignment?', a: 'As early as possible, but the minimum depends on the assignment. For a 2,000-word essay: 7 days is comfortable, 4 days is tight, 2 days is last-minute mode. For a research paper: 2–3 weeks is ideal. Enter your actual due date into the planner — it will tell you how tight your schedule is using an urgency indicator.' },
              { q: 'How do I study for an assignment I don\'t understand?', a: 'Start with the AI assistant in chat mode — it knows your assignment title and can explain the question, suggest what the examiner is looking for, and recommend sources that will give you context. Understanding the question is phase one, and it is where students most commonly lose marks.' },
              { q: 'Can I use a study planner for multiple assignments at once?', a: 'This planner is optimised for one assignment at a time. Generate a separate plan for each assignment and use the Google Calendar export to see all your phase deadlines in one place. Seeing multiple phase schedules in a calendar view helps you identify conflicts and protect your most important study blocks.' },
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
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>Explore more free planners</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px' }}>
            <a href="/" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Assignment Planner</a>
            <a href="/essay-planner" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Essay Planner</a>
            <a href="/assignment-planner" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Assignment Planner Guide</a>
            <a href="/last-minute" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Last-Minute Planner</a>
          </div>
        </div>

      </main>

      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Planner.ai</a> — Free study planner and study schedule generator for students. No signup required.
        </p>
      </footer>
    </div>
  )
}
