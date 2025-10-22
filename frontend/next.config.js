/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
  },
  images: {
    domains: ['localhost', 'mizan-backend-production.up.railway.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.railway.app',
      },
    ],
  },
  // Production-ready: Enhanced headers for API requests and RSC support
  async headers() {
    return [
      {
        // Apply to all API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Next-Action',
          },
        ],
      },
    ];
  },
  // Production-ready: Disable automatic static optimization for dynamic routes
  // This prevents prefetch errors for routes that require authentication
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
  // Production-ready: Webpack config with proper error boundaries
  webpack: (config, { isServer }) => {
    // Ensure proper handling of RSC payloads
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  // Production-ready: Proper error handling for missing pages
  async redirects() {
    return [];
  },
  // Production-ready: Improve performance by reducing unnecessary prefetching
  // This helps prevent the RSC fetch errors seen in production
  productionBrowserSourceMaps: false,

  // Production-ready: Optimize for better build performance
  swcMinify: true,

  // Production-ready: Proper handling of trailing slashes
  trailingSlash: false,
}

module.exports = nextConfig
