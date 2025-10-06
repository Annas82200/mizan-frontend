# 🔐 Fix Login - Create Superadmin User

**Your Error**: "The string did not match the expected pattern"

**Root Cause**: The user `anna@mizan.com` doesn't exist in your Railway database yet.

---

## ✅ Quick Fix (5 minutes)

### Step 1: Generate Password Hash

```bash
cd /Users/annasdahrouj/Projects/Mizan-1/backend
node create-superadmin.js
```

**What this does:**
- Generates bcrypt hash for password `MizanAdmin2024!`
- Shows you the complete SQL to run
- Verifies the hash works

**You'll see output like:**
```
✅ Password hash generated successfully!

Email:    anna@mizan.com
Password: MizanAdmin2024!
Hash:     $2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 2: Copy the SQL Output

The script will output complete SQL that looks like:

```sql
INSERT INTO users (
  tenant_id,
  email,
  password_hash,
  name,
  role,
  is_active,
  created_at,
  updated_at
)
VALUES (
  (SELECT id FROM tenants WHERE name = 'Mizan Superadmin' LIMIT 1),
  'anna@mizan.com',
  '$2a$10$xxxx...',  -- Your generated hash
  'Anna Dahrouj',
  'superadmin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = 'superadmin',
  is_active = true,
  updated_at = NOW();
```

### Step 3: Run SQL in Railway

1. **Go to Railway**: https://railway.app/dashboard
2. **Click your PostgreSQL database** (not the backend service)
3. **Click "Query" tab** or "Data" tab
4. **Paste the SQL** from Step 2
5. **Click "Run" or "Execute"**

You should see: `INSERT 0 1` or similar success message

### Step 4: Verify User Exists

Run this query in Railway:

```sql
SELECT id, email, name, role, is_active, created_at
FROM users
WHERE email = 'anna@mizan.com';
```

You should see your user with `role = 'superadmin'`

### Step 5: Set Railway Environment Variable (IMPORTANT!)

For login to work from mizan.work, set:

1. **Railway Dashboard** → **Your Backend Service** (not database)
2. **Variables** tab
3. **Add variable**:
   ```
   CLIENT_URL = https://mizan.work
   ```
4. **Save** → Backend will auto-redeploy

### Step 6: Set Vercel Environment Variable

1. **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**
2. **Verify you have**:
   ```
   NEXT_PUBLIC_API_URL = https://mizan-backend-production.up.railway.app
   ```
3. If you just added it, **Redeploy** the frontend

### Step 7: Test Login! 🎉

1. Go to https://mizan.work/login
2. Enter:
   - Email: `anna@mizan.com`
   - Password: `MizanAdmin2024!`
3. Click "Sign In"

**You should:**
- See "Welcome back!" success message
- Be redirected to `/dashboard/superadmin`
- See your superadmin dashboard!

---

## 🆘 Troubleshooting

### Error: "Invalid credentials"

**Cause**: Password hash doesn't match or user not found

**Fix**: Re-run the hash generator and update the database:
```sql
UPDATE users
SET password_hash = '[NEW_HASH_HERE]'
WHERE email = 'anna@mizan.com';
```

### Error: "CORS policy blocked"

**Cause**: Railway `CLIENT_URL` not set or wrong

**Fix**: Set `CLIENT_URL = https://mizan.work` in Railway backend variables

### Error: Still showing "string did not match pattern"

**Cause**: Vercel environment variable not set

**Fix**:
1. Add `NEXT_PUBLIC_API_URL` in Vercel
2. Redeploy frontend
3. Clear browser cache and try again

### Database Error: "relation users does not exist"

**Cause**: Database schema not migrated

**Fix**:
```bash
cd backend
npm run db:push  # or your migration command
```

---

## 📋 Complete Checklist

Before login will work:

- [ ] Backend deployed on Railway ✅ (Already done)
- [ ] Frontend deployed on Vercel ✅ (Already done)
- [ ] Password hash generated (`node create-superadmin.js`)
- [ ] SQL executed in Railway database
- [ ] User verified to exist (SELECT query)
- [ ] Railway `CLIENT_URL = https://mizan.work` set
- [ ] Vercel `NEXT_PUBLIC_API_URL` set
- [ ] Both services redeployed after env vars
- [ ] Test login at https://mizan.work/login

---

## 🎯 Summary

1. Run: `node create-superadmin.js` in backend folder
2. Copy the SQL output
3. Execute in Railway database Query tab
4. Set environment variables in Railway + Vercel
5. Test login!

**After this, you'll be able to login and access your superadmin dashboard!** 🚀

---

## 🔍 Check Backend is Working

Quick test in browser console while on https://mizan.work:

```javascript
// Test backend health
fetch('https://mizan-backend-production.up.railway.app/health')
  .then(r => r.json())
  .then(d => console.log('Backend:', d.status))
  .catch(e => console.error('Backend error:', e));
```

Should show: `Backend: healthy`

---

**Need more help?** The scripts are located in:
- `/Users/annasdahrouj/Projects/Mizan-1/backend/create-superadmin.js`
- `/Users/annasdahrouj/Projects/Mizan-1/backend/CREATE_SUPERADMIN.sql`
