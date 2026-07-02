import { NextResponse } from 'next/server'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

export async function POST() {
  const res = await fetch(`${API}/api/admin/logout`, { method: 'POST' })
  const setCookie = res.headers.get('set-cookie')
  const out = NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'))
  if (setCookie) out.headers.set('set-cookie', setCookie)
  return out
}