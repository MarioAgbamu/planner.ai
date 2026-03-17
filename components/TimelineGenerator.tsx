'use client'

import { useState } from 'react'
import {
  Task, AssignmentInput,
  getAssignmentTypeLabel, getTotalDays, generateICS,
} from '@/lib/timeline'
import ProgressBar from './ProgressBar'
import TaskList from './TaskList'
import UrgencyIndicator from './UrgencyIndicator'

interface TimelineGeneratorProps {
  input: AssignmentInput
  tasks: Task[]
  onReset: () => void
  onShare?: () => void
}

export default function TimelineGenerator({ input, tasks, onReset, onShare }: TimelineGeneratorProps) {
  const [downloading, setDownloading] = useState(false)
  // FIX: surface ICS export errors to the user instead of silently swallowing them
  const [exportError, setExportError] = useState<string | null>(null)

  const totalDays = getTotalDays(input.startDate, input.dueDate)

  const handleExportICS = async () => {
    setDownloading(true)
    setExportError(null)
    try {
      const ics = generateICS(input.title, tasks)
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${input.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_schedule.ics`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      // FIX: show a user-facing error message on export failure
      setExportError('Export failed. Try copying the schedule manually or use a different browser.')
      console.error('ICS export error:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Back button */}
      <button
        type="button"
        onClick={onReset}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
          color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-sans)',
          transition: 'color 0.15s', width: 'fit-content',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <span aria-hidden>←</span> New plan
      </button>

      {/* Assignment summary card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79,142,247,0.08) 0%, rgba(155,109,255,0.06) 100%)',
        border: '1px solid rgba(79,142,247,0.18)',
        borderRadius: 16, padding: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '3px 10px', borderRadius: 99,
              background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.2)',
              marginBottom: 8,
            }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {getAssignmentTypeLabel(input.type)}
                {input.pages ? ` · ${input.pages} pages` : ''}
              </span>
            </div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
              {input.title}
            </h2>
          </div>
          {/* Day count badge */}
          <div
            aria-label={`${totalDays} days total`}
            style={{
              flexShrink: 0, textAlign: 'center',
              padding: '8px 14px', borderRadius: 12,
              background: 'var(--bg-hover)', border: '1px solid var(--border-mid)',
            }}
          >
            <p aria-hidden style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {totalDays}
            </p>
            <p aria-hidden style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 2 }}>days</p>
          </div>
        </div>

        {/* FIX: UrgencyIndicator no longer receives urgency prop — computes live */}
        <UrgencyIndicator dueDate={input.dueDate} />
      </div>

      {/* Timeline bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '18px 20px' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
          <span aria-hidden>📊 </span>Timeline Overview
        </p>
        <ProgressBar tasks={tasks} startDate={input.startDate} dueDate={input.dueDate} />
      </div>

      {/* Task list */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: '0 2px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span aria-hidden>📋 </span>Your Schedule · {tasks.length} phases
          </p>
          <span aria-hidden style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>click to expand</span>
        </div>
        <TaskList tasks={tasks} />
      </div>

      {/* Action buttons */}
      <div style={{
        display: 'grid',
        // FIX: stack buttons on narrow screens to prevent "Add to Calendar" text wrapping
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: 10, paddingTop: 4,
      }}>
        <button
          type="button"
          onClick={handleExportICS}
          disabled={downloading}
          aria-busy={downloading}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '12px 16px', borderRadius: 12,
            border: '1px solid rgba(79,142,247,0.3)',
            background: 'rgba(79,142,247,0.08)',
            color: 'var(--accent-blue)', fontSize: '0.82rem', fontWeight: 600,
            fontFamily: 'var(--font-sans)', cursor: downloading ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s ease', opacity: downloading ? 0.6 : 1,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => !downloading && (e.currentTarget.style.background = 'rgba(79,142,247,0.14)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(79,142,247,0.08)')}
        >
          {downloading
            ? <><Spinner /><span>Exporting…</span></>
            : <><span aria-hidden>📅</span><span>Add to Calendar</span></>
          }
        </button>

        <button
          type="button"
          onClick={onReset}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '12px 16px', borderRadius: 12,
            border: '1px solid var(--border-mid)',
            background: 'var(--bg-hover)',
            color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600,
            fontFamily: 'var(--font-sans)', cursor: 'pointer',
            transition: 'all 0.15s ease', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-raised)'; e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          <span aria-hidden>↺</span><span>New Plan</span>
        </button>

        {/* Share button — copies shareable URL to clipboard */}
        {onShare && (
          <button
            type="button"
            onClick={onShare}
            title="Copy a shareable link to this plan"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              padding: '12px 16px', borderRadius: 12,
              border: '1px solid rgba(155,109,255,0.3)',
              background: 'rgba(155,109,255,0.08)',
              color: 'var(--accent-violet)', fontSize: '0.82rem', fontWeight: 600,
              fontFamily: 'var(--font-sans)', cursor: 'pointer',
              transition: 'all 0.15s ease', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(155,109,255,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(155,109,255,0.08)')}
          >
            <span aria-hidden>🔗</span><span>Share Plan</span>
          </button>
        )}
      </div>

      {/* FIX: ICS export error — surfaced to user instead of silently swallowed */}
      {exportError && (
        <div
          role="alert"
          style={{
            padding: '10px 14px', borderRadius: 10,
            background: 'rgba(244,63,94,0.08)',
            border: '1px solid rgba(244,63,94,0.2)',
            fontSize: '0.78rem', color: 'var(--accent-rose)',
            lineHeight: 1.5,
          }}
        >
          <span aria-hidden>⚠ </span>{exportError}
        </div>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <span
      aria-hidden
      style={{
        width: 14, height: 14,
        border: '2px solid rgba(79,142,247,0.3)',
        borderTopColor: 'var(--accent-blue)',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'spinnerRotate 0.7s linear infinite',
      }}
    />
  )
}
