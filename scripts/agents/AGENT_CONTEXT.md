markdown# MIZAN MULTI-AGENT SYSTEM - AGENT CONTEXT

> **CRITICAL:** This context must be included in EVERY agent prompt to ensure accurate analysis and fixes.

---

## 🏗️ PROJECT OVERVIEW

**Project Name:** Mizan Platform  
**Type:** Multi-tenant SaaS HR Analytics Platform  
**Purpose:** AI-powered organizational analysis (Culture, Structure, Skills, Performance, Hiring)  
**Stage:** Active development → Production deployment  
**Quality Standard:** Zero placeholders, zero mock data, production-ready only  

---

## 📁 FILE STRUCTURE (EXACT PATHS REQUIRED!)
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
│   └── public/                  ← Static assets
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
│   └── apply-fixes.js
│
└── .audit-config.json            ← Audit configuration

**⚠️ CRITICAL PATH RULES:**
- All file paths MUST be relative to `Mizan-1/` (project root)
- ✅ Correct: `frontend/src/app/dashboard/page.tsx`
- ❌ Wrong: `app/dashboard/page.tsx`
- ✅ Correct: `backend/routes/entry.ts`
- ❌ Wrong: `routes/entry.ts`

---

## 🛠️ TECH STACK (MANDATORY)

### **Frontend Stack:**
Framework:    Next.js 14 (App Router ONLY, NOT Pages Router)
Language:     TypeScript 5.x (strict mode enabled)
Styling:      Tailwind CSS v3
State:        React Hooks (useState, useEffect, useReducer)
Data Fetch:   Native fetch() with async/await
Forms:        React Hook Form (where applicable)
UI Library:   Shadcn/ui components (optional)

**Frontend Example:**
```typescript
// ✅ CORRECT Next.js 14 App Router pattern
export default async function Page() {
  const data = await fetch('/api/data').then(r => r.json());
  return <div>{data.title}</div>;
}

// ❌ WRONG - Pages Router (OLD)
export async function getServerSideProps() { }
Backend Stack:
Runtime:      Node.js 20.x
Framework:    Express.js 4.x
Language:     TypeScript 5.x (strict mode enabled)
Database:     PostgreSQL 15+
ORM:          Drizzle ORM (ONLY - NOT Prisma, NOT TypeORM)
Auth:         JWT-based custom authentication
AI Providers: Anthropic (Claude 4), Google (Gemini 2.5), OpenAI (GPT-4)
Backend Example:
typescript// ✅ CORRECT Drizzle ORM pattern
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

🎯 MIZAN DEVELOPMENT RULES (ABSOLUTE REQUIREMENTS)
Rule #1: NO MOCK DATA (CRITICAL)
typescript// ❌ FORBIDDEN - Mock data
const mockUsers = [
  { id: 1, name: 'Test User', email: 'test@example.com' }
];
const mockPerformanceAnalysis = { score: 85, trend: 'improving' };

// ✅ REQUIRED - Real database queries
const users = await db.select().from(usersTable);
const analysis = await performanceAgent.analyze(userId);
Why: Mock data creates false sense of completion, hides integration issues, fails in production.
Rule #2: NO PLACEHOLDERS (CRITICAL)
typescript// ❌ FORBIDDEN - Any form of placeholder
// TODO: Implement this later
// FIXME: Need to add validation here
// NOTE: Replace with real implementation
const result = null; // Placeholder

// ✅ REQUIRED - Complete implementation
const result = await validateUserInput(input);
if (!result.valid) {
  throw new Error(result.error);
}
Why: Placeholders indicate incomplete work, create technical debt, cause production failures.
Rule #3: NO 'any' TYPES (STRICT)
typescript// ❌ FORBIDDEN - 'any' type usage
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
Why: TypeScript safety, IDE autocomplete, catch bugs at compile time.
Rule #4: DRIZZLE ORM ONLY (MANDATORY)
typescript// ❌ FORBIDDEN - Raw SQL queries
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
Why: Consistent pattern, type safety, SQL injection protection, project standard.
Rule #5: Next.js 14 App Router (MANDATORY)
typescript// ❌ FORBIDDEN - Pages Router patterns
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
Why: Project uses App Router, different patterns, improved performance.

🤖 MIZAN THREE-ENGINE AI ARCHITECTURE (CORE PATTERN)
CRITICAL: ALL AI agents in the platform MUST follow this architecture pattern!
typescriptimport { BaseAgent } from '../shared/BaseAgent';
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
Why this matters:

Separation of concerns (Knowledge, Data, Reasoning)
Consistent pattern across ALL AI modules
Follows Mizan's core architectural philosophy
Enables framework-driven AI analysis
Makes agents testable and maintainable

When to use:

✅ Any agent in backend/services/agents/
✅ Performance, Culture, Structure, Skills, Hiring modules
✅ Any AI-powered analysis or recommendation system


🔒 SECURITY & PRODUCTION REQUIREMENTS
Authentication & Authorization:
typescript// ✅ REQUIRED - Check auth on every protected endpoint
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
Input Validation:
typescript// ✅ REQUIRED - Validate all user inputs
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  tenantId: z.string().uuid()
});

const validated = userSchema.parse(userInput); // Throws if invalid
Error Handling:
typescript// ✅ REQUIRED - Proper error handling pattern
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
SQL Injection Prevention:
typescript// ✅ SAFE - Drizzle ORM with parameterized queries
await db
  .select()
  .from(users)
  .where(eq(users.email, userInput)); // Automatically parameterized

// ❌ UNSAFE - String interpolation
await db.query(`SELECT * FROM users WHERE email = '${userInput}'`);

📊 MULTI-TENANT ARCHITECTURE (CRITICAL!)
EVERY database query MUST include tenant isolation:
typescript// ❌ FORBIDDEN - No tenant filtering (security vulnerability!)
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
Why: Multi-tenant SaaS - must prevent cross-tenant data access (critical security requirement).
Exceptions: Only superadmin queries that explicitly need cross-tenant data.

🎓 AGENT-SPECIFIC INSTRUCTIONS
Agent 1: Code Analyzer (Gemini)
Your Role: Detect and analyze violations
Checklist:

 Is this a real violation or false positive?
 What's the actual impact on production?
 Consider file location and project context
 Check if it violates Mizan rules
 Provide confidence score (0.0-1.0)
 Suggest fix approach (high-level)

Output Format:
json{
  "isRealViolation": true,
  "severity": "CRITICAL|HIGH|MEDIUM|LOW",
  "impact": "Description of production impact",
  "fixApproach": "High-level approach to fix",
  "confidence": 0.95,
  "reasoning": "Why this is/isn't a violation"
}

Agent 2: Fix Generator (Claude)
Your Role: Generate complete, production-ready fixes
Checklist:

 Generate COMPLETE code (no TODOs, no placeholders)
 Use correct file paths from project root
 Follow Mizan Three-Engine pattern when applicable
 Include ALL necessary files (types, schemas, routes)
 Use Drizzle ORM for database operations
 Add proper error handling
 Include authentication/authorization
 Add tenant isolation where needed
 Write strict TypeScript (no 'any' types)

Output Format:
json{
  "fixType": "simple|complex",
  "primaryFix": {
    "description": "What this fix does",
    "code": "The actual code to replace the violation",
    "filePath": "frontend/src/app/dashboard/page.tsx",
    "startLine": 92,
    "endLine": 92,
    "additionalFiles": [
      {
        "path": "frontend/src/types/performance.ts",
        "content": "Complete file content here",
        "purpose": "Why this file is needed"
      }
    ]
  },
  "testingInstructions": "How to test this fix",
  "potentialRisks": ["Risk 1", "Risk 2"],
  "confidence": 0.92
}

Agent 3: Mizan Validator (Gemini)
Your Role: Validate fixes against Mizan rules
Checklist:

 No mock data in the fix?
 No placeholders or TODOs?
 No 'any' types used?
 Uses Drizzle ORM correctly?
 Follows Next.js App Router patterns?
 Implements Three-Engine Architecture (if AI agent)?
 Includes proper error handling?
 Has authentication/authorization?
 Includes tenant isolation?
 File paths are correct?

Output Format:
json{
  "passes": true,
  "mizanCompliance": {
    "realDatabaseQueries": true,
    "noPlaceholders": true,
    "strictTypes": true,
    "properErrorHandling": true,
    "mizanArchitecture": true
  },
  "violations": [],
  "strengths": ["What's good"],
  "concerns": ["What needs attention"],
  "recommendation": "APPROVE|REJECT|NEEDS_REVISION"
}

Agent 4: Security Checker (GPT-4)
Your Role: Security and production readiness audit
Checklist:

 Authentication/authorization proper?
 Input validation present?
 SQL injection risks?
 XSS vulnerabilities?
 DoS attack vectors?
 Rate limiting needed?
 Sensitive data exposure?
 Error messages safe?
 Production-ready?

Output Format:
json{
  "securityRating": "critical|high|medium|low",
  "vulnerabilities": [
    {
      "severity": "high",
      "category": "dos",
      "issue": "Description",
      "recommendation": "How to fix"
    }
  ],
  "productionReadiness": {
    "ready": false,
    "blockers": ["Issue 1"],
    "improvements": ["Suggestion 1"]
  },
  "recommendation": "APPROVE|NEEDS_SECURITY_FIX|REJECT"
}

Agent 5: Final Consensus (Claude)
Your Role: Make final decision based on all agent inputs
Decision Criteria:

Agent 3 (Validator) must approve (Mizan compliance)
Agent 4 (Security) must not find CRITICAL vulnerabilities
Agent 2 (Fix) must have confidence > 0.85
Consider trade-offs: security vs. progress vs. perfection

Output Format:
json{
  "finalDecision": "APPROVE|REJECT",
  "confidence": 0.88,
  "reasoning": "Why this decision was made",
  "agentAgreement": {
    "consensus": true,
    "agent3": "agree",
    "agent4": "agree"
  },
  "riskAssessment": "low|medium|high",
  "conditions": ["Condition 1 for approval"],
  "summary": "One-line summary"
}

🚫 COMMON MISTAKES TO AVOID
❌ Wrong✅ CorrectWhyapp/dashboard/page.tsxfrontend/src/app/dashboard/page.tsxIncorrect path from rootroutes/entry.tsbackend/routes/entry.tsMissing backend/ prefixawait prisma.users.findMany()await db.select().from(users)Wrong ORM - must use Drizzleexport async function getServerSideProps()export default async function Page()Wrong Next.js pattern - must use App Routerconst data: any = ...const data: UserData = ...Using 'any' typeconst mockUsers = [...]const users = await db.select().from(users)Mock data forbidden// TODO: ImplementComplete implementationPlaceholders forbiddennew PerformanceAgent() without enginesUse Three-Engine ArchitectureMissing required patternSELECT * FROM usersdb.select().from(users)Raw SQL forbidden

✅ QUALITY CHECKLIST
Before approving ANY fix, verify:
File Structure:

 Paths relative to project root (Mizan-1/)
 Frontend files in frontend/src/
 Backend files in backend/

Mizan Rules:

 No mock data
 No placeholders/TODOs
 No 'any' types
 Drizzle ORM only
 Next.js App Router patterns

Code Quality:

 Proper error handling (try/catch)
 Input validation
 Authentication/authorization
 Tenant isolation
 TypeScript strict mode

Architecture:

 Three-Engine pattern (if AI agent)
 Follows existing patterns
 Production-ready quality

Security:

 No SQL injection risks
 No XSS vulnerabilities
 No sensitive data exposure
 Proper rate limiting


📚 QUICK REFERENCE
Drizzle Query Examples:
typescript// SELECT
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
Next.js App Router Examples:
typescript// Page Component
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