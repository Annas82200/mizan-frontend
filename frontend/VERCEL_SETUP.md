# 🚀 Vercel Deployment Setup - CRITICAL FIX NEEDED

## ⚠️ CRITICAL ISSUE: Login Not Working

Your login is failing because the frontend is trying to connect to `localhost:3001` which doesn't exist in production!

---

## ✅ SOLUTION: Set Environment Variable in Vercel

### Step 1: Find Your Backend URL

**Where is your backend deployed?**

You need to know your backend API URL. It should be something like:
- `https://api.mizan.work`
- `https://mizan-backend.onrender.com`
- `https://mizan-api.herokuapp.com`
- Or wherever you deployed your backend

---

### Step 2: Add Environment Variable in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project** (mizan-frontend)
3. **Click "Settings"** tab
4. **Click "Environment Variables"** in left sidebar
5. **Add new variable**:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://YOUR-BACKEND-URL.com` ← **REPLACE WITH ACTUAL URL**
   - **Environments**: Check all three (Production, Preview, Development)
6. **Click "Save"**

---

### Step 3: Redeploy

After adding the environment variable:

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click **"..." menu** → **"Redeploy"**
4. Wait 2-3 minutes for deployment to complete

---

## 🔍 How to Find Your Backend URL

### Option 1: Check Backend Deployment
If you deployed backend to:
- **Render**: Check your Render dashboard → Service → URL
- **Heroku**: Check Heroku dashboard → App → Settings → Domain
- **Railway**: Check Railway dashboard → Service → Public URL
- **Vercel**: If backend is also on Vercel, check its deployment URL

### Option 2: Check Backend .env
Look at your backend `.env` file:
```bash
# In backend folder
cat backend/.env | grep PORT
```

If backend is running on local machine only, you need to deploy it first!

---

## 🆘 BACKEND NOT DEPLOYED YET?

If you haven't deployed your backend, you need to do that FIRST before login will work.

### Quick Backend Deployment Options:

#### Option 1: Deploy to Render (Recommended - Free tier)
```bash
# 1. Create account at render.com
# 2. New Web Service
# 3. Connect your GitHub repo
# 4. Settings:
#    - Build Command: npm install && npm run build
#    - Start Command: npm start
#    - Add environment variables from backend/.env
# 5. Deploy
```

#### Option 2: Deploy to Railway
```bash
# 1. Create account at railway.app
# 2. New Project → Deploy from GitHub
# 3. Select backend folder
# 4. Add environment variables
# 5. Deploy
```

---

## ✅ After Backend is Deployed

1. **Get backend URL** (e.g., `https://mizan-api.onrender.com`)
2. **Add to Vercel**:
   - Go to Vercel → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://mizan-api.onrender.com`
3. **Redeploy frontend**
4. **Update backend CORS**:
   ```javascript
   // In backend, add to CORS config:
   app.use(cors({
     origin: ['https://mizan.work', 'https://www.mizan.work'],
     credentials: true
   }));
   ```
5. **Test login** at https://mizan.work/login

---

## 🧪 How to Test

After deploying:

1. Go to https://mizan.work/login
2. Open browser DevTools (F12) → Console tab
3. Enter credentials:
   - Email: `anna@mizan.com`
   - Password: `MizanAdmin2024!`
4. Click "Sign In"
5. **Check console for errors**:
   - ✅ Good: `POST https://your-backend-url.com/api/auth/login 200 OK`
   - ❌ Bad: `POST http://localhost:3001/api/auth/login ERR_CONNECTION_REFUSED`
   - ❌ Bad: `CORS error`

---

## 📋 Checklist

Before login will work:

- [ ] Backend deployed and running
- [ ] Backend URL is HTTPS (not localhost)
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Frontend redeployed after adding env var
- [ ] Backend CORS allows `mizan.work` domain
- [ ] Backend `/api/auth/login` endpoint exists and works
- [ ] Test user exists in backend database

---

## 🎯 Current Status

**Frontend**: ✅ Deployed at https://mizan.work
**Backend**: ❓ Unknown - NEED TO SET THIS UP
**Environment Variable**: ❌ Not set (defaulting to localhost:3001)

**Next Step**: Deploy your backend OR set `NEXT_PUBLIC_API_URL` to your existing backend URL!

---

## 💡 Quick Test (Development)

To test locally:

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd frontend
npm run dev

# Visit http://localhost:3000/login
# Login should work with localhost:3001 backend
```

---

## 📞 Need Help?

If you're stuck:
1. Check backend deployment status
2. Verify backend URL is accessible (visit it in browser)
3. Check Vercel deployment logs for errors
4. Check browser console for CORS/network errors

---

**TLDR**: Set `NEXT_PUBLIC_API_URL` environment variable in Vercel to your actual backend URL, then redeploy!
