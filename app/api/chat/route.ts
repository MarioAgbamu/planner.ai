import { NextRequest, NextResponse } from 'next/server'
import { callAI, buildSystemPrompt, AssignmentContext } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { context, message, history }: {
      context: AssignmentContext
      message: string
      history: { role: 'user' | 'assistant'; content: string }[]
    } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    }

    const system = buildSystemPrompt(context) + `

Additional chat rules:
- Keep every reply under 100 words
- Guide the student step-by-step, never give everything at once
- If they ask for the full assignment, decline warmly and redirect
- Be encouraging but concise
- Reference their specific assignment title and topic in your replies`

    const historyStr = history.slice(-4)
      .map(m => `${m.role === 'user' ? 'Student' : 'Assistant'}: ${m.content}`)
      .join('\n')

    const userPrompt = historyStr
      ? `Previous conversation:\n${historyStr}\n\nStudent: ${message}`
      : `Student: ${message}`

    const reply = await callAI(system, userPrompt)
    return NextResponse.json({ reply: reply.trim() })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('chat error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
