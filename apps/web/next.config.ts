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
