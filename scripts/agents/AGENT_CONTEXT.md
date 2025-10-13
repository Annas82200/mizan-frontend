# MIZAN MULTI-AGENT SYSTEM - AGENT CONTEXT (Enhanced)

> **CRITICAL:** This context must be included in EVERY agent prompt to ensure accurate analysis and fixes.

---

## 🗄️ PROJECT OVERVIEW

**Project Name:** Mizan Platform  
**Type:** Multi-tenant SaaS HR Analytics Platform  
**Purpose:** AI-powered organizational analysis (Culture, Structure, Skills, Performance, Hiring)  
**Stage:** Active development → Production deployment  
**Quality Standard:** Zero placeholders, zero mock data, production-ready only

### 🚀 DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend (Next.js 14)  ──────▶  Vercel                │
│  └─ Automatic deployments from main branch              │
│  └─ Edge functions for API routes                       │
│  └─ CDN for static assets                               │
│                                                          │
│  Backend (Express + PostgreSQL)  ──────▶  Railway       │
│  └─ Node.js runtime                                     │
│  └─ PostgreSQL database                                 │
│  └─ Automatic deployments from main branch              │
│                                                          │
│  Environment Variables:                                  │
│  ├─ Vercel: NEXT_PUBLIC_API_URL, AUTH_SECRET            │
│  └─ Railway: DATABASE_URL, JWT_SECRET, API_KEYS         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Deployment URLs:**
- Frontend: `https://mizan-platform.vercel.app` (production)
- Backend API: `https://mizan-api.railway.app` (production)
- Development: `localhost:3000` (frontend), `localhost:5000` (backend)

---

## 📁 FILE STRUCTURE (EXACT PATHS REQUIRED!)

```
Mizan-1/                          ← PROJECT ROOT (all paths relative to this)
│
├── frontend/                     ← Next.js 14 Frontend Application
│   ├── src/
│   │   ├── app/                  ← Next.js App Router pages
│   │   │   ├── dashboard/
│   │   │   │   ├── superadmin/
│   │   │   │   │   ├── performance/
│   │   │   │   │   ├── clients/
│   │   │   │   │   ├── structure/
│   │   │   │   │   └── ai-training/
│   │   │   │   └── page.tsx
│   │   │   ├── survey/
│   │   │   │   └── [token]/
│   │   │   ├── structure-analysis/
│   │   │   ├── blog/
│   │   │   └── resources/
│   │   ├── components/          ← React components
│   │   │   ├── dashboard/
│   │   │   ├── ui/
│   │   │   └── forms/
│   │   ├── lib/                 ← Frontend utilities & helpers
│   │   │   ├── db/              ← (if exists) Frontend DB utilities
│   │   │   └── utils/
│   │   └── types/               ← Frontend TypeScript interfaces
│   ├── public/                  ← Static assets
│   └── vercel.json              ← Vercel deployment config
│
├── backend/                      ← Express.js API Server
│   ├── routes/                   ← API endpoint handlers
│   │   ├── entry.ts             ← Main entry routes
│   │   ├── auth.ts
│   │   ├── culture.ts
│   │   ├── structure.ts
│   │   └── performance.ts
│   ├── services/                 ← Business logic & AI modules
│   │   ├── agents/               ← AI Agent implementations
│   │   │   ├── culture/
│   │   │   │   ├── CultureAgent.ts
│   │   │   │   └── tests/
│   │   │   ├── structure/
│   │   │   │   └── StructureAgent.ts
│   │   │   ├── skills/
│   │   │   │   └── SkillsAgent.ts
│   │   │   ├── performance/
│   │   │   │   └── PerformanceAgent.ts
│   │   │   └── hiring/
│   │   │       └── recruitment-strategist.ts
│   │   ├── engines/              ← Three-Engine Architecture (CORE!)
│   │   │   ├── KnowledgeEngine.ts
│   │   │   ├── DataEngine.ts
│   │   │   └── ReasoningEngine.ts
│   │   └── modules/              ← Feature modules
│   ├── db/                       ← Drizzle ORM database
│   │   ├── schema/               ← Database table schemas
│   │   │   ├── users.ts
│   │   │   ├── tenants.ts
│   │   │   ├── culture.ts
│   │   │   └── performance.ts
│   │   └── connection.ts         ← Database connection
│   ├── middleware/               ← Express middleware
│   │   ├── auth.ts
│   │   ├── tenant.ts             ← Multi-tenant isolation
│   │   └── validation.ts
│   ├── types/                    ← Backend TypeScript types
│   └── index.ts                  ← Server entry point
│
├── scripts/                      ← THIS MULTI-AGENT SYSTEM
│   ├── agents/                   ← Agent scripts
│   │   ├── AGENT_CONTEXT.md     ← THIS FILE
│   │   ├── code-analyzer.js     ← Agent 1
│   │   ├── fix-generator.js     ← Agent 2
│   │   ├── mizan-validator.js   ← Agent 3
│   │   ├── security-checker.js  ← Agent 4
│   │   └── final-consensus.js   ← Agent 5
│   ├── audit-violations.js
│   ├── apply-fixes.js
│   └── orchestrator.js          ← Main automation script
│
└── .audit-config.json            ← Audit configuration
```

**⚠️ CRITICAL PATH RULES:**
- All file paths MUST be relative to `Mizan-1/` (project root)
- ✅ Correct: `frontend/src/app/dashboard/page.tsx`
- ❌ Wrong: `app/dashboard/page.tsx`
- ✅ Correct: `backend/routes/entry.ts`
- ❌ Wrong: `routes/entry.ts`

---

## 🎨 DESIGN GUIDELINES (MANDATORY)

### Color Palette

**Primary Colors:**
```css
--primary: #2563eb        /* Blue - Primary actions */
--primary-dark: #1e40af   /* Darker blue for hover */
--primary-light: #3b82f6  /* Lighter blue for backgrounds */

--secondary: #7c3aed      /* Purple - Secondary actions */
--accent: #06b6d4         /* Cyan - Accent elements */

--success: #10b981        /* Green - Success states */
--warning: #f59e0b        /* Orange - Warning states */
--error: #ef4444          /* Red - Error states */
--info: #3b82f6           /* Blue - Info states */
```

**Neutral Colors:**
```css
--background: #ffffff     /* Main background */
--surface: #f9fafb        /* Card/surface backgrounds */
--border: #e5e7eb         /* Borders and dividers */

--text-primary: #111827   /* Primary text */
--text-secondary: #6b7280 /* Secondary text */
--text-disabled: #9ca3af  /* Disabled text */
```

### Typography

**Font Family:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Font Sizes:**
```css
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
```

**Font Weights:**
```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Spacing System

Use Tailwind's spacing scale (4px base unit):
```
p-2  = 8px    margin: 0.5rem
p-4  = 16px   margin: 1rem
p-6  = 24px   margin: 1.5rem
p-8  = 32px   margin: 2rem
p-12 = 48px   margin: 3rem
```

### Component Patterns

**Button Styles:**
```tsx
// Primary Button
<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark 
                   transition-colors font-medium shadow-sm">
  Primary Action
</button>

// Secondary Button
<button className="px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-gray-100 
                   transition-colors font-medium border border-border">
  Secondary Action
</button>

// Danger Button
<button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600 
                   transition-colors font-medium shadow-sm">
  Delete
</button>
```

**Card Styles:**
```tsx
<div className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:shadow-md 
                transition-shadow">
  {/* Card content */}
</div>
```

**Input Styles:**
```tsx
<input 
  type="text"
  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 
             focus:ring-primary focus:border-primary outline-none transition-all"
  placeholder="Enter text..."
/>
```

**Modal/Dialog:**
```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
  <div className="bg-background rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
    {/* Modal content */}
  </div>
</div>
```

### Dashboard Layout Pattern

```tsx
// Dashboard Page Structure
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          {/* Header content */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page content */}
      </main>
    </div>
  );
}
```

### Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large desktop */
```

**Usage:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

### Animation Guidelines

**Transitions:**
```css
transition-all duration-200 ease-in-out  /* Quick interactions */
transition-all duration-300 ease-in-out  /* Standard */
transition-all duration-500 ease-in-out  /* Slow, emphasized */
```

**Hover Effects:**
```tsx
<button className="hover:scale-105 transition-transform">
  Hover Me
</button>
```

### Accessibility Requirements

1. **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
2. **Focus States:** Always visible, use `focus:ring-2 focus:ring-primary`
3. **ARIA Labels:** Include for icons and non-text elements
4. **Keyboard Navigation:** All interactive elements must be keyboard accessible

**Example:**
```tsx
<button
  aria-label="Close dialog"
  className="focus:ring-2 focus:ring-primary focus:outline-none"
>
  <XIcon className="w-5 h-5" />
</button>
```

---

## 🛠️ TECH STACK (MANDATORY)

### **Frontend Stack:**

```
Framework:    Next.js 14 (App Router ONLY, NOT Pages Router)
Language:     TypeScript 5.x (strict mode enabled)
Styling:      Tailwind CSS v3
State:        React Hooks (useState, useEffect, useReducer)
Data Fetch:   Native fetch() with async/await
Forms:        React Hook Form (where applicable)
UI Library:   Shadcn/ui components (optional)
Deployment:   Vercel (automatic deployments)
```

**Frontend Example:**
```typescript
// ✅ CORRECT Next.js 14 App Router pattern
export default async function Page() {
  const data = await fetch('/api/data').then(r => r.json());
  return <div>{data.title}</div>;
}

// ❌ WRONG - Pages Router (OLD)
export async function getServerSideProps() { }
```

### **Backend Stack:**

```
Runtime:      Node.js 20.x
Framework:    Express.js 4.x
Language:     TypeScript 5.x (strict mode enabled)
Database:     PostgreSQL 15+ (hosted on Railway)
ORM:          Drizzle ORM (ONLY - NOT Prisma, NOT TypeORM)
Auth:         JWT-based custom authentication
AI Providers: Anthropic (Claude 4), Google (Gemini 2.5), OpenAI (GPT-4)
Deployment:   Railway (automatic deployments)
```

**Backend Example:**
```typescript
// ✅ CORRECT Drizzle ORM pattern
import { db } from '../db/connection';
import { users, tenants } from '../db/schema';
import { eq, and } from 'drizzle-orm';

const userData = await db
  .select()
  .from(users)
  .where(and(
    eq(users.tenantId, tenantId),
    eq(users.isActive, true)
  ));

// ❌ WRONG - Raw SQL
const userData = await db.query('SELECT * FROM users');

// ❌ WRONG - Prisma
const userData = await prisma.users.findMany();
```

---

## 🎯 MIZAN DEVELOPMENT RULES (ABSOLUTE REQUIREMENTS)

### Rule #1: NO MOCK DATA (CRITICAL)

```typescript
// ❌ FORBIDDEN - Mock data
const mockUsers = [
  { id: 1, name: 'Test User', email: 'test@example.com' }
];
const mockPerformanceAnalysis = { score: 85, trend: 'improving' };

// ✅ REQUIRED - Real database queries
const users = await db.select().from(usersTable);
const analysis = await performanceAgent.analyze(userId);
```

**Why:** Mock data creates false sense of completion, hides integration issues, fails in production.

### Rule #2: NO PLACEHOLDERS (CRITICAL)

```typescript
// ❌ FORBIDDEN - Any form of placeholder
// TODO: Implement this later
// FIXME: Need to add validation here
// NOTE: Replace with real implementation
const result = null; // Placeholder

// ✅ REQUIRED - Complete implementation
const result = await validateUserInput(input);
if (!result.valid) {
  throw new Error(result.error);
}
```

**Why:** Placeholders indicate incomplete work, create technical debt, cause production failures.

### Rule #3: NO 'any' TYPES (STRICT)

```typescript
// ❌ FORBIDDEN - 'any' type usage
function processData(data: any) { }
const handleClick = (event: any) => { }
let userData: any;

// ✅ REQUIRED - Strict types
interface UserData {
  id: string;
  name: string;
  email: string;
  tenantId: string;
}

function processData(data: UserData) { }
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { }
let userData: UserData | null;
```

**Why:** TypeScript safety, IDE autocomplete, catch bugs at compile time.

### Rule #4: DRIZZLE ORM ONLY (MANDATORY)

```typescript
// ❌ FORBIDDEN - Raw SQL queries
await db.query('SELECT * FROM users WHERE id = $1', [userId]);
await db.execute(`INSERT INTO users VALUES (...)`)

// ❌ FORBIDDEN - Other ORMs
await prisma.users.findMany();
await typeorm.getRepository(User).find();

// ✅ REQUIRED - Drizzle ORM
import { db } from '@/db/connection';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

await db.select().from(users).where(eq(users.id, userId));
await db.insert(users).values({ name: 'John' });
```

**Why:** Consistent pattern, type safety, SQL injection protection, project standard.

### Rule #5: Next.js 14 App Router (MANDATORY)

```typescript
// ❌ FORBIDDEN - Pages Router patterns
export async function getServerSideProps(context) { }
export async function getStaticProps() { }
export async function getStaticPaths() { }

// ✅ REQUIRED - App Router patterns
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}

// app/api/users/route.ts
export async function GET(request: NextRequest) {
  const users = await db.select().from(usersTable);
  return Response.json(users);
}
```

**Why:** Project uses App Router, different patterns, improved performance.

---

## 🤖 MIZAN THREE-ENGINE AI ARCHITECTURE (CORE PATTERN)

**CRITICAL:** ALL AI agents in the platform MUST follow this architecture pattern!

```typescript
import { BaseAgent } from '../shared/BaseAgent';
import { KnowledgeEngine } from '../../engines/KnowledgeEngine';
import { DataEngine } from '../../engines/DataEngine';
import { ReasoningEngine } from '../../engines/ReasoningEngine';

export class CultureAgent extends BaseAgent {
  private knowledgeEngine: KnowledgeEngine;
  private dataEngine: DataEngine;
  private reasoningEngine: ReasoningEngine;

  constructor() {
    super('culture-agent');
    this.knowledgeEngine = new KnowledgeEngine();
    this.dataEngine = new DataEngine();
    this.reasoningEngine = new ReasoningEngine();
  }

  async analyzeCulture(input: CultureInput): Promise<CultureAnalysis> {
    // 1. KNOWLEDGE ENGINE: Load frameworks and best practices
    const frameworks = await this.knowledgeEngine.loadFrameworks([
      'organizational-culture',
      'hofstede-dimensions',
      'competing-values'
    ]);

    // 2. DATA ENGINE: Process and enrich data
    const enrichedData = await this.dataEngine.processCultureData({
      rawData: input.surveyData,
      frameworks: frameworks,
      context: input.organizationContext
    });

    // 3. REASONING ENGINE: Generate insights
    const analysis = await this.reasoningEngine.analyzeCulture({
      enrichedData,
      frameworks,
      analysisType: 'comprehensive'
    });

    return {
      overallScore: analysis.score,
      dimensions: analysis.dimensions,
      insights: analysis.insights,
      recommendations: analysis.recommendations
    };
  }
}
```

**Why this matters:**
- Separation of concerns (Knowledge, Data, Reasoning)
- Consistent pattern across ALL AI modules
- Follows Mizan's core architectural philosophy
- Enables framework-driven AI analysis
- Makes agents testable and maintainable

**When to use:**
- ✅ Any agent in `backend/services/agents/`
- ✅ Performance, Culture, Structure, Skills, Hiring modules
- ✅ Any AI-powered analysis or recommendation system

---

## 🔒 SECURITY & PRODUCTION REQUIREMENTS

### Authentication & Authorization

```typescript
// ✅ REQUIRED - Check auth on every protected endpoint
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Check role if needed
  if (session.user.role !== 'SUPERADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Continue with logic...
}
```

### Input Validation

```typescript
// ✅ REQUIRED - Validate all user inputs
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  tenantId: z.string().uuid()
});

const validated = userSchema.parse(userInput); // Throws if invalid
```

### Error Handling

```typescript
// ✅ REQUIRED - Proper error handling pattern
try {
  const result = await someOperation();
  return { success: true, data: result };
} catch (error) {
  console.error('Operation failed:', error);
  
  // Don't leak internal details to client
  return { 
    success: false, 
    error: error instanceof Error ? error.message : 'Operation failed'
  };
}
```

### SQL Injection Prevention

```typescript
// ✅ SAFE - Drizzle ORM with parameterized queries
await db
  .select()
  .from(users)
  .where(eq(users.email, userInput)); // Automatically parameterized

// ❌ UNSAFE - String interpolation
await db.query(`SELECT * FROM users WHERE email = '${userInput}'`);
```

---

## 📊 MULTI-TENANT ARCHITECTURE (CRITICAL!)

**EVERY database query MUST include tenant isolation:**

```typescript
// ❌ FORBIDDEN - No tenant filtering (security vulnerability!)
const users = await db.select().from(usersTable);
const entries = await db.select().from(entriesTable);

// ✅ REQUIRED - Tenant-filtered queries
import { getCurrentTenantId } from '../middleware/tenant';

const tenantId = await getCurrentTenantId(request);

const users = await db
  .select()
  .from(usersTable)
  .where(eq(usersTable.tenantId, tenantId));

const entries = await db
  .select()
  .from(entriesTable)
  .where(eq(entriesTable.tenantId, tenantId));
```

**Why:** Multi-tenant SaaS - must prevent cross-tenant data access (critical security requirement).

**Exceptions:** Only superadmin queries that explicitly need cross-tenant data.

---

## 🎓 CURSOR INTEGRATION INSTRUCTIONS

### How to Make Cursor Follow This Document

**Step 1: Create a .cursorrules file in your project root**

```bash
# In your Mizan-1/ directory, create:
touch .cursorrules
```

**Step 2: Add this content to .cursorrules:**

```
# Mizan Platform Development Rules

## CRITICAL: Read AGENT_CONTEXT.md First
Before making ANY code changes, read scripts/agents/AGENT_CONTEXT.md

## Mandatory Requirements
1. NO MOCK DATA - Always use real database queries with Drizzle ORM
2. NO PLACEHOLDERS - No TODOs, FIXMEs, or incomplete implementations
3. NO 'any' TYPES - Use strict TypeScript types always
4. DRIZZLE ORM ONLY - Never use Prisma, TypeORM, or raw SQL
5. NEXT.JS APP ROUTER - Use App Router patterns, not Pages Router

## Design Guidelines
- Follow Tailwind CSS patterns from AGENT_CONTEXT.md
- Use design tokens: primary (#2563eb), success (#10b981), error (#ef4444)
- Maintain responsive design: sm:640px, md:768px, lg:1024px
- Include proper focus states for accessibility

## Architecture
- AI Agents MUST use Three-Engine Architecture (Knowledge, Data, Reasoning)
- Always include tenant isolation in database queries
- Add authentication checks on all protected routes
- Use proper error handling with try/catch

## File Paths
- Use paths relative to project root: frontend/src/..., backend/...
- Frontend files in frontend/src/
- Backend files in backend/

## Deployment
- Frontend deploys to Vercel automatically
- Backend deploys to Railway automatically
- Test locally before pushing

## Before Committing
Run the multi-agent audit system:
```bash
node scripts/orchestrator.js --dry-run
```

Refer to scripts/agents/AGENT_CONTEXT.md for complete guidelines.
```

**Step 3: Enable Cursor Rules**

1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Search for "rules"
3. Ensure "Cursor Rules" is enabled
4. Cursor will now automatically read .cursorrules before making suggestions

---

## 🤖 AUTOMATIC ORCHESTRATOR SETUP

### Setting Up Automatic Agent Runs

**Option 1: Git Pre-Commit Hook (Recommended)**

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "🔍 Running Mizan Multi-Agent Audit..."

# Run the orchestrator in dry-run mode
node scripts/orchestrator.js --dry-run

# Capture exit code
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo ""
  echo "❌ Audit found violations!"
  echo "📋 Check scripts/FINAL_REPORT.md for details"
  echo ""
  echo "Options:"
  echo "  1. Fix violations manually and commit again"
  echo "  2. Run: node scripts/orchestrator.js (auto-fix mode)"
  echo "  3. Skip audit: git commit --no-verify"
  echo ""
  exit 1
fi

echo "✅ Audit passed! Proceeding with commit..."
exit 0
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

**Option 2: GitHub Actions Workflow**

Create `.github/workflows/mizan-audit.yml`:

```yaml
name: Mizan Multi-Agent Audit

on:
  pull_request:
    branches: [ main, develop ]
  push:
    branches: [ main, develop ]

jobs:
  audit:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd scripts
          npm install
          
      - name: Run Multi-Agent Audit
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          node scripts/orchestrator.js --dry-run
          
      - name: Upload Audit Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: audit-report
          path: scripts/FINAL_REPORT.md
```

**Option 3: VS Code Task (For Manual Trigger)**

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Mizan Audit",
      "type": "shell",
      "command": "node scripts/orchestrator.js --dry-run",
      "problemMatcher": [],
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Run Mizan Auto-Fix",
      "type": "shell",
      "command": "node scripts/orchestrator.js",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

Then run with: `Cmd/Ctrl + Shift + B`

---

## 📝 WORKFLOW EXAMPLES

### Development Workflow with Cursor + Orchestrator

```bash
# 1. Start feature development
git checkout -b feature/user-profile

# 2. Code in Cursor (following .cursorrules)
# Cursor will suggest code following Mizan guidelines

# 3. Before committing, run audit
node scripts/orchestrator.js --dry-run

# 4. Review report
cat scripts/FINAL_REPORT.md

# 5a. If clean, commit
git add .
git commit -m "feat: add user profile page"

# 5b. If violations found, auto-fix
node scripts/orchestrator.js
# Review applied fixes
git add .
git commit -m "feat: add user profile page"

# 6. Push to deploy
git push origin feature/user-profile
# Frontend auto-deploys to Vercel
# Backend auto-deploys to Railway
```

---

## 🚫 COMMON MISTAKES TO AVOID

| ❌ Wrong | ✅ Correct | Why |
|---------|-----------|-----|
| `app/dashboard/page.tsx` | `frontend/src/app/dashboard/page.tsx` | Incorrect path from root |
| `routes/entry.ts` | `backend/routes/entry.ts` | Missing backend/ prefix |
| `await prisma.users.findMany()` | `await db.select().from(users)` | Wrong ORM - must use Drizzle |
| `export async function getServerSideProps()` | `export default async function Page()` | Wrong Next.js pattern - must use App Router |
| `const data: any = ...` | `const data: UserData = ...` | Using 'any' type |
| `const mockUsers = [...]` | `const users = await db.select().from(users)` | Mock data forbidden |
| `// TODO: Implement` | Complete implementation | Placeholders forbidden |
| `new PerformanceAgent()` without engines | Use Three-Engine Architecture | Missing required pattern |
| `SELECT * FROM users` | `db.select().from(users)` | Raw SQL forbidden |

---

## ✅ QUALITY CHECKLIST

Before approving ANY fix, verify:

**File Structure:**
- [ ] Paths relative to project root (Mizan-1/)
- [ ] Frontend files in `frontend/src/`
- [ ] Backend files in `backend/`

**Mizan Rules:**
- [ ] No mock data
- [ ] No placeholders/TODOs
- [ ] No 'any' types
- [ ] Drizzle ORM only
- [ ] Next.js App Router patterns

**Code Quality:**
- [ ] Proper error handling (try/catch)
- [ ] Input validation
- [ ] Authentication/authorization
- [ ] Tenant isolation
- [ ] TypeScript strict mode

**Design:**
- [ ] Follows design guidelines (colors, typography, spacing)
- [ ] Responsive design implemented
- [ ] Accessibility requirements met
- [ ] Consistent with existing UI patterns

**Architecture:**
- [ ] Three-Engine pattern (if AI agent)
- [ ] Follows existing patterns
- [ ] Production-ready quality

**Security:**
- [ ] No SQL injection risks
- [ ] No XSS vulnerabilities
- [ ] No sensitive data exposure
- [ ] Proper rate limiting

---

## 📚 QUICK REFERENCE

### Drizzle Query Examples

```typescript
// SELECT
await db.select().from(users);
await db.select().from(users).where(eq(users.id, userId));

// INSERT
await db.insert(users).values({ name: 'John', email: 'john@example.com' });

// UPDATE
await db.update(users).set({ name: 'Jane' }).where(eq(users.id, userId));

// DELETE
await db.delete(users).where(eq(users.id, userId));

// JOIN
await db
  .select()
  .from(users)
  .leftJoin(tenants, eq(users.tenantId, tenants.id))
  .where(eq(users.id, userId));
```

### Next.js App Router Examples

```typescript
// Page Component
// frontend/src/app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}

// API Route
// frontend/src/app/api/users/route.ts
export async function GET(request: NextRequest) {
  return Response.json({ users: [] });
}

// Dynamic Route
// frontend/src/app/user/[id]/page.tsx
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id);
  return <UserProfile user={user} />;
}
```

---

## 🎯 SUMMARY: Key Takeaways

1. **Always read this document** before starting any feature
2. **Use Cursor with .cursorrules** to get AI assistance that follows Mizan guidelines
3. **Run orchestrator after features** to automatically check and fix violations
4. **Follow design guidelines** for consistent UI/UX
5. **Deploy automatically** via Vercel (frontend) and Railway (backend)
6. **No mock data, no placeholders, no 'any' types** - production-ready code only

---

*Last Updated: [Current Date]*
*Version: 2.0 (Enhanced with Cursor Integration)*