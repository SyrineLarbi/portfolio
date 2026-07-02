import { NextResponse } from 'next/server'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

export async function GET() {
  const res = await fetch(`${API}/api/cv/count`, { cache: 'no-store' })
  if (!res.ok) return NextResponse.json({ count: 0 }, { status: 200 })
  const data = await res.json()
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=15' },
  })
}