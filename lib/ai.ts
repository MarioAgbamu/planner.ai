export interface AssignmentContext {
  title: string
  type: 'essay' | 'research_paper' | 'presentation' | 'project' | 'lab_report'
  topic: string
  dueDate?: string
  pages?: number
}

export async function callAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set. Add it in Vercel → Settings → Environment Variables.')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 600,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    try {
      const errJson = JSON.parse(errText)
      const msg = errJson?.error?.message ?? errText
      if (response.status === 401) throw new Error('Invalid API key. Check your OPENAI_API_KEY in Vercel environment variables.')
      if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.')
      if (response.status === 400) throw new Error(`Bad request: ${msg}`)
      throw new Error(`API error (${response.status}): ${msg}`)
    } catch (parseErr) {
      if (parseErr instanceof Error && parseErr.message.includes('API error')) throw parseErr
      if (parseErr instanceof Error && parseErr.message.includes('Invalid API')) throw parseErr
      if (parseErr instanceof Error && parseErr.message.includes('Rate limit')) throw parseErr
      if (parseErr instanceof Error && parseErr.message.includes('Bad request')) throw parseErr
      throw new Error(`API error ${response.status}: ${errText}`)
    }
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content
  if (!text) throw new Error('Empty response from AI. Please try again.')
  return text
}

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
