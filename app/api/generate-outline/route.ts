import { NextRequest, NextResponse } from 'next/server'
import { callAI, buildSystemPrompt, AssignmentContext } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const ctx: AssignmentContext = await req.json()

    const system = buildSystemPrompt(ctx)
    const user = `Generate a concise outline for a ${ctx.type.replace('_', ' ')} on: "${ctx.topic}".

Return ONLY valid JSON in this exact shape:
{
  "introduction": "one sentence idea for the introduction",
  "thesis": "a single clear thesis statement",
  "mainPoints": [
    {
      "point": "main point heading",
      "bullets": ["sub-point 1", "sub-point 2"]
    }
  ],
  "conclusion": "one sentence idea for the conclusion"
}

Rules:
- Exactly 3 main points
- Each point has exactly 2 bullet sub-points
- Introduction and conclusion are single sentences only
- Thesis is one sentence
- Do NOT write paragraphs — headings and bullets only`

    const raw = await callAI(system, user)
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const parsed = JSON.parse(jsonMatch[0])

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('generate-outline error:', err)
    return NextResponse.json(
      { error: 'Failed to generate outline. Please try again.' },
      { status: 500 }
    )
  }
}
