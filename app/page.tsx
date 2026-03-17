// Server Component — Googlebot receives complete HTML on first byte.
// Every h1, h2, h3, paragraph, and list item is crawlable with zero JS.
// The interactive planner is an isolated client island (PlannerIsland).

import { Suspense } from 'react'
import PlannerIsland from '@/components/PlannerIsland'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', position: 'relative', overflowX: 'hidden' }}>

      {/* Decorative background — aria-hidden, no SEO value */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '55vw', height: '55vw', maxWidth: 600, maxHeight: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.13) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '5%', right: '-15%', width: '45vw', height: '45vw', maxWidth: 500, maxHeight: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,109,255,0.10) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '30%', width: '40vw', height: '40vw', maxWidth: 450, maxHeight: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)' }} />
      </div>

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'rgba(12,14,20,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Planner.ai logo"
            width={32}
            height={32}
            style={{ borderRadius: 6, display: 'block', flexShrink: 0 }}
          />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Planner<span style={{ color: 'var(--accent-blue)' }}>.ai</span>
          </span>
        </div>
        <div aria-label="Service status: free to use" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)' }}>
          <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', display: 'block' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-emerald)', letterSpacing: '0.04em' }}>Free to use</span>
        </div>
      </nav>

      {/* ── Main ────────────────────────────────────────────────────── */}
      <main id="main-content" style={{ position: 'relative', zIndex: 10, maxWidth: 580, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* ── Hero — h1 contains primary keyword cluster ─────────────────── */}
        <header style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 99, background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', marginBottom: 22 }}>
            <span aria-hidden style={{ fontSize: '0.75rem' }}>✨</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-blue)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Free Assignment Planner</span>
          </div>

          {/* h1: primary + secondary keywords in natural language */}
          <h1 style={{ fontSize: 'clamp(1.9rem, 6vw, 2.75rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 14, color: 'var(--text-primary)' }}>
            Free online{' '}
            <span className="gradient-text">assignment planner</span>
            {' '}for students
          </h1>

          {/* Subheading: natural language with keyword variants */}
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            The free homework planner and study schedule generator built for college, university, and high school students. Enter your due date — get an instant, phase-by-phase plan. No signup.
          </p>

          {/* Feature pills — crawlable text, not icon-only */}
          <ul aria-label="Key features" style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 20px', marginTop: 20 }}>
            {[
              { icon: '✍️', text: 'Essays & research papers' },
              { icon: '🧪', text: 'Lab reports & projects' },
              { icon: '⚡', text: 'Instant schedule generation' },
              { icon: '📅', text: 'Export to Google Calendar' },
              { icon: '🔗', text: 'Shareable plan link' },
            ].map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span aria-hidden style={{ fontSize: '0.8rem' }}>{f.icon}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{f.text}</span>
              </li>
            ))}
          </ul>
        </header>

        {/* ── Interactive planner (client island) ──────────────────── */}
        <Suspense fallback={
          <div style={{ height: 420, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, marginBottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, border: '2px solid var(--border-mid)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%', animation: 'spinnerRotate 0.7s linear infinite' }} />
          </div>
        }>
          <PlannerIsland />
        </Suspense>

        {/* ── How it works ─────────────────────────────────────────── */}
        <section aria-labelledby="how-it-works" style={{ marginTop: 16, paddingBottom: 48, borderTop: '1px solid var(--border)', paddingTop: 48 }}>
          <h2 id="how-it-works" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' }}>
            How the assignment planner works
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
            Most students fail deadlines not because they lack ability, but because they start too late or plan too vaguely. This free academic planner takes your due date and works backward — dividing your available time into research-backed phases based on your assignment type.
          </p>
          <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { n: '01', label: 'Step 1', title: 'Enter your assignment details', body: 'Choose your assignment type — essay, research paper, presentation, project, or lab report — and enter your start date and due date.' },
              { n: '02', label: 'Step 2', title: 'Get a phase-by-phase study schedule', body: 'The study plan generator automatically divides your time into weighted phases: research, drafting, editing, and more — with exact date ranges for each.' },
              { n: '03', label: 'Step 3', title: 'Follow the plan and hit your deadline', body: 'Expand each phase to see actionable tips. Export the full schedule to Google Calendar or Apple Calendar as a .ics file, or share a link directly with classmates.' },
            ].map((step) => (
              <li key={step.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span aria-label={step.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-blue)', background: 'rgba(79,142,247,0.1)', padding: '4px 8px', borderRadius: 6, flexShrink: 0, marginTop: 2 }}>{step.n}</span>
                <div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{step.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Internal link to /last-minute — passes PageRank ──────── */}
        <div style={{ margin: '-16px 0 48px', padding: '14px 18px', background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Deadline tonight?</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Use our last-minute assignment planner — hour-by-hour scheduling for deadlines within 24 hours.</p>
          </div>
          <a href="/last-minute" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f43f5e', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 8, padding: '7px 14px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Open last-minute planner →
          </a>
        </div>

        {/* ── Assignment types — entity-level content ───────────────── */}
        <section aria-labelledby="assignment-types" style={{ paddingBottom: 48, borderTop: '1px solid var(--border)', paddingTop: 48 }}>
          <h2 id="assignment-types" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Planner for every assignment type
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
            Each assignment type has a different workflow. This online assignment deadline calculator uses research-backed phase weightings tailored to each format — so you always know what to work on and for how long.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { icon: '✍️', title: 'Essay planner', body: 'Splits your time across topic selection, research, outlining, drafting, and editing. Weighted 10 / 25 / 10 / 40 / 15.' },
              { icon: '🔬', title: 'Research paper planner', body: 'Covers literature review, data collection, analysis, writing, and revision across 6 distinct phases.' },
              { icon: '🎤', title: 'Presentation planner', body: 'Allocates time for research, slide design, scripting, and rehearsal — the step most students skip.' },
              { icon: '⚙️', title: 'Project planner', body: 'Scoping, discovery, prototyping, execution, testing, and final polish — structured for complex deliverables.' },
              { icon: '🧪', title: 'Lab report planner', body: 'Pre-lab prep, experiment, data analysis, discussion, write-up, and proofreading — built for STEM students.' },
            ].map((t) => (
              <article key={t.title} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: 8 }} aria-hidden>{t.icon}</p>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{t.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{t.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Who uses this planner — audience targeting section ────── */}
        <section aria-labelledby="who-uses" style={{ paddingBottom: 48, borderTop: '1px solid var(--border)', paddingTop: 48 }}>
          <h2 id="who-uses" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Built for every type of student
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>
            Whether you need a college assignment planner, a university assignment planner, or a high school homework planner — this tool adapts to your deadline and assignment type automatically.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {[
              { icon: '🎓', title: 'University students', body: 'Dissertation chapters, research papers, and long-form essays with tight marking criteria.' },
              { icon: '📚', title: 'College students', body: 'Term papers, group projects, and semester-end presentations across multiple courses.' },
              { icon: '🏫', title: 'High school students', body: 'English essays, science reports, history assignments, and STEM project timelines.' },
              { icon: '⏰', title: 'Last-minute planners', body: 'Compressed hour-by-hour plans for deadlines within 24 hours — panic handled.' },
            ].map((t) => (
              <div key={t.title} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px' }}>
                <p aria-hidden style={{ fontSize: '1rem', marginBottom: 6 }}>{t.icon}</p>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{t.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ — targets BoFu question queries, eligible for rich results ── */}
        <section aria-labelledby="faq" style={{ paddingBottom: 64, borderTop: '1px solid var(--border)', paddingTop: 48 }}>
          <h2 id="faq" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24, letterSpacing: '-0.02em' }}>
            Frequently asked questions
          </h2>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                q: 'How do I plan an essay in 3 days?',
                a: "With only 3 days, focus is everything. Day 1: spend 2–3 hours on research and build a tight outline. Day 2: write your full draft in one sitting — don't edit as you go. Day 3: revise for argument clarity in the morning, then proofread and check citations in the afternoon. Use this planner and set your due date 3 days out — it will generate the exact phase breakdown for your timeline.",
              },
              {
                q: 'What is an assignment planner?',
                a: 'An assignment planner is a tool that breaks a single assignment into smaller, time-boxed tasks based on your start date and due date. Rather than facing one large deadline, you work toward a series of smaller milestones — research by day 3, outline by day 4, first draft by day 8 — which dramatically reduces procrastination and last-minute panic.',
              },
              {
                q: 'How do I plan a last-minute assignment?',
                a: 'Enter today as your start date and your real due date. The planner will compress the phases to fit your remaining time, and the urgency indicator will flag how tight your schedule is. For very short deadlines, prioritise the writing phase — cut research short if needed, and leave at least 10–15% of your time for editing. For deadlines within 24 hours, use our dedicated last-minute planner.',
              },
              {
                q: 'Does this work for university and college assignments?',
                a: 'Yes. The phase weightings are modelled on academic writing workflows used at university level. The research paper and essay planners are specifically designed for longer, citation-heavy assignments. The project planner works for design, engineering, and business deliverables.',
              },
              {
                q: 'Can I add my assignment schedule to Google Calendar?',
                a: 'Yes — once your plan is generated, click "Add to Calendar" to download a .ics file. This file can be imported into Google Calendar, Apple Calendar, Outlook, and any other calendar app that supports the iCalendar format. Each phase is added as a separate multi-day event.',
              },
              {
                q: 'Is this assignment planner free?',
                a: 'Completely free. No account, no signup, no payment. Enter your details and get your plan instantly.',
              },
              {
                q: 'Can I share my assignment plan with a classmate or tutor?',
                a: 'Yes — once your plan is generated, click "Share Plan" to copy a link. Anyone who opens the link will see the same plan pre-loaded, ready to use. No login needed on either end.',
              },
              {
                q: 'Does the planner work for science lab reports?',
                a: 'Yes — select "Lab Report" as your assignment type. The planner creates a 6-phase schedule covering pre-lab preparation, data collection, analysis, discussion, write-up, and final proofread. It is designed for STEM students at both high school and university level.',
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

      {/* ── Footer — keyword-bearing crawlable links ─────────────────── */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--border)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Internal links — passes PageRank and helps Googlebot discover pages */}
          <nav aria-label="Site navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
            <a href="/" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Assignment Planner</a>
            <a href="/last-minute" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Last-Minute Planner</a>
            <a href="/#assignment-types" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Essay Planner</a>
            <a href="/#assignment-types" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Research Paper Planner</a>
            <a href="/#assignment-types" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>Lab Report Planner</a>
            <a href="/#faq" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>FAQ</a>
          </nav>
          {/* Tagline with keyword reinforcement */}
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Planner.ai — free online assignment planner for students fighting procrastination.
            Works for essays, research papers, presentations, projects, and lab reports.
            No signup. Completely free.
          </p>
        </div>
      </footer>
    </div>
  )
}
