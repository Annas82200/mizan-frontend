# Vercel Environment Variables

Add these environment variables in your Vercel dashboard:

## Required Environment Variables:

```
NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://mizzanvalues.com
NEXT_PUBLIC_ENABLE_REAL_PAYMENTS=true
```

## Stripe Configuration (Live Keys):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[YOUR_PUBLISHABLE_KEY]
STRIPE_SECRET_KEY=sk_live_[YOUR_SECRET_KEY]
```

**Note**: Replace with your actual Stripe live keys in Vercel dashboard.

## How to Add in Vercel:
1. Go to vercel.com → Your project
2. Settings → Environment Variables
3. Add each variable with its value
4. Redeploy the project
