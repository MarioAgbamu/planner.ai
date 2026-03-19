'use client'

import { useState } from 'react'
import { TimeBlock, HourlyInput, getAssignmentTypeLabel, formatTime, formatDuration, getHoursRemaining } from '@/lib/timeline'
import AIAssistant from './AIAssistant'
import type { AssignmentInput } from '@/lib/timeline'

interface HourlyTimelineProps {
  input: HourlyInput
  blocks: TimeBlock[]
  onReset: () => void
}

const BLOCK_COLORS = [
  { accent: '#f43f5e', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.22)', num: 'rgba(244,63,94,0.9)' },
  { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)', num: 'rgba(245,158,11,0.9)' },
  { accent: '#4f8ef7', bg: 'rgba(79,142,247,0.08)', border: 'rgba(79,142,247,0.22)', num: 'rgba(79,142,247,0.9)' },
  { accent: '#9b6dff', bg: 'rgba(155,109,255,0.08)', border: 'rgba(155,109,255,0.22)', num: 'rgba(155,109,255,0.9)' },
  { accent: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.22)', num: 'rgba(52,211,153,0.9)' },
]

export default function HourlyTimeline({ input, blocks, onReset }: HourlyTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const tz = input.tzOffsetMinutes
  const { hours, minutes } = getHoursRemaining(input.dueDateTime)

  const totalMinutes = blocks.reduce((s, b) => s + b.durationMinutes, 0)

  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Back */}
      <button type="button" onClick={onReset}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-sans)', transition: 'color 0.15s', width: 'fit-content' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <span aria-hidden>←</span> New plan
      </button>

      {/* Summary card */}
      <div style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.08) 0%, rgba(245,158,11,0.05) 100%)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 16, padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 99, background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.25)', marginBottom: 8 }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#f43f5e', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                🚨 {getAssignmentTypeLabel(input.type)} · Urgent Mode
              </span>
            </div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
              {input.title}
            </h2>
          </div>
          {/* Countdown badge */}
          <div aria-label={`${hours} hours ${minutes} minutes remaining`}
            style={{ flexShrink: 0, textAlign: 'center', padding: '8px 12px', borderRadius: 12, background: 'var(--bg-hover)', border: '1px solid var(--border-mid)', minWidth: 64 }}>
            <p aria-hidden style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f43f5e', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {hours > 0 ? `${hours}h` : `${minutes}m`}
            </p>
            <p aria-hidden style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 2 }}>
              {hours > 0 && minutes > 0 ? `${minutes}m left` : 'left'}
            </p>
          </div>
        </div>

        {/* Start → End timeline pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 10, border: '1px solid var(--border-mid)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {formatTime(input.startDateTime, tz)}
          </span>
          <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #f43f5e, #f59e0b)', borderRadius: 99 }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f43f5e', fontFamily: 'var(--font-mono)' }}>
            {formatTime(input.dueDateTime, tz)} deadline
          </span>
        </div>

        {/* Duration bar */}
        <div style={{ marginTop: 12, display: 'flex', gap: 2, height: 6, borderRadius: 99, overflow: 'hidden', background: 'var(--bg-hover)', padding: '1px' }}>
          {blocks.map((b, i) => (
            <div key={i} style={{
              height: '100%', borderRadius: 99,
              background: BLOCK_COLORS[i % BLOCK_COLORS.length].accent,
              width: `${(b.durationMinutes / totalMinutes) * 100}%`,
              flexShrink: 0,
              transition: `width 0.6s cubic-bezier(.22,1,.36,1) ${i * 60}ms`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 10 }}>
          {blocks.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: BLOCK_COLORS[i % BLOCK_COLORS.length].accent, flexShrink: 0 }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{b.phase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time blocks list */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: '0 2px' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span aria-hidden>⏱️ </span>Hour-by-Hour Plan · {blocks.length} blocks
          </p>
          <span aria-hidden style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>tap to expand</span>
        </div>

        <div role="list" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {blocks.map((block, i) => {
            const c = BLOCK_COLORS[i % BLOCK_COLORS.length]
            const isOpen = expandedIndex === i
            return (
              <div key={i} role="listitem" className="animate-fade-up" style={{ animationDelay: `${i * 55}ms` }}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`block-panel-${i}`}
                  id={`block-header-${i}`}
                  onClick={() => setExpandedIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    borderRadius: isOpen ? '14px 14px 0 0' : 14,
                    border: `1px solid ${isOpen ? c.border : 'var(--border)'}`,
                    borderBottom: isOpen ? 'none' : undefined,
                    background: isOpen ? c.bg : 'var(--bg-surface)',
                    transition: 'all 0.22s ease',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 16px', textAlign: 'left', outline: 'none',
                  }}
                >
                  {/* Step number */}
                  <div aria-hidden style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, border: `1.5px solid ${c.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: c.num, fontFamily: 'var(--font-mono)', background: isOpen ? c.bg : 'transparent', transition: 'background 0.2s' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                      <span aria-hidden style={{ fontSize: '0.95rem' }}>{block.icon}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{block.phase}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {/* Time range in local time */}
                      <span style={{ fontSize: '0.72rem', color: c.num, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {formatTime(block.startTime, tz)} – {formatTime(block.endTime, tz)}
                      </span>
                      <span style={{ fontSize: '0.65rem', padding: '1px 7px', borderRadius: 99, background: 'var(--bg-hover)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {formatDuration(block.durationMinutes)}
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div aria-hidden style={{ color: 'var(--text-muted)', fontSize: '0.6rem', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease', flexShrink: 0 }}>▼</div>
                </button>

                {isOpen && (
                  <div id={`block-panel-${i}`} role="region" aria-labelledby={`block-header-${i}`}
                    style={{ padding: '14px 16px 16px', border: `1px solid ${c.border}`, borderTop: 'none', borderRadius: '0 0 14px 14px', background: c.bg }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>{block.description}</p>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                      Do this now
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {block.tips.map((tip, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <span aria-hidden style={{ color: c.accent, fontSize: '0.7rem', marginTop: 2, flexShrink: 0 }}>›</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, paddingTop: 4 }}>
        <button type="button" onClick={onReset}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '12px 16px', borderRadius: 12, border: '1px solid var(--border-mid)', background: 'var(--bg-hover)', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-sans)', cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-raised)'; e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          <span aria-hidden>↺</span><span>New Plan</span>
        </button>
      </div>

      {/* AI Assistant — convert HourlyInput to AssignmentInput shape */}
      <AIAssistant input={{
        title: input.title,
        type: input.type,
        startDate: input.startDateTime,
        dueDate: input.dueDateTime,
        pages: input.pages,
      } as AssignmentInput} />
    </div>
  )
}
