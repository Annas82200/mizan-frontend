# 🔍 Login Troubleshooting Guide

**Your Setup:**
- Frontend: https://mizan.work (Vercel)
- Backend: https://mizan-backend-production.up.railway.app (Railway)
- Backend CORS: ✅ Already configured for mizan.work

---

## ✅ Step 1: Verify Vercel Environment Variable

**In Vercel Dashboard**, check that you have:

```
Name: NEXT_PUBLIC_API_URL
Value: https://mizan-backend-production.up.railway.app
```

**⚠️ CRITICAL**: Must include `https://` at the beginning!

### How to Check:

1. Go to https://vercel.com/dashboard
2. Click your project
3. Settings → Environment Variables
4. Look for `NEXT_PUBLIC_API_URL`

**Should see:**
```
NEXT_PUBLIC_API_URL = https://mizan-backend-production.up.railway.app
```

**NOT:**
```
NEXT_PUBLIC_API_URL = mizan-backend-production.up.railway.app  ❌
```

---

## ✅ Step 2: Test Backend is Accessible

Open your browser and visit:
```
https://mizan-backend-production.up.railway.app/health
```

**Should see:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-05T...",
  "version": "2.0.0",
  "features": [...]
}
```

**If you see an error:**
- Backend might not be running on Railway
- Check Railway dashboard to ensure deployment is active

---

## ✅ Step 3: Redeploy Frontend (if you just added the env var)

After adding/changing environment variables in Vercel:

1. Go to **Deployments** tab
2. Click **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

**Why?** Environment variables only take effect after redeployment!

---

## ✅ Step 4: Test Login with Browser DevTools

1. Go to https://mizan.work/login
2. Open DevTools (Press **F12** or **Cmd+Option+I**)
3. Go to **Console** tab
4. Enter credentials:
   - Email: `anna@mizan.com`
   - Password: `MizanAdmin2024!`
5. Click **"Sign In"**

### What to Look For:

**✅ GOOD (Working):**
```
POST https://mizan-backend-production.up.railway.app/api/auth/login
Status: 200 OK
```

**❌ BAD (localhost):**
```
POST http://localhost:3001/api/auth/login
Status: ERR_CONNECTION_REFUSED
```
→ **Fix**: Environment variable not set or not redeployed

**❌ BAD (CORS error):**
```
Access to fetch at 'https://mizan-backend-production...' has been blocked by CORS policy
```
→ **Fix**: Backend needs to restart or CORS issue

**❌ BAD (401 Unauthorized):**
```
POST https://mizan-backend-production.up.railway.app/api/auth/login
Status: 401 Unauthorized
Response: { error: "Invalid credentials" }
```
→ **Fix**: User doesn't exist in database or wrong password

---

## 🔧 Common Issues & Fixes

### Issue #1: Still Connecting to localhost:3001

**Cause**: Environment variable not set or frontend not redeployed

**Fix**:
1. Add `NEXT_PUBLIC_API_URL` in Vercel
2. **Must include `https://`**
3. Redeploy frontend
4. Clear browser cache and try again

---

### Issue #2: CORS Error

**Cause**: Backend CORS not allowing mizan.work

**Your Status**: ✅ Already fixed! Your backend has:
```javascript
const allowedOrigins = [
  'https://mizan.work',
  'https://www.mizan.work'
];
```

**If still seeing CORS error:**
- Restart backend on Railway
- Check Railway deployment logs

---

### Issue #3: 401 Unauthorized

**Cause**: User doesn't exist in database

**Fix**: You need to create the user in your backend database:

**Option A: Use Railway PostgreSQL Console**
```sql
-- Connect to your database and run:
INSERT INTO users (email, password, role, full_name)
VALUES (
  'anna@mizan.com',
  '$2b$10$...',  -- hashed password
  'superadmin',
  'Anna Dahrouj'
);
```

**Option B: Use Backend Registration Endpoint**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "anna@mizan.com",
    "password": "MizanAdmin2024!",
    "fullName": "Anna Dahrouj",
    "role": "superadmin"
  }'
```

---

### Issue #4: 404 Not Found

**Cause**: Backend route `/api/auth/login` doesn't exist

**Check**: Visit https://mizan-backend-production.up.railway.app/health

**If health check works**: Login route should work too
**If health check fails**: Backend isn't running

---

## 📋 Complete Checklist

Before login will work:

- [ ] Backend deployed and running on Railway
- [ ] Backend health check working: https://mizan-backend-production.up.railway.app/health
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel (with `https://`)
- [ ] Frontend redeployed after adding env var
- [ ] Backend CORS includes mizan.work (✅ already done)
- [ ] User `anna@mizan.com` exists in database
- [ ] Password is correct: `MizanAdmin2024!`

---

## 🧪 Quick Test Script

Run this in your browser console while on https://mizan.work/login:

```javascript
// Check what API URL the frontend is using
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

// Test backend health
fetch('https://mizan-backend-production.up.railway.app/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend health:', d))
  .catch(e => console.error('❌ Backend unreachable:', e));

// Test login endpoint
fetch('https://mizan-backend-production.up.railway.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'anna@mizan.com',
    password: 'MizanAdmin2024!'
  })
})
  .then(r => r.json())
  .then(d => console.log('Login response:', d))
  .catch(e => console.error('Login error:', e));
```

---

## 🆘 Still Not Working?

**Send me this information:**

1. **Environment Variable**:
   - Screenshot of Vercel env vars
   - Exact value of `NEXT_PUBLIC_API_URL`

2. **Backend Health Check**:
   - What happens when you visit: https://mizan-backend-production.up.railway.app/health

3. **Browser Console**:
   - What errors show in DevTools when you try to login?
   - Screenshot of Network tab showing the login request

4. **Railway Status**:
   - Is your backend deployment active and running?
   - Check Railway logs for errors

---

## ✅ Expected Flow (When Working)

1. User visits https://mizan.work/login
2. Enters anna@mizan.com / MizanAdmin2024!
3. Frontend sends POST to https://mizan-backend-production.up.railway.app/api/auth/login
4. Backend validates credentials
5. Backend returns: `{ token: "jwt...", user: { role: "superadmin", ... } }`
6. Frontend stores token in localStorage
7. Frontend redirects to /dashboard/superadmin
8. User sees dashboard

---

**Most likely issue**: Environment variable not set correctly or frontend not redeployed after setting it.

**Quick fix**: Double-check Vercel env var has `https://` and redeploy!
