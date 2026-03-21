'use client'

import { useState, useEffect, useId } from 'react'

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  assignmentType: string
  date: string
  verified: boolean
}

// ─── Star component ───────────────────────────────────────────────────────────

function Stars({
  rating, interactive = false, size = 16, onRate,
}: {
  rating: number
  interactive?: boolean
  size?: number
  onRate?: (n: number) => void
}) {
  const [hover, setHover] = useState(0)
  const display = interactive ? (hover || rating) : rating

  return (
    <div
      role={interactive ? 'radiogroup' : undefined}
      aria-label={interactive ? 'Rating' : `${rating} out of 5 stars`}
      style={{ display: 'flex', gap: 2 }}
    >
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          role={interactive ? 'radio' : undefined}
          aria-checked={interactive ? rating === n : undefined}
          aria-label={interactive ? `${n} star${n !== 1 ? 's' : ''}` : undefined}
          onClick={interactive && onRate ? () => onRate(n) : undefined}
          onMouseEnter={interactive ? () => setHover(n) : undefined}
          onMouseLeave={interactive ? () => setHover(0) : undefined}
          style={{
            background: 'none', border: 'none', padding: 0,
            cursor: interactive ? 'pointer' : 'default',
            fontSize: size, lineHeight: 1,
            filter: n <= display
              ? 'none'
              : 'grayscale(1) opacity(0.3)',
            transition: 'filter 0.12s',
          }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// ─── Avatar initials ──────────────────────────────────────────────────────────

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const colors = [
    ['rgba(79,142,247,0.15)', '#4f8ef7'],
    ['rgba(155,109,255,0.15)', '#9b6dff'],
    ['rgba(52,211,153,0.15)', '#34d399'],
    ['rgba(245,158,11,0.15)', '#f59e0b'],
    ['rgba(244,63,94,0.15)', '#f43f5e'],
    ['rgba(6,182,212,0.15)', '#06b6d4'],
  ]
  const [bg, fg] = colors[name.charCodeAt(0) % colors.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, border: `1.5px solid ${fg}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700, color: fg,
      flexShrink: 0, letterSpacing: '0.02em',
    }}>
      {initials}
    </div>
  )
}

// ─── Aggregate stats ──────────────────────────────────────────────────────────

function RatingStats({ reviews }: { reviews: Review[] }) {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  const counts = [5, 4, 3, 2, 1].map(n => ({
    n,
    count: reviews.filter(r => r.rating === n).length,
    pct: Math.round((reviews.filter(r => r.rating === n).length / reviews.length) * 100),
  }))

  return (
    <div style={{
      display: 'flex', gap: 24, alignItems: 'center',
      padding: '20px', background: 'var(--bg-surface)',
      border: '1px solid var(--border)', borderRadius: 14,
      marginBottom: 20, flexWrap: 'wrap',
    }}>
      {/* Big number */}
      <div style={{ textAlign: 'center', minWidth: 80 }}>
        <p style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
          {avg.toFixed(1)}
        </p>
        <Stars rating={Math.round(avg)} size={14} />
        <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>
          {reviews.length} reviews
        </p>
      </div>

      {/* Bar breakdown */}
      <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {counts.map(({ n, count, pct }) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', width: 10, textAlign: 'right', flexShrink: 0 }}>{n}</span>
            <span style={{ fontSize: '0.75rem', color: '#f59e0b', flexShrink: 0, lineHeight: 1 }}>★</span>
            <div style={{ flex: 1, height: 5, background: 'var(--bg-hover)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                width: `${pct}%`,
                background: n >= 4 ? 'var(--accent-emerald)' : n === 3 ? 'var(--accent-amber)' : 'var(--accent-rose)',
                transition: 'width 0.8s cubic-bezier(.22,1,.36,1)',
              }} />
            </div>
            <span style={{ fontSize: '0.67rem', color: 'var(--text-muted)', width: 20, flexShrink: 0 }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Single review card ───────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.date).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <div style={{
      padding: '16px 18px', background: 'var(--bg-surface)',
      border: '1px solid var(--border)', borderRadius: 14,
      animation: 'fadeUp 0.35s ease both',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <Avatar name={review.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {review.name}
            </span>
            {review.verified && (
              <span style={{
                fontSize: '0.62rem', fontWeight: 700, padding: '1px 7px',
                borderRadius: 99, background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.25)',
                color: 'var(--accent-emerald)', letterSpacing: '0.04em',
              }}>
                ✓ Verified
              </span>
            )}
            <span style={{
              fontSize: '0.65rem', padding: '1px 7px', borderRadius: 99,
              background: 'var(--bg-hover)', border: '1px solid var(--border-mid)',
              color: 'var(--text-muted)',
            }}>
              {review.assignmentType}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Stars rating={review.rating} size={13} />
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{date}</span>
          </div>
        </div>
      </div>
      <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        {review.comment}
      </p>
    </div>
  )
}

// ─── Submit form ──────────────────────────────────────────────────────────────

const ASSIGNMENT_TYPES = ['Essay', 'Research Paper', 'Presentation', 'Project', 'Lab Report', 'General']

function SubmitForm({ onSubmit }: { onSubmit: (r: Review) => void }) {
  const uid = useId()
  const [form, setForm] = useState({ name: '', rating: 0, comment: '', assignmentType: 'General' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.comment.trim() || form.rating === 0) {
      setError('Please fill in your name, a star rating, and a comment.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to submit')
      onSubmit(data.review)
      setSuccess(true)
      setForm({ name: '', rating: 0, comment: '', assignmentType: 'General' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const lStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.7rem', fontWeight: 600,
    color: 'var(--text-secondary)', letterSpacing: '0.06em',
    textTransform: 'uppercase', marginBottom: 7,
  }
  const iStyle: React.CSSProperties = {
    width: '100%', background: 'var(--bg-hover)',
    border: '1px solid var(--border-mid)', borderRadius: 10,
    color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem', padding: '10px 13px', transition: 'border 0.15s',
  }

  if (success) {
    return (
      <div style={{
        padding: '20px', textAlign: 'center',
        background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)',
        borderRadius: 14,
      }}>
        <p style={{ fontSize: '1.2rem', marginBottom: 6 }}>✓</p>
        <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: 4 }}>
          Thanks for your review!
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          Your feedback helps other students find this planner.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          style={{
            marginTop: 14, background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.75rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-sans)',
            textDecoration: 'underline',
          }}
        >
          Leave another review
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{
      padding: '20px', background: 'var(--bg-raised)',
      border: '1px solid var(--border-mid)', borderRadius: 14,
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        Leave a review
      </p>

      {/* Rating */}
      <div>
        <label style={lStyle}>Your rating</label>
        <Stars
          rating={form.rating}
          interactive
          size={28}
          onRate={n => setForm({ ...form, rating: n })}
        />
      </div>

      {/* Name + type row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <label htmlFor={`${uid}-name`} style={lStyle}>First name</label>
          <input
            id={`${uid}-name`}
            type="text"
            placeholder="e.g. Sarah"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            maxLength={40}
            style={iStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-type`} style={lStyle}>Assignment type</label>
          <select
            id={`${uid}-type`}
            value={form.assignmentType}
            onChange={e => setForm({ ...form, assignmentType: e.target.value })}
            style={{ ...iStyle, cursor: 'pointer' }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
          >
            {ASSIGNMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor={`${uid}-comment`} style={lStyle}>Your experience</label>
        <textarea
          id={`${uid}-comment`}
          placeholder="How did the planner help you? What assignment were you working on?"
          value={form.comment}
          onChange={e => setForm({ ...form, comment: e.target.value })}
          maxLength={500}
          rows={3}
          style={{ ...iStyle, resize: 'vertical', lineHeight: 1.6 }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
        />
        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4 }}>
          {form.comment.length} / 500
        </p>
      </div>

      {error && (
        <p role="alert" style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span aria-hidden>⚠</span> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{
          padding: '11px 20px', fontSize: '0.85rem', fontWeight: 700,
          borderRadius: 10, opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        }}
      >
        {loading
          ? <><Spinner />Submitting…</>
          : <><span>Submit Review</span><span aria-hidden>→</span></>
        }
      </button>
    </form>
  )
}

function Spinner() {
  return (
    <span style={{
      width: 14, height: 14,
      border: '2px solid rgba(255,255,255,0.25)',
      borderTopColor: '#fff', borderRadius: '50%',
      display: 'inline-block',
      animation: 'spinnerRotate 0.7s linear infinite',
    }} />
  )
}

// ─── Main ReviewSection component ────────────────────────────────────────────

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => {
        if (data.reviews) setReviews(data.reviews)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleNewReview = (review: Review) => {
    setReviews(prev => [review, ...prev])
  }

  const displayed = showAll ? reviews : reviews.slice(0, 4)

  return (
    <section
      aria-labelledby="reviews-heading"
      style={{ paddingBottom: 64, borderTop: '1px solid var(--border)', paddingTop: 48 }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <h2
          id="reviews-heading"
          style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          What students say
        </h2>
        {!loading && reviews.length > 0 && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {reviews.length} reviews
          </span>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
          <div style={{ width: 20, height: 20, border: '2px solid var(--border-mid)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%', animation: 'spinnerRotate 0.7s linear infinite' }} />
        </div>
      ) : (
        <>
          {reviews.length > 0 && <RatingStats reviews={reviews} />}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {displayed.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>

          {reviews.length > 4 && !showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              style={{
                width: '100%', padding: '11px', borderRadius: 10,
                border: '1px solid var(--border-mid)', background: 'var(--bg-hover)',
                color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600,
                fontFamily: 'var(--font-sans)', cursor: 'pointer', marginBottom: 20,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-raised)'; e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              Show all {reviews.length} reviews
            </button>
          )}

          <SubmitForm onSubmit={handleNewReview} />
        </>
      )}
    </section>
  )
}
