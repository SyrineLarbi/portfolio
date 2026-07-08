import type { NextConfig } from 'next'
import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: { remarkPlugins: [['remark-gfm']], rehypePlugins: [] },
})


const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: { typedRoutes: true },
  transpilePackages: ['@syrine/ui', '@syrine/types'],
  async headers() {
    // Force the CV to download with its filename, and never let a stale copy
    // be cached, so replacing the PDF in public/cv always shows up.
    return [
      {
        source: '/cv/:file*',
        headers: [
          { key: 'Content-Disposition', value: 'attachment' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.API_INTERNAL_URL ?? 'http://localhost:4000'}/api/:path*`,
          },
        ]
      : []
  },
}

export default withMDX(config)
