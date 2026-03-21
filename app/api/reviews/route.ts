import { NextRequest, NextResponse } from 'next/server'

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  assignmentType: string
  date: string
  verified: boolean
}

const SEED_REVIEWS: Review[] = [
  {
    id: 'seed-1',
    name: 'Amara T.',
    rating: 5,
    comment: 'Used this for a 3,000 word research paper due in 10 days. The phase breakdown was spot on — I actually finished two days early for once.',
    assignmentType: 'Research Paper',
    date: '2026-03-10',
    verified: true,
  },
  {
    id: 'seed-2',
    name: 'James K.',
    rating: 4,
    comment: 'Really useful for keeping me on track. The essay planner phases made sense. Would love a way to adjust the phase lengths manually.',
    assignmentType: 'Essay',
    date: '2026-03-08',
    verified: true,
  },
  {
    id: 'seed-3',
    name: 'Sofia R.',
    rating: 5,
    comment: 'The last-minute planner saved me. Had 18 hours left and it broke everything into blocks I could actually follow. Submitted with 40 minutes to spare.',
    assignmentType: 'Essay',
    date: '2026-03-05',
    verified: true,
  },
  {
    id: 'seed-4',
    name: 'Liam W.',
    rating: 4,
    comment: 'Clean interface, no ads, no signup. The Google Calendar export is a great touch. Using it for every assignment this semester.',
    assignmentType: 'Project',
    date: '2026-03-01',
    verified: false,
  },
  {
    id: 'seed-5',
    name: 'Priya M.',
    rating: 5,
    comment: 'The AI assistant helped me structure my lab report outline when I had no idea where to start. It gives you just enough to get going without doing the work for you.',
    assignmentType: 'Lab Report',
    date: '2026-02-27',
    verified: true,
  },
  {
    id: 'seed-6',
    name: 'Noah C.',
    rating: 3,
    comment: 'Good for short assignments. For my 6-week dissertation chapter it felt a bit compressed. Still helpful for breaking it into phases though.',
    assignmentType: 'Research Paper',
    date: '2026-02-22',
    verified: true,
  },
  {
    id: 'seed-7',
    name: 'Fatima A.',
    rating: 5,
    comment: 'Shared the plan link with my study group. Everyone could see the same schedule which made it easy to coordinate who was doing what.',
    assignmentType: 'Presentation',
    date: '2026-02-18',
    verified: false,
  },
  {
    id: 'seed-8',
    name: 'Ben O.',
    rating: 4,
    comment: 'Way better than trying to plan in my head. The urgency indicator going red when I was cutting it close was a good kick.',
    assignmentType: 'Essay',
    date: '2026-02-14',
    verified: true,
  },
]

let sessionReviews: Review[] = []

async function getRedis() {
  const { Redis } = await import('@upstash/redis')
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

const useUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN

export async function GET() {
  if (useUpstash) {
    try {
      const redis = await getRedis()
      const stored = await redis.get<Review[]>('reviews') ?? []
      const all = [...stored, ...SEED_REVIEWS]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      return NextResponse.json({ reviews: all })
    } catch (err) {
      console.error('Upstash GET error:', err)
    }
  }

  const all = [...sessionReviews, ...SEED_REVIEWS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return NextResponse.json({ reviews: all })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, rating, comment, assignmentType } = body

    if (!name?.trim() || !comment?.trim() || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Name, rating (1-5), and comment are required.' },
        { status: 400 }
      )
    }

    if (comment.trim().length < 10) {
      return NextResponse.json(
        { error: 'Comment must be at least 10 characters.' },
        { status: 400 }
      )
    }

    const review: Review = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim().slice(0, 40),
      rating: Math.round(rating),
      comment: comment.trim().slice(0, 500),
      assignmentType: assignmentType ?? 'General',
      date: new Date().toISOString().split('T')[0],
      verified: false,
    }

    if (useUpstash) {
      try {
        const redis = await getRedis()
        const existing = await redis.get<Review[]>('reviews') ?? []
        await redis.set('reviews', [review, ...existing].slice(0, 200))
        return NextResponse.json({ review })
      } catch (err) {
        console.error('Upstash POST error:', err)
      }
    }

    sessionReviews = [review, ...sessionReviews].slice(0, 100)
    return NextResponse.json({ review })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
