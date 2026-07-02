'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(fd)),
    })
    setBusy(false)
    if (res.ok) router.push('/admin')
    else setError('Invalid credentials')
  }

  return (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-2xl font-bold">Admin login</h1>
      <form onSubmit={onSubmit} className="glass-card mt-6 grid gap-3 p-6">
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="username"
          required
          className="rounded-md bg-surface-translucent border border-border-translucent px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className="rounded-md bg-surface-translucent border border-border-translucent px-3 py-2"
        />
        {error && <p className="text-sm text-accent-magenta">{error}</p>}
        <button
          disabled={busy}
          className="rounded-pill bg-gradient-primary px-5 py-2 font-bold disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}