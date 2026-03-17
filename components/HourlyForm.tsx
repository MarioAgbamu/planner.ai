'use client'

import { useState, useId, useEffect } from 'react'
import { AssignmentType, HourlyInput } from '@/lib/timeline'

interface HourlyFormProps {
  onSubmit: (input: HourlyInput) => void
  isLoading?: boolean
}

const ASSIGNMENT_TYPES: { value: AssignmentType; label: string; icon: string }[] = [
  { value: 'essay', label: 'Essay', icon: '✍️' },
  { value: 'research_paper', label: 'Research Paper', icon: '🔬' },
  { value: 'presentation', label: 'Presentation', icon: '🎤' },
  { value: 'project', label: 'Project', icon: '⚙️' },
  { value: 'lab_report', label: 'Lab Report', icon: '🧪' },
]

// Build timezone list from Intl API — label + UTC offset string
function buildTimezones(): { value: string; label: string; offset: number }[] {
  const zones = [
    'Pacific/Honolulu', 'America/Anchorage', 'America/Los_Angeles', 'America/Denver',
    'America/Chicago', 'America/New_York', 'America/Halifax', 'America/St_Johns',
    'America/Sao_Paulo', 'Atlantic/Azores', 'Europe/London', 'Europe/Paris',
    'Europe/Helsinki', 'Europe/Moscow', 'Asia/Dubai', 'Asia/Karachi',
    'Asia/Kolkata', 'Asia/Dhaka', 'Asia/Bangkok', 'Asia/Singapore',
    'Asia/Tokyo', 'Australia/Sydney', 'Pacific/Auckland',
  ]
  const now = Date.now()
  return zones.map(tz => {
    try {
      const fmt = new Intl.DateTimeFormat('en', { timeZone: tz, timeZoneName: 'short' })
      const parts = fmt.formatToParts(now)
      const tzName = parts.find(p => p.type === 'timeZoneName')?.value ?? tz
      // Get offset in minutes
      const utcDate = new Date(now)
      const localStr = utcDate.toLocaleString('en-CA', { timeZone: tz, hour12: false,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit' })
      const localDate = new Date(localStr.replace(',', ''))
      const offset = Math.round((localDate.getTime() - utcDate.getTime()) / 60000)
      const sign = offset >= 0 ? '+' : '-'
      const absH = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0')
      const absM = (Math.abs(offset) % 60).toString().padStart(2, '0')
      return { value: tz, label: `UTC${sign}${absH}:${absM} — ${tz.replace('_', ' ')} (${tzName})`, offset }
    } catch {
      return { value: tz, label: tz, offset: 0 }
    }
  })
}

/** Convert a local YYYY-MM-DD + HH:MM string + tz offset into a UTC Date */
function toUTC(dateStr: string, timeStr: string, tzOffsetMinutes: number): Date {
  const [y, mo, d] = dateStr.split('-').map(Number)
  const [h, m] = timeStr.split(':').map(Number)
  // Local time = UTC + offset, so UTC = local - offset
  const localMs = Date.UTC(y, mo - 1, d, h, m, 0)
  return new Date(localMs - tzOffsetMinutes * 60 * 1000)
}

/** Get user's browser timezone */
function getBrowserTz(): string {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone } catch { return 'America/New_York' }
}

/** Get current local time as HH:MM string in the browser's timezone */
function nowLocalTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false })
}

/** Get today's date as YYYY-MM-DD */
function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

/** Get tomorrow's date as YYYY-MM-DD */
function tomorrowStr(): string {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function HourlyForm({ onSubmit, isLoading }: HourlyFormProps) {
  const uid = useId()
  const timezones = buildTimezones()

  // Detect user's timezone on mount
  const [detectedTz, setDetectedTz] = useState('America/New_York')
  useEffect(() => {
    const browserTz = getBrowserTz()
    const match = timezones.find(t => t.value === browserTz)
    if (match) setDetectedTz(browserTz)
  }, []) // eslint-disable-line

  const [form, setForm] = useState({
    title: '',
    type: '' as AssignmentType | '',
    startDate: todayStr(),
    startTime: nowLocalTime(),
    dueDate: todayStr(),
    dueTime: '23:59',
    timezone: detectedTz,
  })

  // Sync timezone when detected on mount
  useEffect(() => {
    setForm(f => ({ ...f, timezone: detectedTz, startTime: nowLocalTime() }))
  }, [detectedTz])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focused, setFocused] = useState<string | null>(null)

  const selectedTz = timezones.find(t => t.value === form.timezone)
  const tzOffset = selectedTz?.offset ?? 0

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = 'Please enter an assignment title.'
    if (!form.type) e.type = 'Please select an assignment type.'
    if (!form.startTime) e.startTime = 'Required.'
    if (!form.dueTime) e.dueTime = 'Required.'

    const startUTC = toUTC(form.startDate, form.startTime, tzOffset)
    const dueUTC = toUTC(form.dueDate, form.dueTime, tzOffset)
    const msRemaining = dueUTC.getTime() - startUTC.getTime()
    const minsRemaining = Math.floor(msRemaining / 60000)

    if (msRemaining <= 0) {
      e.dueTime = 'Due time must be after your start time.'
    } else if (minsRemaining < 30) {
      e.dueTime = 'You need at least 30 minutes to generate a meaningful plan.'
    } else if (minsRemaining > 24 * 60) {
      e.dueTime = 'For deadlines over 24 hours away, use the standard planner above.'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const startUTC = toUTC(form.startDate, form.startTime, tzOffset)
    const dueUTC = toUTC(form.dueDate, form.dueTime, tzOffset)
    onSubmit({
      title: form.title.trim(),
      type: form.type as AssignmentType,
      startDateTime: startUTC,
      dueDateTime: dueUTC,
      tzOffsetMinutes: tzOffset,
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

  // Compute live preview of available time
  let previewMins = 0
  try {
    const s = toUTC(form.startDate, form.startTime, tzOffset)
    const d = toUTC(form.dueDate, form.dueTime, tzOffset)
    previewMins = Math.max(0, Math.floor((d.getTime() - s.getTime()) / 60000))
  } catch { /* ignore */ }
  const previewH = Math.floor(previewMins / 60)
  const previewM = previewMins % 60
  const previewLabel = previewMins > 0
    ? previewH > 0 ? `${previewH}h ${previewM > 0 ? previewM + 'm' : ''} available` : `${previewM}m available`
    : ''

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Alert banner */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.18)', borderRadius: 12 }}>
        <span aria-hidden style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>🚨</span>
        <div>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f43f5e', marginBottom: 2 }}>Deadline within 24 hours</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            This mode creates an hour-by-hour plan. Enter your current time, your deadline time, and your timezone so we can calculate exactly what you can do.
          </p>
        </div>
      </div>

      {/* Assignment title */}
      <div>
        <label htmlFor={`${uid}-title`} style={lStyle}>Assignment Title</label>
        <input
          id={`${uid}-title`}
          type="text"
          placeholder="e.g., Climate Change Essay"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          onFocus={() => setFocused('title')}
          onBlur={() => setFocused(null)}
          style={iStyle('title')}
          maxLength={120}
          aria-invalid={!!errors.title}
        />
        {errors.title && <Err>{errors.title}</Err>}
      </div>

      {/* Assignment type */}
      <div>
        <p id={`${uid}-type`} style={lStyle}>Assignment Type</p>
        <div role="radiogroup" aria-labelledby={`${uid}-type`}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 7 }}>
          {ASSIGNMENT_TYPES.map(t => {
            const sel = form.type === t.value
            return (
              <button key={t.value} type="button" role="radio" aria-checked={sel}
                onClick={() => setForm({ ...form, type: t.value })}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 5, padding: '10px 8px', borderRadius: 10,
                  border: `1px solid ${sel ? 'rgba(244,63,94,0.4)' : 'var(--border-mid)'}`,
                  background: sel ? 'rgba(244,63,94,0.10)' : 'var(--bg-hover)',
                  cursor: 'pointer', transition: 'all 0.15s ease', outline: 'none',
                  boxShadow: sel ? '0 0 0 1px rgba(244,63,94,0.25)' : 'none',
                }}>
                <span aria-hidden style={{ fontSize: '1.1rem' }}>{t.icon}</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: sel ? '#f43f5e' : 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>{t.label}</span>
              </button>
            )
          })}
        </div>
        {errors.type && <Err>{errors.type}</Err>}
      </div>

      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* Timezone */}
      <div>
        <label htmlFor={`${uid}-tz`} style={lStyle}>Your Timezone</label>
        <select
          id={`${uid}-tz`}
          value={form.timezone}
          onChange={e => setForm({ ...form, timezone: e.target.value })}
          onFocus={() => setFocused('tz')}
          onBlur={() => setFocused(null)}
          style={{ ...iStyle('tz'), cursor: 'pointer' }}
        >
          {timezones.map(tz => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
      </div>

      {/* Start time */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <label htmlFor={`${uid}-startTime`} style={{ ...lStyle, marginBottom: 0 }}>I'm starting now</label>
          <button
            type="button"
            onClick={() => setForm({ ...form, startDate: todayStr(), startTime: nowLocalTime() })}
            style={{
              fontSize: '0.68rem', color: 'var(--accent-blue)', background: 'rgba(79,142,247,0.08)',
              border: '1px solid rgba(79,142,247,0.2)', borderRadius: 6, padding: '3px 8px',
              cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600,
            }}
          >
            Use current time
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label htmlFor={`${uid}-startDate`} style={{ ...lStyle, fontSize: '0.65rem', marginBottom: 5 }}>Date</label>
            <input
              id={`${uid}-startDate`}
              type="date"
              value={form.startDate}
              max={tomorrowStr()}
              onChange={e => setForm({ ...form, startDate: e.target.value })}
              onFocus={() => setFocused('startDate')}
              onBlur={() => setFocused(null)}
              style={iStyle('startDate')}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-startTime`} style={{ ...lStyle, fontSize: '0.65rem', marginBottom: 5 }}>Time</label>
            <input
              id={`${uid}-startTime`}
              type="time"
              value={form.startTime}
              onChange={e => setForm({ ...form, startTime: e.target.value })}
              onFocus={() => setFocused('startTime')}
              onBlur={() => setFocused(null)}
              style={iStyle('startTime')}
              aria-invalid={!!errors.startTime}
            />
            {errors.startTime && <Err>{errors.startTime}</Err>}
          </div>
        </div>
      </div>

      {/* Due time */}
      <div>
        <label style={{ ...lStyle, marginBottom: 8 }}>Assignment due</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label htmlFor={`${uid}-dueDate`} style={{ ...lStyle, fontSize: '0.65rem', marginBottom: 5 }}>Date</label>
            <input
              id={`${uid}-dueDate`}
              type="date"
              value={form.dueDate}
              min={form.startDate}
              max={tomorrowStr()}
              onChange={e => setForm({ ...form, dueDate: e.target.value })}
              onFocus={() => setFocused('dueDate')}
              onBlur={() => setFocused(null)}
              style={iStyle('dueDate')}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-dueTime`} style={{ ...lStyle, fontSize: '0.65rem', marginBottom: 5 }}>Time</label>
            <input
              id={`${uid}-dueTime`}
              type="time"
              value={form.dueTime}
              onChange={e => setForm({ ...form, dueTime: e.target.value })}
              onFocus={() => setFocused('dueTime')}
              onBlur={() => setFocused(null)}
              style={iStyle('dueTime')}
              aria-invalid={!!errors.dueTime}
            />
            {errors.dueTime && <Err>{errors.dueTime}</Err>}
          </div>
        </div>

        {/* Live time preview */}
        {previewMins > 0 && (
          <div style={{ marginTop: 10, padding: '8px 12px', background: previewMins < 120 ? 'rgba(244,63,94,0.07)' : 'rgba(79,142,247,0.07)', border: `1px solid ${previewMins < 120 ? 'rgba(244,63,94,0.2)' : 'rgba(79,142,247,0.2)'}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span aria-hidden style={{ fontSize: '0.9rem' }}>{previewMins < 120 ? '⚠️' : '⏱️'}</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: previewMins < 120 ? '#f43f5e' : 'var(--accent-blue)' }}>
              {previewLabel}
              {previewMins < 120 && ' — very tight, move fast'}
            </span>
          </div>
        )}
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
          opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: 'linear-gradient(135deg, #f43f5e, #f59e0b)',
        }}
      >
        {isLoading
          ? <><Spinner /><span>Building your plan...</span></>
          : <><span>Generate Hour-by-Hour Plan</span><span aria-hidden>→</span></>
        }
      </button>
    </form>
  )
}

function Err({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
      <span aria-hidden>⚠</span>{children}
    </p>
  )
}

function Spinner() {
  return <span aria-hidden style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spinnerRotate 0.7s linear infinite' }} />
}
