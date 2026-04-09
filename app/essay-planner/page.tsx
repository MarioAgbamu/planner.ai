// ─────────────────────────────────────────────────────────────────────────────
// /essay-planner — SEO Landing Page
// Target keyword: "essay planner" / "free essay planner" / "essay planning tool"
// Monthly search volume est: 8,000–22,000 (global, English)
// Intent: tool-seeking students about to write an essay
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import { Suspense } from 'react'
import PlannerIsland from '@/components/PlannerIsland'

export const metadata: Metadata = {
  title: 'Free Essay Planner — Phase-by-Phase Essay Writing Plan | Planner.ai',
  description:
    'Free essay planner for students. Enter your essay topic and due date — get an instant, phase-by-phase writing plan: research, outline, draft, edit. Built-in AI assistant included. No signup.',
  alternates: { canonical: 'https://planner.ai/essay-planner' },
  openGraph: {
    title: 'Free Essay Planner — Phase-by-Phase Writing Plan',
    description: 'Turn your essay deadline into a step-by-step plan. Free, instant, no signup. AI assistant built in.',
    url: 'https://planner.ai/essay-planner',
    type: 'website',
    siteName: 'Planner.ai',
  },
}

const S = {
  section: { marginBottom: 48 } as React.CSSProperties,
  h2: { fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.02em' } as React.CSSProperties,
  h3: { fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 } as React.CSSProperties,
  body: { fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8 } as React.CSSProperties,
  card: { background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px' } as React.CSSProperties,
}

export default function EssayPlannerPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', overflowX: 'hidden' }}>

      {/* Decorative bg */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-8%', width: '50vw', height: '50vw', maxWidth: 550, maxHeight: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.11) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', maxWidth: 440, maxHeight: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,109,255,0.09) 0%, transparent 70%)' }} />
      </div>

      {/* Nav */}
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 99, background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', marginBottom: 22 }}>
            <span aria-hidden style={{ fontSize: '0.73rem' }}>✍️</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Free Essay Planner</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 6vw, 2.7rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16, color: 'var(--text-primary)' }}>
            Free essay planner that builds your{' '}
            <span className="gradient-text">phase-by-phase writing plan</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
            Enter your essay topic and due date. Get a complete writing schedule — research, outline, draft, edit — with exact time allocations and a built-in AI assistant that helps you start each phase. Free, no signup.
          </p>
        </header>

        {/* ── Tool ── */}
        <Suspense fallback={
          <div style={{ height: 420, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, marginBottom: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, border: '2px solid var(--border-mid)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%', animation: 'spinnerRotate 0.7s linear infinite' }} />
          </div>
        }>
          <PlannerIsland defaultType="essay" />
        </Suspense>

        {/* ── How the essay planner works ── */}
        <section aria-labelledby="essay-how" style={S.section}>
          <h2 id="essay-how" style={S.h2}>How the free essay planner works</h2>
          <p style={S.body}>
            Writing a good essay requires more than just sitting down and typing. The research phase, the outlining phase, and the editing phase each need dedicated time — and most students spend that time in the wrong order. This essay planning tool works backward from your due date and divides your available time using a proven five-phase framework.
          </p>
          <br />
          <p style={S.body}>
            Select &ldquo;Essay&rdquo; as your assignment type, enter your start date and due date, and the planner generates a schedule with exact date ranges for each phase. The AI assistant then activates — it knows your essay topic and can find sources, generate a thesis-based outline, and write your first paragraph before you open a blank document.
          </p>
        </section>

        {/* ── Five phases ── */}
        <section aria-labelledby="essay-phases" style={S.section}>
          <h2 id="essay-phases" style={S.h2}>The five phases of essay writing — with time allocations</h2>
          <p style={{ ...S.body, marginBottom: 16 }}>
            Most students spend 70% of their time researching and 30% writing. The correct ratio is the opposite. This essay planner enforces research-backed time splits so you actually have time to write and edit.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { phase: '01', pct: '10%', label: 'Topic selection & understanding', body: 'Re-read the brief, confirm the question, and identify your angle. Most students skip this — and write an essay that answers the wrong question.' },
              { phase: '02', pct: '25%', label: 'Research', body: 'Find 4–6 credible sources. Take structured notes — quote directly and note page numbers as you go. Stop at 6. More sources means less time to write.' },
              { phase: '03', pct: '10%', label: 'Outline', body: 'Build a bullet-point structure: thesis, three main arguments, supporting evidence for each, counterargument, conclusion. An outline takes 20 minutes and saves 3 hours of rewriting.' },
              { phase: '04', pct: '40%', label: 'First draft', body: 'Write the entire draft without editing. Follow your outline. Bad sentences are fixable. Missing sentences are not. The goal is a complete draft, not a perfect one.' },
              { phase: '05', pct: '15%', label: 'Editing & proofreading', body: 'Read for argument clarity first (big picture), then for sentence quality (small picture), then proofread for typos. These are three different tasks — do not conflate them.' },
            ].map((p) => (
              <div key={p.phase} style={{ display: 'flex', gap: 14, ...S.card }}>
                <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 44 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{p.phase}</span>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-violet)', lineHeight: 1 }}>{p.pct}</p>
                </div>
                <div>
                  <h3 style={S.h3}>{p.label}</h3>
                  <p style={{ ...S.body, fontSize: '0.79rem' }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Essay types ── */}
        <section aria-labelledby="essay-types" style={S.section}>
          <h2 id="essay-types" style={S.h2}>Works for every type of essay</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 10 }}>
            {[
              { title: 'Argumentative essay', body: 'Claim, evidence, counterargument, rebuttal. The outline phase is critical — map your argument before you write a word.' },
              { title: 'Analytical essay', body: 'Close reading, textual evidence, interpretation. Research here means rereading and annotating, not just searching databases.' },
              { title: 'Discursive essay', body: 'Balanced perspectives across multiple paragraphs. The outline determines whether the structure is coherent before you draft.' },
              { title: 'Reflective essay', body: 'Personal experience meets theory. The drafting phase is heavier here — budget more time than you think you need.' },
              { title: 'Compare and contrast', body: 'Two-subject structure requires an outline first. You will save time by deciding on a point-by-point or block structure before drafting.' },
            ].map((t) => (
              <article key={t.title} style={S.card}>
                <h3 style={S.h3}>{t.title}</h3>
                <p style={{ ...S.body, fontSize: '0.78rem' }}>{t.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── AI assistant for essay ── */}
        <section aria-labelledby="essay-ai" style={S.section}>
          <h2 id="essay-ai" style={S.h2}>AI essay assistant — built into your plan</h2>
          <p style={{ ...S.body, marginBottom: 16 }}>
            Once you generate your essay plan, the AI assistant activates with full context of your essay topic, type, and deadline. It is not a generic chatbot — it is an essay-specific tool designed to give you a starting point for each phase.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Find 3 relevant academic sources for your essay topic',
              'Generate a thesis-based outline with introduction angle, 3 main arguments, and conclusion direction',
              'Write a starter paragraph for your introduction, any body paragraph, or conclusion',
              'Improve a paragraph you have already written — grammar, clarity, argument strength',
              'Answer specific questions about your essay at any point in the writing process',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <span style={{ color: 'var(--accent-emerald)', flexShrink: 0, fontSize: '0.8rem', marginTop: 1 }}>✓</span>
                <p style={{ ...S.body, fontSize: '0.8rem' }}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="essay-faq" style={S.section}>
          <h2 id="essay-faq" style={S.h2}>Essay planner FAQ</h2>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { q: 'How long does it take to plan an essay?', a: 'With this tool, under two minutes. Enter your type, start date, and due date — the plan is generated instantly. The outlining phase itself (one of the five phases) should take 20–30 minutes for most essays. Students who spend time on an outline consistently produce better essays with less rewriting.' },
              { q: 'How do I plan an essay in one day?', a: 'If you have one day, use the last-minute planner at planner.ai/last-minute which creates an hour-by-hour schedule. For a one-day essay: spend 90 minutes on research (max 4 sources), 30 minutes on a bullet outline, then write continuously for 4–5 hours. Leave 60 minutes for editing. Do not skip the outline step — it is the fastest way to write.' },
              { q: 'How do I plan an essay in a week?', a: 'A week is a comfortable window. Day 1–2: research (4–6 sources, structured notes). Day 3: build your outline. Day 4–5: write the full draft. Day 6: revise for argument clarity. Day 7: proofread, citations, submission formatting. Enter your 7-day window above and the planner generates these allocations automatically.' },
              { q: 'What is the correct structure for an essay?', a: 'Introduction (10–15%): hook, context, thesis statement. Body paragraphs (70–80%): each paragraph addresses one main point with evidence and analysis — no padding. Conclusion (10–15%): restate the thesis in light of the evidence, synthesise rather than summarise. The outline phase of this planner walks you through this structure for your specific essay.' },
              { q: 'Can I use the AI essay planner without getting caught for plagiarism?', a: 'Yes. The AI assistant produces outlines, source suggestions, and paragraph starters — not finished essays. You can use it openly as academic support, in the same way you would use a writing centre or tutoring service. All writing in your submission is yours. The AI helps you plan and begin; it does not complete the work.' },
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
            <a href="/" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Assignment Planner (all types)</a>
            <a href="/study-planner" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Study Planner</a>
            <a href="/assignment-planner" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Assignment Planner Guide</a>
            <a href="/last-minute" style={{ fontSize: '0.76rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>Last-Minute Planner</a>
          </div>
        </div>

      </main>

      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Planner.ai</a> — Free essay planner and AI writing assistant for students. No signup required.
        </p>
      </footer>
    </div>
  )
}
