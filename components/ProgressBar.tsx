'use client'

import { useEffect, useState } from 'react'
import { Task, formatDate } from '@/lib/timeline'

interface ProgressBarProps {
  tasks: Task[]
  startDate: Date
  dueDate: Date
}

const SEGMENT_COLORS = [
  { bg: '#4f8ef7' },
  { bg: '#9b6dff' },
  { bg: '#34d399' },
  { bg: '#f59e0b' },
  { bg: '#f43f5e' },
  { bg: '#06b6d4' },
]

export default function ProgressBar({ tasks, startDate, dueDate }: ProgressBarProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150)
    return () => clearTimeout(t)
  }, [])

  const totalDays = Math.ceil((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  const segments = tasks.map((task, i) => {
    const days = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return {
      ...task,
      width: Math.max(2, (days / totalDays) * 100),
      color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
    }
  })

  return (
    <div>
      {/* Date endpoints */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{formatDate(startDate)}</span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{totalDays} days</span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{formatDate(dueDate)}</span>
      </div>

      {/* Bar — aria-hidden; the TaskList below is the accessible representation */}
      <div
        aria-hidden
        style={{ display: 'flex', height: 8, borderRadius: 99, overflow: 'hidden', gap: 2, background: 'var(--bg-hover)', padding: '2px' }}
      >
        {segments.map((seg, i) => (
          <div
            key={i}
            title={seg.phase}
            style={{
              height: '100%', borderRadius: 99,
              background: seg.color.bg,
              width: mounted ? `${seg.width}%` : '0%',
              transition: `width 0.6s cubic-bezier(.22,1,.36,1) ${i * 60}ms`,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div aria-hidden style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 12 }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: seg.color.bg, flexShrink: 0 }} />
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{seg.phase}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
