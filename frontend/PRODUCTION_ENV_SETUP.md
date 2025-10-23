# Frontend Production Environment Setup

**Last Updated:** 2025-10-23
**Status:** CRITICAL - Required for Frontend Deployment

---

## 🎯 Required Environment Variables

### Option 1: Vercel Deployment (Recommended)

If deploying to Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables for **Production**, **Preview**, and **Development**:

```bash
NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app
NODE_ENV=production
```

**How to Add:**
```bash
# Via Vercel CLI
vercel env add NEXT_PUBLIC_API_URL
# When prompted, enter: https://mizan-backend-production.up.railway.app

# Or via Vercel Dashboard
# Settings → Environment Variables → Add New
# Name: NEXT_PUBLIC_API_URL
# Value: https://mizan-backend-production.up.railway.app
# Environment: Production, Preview, Development
```

---

### Option 2: Netlify Deployment

If deploying to Netlify:

1. Go to your Netlify project dashboard
2. Navigate to **Site Settings** → **Environment Variables**
3. Add:

```bash
NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app
NODE_ENV=production
```

---

### Option 3: Railway Deployment

If deploying frontend to Railway:

1. Go to your Railway project
2. Navigate to your frontend service → **Variables**
3. Add:

```bash
NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app
NODE_ENV=production
```

---

## 🔍 Verification

After deployment, verify the environment variable is set correctly:

**Method 1: Check Browser Console**
```javascript
// Open browser console on your deployed site
console.log(process.env.NEXT_PUBLIC_API_URL);
// Should output: https://mizan-backend-production.up.railway.app
```

**Method 2: Check Network Tab**
1. Open browser DevTools → Network tab
2. Trigger an API call (login, fetch data, etc.)
3. Verify request is going to `https://mizan-backend-production.up.railway.app/api/...`
4. Should NOT see requests to `localhost:5001`

---

## ⚠️ Common Issues

### Issue 1: API Calls Still Going to Localhost
**Symptom:** Network errors, 404s, "Failed to load resource"
**Cause:** Environment variable not set or app not rebuilt
**Fix:**
1. Verify env var is set in deployment platform
2. Redeploy or rebuild the application
3. Clear browser cache

### Issue 2: CORS Errors
**Symptom:** "CORS policy: No 'Access-Control-Allow-Origin' header"
**Cause:** Backend CORS not configured for frontend domain
**Fix:** Backend already configured for production (Phase 1)
- Verify backend CORS allows your frontend domain

### Issue 3: 401 Unauthorized
**Symptom:** All API calls return 401
**Cause:** Authentication token issues
**Fix:**
1. Clear localStorage and re-login
2. Verify JWT_SECRET matches between environments
3. Check token expiration (7 days)

---

## 🧪 Testing

### Local Development with Production Backend

For testing locally against production backend:

**File:** `frontend/.env.local`
```bash
NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app
```

Then:
```bash
npm run dev
# Visit http://localhost:3000
# API calls will go to production backend
```

### Local Development with Local Backend

For full local development:

**File:** `frontend/.env.local`
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001
```

Make sure backend is running:
```bash
cd backend
npm run dev
# Backend on http://localhost:5001
```

---

## 📋 Deployment Checklist

Before deploying frontend to production:

- [ ] Set `NEXT_PUBLIC_API_URL` environment variable in deployment platform
- [ ] Set `NODE_ENV=production`
- [ ] Verify backend is deployed and accessible at Railway URL
- [ ] Test authentication flow (login/logout)
- [ ] Test API calls in browser Network tab
- [ ] Verify no localhost references in production
- [ ] Test CORS with production domain
- [ ] Verify structure analysis page loads data

---

## 🔗 Backend Information

**Backend URL:** `https://mizan-backend-production.up.railway.app`
**Backend Repository:** `https://github.com/Annas82200/mizan-backend`
**Backend Deployment:** Railway (auto-deploys on push to main)

**Available Endpoints:**
- `POST /api/auth/login` - User authentication
- `GET /api/upload/structures` - Get structure analyses (requires auth)
- `POST /api/analyses/structure` - Run structure analysis (requires auth)
- [Full API documentation in backend repository]

---

## 📝 Current Status

**Frontend .env.local:** ✅ Updated to production URL
**Production Deployment:** ⏸️ Pending env var configuration

**Next Steps:**
1. Deploy frontend to hosting platform
2. Configure environment variables
3. Test structure analysis flow end-to-end
4. Verify all API calls work correctly

---

**Need Help?** Check backend logs at: `railway logs` (in backend directory)
