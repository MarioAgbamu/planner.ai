import { NextRequest, NextResponse } from 'next/server'
import { callAI, buildSystemPrompt, AssignmentContext } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { context, section }: { context: AssignmentContext; section: string } = body
    const system = buildSystemPrompt(context)
    const user = `Write ONE short paragraph (3-5 sentences only) for the "${section}" section of a ${context.type.replace('_', ' ')} on: "${context.topic}".

Return ONLY valid JSON in this exact shape:
{
  "section": "${section}",
  "paragraph": "your 3-5 sentence paragraph here",
  "hint": "one short suggestion for how the student can develop this further themselves"
}

Rules:
- Exactly 3-5 sentences. No more.
- Do NOT write multiple paragraphs
- Do NOT complete the full section
- The hint should encourage student action, not offer more content`

    const raw = await callAI(system, user)
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('expand-section error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
