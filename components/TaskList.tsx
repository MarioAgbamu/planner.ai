'use client'

import { useState } from 'react'
import { Task, formatDateRange } from '@/lib/timeline'

interface TaskListProps { tasks: Task[] }

const COLORS = [
  { accent: '#4f8ef7', bg: 'rgba(79,142,247,0.08)', border: 'rgba(79,142,247,0.2)', num: 'rgba(79,142,247,0.9)' },
  { accent: '#9b6dff', bg: 'rgba(155,109,255,0.08)', border: 'rgba(155,109,255,0.2)', num: 'rgba(155,109,255,0.9)' },
  { accent: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)', num: 'rgba(52,211,153,0.9)' },
  { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', num: 'rgba(245,158,11,0.9)' },
  { accent: '#f43f5e', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.2)', num: 'rgba(244,63,94,0.9)' },
  { accent: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', num: 'rgba(6,182,212,0.9)' },
]

export default function TaskList({ tasks }: TaskListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    // FIX: role="list" + role="listitem" so screen readers announce item count
    <div role="list" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {tasks.map((task, i) => {
        const c = COLORS[i % COLORS.length]
        const isOpen = expandedIndex === i
        const days = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

        return (
          <div key={i} role="listitem" className="animate-fade-up" style={{ animationDelay: `${i * 55}ms` }}>
            {/*
              FIX: Replace <div onClick> with a proper <button> element.
              - Keyboard-focusable via Tab by default
              - Activatable via Enter/Space by default
              - aria-expanded communicates open/closed state to screen readers
              - aria-controls links the button to the panel it controls
            */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`task-panel-${i}`}
              id={`task-header-${i}`}
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
                padding: '13px 16px',
                textAlign: 'left',
                // FIX: suppress default button outline in favour of our global :focus-visible rule
                outline: 'none',
              }}
            >
              {/* Step number */}
              <div aria-hidden style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                border: `1.5px solid ${c.accent}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 700, color: c.num,
                fontFamily: 'var(--font-mono)',
                background: isOpen ? c.bg : 'transparent',
                transition: 'background 0.2s',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon + info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                  <span aria-hidden style={{ fontSize: '0.95rem' }}>{task.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    {task.phase}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {formatDateRange(task.startDate, task.endDate)}
                  </span>
                  <span style={{
                    fontSize: '0.65rem', padding: '1px 7px', borderRadius: 99,
                    background: 'var(--bg-hover)', color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {days}d
                  </span>
                </div>
              </div>

              {/* FIX: chevron has aria-hidden since aria-expanded on the button conveys state */}
              <div
                aria-hidden
                style={{
                  color: 'var(--text-muted)', fontSize: '0.6rem',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.25s ease', flexShrink: 0,
                }}
              >▼</div>
            </button>

            {/* Expanded panel */}
            {isOpen && (
              <div
                id={`task-panel-${i}`}
                role="region"
                aria-labelledby={`task-header-${i}`}
                style={{
                  padding: '14px 16px 16px',
                  border: `1px solid ${c.border}`,
                  borderTop: 'none',
                  borderRadius: '0 0 14px 14px',
                  background: c.bg,
                }}
              >
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>
                  {task.description}
                </p>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Action tips
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {task.tips.map((tip, j) => (
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
  )
}
