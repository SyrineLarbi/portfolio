import { NextResponse, type NextRequest } from 'next/server'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

export async function POST(req: NextRequest) {
  const res = await fetch(`${API}/api/admin/logout`, {
    method: 'POST',
    headers: { cookie: req.headers.get('cookie') ?? '' },
  })
  const setCookie = res.headers.get('set-cookie')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin
  const out = NextResponse.redirect(new URL('/admin/login', siteUrl), { status: 303 })
  if (setCookie) out.headers.set('set-cookie', setCookie)
  return out
}
