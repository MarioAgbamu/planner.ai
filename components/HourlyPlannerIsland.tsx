'use client'

// Isolated client island for the last-minute / sub-24h planner.
// Keeps the /last-minute page.tsx as a Server Component.

import { useState } from 'react'
import HourlyForm from './HourlyForm'
import HourlyTimeline from './HourlyTimeline'
import { HourlyInput, TimeBlock, generateHourlyTimeline } from '@/lib/timeline'

type AppState = 'form' | 'result'

export default function HourlyPlannerIsland() {
  const [appState, setAppState] = useState<AppState>('form')
  const [blocks, setBlocks] = useState<TimeBlock[]>([])
  const [currentInput, setCurrentInput] = useState<HourlyInput | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (input: HourlyInput) => {
    setIsLoading(true)
    requestAnimationFrame(() => {
      const generated = generateHourlyTimeline(input)
      setBlocks(generated)
      setCurrentInput(input)
      setIsLoading(false)
      setAppState('result')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const handleReset = () => {
    setAppState('form')
    setBlocks([])
    setCurrentInput(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ marginBottom: 48 }}>
      <div className="card" style={{ padding: '28px 24px' }}>
        {appState === 'form' ? (
          <HourlyForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : currentInput ? (
          <HourlyTimeline input={currentInput} blocks={blocks} onReset={handleReset} />
        ) : null}
      </div>
    </div>
  )
}
