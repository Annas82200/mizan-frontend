# RSC Payload Error Troubleshooting

**Error**: `Failed to fetch RSC payload for https://www.mizan.work/. Falling back to browser navigation.`

**Type**: Next.js React Server Components (RSC) navigation error

---

## What This Error Means

This error occurs when Next.js client-side navigation fails to fetch server component data, causing it to fall back to full page reloads. It's **not related to the Skills BOT API** - it's a Next.js routing/navigation issue.

---

## Root Causes

### 1. Environment Variable Issues (Most Likely)
**Symptom**: Production site trying to call wrong API URL

**Check**:
- Is `NEXT_PUBLIC_API_URL` set correctly in production?
- Should be: `https://mizan-backend-production.up.railway.app` (or your backend URL)
- NOT: `http://localhost:3001`

**Fix**:
```bash
# In your hosting platform (Vercel/Railway/etc), set:
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

Then **redeploy** the frontend.

### 2. CORS Configuration
**Symptom**: Browser blocks API requests from frontend to backend

**Check Backend CORS** (`backend/index.ts`):
```typescript
app.use(cors({
  origin: [
    'https://www.mizan.work',
    'https://mizan.work',
    'http://localhost:3000',
    // Add any other frontend domains
  ],
  credentials: true
}));
```

### 3. Network/SSL Issues
**Symptom**: Mixed content (HTTPS frontend calling HTTP backend)

**Fix**:
- Ensure backend is HTTPS (Railway provides this automatically)
- Check backend is accessible: `curl https://your-backend-url.com/health`

### 4. Build Cache Issues
**Symptom**: Stale production build

**Fix**:
```bash
# Clear Next.js cache and rebuild
cd frontend
rm -rf .next
npm run build

# Or in production, trigger a fresh deployment
```

---

## Quick Diagnosis Steps

### Step 1: Check Current API URL
Open browser console on `https://www.mizan.work` and run:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
```

**Expected**: `https://mizan-backend-production.up.railway.app`
**Problem**: `undefined` or `http://localhost:3001`

### Step 2: Check Network Tab
1. Open DevTools → Network tab
2. Try to navigate on the site
3. Look for failed requests to `/` or `/_next/data/...`

**What to look for**:
- 404 errors → Missing routes
- CORS errors → Backend CORS misconfigured
- Timeout → Backend down or slow

### Step 3: Check Backend Health
```bash
curl https://mizan-backend-production.up.railway.app/health
```

**Expected**: `{"status":"ok"}`
**Problem**: Timeout or error

---

## Solutions by Scenario

### Scenario A: Wrong API URL in Production

**Problem**: Frontend built with localhost URL

**Solution**:
1. Set environment variable in hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Railway: Project → Variables
   - Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`

2. Redeploy frontend

3. Verify with:
   ```javascript
   // In browser console
   fetch(process.env.NEXT_PUBLIC_API_URL + '/health').then(r => r.json())
   ```

### Scenario B: CORS Blocking Requests

**Problem**: Backend rejecting frontend requests

**Solution in `backend/index.ts`**:
```typescript
import cors from 'cors';

app.use(cors({
  origin: [
    'https://www.mizan.work',
    'https://mizan.work',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Commit and redeploy backend.

### Scenario C: Mixed Content (HTTP/HTTPS)

**Problem**: HTTPS frontend calling HTTP backend

**Solution**:
- Ensure backend URL uses `https://` not `http://`
- Railway/Vercel automatically provide HTTPS
- Check: `NEXT_PUBLIC_API_URL=https://...` (NOT `http://...`)

### Scenario D: Backend Not Deployed

**Problem**: Backend server not running

**Solution**:
```bash
# Check Railway backend logs
railway logs --project mizan-backend

# Or deploy backend
cd backend
git add .
git commit -m "Deploy backend"
git push
```

---

## Testing After Fix

### 1. Test API Connection
Open browser console on production site:
```javascript
// Test API connection
fetch(process.env.NEXT_PUBLIC_API_URL + '/health')
  .then(r => r.json())
  .then(data => console.log('Backend healthy:', data))
  .catch(err => console.error('Backend error:', err));
```

### 2. Test Authentication
```javascript
// Check if auth token exists
console.log('Auth token:', localStorage.getItem('mizan_auth_token'));
```

### 3. Test Skills BOT Endpoint
```javascript
// Test conversation start (must be logged in)
fetch(process.env.NEXT_PUBLIC_API_URL + '/api/skills/profile/start-conversation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
  },
  body: JSON.stringify({})
})
  .then(r => r.json())
  .then(data => console.log('BOT response:', data))
  .catch(err => console.error('BOT error:', err));
```

---

## Still Not Working?

### Debug Checklist

- [ ] `NEXT_PUBLIC_API_URL` set in production env vars?
- [ ] Frontend redeployed after setting env var?
- [ ] Backend CORS includes frontend domain?
- [ ] Backend is running and accessible?
- [ ] Both frontend and backend use HTTPS?
- [ ] Browser console shows any specific errors?
- [ ] Network tab shows which requests fail?

### Collect Debugging Info

Run these in browser console:
```javascript
// 1. Check API URL
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

// 2. Check window location
console.log('Current URL:', window.location.href);

// 3. Test backend connection
fetch(process.env.NEXT_PUBLIC_API_URL + '/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

Share the output for further diagnosis.

---

## Most Likely Fix

**90% of the time**, this error is because:

1. Production frontend was built WITHOUT the correct `NEXT_PUBLIC_API_URL`
2. Frontend is trying to call `localhost:3001` (which doesn't exist in production)

**Solution**:
1. Set `NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app` in hosting platform
2. Redeploy frontend
3. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

---

## Related Issues

- Skills BOT 404 errors → Fixed in commit `613e96c1`
- CORS errors → Add frontend domain to backend CORS config
- Auth errors → Check JWT token in localStorage

---

## Need More Help?

Provide these details:
1. What URL are you accessing? (production or localhost)
2. Browser console errors (screenshot)
3. Network tab failed requests (screenshot)
4. Output of environment variable check above
