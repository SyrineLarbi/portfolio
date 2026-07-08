import { NextResponse, type NextRequest } from 'next/server'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

export async function GET(req: NextRequest) {
  const persona = req.nextUrl.searchParams.get('persona') ?? 'fullstack'
  const ua = req.headers.get('user-agent') ?? ''
  const country = req.headers.get('x-vercel-ip-country') ?? ''

  // Best-effort: log the download for the public counter. Never block or fail
  // the download if the API happens to be unavailable.
  try {
    await fetch(`${API}/api/cv?persona=${persona}`, {
      headers: { 'user-agent': ua, 'x-vercel-ip-country': country },
      cache: 'no-store',
    })
  } catch {
  
  }

  // Redirect to the CV static asset in public/cv. This is the file that ships
  // with every web deploy, so replacing the PDF in public/cv and redeploying
  // web is all that's ever needed — the API is no longer serving the bytes.
  // Using the request's own origin means this works on preview and production
  // without depending on any env var.
  return NextResponse.redirect(new URL('/cv/Syrine_Larbi_EN.pdf', req.nextUrl.origin))
}
