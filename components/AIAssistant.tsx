'use client'

import { useState, useRef, useEffect } from 'react'
import { AssignmentInput, getAssignmentTypeLabel } from '@/lib/timeline'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AIContext {
  title: string
  type: string
  topic: string
  dueDate?: string
  pages?: number
}

interface Source {
  title: string
  summary: string
  takeaway: string
}

interface OutlinePoint {
  point: string
  bullets: string[]
}

interface Outline {
  introduction: string
  thesis: string
  mainPoints: OutlinePoint[]
  conclusion: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

type ActiveTool = 'sources' | 'outline' | 'expand' | 'improve' | 'chat' | null

// ─── Section options per assignment type ─────────────────────────────────────

const SECTIONS: Record<string, string[]> = {
  essay: ['Introduction', 'Body Paragraph 1', 'Body Paragraph 2', 'Body Paragraph 3', 'Conclusion'],
  research_paper: ['Abstract', 'Introduction', 'Literature Review', 'Methodology', 'Results', 'Discussion', 'Conclusion'],
  presentation: ['Opening Slide', 'Background', 'Main Argument', 'Evidence', 'Conclusion Slide'],
  project: ['Project Overview', 'Goals & Scope', 'Methodology', 'Timeline', 'Expected Outcomes'],
  lab_report: ['Abstract', 'Introduction', 'Methodology', 'Results', 'Discussion', 'Conclusion'],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildContext(input: AssignmentInput, topic: string): AIContext {
  return {
    title: input.title,
    type: input.type,
    topic: topic || input.title,
    dueDate: input.dueDate.toLocaleDateString('en-CA'),
    pages: input.pages,
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToolButton({
  icon, label, active, loading, onClick,
}: {
  icon: string; label: string; active: boolean; loading: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '9px 14px', borderRadius: 10, cursor: 'pointer',
        border: `1px solid ${active ? 'rgba(155,109,255,0.4)' : 'var(--border-mid)'}`,
        background: active ? 'rgba(155,109,255,0.12)' : 'var(--bg-hover)',
        color: active ? 'var(--accent-violet)' : 'var(--text-secondary)',
        fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-sans)',
        transition: 'all 0.15s ease', whiteSpace: 'nowrap',
        opacity: loading ? 0.6 : 1,
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'var(--bg-raised)'
          e.currentTarget.style.color = 'var(--text-primary)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'var(--bg-hover)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }
      }}
    >
      <span aria-hidden style={{ fontSize: '0.9rem' }}>{loading && active ? '⏳' : icon}</span>
      <span>{label}</span>
    </button>
  )
}

function ResultCard({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div style={{
      background: 'var(--bg-raised)', border: '1px solid var(--border-mid)',
      borderRadius: 14, padding: '18px 20px',
      animation: 'fadeUp 0.35s ease both',
    }}>
      {children}
      {hint && (
        <p style={{
          marginTop: 14, paddingTop: 12,
          borderTop: '1px solid var(--border)',
          fontSize: '0.73rem', color: 'var(--accent-violet)',
          fontStyle: 'italic', lineHeight: 1.5,
        }}>
          ✦ {hint}
        </p>
      )}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-muted)',
      letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8,
    }}>
      {children}
    </p>
  )
}

// ─── Sources Panel ────────────────────────────────────────────────────────────

function SourcesPanel({ sources }: { sources: Source[] }) {
  return (
    <ResultCard hint="Explore these sources to build your evidence base. You can expand this further into a full literature review.">
      <Label>3 Sources Found</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sources.map((s, i) => (
          <div key={i} style={{
            padding: '12px 14px', borderRadius: 10,
            background: 'var(--bg-hover)', border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
              {String(i + 1).padStart(2, '0')}. {s.title}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 6 }}>
              {s.summary}
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-emerald)', letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0, marginTop: 1 }}>Key</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', lineHeight: 1.5 }}>{s.takeaway}</p>
            </div>
          </div>
        ))}
      </div>
    </ResultCard>
  )
}

// ─── Outline Panel ────────────────────────────────────────────────────────────

function OutlinePanel({ outline }: { outline: Outline }) {
  return (
    <ResultCard hint="Use this as your skeleton. Fill each main point with your own research and arguments.">
      <Label>Outline</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <OutlineBlock label="Introduction" text={outline.introduction} color="#4f8ef7" />
        <div style={{ padding: '10px 14px', background: 'rgba(155,109,255,0.08)', border: '1px solid rgba(155,109,255,0.2)', borderRadius: 10 }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-violet)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Thesis</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: 'italic' }}>{outline.thesis}</p>
        </div>
        {outline.mainPoints.map((mp, i) => (
          <div key={i} style={{ padding: '10px 14px', background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: 10 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              <span style={{ color: 'var(--accent-blue)', marginRight: 6 }}>{i + 1}.</span>{mp.point}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {mp.bullets.map((b, j) => (
                <li key={j} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 2, fontSize: '0.65rem' }}>›</span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <OutlineBlock label="Conclusion" text={outline.conclusion} color="#34d399" />
      </div>
    </ResultCard>
  )
}

function OutlineBlock({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div style={{ padding: '10px 14px', background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: 10 }}>
      <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4, color }}>{label}</p>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{text}</p>
    </div>
  )
}

// ─── Expand Panel ─────────────────────────────────────────────────────────────

function ExpandPanel({
  sections, onExpand, result, loading,
}: {
  sections: string[]
  onExpand: (s: string) => void
  result: { section: string; paragraph: string; hint: string } | null
  loading: boolean
}) {
  const [selected, setSelected] = useState(sections[0])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <Label>Select a section to expand</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sections.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setSelected(s)}
              style={{
                padding: '5px 12px', borderRadius: 8, cursor: 'pointer',
                border: `1px solid ${selected === s ? 'rgba(79,142,247,0.4)' : 'var(--border-mid)'}`,
                background: selected === s ? 'rgba(79,142,247,0.12)' : 'var(--bg-hover)',
                color: selected === s ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-sans)',
                transition: 'all 0.15s',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onExpand(selected)}
        disabled={loading}
        className="btn-primary"
        style={{
          padding: '10px 18px', fontSize: '0.82rem', fontWeight: 700,
          borderRadius: 10, opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 7, width: 'fit-content',
        }}
      >
        {loading ? <><BtnSpinner />Expanding…</> : <>✦ Expand "{selected}"</>}
      </button>
      {result && (
        <ResultCard hint={result.hint}>
          <Label>{result.section}</Label>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-primary)', lineHeight: 1.75 }}>
            {result.paragraph}
          </p>
        </ResultCard>
      )}
    </div>
  )
}

// ─── Improve Panel ────────────────────────────────────────────────────────────

function ImprovePanel({
  onImprove, result, loading,
}: {
  onImprove: (text: string) => void
  result: { improved: string; changes: string[]; suggestion: string; wasTrimmed?: boolean } | null
  loading: boolean
}) {
  const [text, setText] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <Label>Paste your draft text (max 500 characters)</Label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste a paragraph or section from your draft here..."
          maxLength={600}
          rows={5}
          style={{
            width: '100%', background: 'var(--bg-hover)',
            border: '1px solid var(--border-mid)', borderRadius: 10,
            color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
            fontSize: '0.84rem', padding: '11px 14px', resize: 'vertical',
            lineHeight: 1.65, transition: 'border 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
        />
        <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>
          {text.length} / 500 characters
        </p>
      </div>
      <button
        type="button"
        onClick={() => onImprove(text)}
        disabled={loading || text.trim().length < 10}
        className="btn-primary"
        style={{
          padding: '10px 18px', fontSize: '0.82rem', fontWeight: 700,
          borderRadius: 10, opacity: (loading || text.trim().length < 10) ? 0.5 : 1,
          cursor: (loading || text.trim().length < 10) ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 7, width: 'fit-content',
        }}
      >
        {loading ? <><BtnSpinner />Improving…</> : <>✦ Improve My Draft</>}
      </button>
      {result && (
        <ResultCard hint={result.suggestion}>
          {result.wasTrimmed && (
            <p style={{ fontSize: '0.7rem', color: 'var(--accent-amber)', marginBottom: 10 }}>
              ⚠ Only the first 500 characters were processed.
            </p>
          )}
          <Label>Improved Version</Label>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-primary)', lineHeight: 1.75, marginBottom: 14 }}>
            {result.improved}
          </p>
          <Label>Changes Made</Label>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {result.changes.map((c, i) => (
              <li key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-emerald)', flexShrink: 0, fontSize: '0.7rem', marginTop: 2 }}>✓</span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{c}</span>
              </li>
            ))}
          </ul>
        </ResultCard>
      )}
    </div>
  )
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────

function ChatPanel({
  onSend, messages, loading,
}: {
  onSend: (msg: string, history: ChatMessage[]) => void
  messages: ChatMessage[]
  loading: boolean
}) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    onSend(msg, messages)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Message history */}
      <div style={{
        maxHeight: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8,
        padding: '4px 0',
      }}>
        {messages.length === 0 && (
          <div style={{
            padding: '20px', textAlign: 'center',
            background: 'var(--bg-hover)', borderRadius: 12,
            border: '1px dashed var(--border-mid)',
          }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Ask me anything about your assignment. I'll help you think through it step by step.
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '85%', padding: '9px 13px', borderRadius: 12,
              background: m.role === 'user'
                ? 'linear-gradient(135deg, #4f8ef7, #7b5ef8)'
                : 'var(--bg-raised)',
              border: m.role === 'assistant' ? '1px solid var(--border-mid)' : 'none',
              color: m.role === 'user' ? '#fff' : 'var(--text-primary)',
              fontSize: '0.82rem', lineHeight: 1.65,
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '9px 14px', borderRadius: 12,
              background: 'var(--bg-raised)', border: '1px solid var(--border-mid)',
            }}>
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your assignment..."
          style={{
            flex: 1, background: 'var(--bg-hover)', border: '1px solid var(--border-mid)',
            borderRadius: 10, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
            fontSize: '0.84rem', padding: '10px 14px', transition: 'border 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="btn-primary"
          style={{
            padding: '10px 16px', borderRadius: 10, fontSize: '0.82rem',
            fontWeight: 700, cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer',
            opacity: (!input.trim() || loading) ? 0.5 : 1,
            flexShrink: 0,
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--text-muted)',
          animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  )
}

function BtnSpinner() {
  return (
    <span style={{
      width: 12, height: 12,
      border: '2px solid rgba(255,255,255,0.3)',
      borderTopColor: '#fff', borderRadius: '50%',
      display: 'inline-block',
      animation: 'spinnerRotate 0.7s linear infinite',
    }} />
  )
}

// ─── Main AIAssistant component ───────────────────────────────────────────────

interface AIAssistantProps {
  input: AssignmentInput
}

export default function AIAssistant({ input }: AIAssistantProps) {
  const [open, setOpen] = useState(false)
  const [activeTool, setActiveTool] = useState<ActiveTool>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [topic, setTopic] = useState('')
  const [topicSet, setTopicSet] = useState(false)

  // Feature state
  const [sources, setSources] = useState<Source[] | null>(null)
  const [outline, setOutline] = useState<Outline | null>(null)
  const [expandResult, setExpandResult] = useState<{ section: string; paragraph: string; hint: string } | null>(null)
  const [improveResult, setImproveResult] = useState<{ improved: string; changes: string[]; suggestion: string; wasTrimmed?: boolean } | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  const ctx = buildContext(input, topic || input.title)
  const sections = SECTIONS[input.type] ?? SECTIONS.essay

  async function callAPI<T>(endpoint: string, body: object): Promise<T> {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
      return data as T
    } finally {
      setLoading(false)
    }
  }

  function selectTool(tool: ActiveTool) {
    setActiveTool(prev => prev === tool ? null : tool)
    setError(null)
  }

  async function handleFindSources() {
    try {
      const data = await callAPI<{ sources: Source[] }>('find-sources', ctx)
      setSources(data.sources)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  async function handleGenerateOutline() {
    try {
      const data = await callAPI<Outline>('generate-outline', ctx)
      setOutline(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  async function handleExpandSection(section: string) {
    try {
      const data = await callAPI<{ section: string; paragraph: string; hint: string }>(
        'expand-section', { context: ctx, section }
      )
      setExpandResult(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  async function handleImproveText(text: string) {
    try {
      const data = await callAPI<{ improved: string; changes: string[]; suggestion: string; wasTrimmed?: boolean }>(
        'improve-text', { context: ctx, text }
      )
      setImproveResult(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  async function handleChat(message: string, history: ChatMessage[]) {
    const userMsg: ChatMessage = { role: 'user', content: message }
    setChatMessages(prev => [...prev, userMsg])
    try {
      const data = await callAPI<{ reply: string }>('chat', { context: ctx, message, history })
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (e: unknown) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I couldn't respond right now. Please try again.",
      }])
    }
  }

  // ── Topic setup ──
  if (!topicSet) {
    return (
      <div style={{
        marginTop: 24, padding: '20px', borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(155,109,255,0.07) 0%, rgba(79,142,247,0.05) 100%)',
        border: '1px solid rgba(155,109,255,0.2)',
        animation: 'fadeUp 0.4s ease both',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #9b6dff, #4f8ef7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          }}>✦</div>
          <div>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>AI Assignment Assistant</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>Guides you through your work — step by step</p>
          </div>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.6 }}>
          What is your assignment specifically about? Adding a topic gives the assistant better context.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setTopicSet(true)}
            placeholder={`e.g. "Climate change effects on coastal cities"`}
            style={{
              flex: 1, background: 'var(--bg-hover)', border: '1px solid var(--border-mid)',
              borderRadius: 10, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
              fontSize: '0.84rem', padding: '10px 14px',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent-violet)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setTopicSet(true)}
            className="btn-primary"
            style={{
              padding: '10px 16px', borderRadius: 10, fontSize: '0.82rem',
              fontWeight: 700, flexShrink: 0, cursor: 'pointer',
              background: 'linear-gradient(135deg, #9b6dff, #4f8ef7)',
            }}
          >
            Start →
          </button>
        </div>
        <button
          type="button"
          onClick={() => { setTopic(input.title); setTopicSet(true) }}
          style={{
            marginTop: 8, background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)',
            padding: 0, textDecoration: 'underline',
          }}
        >
          Skip — use assignment title as topic
        </button>
      </div>
    )
  }

  // ── Main assistant UI ──
  return (
    <div style={{
      marginTop: 24,
      borderRadius: 16,
      border: '1px solid rgba(155,109,255,0.2)',
      background: 'linear-gradient(135deg, rgba(155,109,255,0.06) 0%, rgba(79,142,247,0.04) 100%)',
      overflow: 'hidden',
      animation: 'fadeUp 0.4s ease both',
    }}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #9b6dff, #4f8ef7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          }}>✦</div>
          <div>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
              AI Assignment Assistant
            </p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
              {getAssignmentTypeLabel(input.type)} · {topic || input.title}
            </p>
          </div>
        </div>
        <div style={{
          fontSize: '0.6rem', color: 'var(--text-muted)',
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.25s ease',
        }}>▼</div>
      </button>

      {open && (
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Tool buttons */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            paddingTop: 4, borderTop: '1px solid var(--border)',
          }}>
            <ToolButton icon="📚" label="Find Sources" active={activeTool === 'sources'} loading={loading && activeTool === 'sources'}
              onClick={() => { selectTool('sources'); if (activeTool !== 'sources') handleFindSources() }} />
            <ToolButton icon="🗂️" label="Generate Outline" active={activeTool === 'outline'} loading={loading && activeTool === 'outline'}
              onClick={() => { selectTool('outline'); if (activeTool !== 'outline') handleGenerateOutline() }} />
            <ToolButton icon="✍️" label="Expand Section" active={activeTool === 'expand'} loading={false}
              onClick={() => selectTool('expand')} />
            <ToolButton icon="✨" label="Improve Draft" active={activeTool === 'improve'} loading={false}
              onClick={() => selectTool('improve')} />
            <ToolButton icon="💬" label="Ask Assistant" active={activeTool === 'chat'} loading={false}
              onClick={() => selectTool('chat')} />
          </div>

          {/* Loading state */}
          {loading && (activeTool === 'sources' || activeTool === 'outline') && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--bg-hover)', borderRadius: 10 }}>
              <BtnSpinner />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {activeTool === 'sources' ? 'Finding relevant sources…' : 'Generating your outline…'}
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div role="alert" style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', fontSize: '0.78rem', color: 'var(--accent-rose)' }}>
              ⚠ {error}
            </div>
          )}

          {/* Tool panels */}
          {activeTool === 'sources' && !loading && sources && <SourcesPanel sources={sources} />}
          {activeTool === 'outline' && !loading && outline && <OutlinePanel outline={outline} />}
          {activeTool === 'expand' && (
            <ExpandPanel sections={sections} onExpand={handleExpandSection} result={expandResult} loading={loading} />
          )}
          {activeTool === 'improve' && (
            <ImprovePanel onImprove={handleImproveText} result={improveResult} loading={loading} />
          )}
          {activeTool === 'chat' && (
            <ChatPanel onSend={handleChat} messages={chatMessages} loading={loading} />
          )}
        </div>
      )}
    </div>
  )
}
