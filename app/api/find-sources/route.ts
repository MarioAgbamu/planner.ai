import { NextRequest, NextResponse } from 'next/server'
import { callAI, buildSystemPrompt, AssignmentContext } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const ctx: AssignmentContext = await req.json()
    const system = buildSystemPrompt(ctx)
    const user = `Find exactly 3 credible academic sources for a ${ctx.type.replace('_', ' ')} on: "${ctx.topic}".

Return ONLY valid JSON in this exact shape:
{
  "sources": [
    {
      "title": "source title",
      "summary": "1-2 sentence description of what this source covers",
      "takeaway": "one key point relevant to this assignment"
    }
  ]
}

Rules:
- Exactly 3 sources. No more, no less.
- Keep summaries under 2 sentences
- Keep takeaways under 1 sentence
- Sources should be realistic academic/credible references for this topic
- Do not invent fake DOIs or URLs`

    const raw = await callAI(system, user)
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('find-sources error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
