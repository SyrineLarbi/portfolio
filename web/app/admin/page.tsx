import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AdminClient } from './AdminClient'

const API = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

async function fetchAuthed(path: string, cookie: string) {
  const res = await fetch(`${API}/api/admin/${path}`, {
    headers: { cookie },
    cache: 'no-store',
  })
  if (res.status === 401) return null
  return res.json()
}

export default async function AdminPage() {
  const cookie = (await cookies()).toString()
  const messages = await fetchAuthed('messages', cookie)
  if (messages === null) redirect('/admin/login')

  const downloads = await fetchAuthed('downloads', cookie)
  const views = await fetchAuthed('views', cookie)

  return <AdminClient messages={messages} downloads={downloads} views={views} />
}