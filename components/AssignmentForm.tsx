'use client'

import { useState, useId } from 'react'
import { AssignmentType, AssignmentInput, getMinDays } from '@/lib/timeline'

interface AssignmentFormProps {
  onSubmit: (input: AssignmentInput) => void
  isLoading?: boolean
}

const ASSIGNMENT_TYPES: {
  value: AssignmentType
  label: string
  icon: string
  desc: string
  color: string
  glow: string
}[] = [
  { value: 'essay', label: 'Essay', icon: '✍️', desc: 'Argumentative or analytical writing', color: 'rgba(79,142,247,0.12)', glow: 'rgba(79,142,247,0.3)' },
  { value: 'research_paper', label: 'Research Paper', icon: '🔬', desc: 'In-depth academic research', color: 'rgba(155,109,255,0.12)', glow: 'rgba(155,109,255,0.3)' },
  { value: 'presentation', label: 'Presentation', icon: '🎤', desc: 'Slides and public speaking', color: 'rgba(52,211,153,0.12)', glow: 'rgba(52,211,153,0.3)' },
  { value: 'project', label: 'Project', icon: '⚙️', desc: 'Builds, designs, or deliverables', color: 'rgba(245,158,11,0.12)', glow: 'rgba(245,158,11,0.3)' },
  { value: 'lab_report', label: 'Lab Report', icon: '🧪', desc: 'STEM lab write-up & analysis', color: 'rgba(6,182,212,0.12)', glow: 'rgba(6,182,212,0.3)' },
]

export default function AssignmentForm({ onSubmit, isLoading }: AssignmentFormProps) {
  // FIX: today is derived fresh each render so it never goes stale on long sessions.
  // We only use it as the initial state value once, so this is fine.
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    title: '',
    type: '' as AssignmentType | '',
    startDate: today,
    dueDate: '',
    pages: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focused, setFocused] = useState<string | null>(null)

  // FIX: useId generates stable, unique IDs for label/input association —
  // required for screen readers to announce labels on focus.
  const uid = useId()
  const ids = {
    title: `${uid}-title`,
    type: `${uid}-type`,
    startDate: `${uid}-startDate`,
    dueDate: `${uid}-dueDate`,
    pages: `${uid}-pages`,
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = 'Please enter an assignment title.'
    if (!form.type) e.type = 'Please select an assignment type.'
    if (!form.startDate) e.startDate = 'Required.'
    if (!form.dueDate) {
      e.dueDate = 'Required.'
    } else {
      // FIX: Compare as Date objects, not strings, to avoid locale edge cases.
      // Also block same-day (start === due) which produces a degenerate plan.
      const start = new Date(form.startDate + 'T00:00:00')
      const due = new Date(form.dueDate + 'T00:00:00')
      if (due <= start) {
        e.dueDate = 'Due date must be after the start date.'
      } else if (form.type) {
        // FIX: Enforce minimum viable timeline per assignment type
        const minDays = getMinDays(form.type as AssignmentType)
        const daysBetween = Math.ceil((due.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
        if (daysBetween < minDays) {
          e.dueDate = `${form.type === 'project' ? 'Projects' : 'This assignment type'} need at least ${minDays} days. Try extending your deadline.`
        }
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      title: form.title.trim(),
      type: form.type as AssignmentType,
      startDate: new Date(form.startDate + 'T00:00:00'),
      dueDate: new Date(form.dueDate + 'T00:00:00'),
      pages: form.pages ? parseInt(form.pages) : undefined,
    })
  }

  const iStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: focused === field ? 'var(--bg-raised)' : 'var(--bg-hover)',
    border: `1px solid ${errors[field] ? 'var(--accent-rose)' : focused === field ? 'var(--accent-blue)' : 'var(--border-mid)'}`,
    borderRadius: 10, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
    fontSize: '0.88rem', padding: '11px 14px', transition: 'all 0.15s ease',
    boxShadow: errors[field] ? '0 0 0 3px rgba(244,63,94,0.12)' : focused === field ? '0 0 0 3px var(--accent-blue-dim)' : 'none',
  })

  const lStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.72rem', fontWeight: 600,
    color: 'var(--text-secondary)', letterSpacing: '0.06em',
    textTransform: 'uppercase', marginBottom: 8,
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader icon="📋" gradient="135deg, #4f8ef7, #9b6dff" label="Assignment Details" />

      {/* Title */}
      <div>
        {/* FIX: htmlFor links label to input by id — screen readers announce label on focus */}
        <label htmlFor={ids.title} style={lStyle}>Assignment Title</label>
        <input
          id={ids.title}
          type="text"
          placeholder="e.g., The Impact of Climate Change on Coastal Cities"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          onFocus={() => setFocused('title')}
          onBlur={() => setFocused(null)}
          style={iStyle('title')}
          maxLength={120}
          aria-describedby={errors.title ? `${ids.title}-err` : undefined}
          aria-invalid={!!errors.title}
        />
        {errors.title && <Err id={`${ids.title}-err`}>{errors.title}</Err>}
      </div>

      {/* Assignment Type */}
      <div>
        {/* FIX: role="radiogroup" + aria-labelledby makes this a proper accessible
            radio group. Each button has role="radio" + aria-checked. */}
        <p id={ids.type} style={lStyle}>Assignment Type</p>
        <div
          role="radiogroup"
          aria-labelledby={ids.type}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}
        >
          {ASSIGNMENT_TYPES.map((type) => {
            const sel = form.type === type.value
            return (
              <button
                key={type.value}
                type="button"
                role="radio"
                aria-checked={sel}
                onClick={() => setForm({ ...form, type: type.value })}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  // FIX: reduce padding on small viewports via clamp
                  padding: 'clamp(8px, 2.5vw, 12px) clamp(8px, 3vw, 14px)',
                  borderRadius: 12,
                  border: `1px solid ${sel ? type.glow : 'var(--border-mid)'}`,
                  background: sel ? type.color : 'var(--bg-hover)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.18s ease',
                  boxShadow: sel ? `0 0 0 1px ${type.glow}` : 'none',
                  transform: sel ? 'scale(1.015)' : 'scale(1)',
                  // FIX: focus ring for keyboard navigation
                  outline: 'none',
                }}
                onFocus={(e) => { if (!sel) e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-blue)' }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = sel ? `0 0 0 1px ${type.glow}` : 'none' }}
              >
                <span aria-hidden style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>{type.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: '0.82rem', fontWeight: 600,
                    color: sel ? 'var(--text-primary)' : 'var(--text-secondary)',
                    marginBottom: 3, lineHeight: 1,
                    // FIX: prevent label overflow on narrow screens
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{type.label}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>{type.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
        {errors.type && <Err id={`${ids.type}-err`}>{errors.type}</Err>}
      </div>

      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* Dates */}
      <div>
        <SectionHeader icon="📅" gradient="135deg, #34d399, #4f8ef7" label="Timeline" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <div>
            {/* FIX: htmlFor on all date labels */}
            <label htmlFor={ids.startDate} style={lStyle}>Start Date</label>
            <input
              id={ids.startDate}
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              onFocus={() => setFocused('startDate')}
              onBlur={() => setFocused(null)}
              style={iStyle('startDate')}
              aria-describedby={errors.startDate ? `${ids.startDate}-err` : undefined}
              aria-invalid={!!errors.startDate}
            />
            {errors.startDate && <Err id={`${ids.startDate}-err`}>{errors.startDate}</Err>}
          </div>
          <div>
            <label htmlFor={ids.dueDate} style={lStyle}>Due Date</label>
            <input
              id={ids.dueDate}
              type="date"
              value={form.dueDate}
              min={form.startDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              onFocus={() => setFocused('dueDate')}
              onBlur={() => setFocused(null)}
              style={iStyle('dueDate')}
              aria-describedby={errors.dueDate ? `${ids.dueDate}-err` : undefined}
              aria-invalid={!!errors.dueDate}
            />
            {errors.dueDate && <Err id={`${ids.dueDate}-err`}>{errors.dueDate}</Err>}
          </div>
        </div>
      </div>

      {/* Pages */}
      <div>
        <label htmlFor={ids.pages} style={lStyle}>
          Page Count{' '}
          <span style={{ color: 'var(--text-muted)', textTransform: 'none', fontWeight: 400, letterSpacing: 0 }}>
            — optional
          </span>
        </label>
        <input
          id={ids.pages}
          type="number"
          min="1"
          max="500"
          placeholder="e.g., 10"
          value={form.pages}
          onChange={(e) => setForm({ ...form, pages: e.target.value })}
          onFocus={() => setFocused('pages')}
          onBlur={() => setFocused(null)}
          style={iStyle('pages')}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary"
        aria-busy={isLoading}
        style={{
          width: '100%', padding: '14px 24px', fontSize: '0.92rem', fontWeight: 700,
          letterSpacing: '-0.01em', marginTop: 4,
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        {isLoading ? (
          <><Spinner /><span className="shimmer-text">Generating your plan...</span></>
        ) : (
          <><span>Generate My Plan</span><span aria-hidden>→</span></>
        )}
      </button>
    </form>
  )
}

function SectionHeader({ icon, gradient, label }: { icon: string; gradient: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div aria-hidden style={{
        width: 22, height: 22, borderRadius: 6,
        background: `linear-gradient(${gradient})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
      }}>{icon}</div>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{label}</span>
    </div>
  )
}

function Err({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p
      id={id}
      role="alert"
      style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}
    >
      <span aria-hidden>⚠</span>{children}
    </p>
  )
}

function Spinner() {
  return (
    <span
      aria-hidden
      style={{
        width: 16, height: 16,
        border: '2px solid rgba(255,255,255,0.25)',
        borderTopColor: '#fff',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'spinnerRotate 0.7s linear infinite',
      }}
    />
  )
}
