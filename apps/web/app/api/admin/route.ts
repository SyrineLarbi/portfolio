import { NextResponse, type NextRequest } from 'next/server'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

async function proxy(req: NextRequest, path: string[]) {
  const url = new URL(`${API}/api/admin/${path.join('/')}${req.nextUrl.search}`)
  const res = await fetch(url, {
    method: req.method,
    headers: { cookie: req.headers.get('cookie') ?? '' },
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text(),
  })
  const setCookie = res.headers.get('set-cookie')
  const data = await res.text()
  const out = new NextResponse(data, { status: res.status })
  if (setCookie) out.headers.set('set-cookie', setCookie)
  return out
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await ctx.params).path)
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await ctx.params).path)
}
