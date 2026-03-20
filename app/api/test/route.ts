import { NextResponse } from 'next/server'

export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY
  const keyPrefix = process.env.OPENAI_API_KEY?.slice(0, 7) ?? 'not set'
  return NextResponse.json({ hasKey, keyPrefix })
}
