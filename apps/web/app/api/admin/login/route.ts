import { NextResponse, type NextRequest } from 'next/server'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const res = await fetch(`${API}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })

  // Forward the Set-Cookie header (NestJS sets the JWT cookie)
  const setCookie = res.headers.get('set-cookie')
  const data = await res.json().catch(() => ({}))
  const out = NextResponse.json(data, { status: res.status })
  if (setCookie) out.headers.set('set-cookie', setCookie)
  return out
}