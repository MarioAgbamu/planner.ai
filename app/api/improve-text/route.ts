import { NextRequest, NextResponse } from 'next/server'
import { callAI, buildSystemPrompt, AssignmentContext } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { context, text }: { context: AssignmentContext; text: string } = body

    if (!text || text.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide some text to improve.' }, { status: 400 })
    }

    const trimmed = text.slice(0, 500)
    const wasTrimmed = text.length > 500
    const system = buildSystemPrompt(context)
    const user = `Improve the following text from a student's ${context.type.replace('_', ' ')} on "${context.topic}".

Student text:
"""
${trimmed}
"""

Return ONLY valid JSON in this exact shape:
{
  "improved": "your lightly improved version here",
  "changes": ["change 1", "change 2", "change 3"],
  "suggestion": "one short tip for the student to continue improving on their own"
}

Rules:
- Light improvements only — clarity, grammar, flow
- Do NOT completely rewrite or expand significantly
- List exactly 3 specific changes you made
- Keep the improved version similar in length to the original
- The suggestion should prompt student effort, not offer more rewriting${wasTrimmed ? '\n- Note: only the first 500 characters were processed' : ''}`

    const raw = await callAI(system, user)
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json({ ...parsed, wasTrimmed })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('improve-text error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
