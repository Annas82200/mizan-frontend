# 🚀 Mizan - Quick Start Guide

## ✅ Environment Setup (COMPLETE!)

Your environment files are now set up:
- ✅ `backend/.env` - Created (contains placeholders)
- ✅ `frontend/.env.local` - Created (ready to use)
- ✅ `.gitignore` - Verified (secrets are protected)

---

## 🔐 IMMEDIATE ACTION REQUIRED

### 1. Generate Security Secrets (2 minutes)

Open your terminal and run:

```bash
# Generate JWT Secret
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Generate Session Secret
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```

**Copy the output** and paste into `backend/.env`:
```env
JWT_SECRET=paste_your_generated_jwt_secret_here
SESSION_SECRET=paste_your_generated_session_secret_here
```

### 2. Set Database Password

In `backend/.env`, update:
```env
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/mizan
```

Replace `YOUR_ACTUAL_PASSWORD` with your PostgreSQL password.

---

## 🎯 Minimum API Keys Needed to Start

### Required (Get these first):

1. **OpenAI API Key** (For AI analysis)
   - Sign up: https://platform.openai.com/signup
   - Get key: https://platform.openai.com/api-keys
   - Cost: ~$0.01-0.03 per analysis (pay-as-you-go)
   - Add to `backend/.env`:
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   ```

2. **SendGrid API Key** (For emails)
   - Sign up: https://signup.sendgrid.com/
   - Get key: https://app.sendgrid.com/settings/api_keys
   - Free tier: 100 emails/day
   - Add to `backend/.env`:
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```

3. **Stripe API Keys** (For billing)
   - Sign up: https://dashboard.stripe.com/register
   - Get TEST keys: https://dashboard.stripe.com/test/apikeys
   - Free to test
   - Add to `backend/.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
   ```

### Optional (Add later):
- Google Gemini (alternative AI)
- Anthropic Claude (alternative AI)
- AWS S3 (cloud storage)
- Social media integrations

---

## 🏃‍♂️ Run Your Application

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

Should see:
```
✓ Server running on http://localhost:3001
✓ Database connected
✓ Redis connected
```

### 2. Start Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Should see:
```
✓ Ready on http://localhost:3000
```

### 3. Open Browser

Visit: http://localhost:3000

---

## 🧪 Test Your Setup

### Check Backend API:
```bash
curl http://localhost:3001/health
```

Should return: `{"status":"ok"}`

### Check Frontend:
Open: http://localhost:3000

You should see the beautiful Mizan homepage!

### Check Dashboard:
1. Go to: http://localhost:3000/login
2. Login with your credentials
3. Access: http://localhost:3000/dashboard/superadmin

---

## 🔧 Troubleshooting

### "Database connection failed"
```bash
# Check if PostgreSQL is running
pg_ctl status

# Start PostgreSQL
pg_ctl start

# Or on Mac with Homebrew:
brew services start postgresql
```

### "Redis connection failed"
```bash
# Install Redis (if not installed)
brew install redis

# Start Redis
brew services start redis

# Or manually:
redis-server
```

### "Module not found"
```bash
# Install dependencies
cd backend && npm install
cd frontend && npm install
```

### "API key invalid"
- Check for spaces before/after key in `.env`
- Verify you're using the correct environment (test vs production)
- Regenerate the key in the provider's dashboard

---

## 📁 Your Project Structure

```
Mizan-1/
├── backend/
│   ├── .env                 ← YOUR SECRETS HERE (✅ Created!)
│   ├── .env.example         ← Template (safe to commit)
│   ├── src/
│   └── package.json
│
├── frontend/
│   ├── .env.local          ← API URL (✅ Created!)
│   ├── .env.example        ← Template
│   ├── src/
│   │   ├── app/            ← Pages
│   │   ├── components/     ← Reusable components
│   │   ├── services/       ← API services (✅ Ready!)
│   │   └── lib/            ← Utilities
│   └── package.json
│
├── SECURITY_SETUP.md       ← Full security guide
└── QUICK_START.md          ← This file!
```

---

## 🎨 Dashboard Features Ready to Use

### ✅ Already Built (40% Complete):
1. **Superadmin Dashboard** (7 pages):
   - Home/Overview
   - System Analytics
   - Tenant Management
   - Add Client (5-step wizard)
   - Trigger Engine
   - Framework Configuration (7-Cylinders)
   - AI Training Center

2. **Components** (50+):
   - Complete layout system
   - 39 custom icons
   - Shared dashboard components
   - Forms, tables, charts

3. **Backend Integration**:
   - API service layer (40+ endpoints)
   - Authentication ready
   - All services connected

### 🔜 Coming Next (60%):
- Admin Dashboard (9 pages)
- Employee Dashboard (5 pages)
- Module pages (18 pages)

---

## 📚 Important Files

### Security & Setup:
- `SECURITY_SETUP.md` - **READ THIS** for security best practices
- `backend/.env` - Your backend secrets
- `frontend/.env.local` - Your frontend config

### Development Docs:
- `DASHBOARD_PROGRESS.md` - What we've built
- `DASHBOARD_ROADMAP.md` - Full development plan
- `COMPLETION_SUMMARY.md` - Progress summary
- `PAGES_ADDED.md` - All pages & components

### Code:
- `frontend/src/services/dashboard.service.ts` - API layer
- `frontend/src/components/dashboard/` - Layout components
- `frontend/src/components/icons/` - 39 custom icons

---

## 🎯 Next Steps

1. ✅ Generate secrets (JWT & Session)
2. ✅ Set database password
3. ✅ Get OpenAI API key
4. ✅ Get SendGrid API key
5. ✅ Get Stripe TEST keys
6. 🚀 Run `npm run dev` in both folders
7. 🎉 Start using Mizan!

---

## 🆘 Need Help?

### Common Commands:

```bash
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Check what Git will commit (make sure .env is NOT listed)
git status

# Start PostgreSQL
brew services start postgresql

# Start Redis
brew services start redis

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Resources:
- [Security Setup Guide](./SECURITY_SETUP.md)
- [Dashboard Progress](./frontend/DASHBOARD_PROGRESS.md)
- [Full Roadmap](./DASHBOARD_ROADMAP.md)

---

## ✅ Checklist Before First Run

- [ ] JWT_SECRET generated and set
- [ ] SESSION_SECRET generated and set
- [ ] DATABASE_URL password updated
- [ ] PostgreSQL running
- [ ] Redis running (optional but recommended)
- [ ] At least one AI API key configured
- [ ] SendGrid API key configured (or skip emails for now)
- [ ] Stripe TEST keys configured
- [ ] Dependencies installed (`npm install`)

---

**You're ready to launch! 🚀**

Run `npm run dev` in both backend and frontend folders, then open http://localhost:3000

**IMPORTANT**: Read `SECURITY_SETUP.md` for production deployment! 🔐
