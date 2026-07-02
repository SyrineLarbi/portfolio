import { NextResponse, type NextRequest } from 'next/server'

import { ContactSchema } from '@syrine/types'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const res = await fetch(`${API}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ ok: false, errors: { _: [err] } }, { status: res.status })
  }

  return NextResponse.json({ ok: true })
}