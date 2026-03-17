'use client'

// FIX: urgency and daysLeft are now computed at render time — not from stale
// stored state — so the badge is always current even if the tab is left open.
import { getDaysRemaining, getUrgencyLevel } from '@/lib/timeline'

interface UrgencyIndicatorProps {
  dueDate: Date
}

const CONFIG = {
  plenty: {
    label: 'Plenty of time',
    sub: 'You are well ahead of schedule.',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
    dot: '#34d399',
    glow: 'rgba(52,211,153,0.4)',
    text: '#34d399',
    badge: 'rgba(52,211,153,0.12)',
    icon: '🌿',
    pulse: false,
  },
  tight: {
    label: 'Tight schedule',
    sub: 'Stay focused — every day counts.',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    dot: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    text: '#f59e0b',
    badge: 'rgba(245,158,11,0.12)',
    icon: '⏳',
    pulse: true,
  },
  urgent: {
    label: 'Start immediately',
    sub: 'Critical deadline — begin right now.',
    bg: 'rgba(244,63,94,0.08)',
    border: 'rgba(244,63,94,0.2)',
    dot: '#f43f5e',
    glow: 'rgba(244,63,94,0.4)',
    text: '#f43f5e',
    badge: 'rgba(244,63,94,0.12)',
    icon: '🚨',
    pulse: true,
  },
}

export default function UrgencyIndicator({ dueDate }: UrgencyIndicatorProps) {
  // Computed live at render — never stale
  const urgency = getUrgencyLevel(dueDate)
  const daysLeft = getDaysRemaining(dueDate)
  const cfg = CONFIG[urgency]

  const daysLabel = daysLeft > 0
    ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`
    : 'Due today'

  return (
    <div
      role="status"
      aria-label={`Urgency: ${cfg.label}. ${daysLabel}.`}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', borderRadius: 12,
        background: cfg.bg, border: `1px solid ${cfg.border}`,
      }}
    >
      {/* Pulsing dot — aria-hidden, the role="status" above carries the meaning */}
      <div aria-hidden style={{ position: 'relative', flexShrink: 0, width: 10, height: 10 }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: cfg.dot,
          boxShadow: `0 0 8px ${cfg.glow}`,
        }} />
        {/*
          FIX: prefers-reduced-motion guard in globals.css handles disabling
          this animation globally. The inline animation declaration stays for
          browsers that don't have the preference set.
        */}
        {cfg.pulse && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: cfg.dot, opacity: 0.4,
            animation: 'dotPulse 1.5s ease-in-out infinite',
          }} />
        )}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span aria-hidden style={{ fontSize: '0.82rem', fontWeight: 700, color: cfg.text }}>
            {cfg.icon} {cfg.label}
          </span>
          <span style={{
            fontSize: '0.68rem', padding: '2px 8px', borderRadius: 99,
            background: cfg.badge, color: cfg.text,
            fontFamily: 'var(--font-mono)', fontWeight: 600,
          }}>
            {daysLabel}
          </span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{cfg.sub}</p>
      </div>
    </div>
  )
}
