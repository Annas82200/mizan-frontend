# Mizan Platform - Development Guide

## 🎯 Purpose

This guide ensures smooth development by keeping frontend, backend, and database in perfect sync. Follow these workflows to avoid schema mismatches and deployment issues.

---

## 📋 Table of Contents

1. [Tech Stack Overview](#tech-stack-overview)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Database Management](#database-management)
5. [Common Issues & Solutions](#common-issues--solutions)
6. [Deployment Checklist](#deployment-checklist)

---

## 🛠 Tech Stack Overview

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **URL**: https://mizan-platform-final.vercel.app

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (Railway)
- **Deployment**: Railway
- **URL**: https://yamabiko.proxy.rlwy.net

### Database
- **Type**: PostgreSQL
- **Host**: Railway
- **ORM**: Drizzle with schema-first approach

---

## 📁 Project Structure

```
Mizan-1/
├── frontend/
│   ├── src/
│   │   ├── app/                    # Next.js 14 App Router pages
│   │   │   ├── dashboard/
│   │   │   │   └── superadmin/     # Superadmin dashboard
│   │   │   └── (marketing)/        # Public marketing pages
│   │   ├── components/             # Reusable components
│   │   ├── services/               # API service layer
│   │   └── types/                  # TypeScript definitions
│   └── package.json
│
├── backend/
│   ├── db/
│   │   ├── schema/                 # Database schema definitions
│   │   │   ├── core.ts            # Tenants, users, departments
│   │   │   ├── culture.ts         # Culture analysis
│   │   │   ├── hiring.ts          # Hiring module
│   │   │   └── ...                # Other modules
│   │   ├── schema.ts              # Schema exports
│   │   └── index.ts               # Database connection
│   ├── routes/                     # API route handlers
│   ├── middleware/                 # Auth, validation, etc.
│   ├── dist/                       # Compiled JavaScript
│   ├── drizzle.config.ts          # Drizzle configuration
│   └── package.json
│
└── DEVELOPMENT.md                  # This file
```

---

## ⚙️ Development Workflow

### 🚀 Initial Setup

```bash
# Clone repository
git clone <repo-url>
cd Mizan-1

# Install dependencies
cd frontend && npm install
cd ../backend && npm install
```

### 🔄 The Proper Development Flow

**ALWAYS follow this sequence when making changes:**

#### 1. **Update Schema** (Backend)

Edit schema files in `/backend/db/schema/`:

```typescript
// Example: Adding a new field to tenants
export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  industry: text('industry'),  // ← New field
  // ... other fields
});
```

#### 2. **Build TypeScript**

```bash
cd backend
npm run build
```

**✅ Must succeed** - Fix any TypeScript errors before proceeding.

#### 3. **Sync Database**

```bash
npm run db:push
```

This pushes schema changes directly to Railway database.

**Alternative** (for production migrations):
```bash
npm run db:generate  # Generate migration files
npm run db:push      # Apply migrations
```

#### 4. **Update Frontend Types** (if needed)

If you added/changed database fields that frontend uses:

```typescript
// frontend/src/types/index.ts
export interface Tenant {
  id: string;
  name: string;
  industry?: string;  // ← Add matching field
  // ... other fields
}
```

#### 5. **Update API Endpoints** (if needed)

```typescript
// backend/routes/superadmin.ts
router.post('/clients', async (req, res) => {
  const { companyName, industry } = req.body;  // ← Use new field

  const [newTenant] = await db.insert(tenants).values({
    name: companyName,
    industry,  // ← Include in insert
    // ...
  });
});
```

#### 6. **Update Frontend Components**

```tsx
// frontend/src/app/dashboard/superadmin/clients/add/page.tsx
const [formData, setFormData] = useState({
  companyName: '',
  industry: '',  // ← Add to form state
  // ...
});
```

#### 7. **Test Locally**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Visit http://localhost:3000
```

#### 8. **Commit & Push**

```bash
git add .
git commit -m "Add industry field to tenant schema"
git push
```

**🚀 Auto-deploys:**
- Frontend → Vercel
- Backend → Railway

---

## 🗄️ Database Management

### Connection Details

**Production (Railway):**
```
Host: yamabiko.proxy.rlwy.net
Port: 23010
Database: railway
User: postgres
Password: rGCnmIBSqZkiPqFZmkbkQshewsNGxEmL
```

### Useful Commands

```bash
# Push schema changes to database
npm run db:push

# Generate migration files
npm run db:generate

# Open Drizzle Studio (GUI for database)
npm run db:studio

# Seed database with test data
npm run db:seed

# Verify schema (custom script)
node verify-schema.js
```

### Schema Management Best Practices

#### ✅ DO:
- Always update schema files first
- Run `npm run build` to check for TypeScript errors
- Use `npm run db:push` to sync schema to database
- Test locally before pushing to git
- Commit schema changes with descriptive messages

#### ❌ DON'T:
- Don't manually run SQL ALTER TABLE commands
- Don't skip the build step
- Don't push code without syncing database
- Don't commit with TypeScript errors
- Don't forget to update frontend types

### Environment Variables

**Backend `.env`** (already configured):
```env
DATABASE_URL=postgresql://postgres:rGCnmIBSqZkiPqFZmkbkQshewsNGxEmL@yamabiko.proxy.rlwy.net:23010/railway
JWT_SECRET=<your-secret>
SESSION_SECRET=<your-secret>
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Column does not exist" Error

**Symptom:**
```
Failed to create client: column "industry" of relation "tenants" does not exist
```

**Cause:** Database schema not in sync with code.

**Solution:**
```bash
cd backend
npm run build
npm run db:push
```

### Issue 2: TypeScript Build Errors

**Symptom:**
```
error TS2339: Property 'industry' does not exist on type 'Tenant'
```

**Cause:** Frontend types don't match backend schema.

**Solution:**
1. Check backend schema: `/backend/db/schema/core.ts`
2. Update frontend types: `/frontend/src/types/index.ts`
3. Rebuild both projects

### Issue 3: 401 Unauthorized Errors

**Symptom:**
```
Failed to load resource: the server responded with a status of 401
```

**Cause:** Missing or invalid authentication token.

**Solution:**
1. Check `localStorage.getItem('mizan_auth_token')` exists
2. Verify token is sent in Authorization header:
   ```typescript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```
3. Check JWT_SECRET matches between login and auth middleware

### Issue 4: CORS Errors

**Symptom:**
```
Access to fetch blocked by CORS policy
```

**Solution:**
Check backend `/index.ts` includes your frontend URL:
```typescript
const allowedOrigins = [
  'http://localhost:3000',
  'https://mizan-platform-final.vercel.app'
];
```

### Issue 5: Drizzle Push Fails

**Symptom:**
```
Error: Cannot find module './schema/core.js'
```

**Cause:** Drizzle config pointing to wrong path.

**Solution:**
Ensure `drizzle.config.ts` points to compiled files:
```typescript
export default {
  schema: './dist/db/schema.js',  // ← Not './db/schema.ts'
  // ...
}
```

---

## ✅ Deployment Checklist

Before pushing to production:

### Backend
- [ ] All TypeScript builds without errors (`npm run build`)
- [ ] Database schema synced (`npm run db:push`)
- [ ] Environment variables set on Railway
- [ ] API endpoints tested locally
- [ ] Authentication working

### Frontend
- [ ] Build succeeds locally (`npm run build`)
- [ ] All pages render without errors
- [ ] API calls include auth tokens
- [ ] Environment variables set on Vercel
- [ ] Types match backend schema

### Database
- [ ] Schema matches code definitions
- [ ] Required indexes exist
- [ ] Test data seeded if needed
- [ ] Backups configured

### Git
- [ ] Meaningful commit message
- [ ] No sensitive data in commits
- [ ] `.env` files in `.gitignore`
- [ ] All tests passing (if applicable)

---

## 🔧 Useful Scripts

### Backend Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Compile TypeScript
npm start               # Start production server

# Database
npm run db:push         # Sync schema to database
npm run db:generate     # Generate migrations
npm run db:studio       # Open Drizzle Studio
npm run db:seed         # Seed test data

# Testing
npm test                # Run tests
npm run lint            # Check code quality
```

### Frontend Scripts

```bash
# Development
npm run dev             # Start dev server
npm run build           # Build for production
npm start              # Start production server

# Testing
npm run lint           # ESLint check
npm run type-check     # TypeScript check
```

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)

### Mizan Specific
- **7-Cylinder Framework**: See `/frontend/src/app/dashboard/superadmin/framework/page.tsx`
- **API Endpoints**: See `/backend/routes/` directory
- **Database Schema**: See `/backend/db/schema/` directory

---

## 🆘 Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review error messages** carefully
3. **Verify environment variables** are set correctly
4. **Check git history** for recent breaking changes
5. **Test in isolation** - frontend, backend, database separately

---

## 🎉 Quick Reference

### One Command to Rule Them All

When you make schema changes, run this sequence:

```bash
cd backend
npm run build && npm run db:push && cd ../frontend && npm run build
```

If all three succeed ✅, you're good to commit and push!

---

**Last Updated:** 2025-10-06
**Maintained By:** Development Team
**Questions?** Check git history or ask the team!
