// ─── Shared AI context types ──────────────────────────────────────────────────

export interface AssignmentContext {
  title: string
  type: 'essay' | 'research_paper' | 'presentation' | 'project' | 'lab_report'
  topic: string
  dueDate?: string
  pages?: number
}

// ─── Shared call helper ───────────────────────────────────────────────────────
// Uses the Anthropic Messages API. Swap fetch URL + headers for OpenAI if needed:
//   url: 'https://api.openai.com/v1/chat/completions'
//   headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
//   body model: 'gpt-4o'

export async function callAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`AI API error ${response.status}: ${err}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text ?? ''
}

// ─── Shared system prompt base ────────────────────────────────────────────────

export function buildSystemPrompt(ctx: AssignmentContext): string {
  return `You are a concise academic assistant helping a student with their ${ctx.type.replace('_', ' ')}.

Assignment: "${ctx.title}"
Topic/Description: ${ctx.topic}
Type: ${ctx.type.replace('_', ' ')}
${ctx.dueDate ? `Due: ${ctx.dueDate}` : ''}
${ctx.pages ? `Length: ${ctx.pages} pages` : ''}

STRICT RULES — follow these without exception:
- Never write full essays, complete papers, or entire assignments
- Keep all outputs short and partial — guide, do not deliver
- If asked for a full assignment, respond: "I can help you structure and get started, but I won't generate the full assignment for you."
- Always respond in plain text or simple JSON — no markdown formatting in JSON fields
- Be helpful but leave room for the student to do meaningful work themselves`
}
