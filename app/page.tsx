// ─────────────────────────────────────────────────────────────────────────────
// app/page.tsx — Homepage
// Server Component: every heading, paragraph, and list item ships as raw HTML.
// Interactive islands (PlannerIsland, ReviewSection) are isolated client chunks.
//
// SEO STRATEGY
//   H1  → primary keyword + emotional hook ("Stop staring at a blank page")
//   H2s → target keyword clusters: procrastination, how it works, AI assistant,
//          assignment types, audience, reviews, FAQ
//   FAQs → structured data mirrors layout.tsx FAQPage schema
//
// CONVERSION STRATEGY
//   Above fold: pain → solution → social proof → tool → no-friction CTA
//   Mid-page:   trust, differentiation, academic integrity reassurance
//   Bottom:     repeat CTA, reinforce free + no-signup positioning
// ─────────────────────────────────────────────────────────────────────────────

import { Suspense } from 'react'
import PlannerIsland from '@/components/PlannerIsland'
import ReviewSection from '@/components/ReviewSection'

// ─── Shared primitive styles ──────────────────────────────────────────────────
const S = {
  section: { paddingBottom: 56, borderTop: '1px solid var(--border)', paddingTop: 56 } as React.CSSProperties,
  h2: { fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' } as React.CSSProperties,
  lead: { fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 } as React.CSSProperties,
  card: { background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px' } as React.CSSProperties,
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', position: 'relative', overflowX: 'hidden' }}>

      {/* ── Decorative background ──────────────────────────────────── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '55vw', height: '55vw', maxWidth: 600, maxHeight: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.13) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '5%', right: '-15%', width: '45vw', height: '45vw', maxWidth: 500, maxHeight: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,109,255,0.10) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '30%', width: '40vw', height: '40vw', maxWidth: 450, maxHeight: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)' }} />
      </div>

      {/* ── Nav ────────────────────────────────────────────────────── */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid var(--border)', background: 'rgba(12,14,20,0.80)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Planner.ai logo" width={30} height={30} style={{ borderRadius: 6, display: 'block' }} />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Planner<span style={{ color: 'var(--accent-blue)' }}>.ai</span>
          </span>
        </a>
        {/* Nav links — crawlable internal links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a href="/essay-planner" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, display: 'none' }} className="nav-link-md">Essay Planner</a>
          <a href="/study-planner" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, display: 'none' }} className="nav-link-md">Study Planner</a>
          <a href="/last-minute" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Last-Minute</a>
          <div aria-label="Free to use" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 99, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)' }}>
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', display: 'block' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent-emerald)', letterSpacing: '0.04em' }}>Free</span>
          </div>
        </div>
      </nav>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main id="main-content" style={{ position: 'relative', zIndex: 10, maxWidth: 600, margin: '0 auto', padding: '44px 20px 80px' }}>

        {/* ════════════════════════════════════════════════════════════
            HERO — above the fold
            Goal: hook on pain, state solution clearly, earn the scroll
            ════════════════════════════════════════════════════════════ */}
        <header style={{ textAlign: 'center', marginBottom: 40 }}>

          {/* Badge — category signal */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', marginBottom: 24 }}>
            <span aria-hidden style={{ fontSize: '0.75rem' }}>✦</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Free AI Assignment Planner — No Signup</span>
          </div>

          {/* H1 — primary keyword embedded naturally, emotional hook first */}
          <h1 style={{ fontSize: 'clamp(2rem, 6.5vw, 3rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: 18, color: 'var(--text-primary)' }}>
            Stop staring at a blank page.{' '}
            <span className="gradient-text">Start your assignment</span>
            {' '}in minutes.
          </h1>

          {/* Subheadline — outcome-first, keyword-rich, no jargon */}
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            Enter your assignment and deadline. Get an instant phase-by-phase study plan — with a built-in AI assistant that helps you find sources, build your outline, and write your first paragraph. Free for every student, forever.
          </p>

          {/* Social proof — real quote from seed review */}
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 16, fontStyle: 'italic' }}>
            ★★★★★ &ldquo;It breaks everything into chunks my overwhelmed brain can actually handle.&rdquo; — Sofia R., university student
          </p>

          {/* Trust pills — scannable, crawlable */}
          <ul aria-label="Key features" style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px 18px', marginTop: 20 }}>
            {[
              { icon: '✦', text: 'AI assistant built in', violet: true },
              { icon: '⚡', text: 'Plan in under 60 seconds' },
              { icon: '📅', text: 'Export to Google Calendar' },
              { icon: '🔗', text: 'Share with your study group' },
              { icon: '🔒', text: 'No account required' },
            ].map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span aria-hidden style={{ fontSize: '0.78rem', color: f.violet ? 'var(--accent-violet)' : undefined }}>{f.icon}</span>
                <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)', fontWeight: 500 }}>{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Primary CTA — scrolls to tool */}
          <div style={{ marginTop: 28 }}>
            <a
              href="#main-content"
              onClick={(e) => { e.preventDefault(); document.getElementById('planner-tool')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', fontSize: '0.9rem', fontWeight: 700, borderRadius: 12, textDecoration: 'none' }}
            >
              Build my assignment plan — free
              <span aria-hidden>→</span>
            </a>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 9 }}>
              Works for essays, research papers, lab reports, projects &amp; presentations
            </p>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════
            INTERACTIVE TOOL — the product itself
            ════════════════════════════════════════════════════════════ */}
        <div id="planner-tool">
          <Suspense fallback={
            <div style={{ height: 420, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, marginBottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 20, height: 20, border: '2px solid var(--border-mid)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%', animation: 'spinnerRotate 0.7s linear infinite' }} />
            </div>
          }>
            <PlannerIsland />
          </Suspense>
        </div>

        {/* ════════════════════════════════════════════════════════════
            HOW IT WORKS — 3 steps max (conversion best practice)
            ════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="how-it-works" style={S.section}>
          <h2 id="how-it-works" style={S.h2}>How it works — 3 steps</h2>
          <p style={S.lead}>
            From deadline panic to a clear, actionable plan in under a minute. No account. No fluff.
          </p>
          <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                n: '1',
                title: 'Enter your assignment + deadline',
                body: 'Pick your assignment type — essay, research paper, presentation, project, or lab report — and add your start and due date. Takes under 30 seconds.',
              },
              {
                n: '2',
                title: 'Get your phase-by-phase plan instantly',
                body: 'Planner.ai breaks your available time into research-backed phases with exact date ranges. Each phase shows what to do, how long to spend, and what good progress looks like.',
              },
              {
                n: '3',
                title: 'Use the AI assistant to actually start',
                body: 'The built-in assistant already knows your assignment title, type, and deadline. Ask it to find your sources, draft your outline, or write your opening paragraph — and go.',
              },
            ].map((step) => (
              <li key={step.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 18px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-blue)', flexShrink: 0, lineHeight: 1.3 }}>{step.n}</span>
                <div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{step.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ════════════════════════════════════════════════════════════
            VALUE PROPOSITION — what makes this different
            Avoids naming competitors; implies superiority through specifics
            ════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="value-prop" style={S.section}>
          <h2 id="value-prop" style={S.h2}>Not another AI that writes your essays</h2>
          <p style={S.lead}>
            Most AI tools either do too little (a generic to-do list) or too much (writing the whole essay for you — which you cannot submit). Planner.ai sits in the gap your professors actually want to see: structured academic support that keeps the thinking yours.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginBottom: 20 }}>
            {[
              {
                icon: '🗺️',
                title: 'A plan, not just a prompt',
                body: 'Every output is phase-specific. You get guidance matched to where you actually are in the assignment — not a generic response to a generic question.',
              },
              {
                icon: '🎯',
                title: 'Context-aware from the start',
                body: 'The AI knows your assignment title, type, and deadline before you type a word. No re-explaining. No copy-pasting your brief into a chat box.',
              },
              {
                icon: '🛡️',
                title: 'Designed for academic integrity',
                body: 'Every response is intentionally partial. The assistant gives you a starting point — not a finished product. You can use it openly alongside your work.',
              },
              {
                icon: '🔓',
                title: 'Free, instant, no account',
                body: 'No subscription. No signup wall. No "free trial with credit card." Enter your assignment, get your plan, start working. That is it.',
              },
            ].map((v) => (
              <article key={v.title} style={S.card}>
                <p style={{ fontSize: '1.1rem', marginBottom: 8 }} aria-hidden>{v.icon}</p>
                <h3 style={{ fontSize: '0.87rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 }}>{v.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{v.body}</p>
              </article>
            ))}
          </div>

          {/* Academic integrity trust signal */}
          <div style={{ padding: '14px 18px', background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.18)', borderRadius: 12 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>A note on academic integrity:</strong>{' '}
              Planner.ai is academic support software — the same category as writing centres, tutoring, and study skills resources. It helps students plan and structure their work. It does not write assignments. Every AI output is a partial prompt designed to help you begin, not a submission-ready draft.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            WHY STUDENTS PROCRASTINATE — topical authority
            Targets: "how to stop procrastinating on assignments",
                     "how to start writing an assignment",
                     "blank page anxiety students"
            ════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="why-procrastinate" style={S.section}>
          <h2 id="why-procrastinate" style={S.h2}>Why students procrastinate on assignments — and how to stop</h2>
          <p style={S.lead}>
            Research consistently finds that assignment procrastination is not laziness. It is caused by two specific triggers: not knowing where to start, and the task feeling too large to face as a single unit. The fix for both is identical — break the work into small, named steps with a concrete first action.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                icon: '🧠',
                title: 'The blank page problem',
                body: 'An empty document gives your brain no foothold. The question "how do I write this essay?" triggers avoidance because there is no clear answer. A phase-by-phase plan replaces that question with a specific, small task: "spend 90 minutes finding three sources on X."',
              },
              {
                icon: '📐',
                title: 'The overwhelm problem',
                body: 'A 3,000-word essay due in 10 days is impossible as a single task. Broken into six phases with time allocations — research, outline, draft, edit, proofread — it becomes six manageable sessions. This planner calculates the exact split based on your assignment type and deadline.',
              },
              {
                icon: '✦',
                title: 'The "I don\'t know what to actually do" problem',
                body: 'Even with a plan, many students freeze at the first phase. The AI assistant solves this directly: it gives you three sources to read, an outline to follow, and a first paragraph to build from. You always have something concrete to do next.',
              },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', ...S.card }}>
                <span aria-hidden style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: '0.87rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            AI ASSISTANT DEEP-DIVE
            ════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="ai-assistant" style={S.section}>
          <h2 id="ai-assistant" style={S.h2}>Built-in AI assignment assistant — every phase, every type</h2>
          <p style={S.lead}>
            The AI assistant is embedded inside your plan, not bolted on as a separate chat. It already knows your title, assignment type, and deadline — so every response is specific to your work. Five tools, one purpose: getting you unstuck.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: 10, marginBottom: 16 }}>
            {[
              { icon: '📚', title: 'Find sources', body: '3 credible academic sources with summaries and key takeaways, matched to your topic. Enough to start — not so many you spend an hour just reading.' },
              { icon: '🗂️', title: 'Generate outline', body: 'A structured outline with thesis direction, three main points with sub-bullets, and a conclusion angle — built for your assignment type.' },
              { icon: '✍️', title: 'Write your first paragraph', body: 'A 3–5 sentence starter for any section — Introduction, Discussion, Body 1. The hardest sentence is always the first.' },
              { icon: '✨', title: 'Improve your draft', body: 'Paste up to 500 characters and get targeted grammar, clarity, and structure feedback with an explanation of every change.' },
              { icon: '💬', title: 'Ask your assignment', body: 'Direct chat with an AI that knows your assignment. It keeps responses concise and redirects you back to your own thinking.' },
            ].map((f) => (
              <article key={f.title} style={S.card}>
                <p style={{ fontSize: '1.1rem', marginBottom: 8 }} aria-hidden>{f.icon}</p>
                <h3 style={{ fontSize: '0.87rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{f.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.body}</p>
              </article>
            ))}
          </div>
          {/* Subtle internal link to /essay-planner */}
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Writing an essay?{' '}
            <a href="/essay-planner" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>See how the essay planner works →</a>
          </p>
        </section>

        {/* ════════════════════════════════════════════════════════════
            ASSIGNMENT TYPES
            ════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="assignment-types" style={S.section}>
          <h2 id="assignment-types" style={S.h2}>A planner built for every assignment type</h2>
          <p style={S.lead}>
            Every assignment has a different workflow. This planner uses research-backed phase weightings tuned to each format — because an essay and a lab report have nothing in common.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: 12 }}>
            {[
              {
                icon: '✍️',
                title: 'Essay planner',
                body: 'Five phases: topic selection (10%), research (25%), outline (10%), draft (40%), edit (15%). Calibrated to prevent the classic mistake: over-researching and running out of time to write.',
                href: '/essay-planner',
              },
              {
                icon: '🔬',
                title: 'Research paper planner',
                body: 'Six phases across literature review, methodology, analysis, writing, citations, and revision. Designed for citation-heavy undergraduate and postgraduate work.',
                href: '/assignment-planner',
              },
              {
                icon: '🎤',
                title: 'Presentation planner',
                body: 'Dedicated time for research, slide design, speaker notes, and rehearsal — the phase most students skip and then regret on the day.',
                href: null,
              },
              {
                icon: '⚙️',
                title: 'Project planner',
                body: 'Scoping, discovery, prototype, execution, testing, documentation — structured for engineering, design, and business deliverables.',
                href: null,
              },
              {
                icon: '🧪',
                title: 'Lab report planner',
                body: 'Pre-lab, data collection, analysis, discussion, write-up, proofread — six phases for STEM students at high school and university level.',
                href: null,
              },
            ].map((t) => (
              <article key={t.title} style={S.card}>
                <p style={{ fontSize: '1.1rem', marginBottom: 8 }} aria-hidden>{t.icon}</p>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 }}>{t.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: t.href ? 10 : 0 }}>{t.body}</p>
                {t.href && (
                  <a href={t.href} style={{ fontSize: '0.73rem', color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'none' }}>
                    Learn more →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            LAST-MINUTE BANNER — internal link + urgency hook
            ════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 56, padding: '16px 20px', background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.16)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>🚨 Deadline tonight or tomorrow?</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Switch to the last-minute planner — hour-by-hour scheduling built around your exact deadline time and timezone.
            </p>
          </div>
          <a href="/last-minute" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f43f5e', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 9, padding: '9px 16px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Open last-minute planner →
          </a>
        </div>

        {/* ════════════════════════════════════════════════════════════
            WHO THIS IS FOR — audience targeting
            ════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="who-uses" style={S.section}>
          <h2 id="who-uses" style={S.h2}>Built for every type of student</h2>
          <p style={S.lead}>
            Whether you need a college assignment planner, a university assignment planner, or a free high school homework planner — Planner.ai adapts to your deadline, your assignment type, and how much time you have.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: 10 }}>
            {[
              { icon: '🎓', title: 'University students', body: 'Dissertations, research papers, and long-form essays. The AI assistant is especially useful for getting unstuck on literature reviews.' },
              { icon: '📚', title: 'College students', body: 'Term papers, group projects, semester presentations. Use the share link to coordinate with your study group.' },
              { icon: '🏫', title: 'High school students', body: 'English essays, science lab reports, history assignments. Any assignment with a due date.' },
              { icon: '⏰', title: 'Last-minute deadline', body: 'Dedicated last-minute planner creates an hour-by-hour schedule from your exact deadline time.' },
            ].map((t) => (
              <div key={t.title} style={S.card}>
                <p aria-hidden style={{ fontSize: '1rem', marginBottom: 6 }}>{t.icon}</p>
                <h3 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{t.title}</h3>
                <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            TRUST SIGNALS ROW
            ════════════════════════════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginBottom: 56 }}>
          {[
            { stat: '100%', label: 'Free — always' },
            { stat: '5 types', label: 'Assignment formats' },
            { stat: '< 60s', label: 'Plan generation' },
            { stat: '0', label: 'Signups required' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '14px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12 }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em' }}>{s.stat}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 3 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════
            REVIEWS — social proof
            ════════════════════════════════════════════════════════════ */}
        <Suspense fallback={
          <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: 48 }}>
            <div style={{ width: 20, height: 20, border: '2px solid var(--border-mid)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%', animation: 'spinnerRotate 0.7s linear infinite' }} />
          </div>
        }>
          <ReviewSection />
        </Suspense>

        {/* ════════════════════════════════════════════════════════════
            BOTTOM CTA — repeat before FAQ
            ════════════════════════════════════════════════════════════ */}
        <div style={{ textAlign: 'center', padding: '40px 20px', marginBottom: 0, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 18, marginTop: 12 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginBottom: 10 }}>
            Ready to stop procrastinating?
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 22, maxWidth: 380, margin: '0 auto 22px' }}>
            Enter your assignment above — your plan will be ready before you finish your coffee. No signup. Completely free.
          </p>
          <a
            href="#planner-tool"
            onClick={(e) => { e.preventDefault(); document.getElementById('planner-tool')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', fontSize: '0.88rem', fontWeight: 700, borderRadius: 11, textDecoration: 'none' }}
          >
            Build my plan — it&rsquo;s free
            <span aria-hidden>↑</span>
          </a>
        </div>

        {/* ════════════════════════════════════════════════════════════
            FAQ — structured data mirrors layout.tsx FAQPage schema
            Targets 12 high-volume question queries
            ════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="faq" style={{ ...S.section, paddingBottom: 20 }}>
          <h2 id="faq" style={{ ...S.h2, marginBottom: 24 }}>Frequently asked questions</h2>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                q: 'How do I start an assignment when I have no idea where to begin?',
                a: 'Open Planner.ai, enter your assignment type and due date, and generate your plan before anything else. You will immediately have a specific first task — "spend 90 minutes finding 3 sources" — instead of a blank page. Once you have a concrete first action, the procrastination barrier breaks. The AI assistant then gives you those sources, an outline, and a first paragraph to build from.',
              },
              {
                q: 'What is the best free assignment planner for students?',
                a: 'For students who need help actually completing assignments — not just tracking them — Planner.ai combines a phase-by-phase deadline calculator with a built-in AI study assistant. Generic homework tracker apps tell you when things are due but offer no help with the work itself. Planner.ai is built for the moment you sit down to start an assignment and need structured guidance.',
              },
              {
                q: 'How do I stop procrastinating on homework?',
                a: 'Assignment procrastination is almost always caused by two things: not knowing where to start, and the task feeling too large. Both are solved the same way — a specific, phase-by-phase plan that gives you one small first action. Use this planner to create your plan before you open a single document.',
              },
              {
                q: 'How do I plan an essay in 3 days?',
                a: 'Day 1: 2–3 hours of research, then build a tight bullet-point outline. Day 2: write the full draft from start to finish without editing as you go. Day 3: revise for argument clarity in the morning, fix citations and proofread in the afternoon. Enter your 3-day window and the planner generates the exact time allocation automatically.',
              },
              {
                q: 'How do I write a research paper in a week?',
                a: 'Days 1–2: research and note-taking. Day 3: outline. Days 4–5: write the full draft. Day 6: revise and strengthen the argument. Day 7: citations, formatting, proofread. Set your deadline to 7 days and the research paper planner generates this breakdown automatically.',
              },
              {
                q: 'What does the AI assignment assistant do?',
                a: 'The AI assistant is embedded in your plan and pre-loaded with your title, type, and deadline. It can find 3 credible sources, generate a structured outline, expand any section into a starter paragraph, improve your draft text, and answer questions about your specific assignment — without writing the assignment for you.',
              },
              {
                q: 'How do I plan a last-minute assignment?',
                a: 'For deadlines within 24 hours, use the last-minute assignment planner at planner.ai/last-minute. It asks for your current time, your deadline time, and timezone — then generates an hour-by-hour schedule for the exact hours you have available.',
              },
              {
                q: 'Does this work for university and college assignments?',
                a: 'Yes. Phase weightings are modelled on academic writing workflows at university level. The research paper and essay planners are designed for citation-heavy assignments. The project planner covers engineering, design, and business deliverables.',
              },
              {
                q: 'Can I add my assignment schedule to Google Calendar?',
                a: 'Yes — once your plan is generated, click "Add to Calendar" to download a .ics file. It imports into Google Calendar, Apple Calendar, and Outlook. Each phase becomes a separate event with a reminder.',
              },
              {
                q: 'Is this assignment planner free?',
                a: 'Completely free. No account, no signup, no payment. Enter your details and your plan is ready instantly. The AI assistant is also free.',
              },
              {
                q: 'Is this cheating? Can I use this with my professor\'s knowledge?',
                a: 'Planner.ai is academic support software — the same category as writing centres, tutoring, and university study skills resources. It helps you plan and structure your work. The AI outputs are intentionally partial: starter paragraphs, source lists, and outlines — not finished essays. You can use it openly. Many instructors encourage structured planning tools.',
              },
              {
                q: 'What makes this different from other AI writing tools?',
                a: 'Most AI tools either track due dates (no help with the work) or write everything for you (academic integrity risk). Planner.ai sits in between: it gives you a structured plan and phase-specific guidance designed to help you do the work — not replace you. The AI is context-aware from the start, so every response is specific to your actual assignment.',
              },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
                <dt style={{ fontSize: '0.91rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 7 }}>{item.q}</dt>
                <dd style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--border)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <nav aria-label="Site navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px' }}>
            <a href="/" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Assignment Planner</a>
            <a href="/essay-planner" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Essay Planner</a>
            <a href="/study-planner" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Study Planner</a>
            <a href="/assignment-planner" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Assignment Planner Guide</a>
            <a href="/last-minute" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Last-Minute Planner</a>
            <a href="/#ai-assistant" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>AI Assistant</a>
            <a href="/#why-procrastinate" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Stop Procrastinating</a>
            <a href="/#reviews-heading" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Reviews</a>
            <a href="/#faq" style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>FAQ</a>
          </nav>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Planner.ai — free AI assignment planner for students fighting procrastination and blank-page anxiety.
            Phase-by-phase planning for essays, research papers, presentations, projects, and lab reports.
            Built-in AI study assistant. No account required. Completely free.
          </p>
        </div>
      </footer>
    </div>
  )
}
