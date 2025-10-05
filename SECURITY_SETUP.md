# 🔐 Mizan Security & API Keys Setup Guide

## 📋 Table of Contents
1. [Environment Files Overview](#environment-files-overview)
2. [Critical Security Steps](#critical-security-steps)
3. [API Keys You Need](#api-keys-you-need)
4. [How to Generate Secrets](#how-to-generate-secrets)
5. [Git Security](#git-security)
6. [Production Deployment](#production-deployment)

---

## 🗂️ Environment Files Overview

### Your Current Setup:
```
Mizan-1/
├── backend/
│   ├── .env.example     ✅ Template (committed to Git)
│   └── .env             ✅ YOUR SECRETS (NOT in Git)
└── frontend/
    ├── .env.example     ✅ Template (committed to Git)
    └── .env.local       ✅ YOUR SECRETS (NOT in Git)
```

### ✅ What's Already Configured:
- `.gitignore` files exclude `.env` and `.env.local`
- Template files (`.env.example`) are safe to commit
- Actual environment files created for you

---

## 🚨 CRITICAL Security Steps

### 1. Generate Strong Secrets (REQUIRED!)

**Run these commands to generate secure secrets:**

```bash
# Generate JWT Secret
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Generate Session Secret
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```

**Copy the output and replace these in `/backend/.env`:**
```env
JWT_SECRET=your_generated_secret_here
SESSION_SECRET=your_generated_secret_here
```

### 2. Set Database Password

Update in `/backend/.env`:
```env
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/mizan
```

### 3. Verify .gitignore

**Already configured!** But double-check:
```bash
# Should show .env in the list
cat backend/.gitignore | grep ".env"
cat frontend/.gitignore | grep ".env"
```

---

## 🔑 API Keys You Need

### Required for Core Functionality:

#### 1. **Database** (Required)
- ✅ Already configured: PostgreSQL
- Location: `backend/.env`
- Key: `DATABASE_URL`

#### 2. **AI Providers** (At least ONE required)

**OpenAI (Recommended):**
- Get key: https://platform.openai.com/api-keys
- Cost: Pay-as-you-go (~$0.01-0.03 per analysis)
```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

**Anthropic Claude (Alternative):**
- Get key: https://console.anthropic.com/
- Cost: Similar to OpenAI
```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

**Google Gemini (Free tier available):**
- Get key: https://makersuite.google.com/app/apikey
- Cost: Free quota available
```env
GOOGLE_API_KEY=AIzaSyxxxxxxxxxxxxx
```

#### 3. **Email Service** (Required for notifications)

**SendGrid (Recommended):**
- Get key: https://app.sendgrid.com/settings/api_keys
- Cost: Free tier (100 emails/day)
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

#### 4. **Payment Processing** (Required for billing)

**Stripe:**
- Get keys: https://dashboard.stripe.com/apikeys
- Start with test keys (sk_test_...)
```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### Optional Integrations:

#### HRIS Integrations (For data import)
- **BambooHR**: https://www.bamboohr.com/api/
- **Workday**: Contact Workday support
- **ADP**: https://developers.adp.com/
- **SAP SuccessFactors**: https://api.sap.com/

#### Social Media (For sharing/posting)
- **LinkedIn**: https://www.linkedin.com/developers/
- **Twitter/X**: https://developer.twitter.com/
- **Facebook**: https://developers.facebook.com/

#### Cloud Storage (For file uploads)
- **AWS S3**: https://aws.amazon.com/s3/
```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=mizan-uploads
```

---

## 🛠️ How to Generate Secrets

### Option 1: Node.js (Recommended)
```bash
# 64-byte random hex string
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Option 2: OpenSSL
```bash
openssl rand -hex 64
```

### Option 3: Online Generator (Less Secure)
- https://www.random.org/strings/
- Settings: 128 characters, alphanumeric

---

## 🔒 Git Security Checklist

### ✅ Already Protected:
- [x] `.env` files in `.gitignore`
- [x] `.env.local` files in `.gitignore`
- [x] `.env.example` files are templates only

### ⚠️ Before First Commit:
```bash
# Check what will be committed
git status

# Verify .env is NOT listed
# If it is, run:
git rm --cached backend/.env
git rm --cached frontend/.env.local

# Commit .gitignore first
git add .gitignore
git commit -m "Add .gitignore for security"
```

### 🚨 If You Accidentally Committed Secrets:

**IMMEDIATE ACTIONS:**
1. **Rotate ALL secrets** (generate new ones)
2. **Revoke ALL API keys** (in provider dashboards)
3. **Remove from Git history:**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

---

## 🚀 Production Deployment

### Vercel (Frontend - Recommended)

**Environment Variables:**
1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
```
NEXT_PUBLIC_API_URL=https://api.mizan.ai
NODE_ENV=production
```

### Railway/Render (Backend - Recommended)

**Environment Variables:**
1. In dashboard, add ALL variables from `.env`
2. Generate NEW production secrets (don't reuse local)
3. Critical ones:
```
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=NEW_PRODUCTION_SECRET
OPENAI_API_KEY=...
STRIPE_SECRET_KEY=sk_live_...  # Use LIVE keys!
```

### Database (Production)

**Options:**
- **Supabase** (PostgreSQL): https://supabase.com
- **Neon** (Serverless Postgres): https://neon.tech
- **Railway** (Managed Postgres): https://railway.app

---

## 📝 Quick Start Checklist

### Minimum to Run Locally:

- [ ] Generate `JWT_SECRET` and `SESSION_SECRET`
- [ ] Set `DATABASE_URL` with your password
- [ ] Get at least ONE AI API key (OpenAI/Claude/Gemini)
- [ ] Get SendGrid API key (or use console logs for dev)
- [ ] Get Stripe TEST keys (for billing features)

### Optional for Later:
- [ ] HRIS integrations (when you need data import)
- [ ] Social media keys (when you add sharing)
- [ ] AWS S3 (when you need cloud storage)
- [ ] Sentry (when you want error tracking)

---

## 🎯 Environment-Specific Settings

### Local Development
```env
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/mizan
NEXT_PUBLIC_API_URL=http://localhost:3001
DISABLE_AUTH=false  # Keep auth enabled to test
```

### Staging
```env
NODE_ENV=staging
DATABASE_URL=postgresql://staging-db-url
NEXT_PUBLIC_API_URL=https://api-staging.mizan.ai
```

### Production
```env
NODE_ENV=production
DATABASE_URL=postgresql://production-db-url
NEXT_PUBLIC_API_URL=https://api.mizan.ai
DISABLE_AUTH=false  # NEVER disable in production!
```

---

## 🆘 Support

### If Secrets Are Compromised:
1. **Immediately rotate** all affected keys
2. **Revoke** old keys in provider dashboards
3. **Monitor** for unauthorized usage
4. **Update** in all environments

### Common Issues:

**"API key invalid"**
- Check for extra spaces in `.env`
- Verify key is for correct environment (test vs live)

**"Database connection failed"**
- Check password in `DATABASE_URL`
- Verify PostgreSQL is running: `pg_ctl status`

**"CORS error in frontend"**
- Update `CORS_ORIGINS` in backend `.env`
- Match `NEXT_PUBLIC_API_URL` in frontend

---

## 📚 Resources

- [Environment Variables Best Practices](https://12factor.net/config)
- [OWASP Secret Management](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

---

**Remember**:
- ✅ `.env.example` = Template (safe to commit)
- ❌ `.env` = Actual secrets (NEVER commit)
- 🔐 Always use strong, unique secrets for production!

**YOU'RE ALL SET!** 🎉
