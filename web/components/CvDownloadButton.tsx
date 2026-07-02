'use client'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/cn'

import { useCvCount } from '../lib/use-cv-count'

export function CvDownloadButton({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const params = useSearchParams()
  const persona = params.get('persona') ?? 'fullstack'
  const { count } = useCvCount()

  const sizeClass = size === 'sm' ? 'px-5 py-2 text-sm' : 'px-7 py-3 text-sm'

  return (
    <a
      href={`/api/cv?persona=${persona}`}
      className={cn(
        'inline-flex items-center gap-2 rounded-pill bg-gradient-primary font-bold shadow-glow hover:-translate-y-0.5 transition',
        sizeClass,
      )}
    >
      <span>Download CV</span>
      {count !== null && (
        <span
          aria-label={`${count} downloads so far`}
          className="rounded-pill bg-black/20 px-2 py-0.5 text-[10px] font-bold tabular-nums"
        >
          {count.toLocaleString()}
        </span>
      )}
    </a>
  )
}