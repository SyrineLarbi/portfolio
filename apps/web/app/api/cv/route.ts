import { NextResponse, type NextRequest } from 'next/server'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

export async function GET(req: NextRequest) {
  const persona = req.nextUrl.searchParams.get('persona') ?? 'fullstack'
  const ua = req.headers.get('user-agent') ?? ''
  const country = req.headers.get('x-vercel-ip-country') ?? ''

  const res = await fetch(`${API}/api/cv?persona=${persona}`, {
    headers: { 'user-agent': ua, 'x-vercel-ip-country': country },
    cache: 'no-store',
  })
  if (!res.ok) return new NextResponse('Failed', { status: res.status })

  return new NextResponse(res.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Syrine_Larbi_EN.pdf"',
      'Cache-Control': 'no-store',
    },
  })
}
