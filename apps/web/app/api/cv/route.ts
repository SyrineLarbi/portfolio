import { NextResponse, type NextRequest } from 'next/server'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

export async function GET(req: NextRequest) {
  const persona = req.nextUrl.searchParams.get('persona') ?? 'fullstack'
  const ua = req.headers.get('user-agent') ?? ''
  const country = req.headers.get('x-vercel-ip-country') ?? ''

  // Serve the CV straight from the web app's own static asset in public/cv.
  // This is the file that ships with every web deploy, so replacing the PDF
  // in public/cv and redeploying web is all that's ever needed — the API is
  // no longer in the file's critical path.
  const file = await fetch(`${SITE}/cv/Syrine_Larbi_EN.pdf`, { cache: 'no-store' })
  if (!file.ok) return new NextResponse('CV not found', { status: 404 })

  // Best-effort: log the download for the public counter. Never block or fail
  // the download if the API happens to be unavailable.
  try {
    await fetch(`${API}/api/cv?persona=${persona}`, {
      headers: { 'user-agent': ua, 'x-vercel-ip-country': country },
      cache: 'no-store',
    })
  } catch {
    // ignore — the counter is nice-to-have, the download is not
  }

  return new NextResponse(file.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Syrine_Larbi_EN.pdf"',
      'Cache-Control': 'no-store',
    },
  })
}
