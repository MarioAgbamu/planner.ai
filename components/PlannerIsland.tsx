'use client'

// Isolated client island — keeps page.tsx as a pure Server Component
// so Googlebot gets the full HTML on first response.
//
// OPPORTUNITY 11 — Shareable plan URL
// The assignment input is encoded into the URL as query params so any
// generated plan can be shared via a link. On mount, we read params
// and pre-fill the form + auto-generate the plan if all required fields
// are present. Zero backend needed — pure URL state.
//
// Param schema:
//   ?type=essay&start=2024-03-01&due=2024-03-14&title=My+Essay&pages=10

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AssignmentForm from './AssignmentForm'
import TimelineGenerator from './TimelineGenerator'
import { AssignmentInput, Task, AssignmentType, generateTimeline } from '@/lib/timeline'

type AppState = 'form' | 'result'

const VALID_TYPES: AssignmentType[] = ['essay', 'research_paper', 'presentation', 'project', 'lab_report']

function encodeParams(input: AssignmentInput): string {
  const p = new URLSearchParams({
    type: input.type,
    start: input.startDate.toISOString().split('T')[0],
    due: input.dueDate.toISOString().split('T')[0],
    title: input.title,
  })
  if (input.pages) p.set('pages', String(input.pages))
  return p.toString()
}

export default function PlannerIsland() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [appState, setAppState] = useState<AppState>('form')
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentInput, setCurrentInput] = useState<AssignmentInput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [shareToast, setShareToast] = useState(false)

  // On mount: read URL params and auto-generate if valid
  useEffect(() => {
    const type = searchParams.get('type') as AssignmentType | null
    const start = searchParams.get('start')
    const due = searchParams.get('due')
    const title = searchParams.get('title')
    const pages = searchParams.get('pages')

    if (type && VALID_TYPES.includes(type) && start && due && title) {
      const startDate = new Date(start + 'T00:00:00')
      const dueDate = new Date(due + 'T00:00:00')
      if (!isNaN(startDate.getTime()) && !isNaN(dueDate.getTime()) && dueDate > startDate) {
        const input: AssignmentInput = {
          type, startDate, dueDate, title,
          pages: pages ? parseInt(pages) : undefined,
        }
        const generated = generateTimeline(input)
        setTasks(generated)
        setCurrentInput(input)
        setAppState('result')
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (input: AssignmentInput) => {
    setIsLoading(true)
    requestAnimationFrame(() => {
      const generated = generateTimeline(input)
      setTasks(generated)
      setCurrentInput(input)
      setIsLoading(false)
      setAppState('result')
      // Update URL with encoded plan — enables sharing without navigation
      const params = encodeParams(input)
      router.replace(`?${params}`, { scroll: false })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const handleReset = () => {
    setAppState('form')
    setTasks([])
    setCurrentInput(null)
    // Clear URL params on reset
    router.replace('/', { scroll: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleShare = () => {
    if (!currentInput) return
    const url = `${window.location.origin}?${encodeParams(currentInput)}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setShareToast(true)
        setTimeout(() => setShareToast(false), 2500)
      })
    }
  }

  return (
    <div style={{ marginBottom: 48, position: 'relative' }}>
      <div className="card" style={{ padding: '28px 24px' }}>
        {appState === 'form' ? (
          <AssignmentForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : currentInput ? (
          <TimelineGenerator
            input={currentInput}
            tasks={tasks}
            onReset={handleReset}
            onShare={handleShare}
          />
        ) : null}
      </div>

      {/* Share toast notification */}
      {shareToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'absolute', bottom: -48, left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg-raised)', border: '1px solid var(--border-mid)',
            borderRadius: 99, padding: '8px 16px',
            fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-emerald)',
            whiteSpace: 'nowrap', zIndex: 20,
            animation: 'fadeUp 0.25s ease both',
          }}
        >
          ✓ Link copied to clipboard
        </div>
      )}
    </div>
  )
}
