# 🚀 Mizan Frontend - Deployment Guide

## Quick Deploy to Vercel

### 1. Prerequisites
- GitHub account
- Vercel account (free tier works)
- Backend API deployed and accessible

### 2. Deploy Steps

#### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `https://github.com/Annas82200/mizan-frontend.git`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
5. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-api.com`
6. Click "Deploy"

#### Option B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

**Production:**
```
NEXT_PUBLIC_API_URL=https://api.mizan.ai
NODE_ENV=production
```

**Preview/Development:**
```
NEXT_PUBLIC_API_URL=https://api-staging.mizan.ai
NODE_ENV=development
```

### 4. Custom Domain (Optional)

1. In Vercel Dashboard → Project → Settings → Domains
2. Add your domain: `www.mizan.ai`
3. Follow DNS configuration instructions

## Deploy to Other Platforms

### Netlify
1. Connect GitHub repo
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. Environment variables: Same as Vercel

### Docker (Self-hosted)
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_URL=https://api.mizan.ai
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t mizan-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.mizan.ai mizan-frontend
```

## Build Verification

Before deploying, verify your build locally:

```bash
npm install
npm run build
npm start
```

Visit `http://localhost:3000` to test.

## Production Checklist

- [x] All pages build without errors (17/17 pages ✓)
- [x] No console.log statements in production code
- [x] Environment variables configured
- [x] API endpoint is HTTPS (not HTTP)
- [x] All dependencies installed
- [x] TypeScript types validated
- [x] Tailwind CSS optimized
- [x] Icons loading correctly (39 custom icons)
- [ ] Backend API is accessible from frontend
- [ ] CORS configured on backend to allow frontend domain

## Performance Optimization

The build is already optimized with:
- ✅ Next.js 14 with App Router
- ✅ Automatic code splitting
- ✅ Static page generation where possible
- ✅ Optimized bundle size (87.3 kB shared)
- ✅ Tree shaking enabled
- ✅ Minification enabled

## Monitoring

### Vercel Analytics (Recommended)
Add to your project:
```bash
npm install @vercel/analytics
```

Then in `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Troubleshooting

### Build fails with "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API calls fail (CORS error)
Ensure backend has CORS configured:
```javascript
// Backend example
app.use(cors({
  origin: ['https://mizan.ai', 'https://www.mizan.ai'],
  credentials: true
}));
```

### Environment variables not working
- Make sure variable names start with `NEXT_PUBLIC_` for client-side access
- Redeploy after changing environment variables in Vercel

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Your app is ready to deploy! 🎉**
