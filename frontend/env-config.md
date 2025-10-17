# Frontend Environment Configuration

## Production Environment (.env.production)

Create a file named `.env.production` in the frontend directory with the following content:

```bash
# Production Environment Variables for Mizan Frontend
# Following AGENT_CONTEXT_ULTIMATE.md requirements - Production-ready configuration

# API URL - Railway backend deployment
NEXT_PUBLIC_API_URL=https://mizan-api.railway.app

# Application URL - Production domain
NEXT_PUBLIC_APP_URL=https://mizan.work

# Environment
NEXT_PUBLIC_ENV=production
```

## Local Development Environment (.env.local)

Create a file named `.env.local` in the frontend directory with the following content:

```bash
# Local Development Environment Variables for Mizan Frontend
# Following AGENT_CONTEXT_ULTIMATE.md requirements - Development configuration

# API URL - Local backend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Application URL - Local development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
NEXT_PUBLIC_ENV=development
```

## Vercel Deployment Settings

In your Vercel project settings, add the following environment variables:

- `NEXT_PUBLIC_API_URL`: https://mizan-api.railway.app
- `NEXT_PUBLIC_APP_URL`: https://mizan.work (or your Vercel app URL)
- `NEXT_PUBLIC_ENV`: production

## Notes

1. The `.env.local` file is ignored by git and should not be committed
2. The `.env.production` file can be committed if it doesn't contain secrets
3. All environment variables that need to be accessible in the browser must be prefixed with `NEXT_PUBLIC_`
4. Update these values according to your actual deployment URLs
