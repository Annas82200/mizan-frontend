# 🎯 CURSOR AI PROMPTING WORKFLOW - STEP-BY-STEP GUIDE

> **For Beginners:** This guide shows you EXACTLY how to make Cursor follow your documentation perfectly.

---

## 📋 **SETUP PHASE (Do This Once)**

### **Step 1: Place the Master File**
```bash
# 1. Save the AGENT_CONTEXT_ULTIMATE.md file to your project root
Mizan-1/
├── AGENT_CONTEXT_ULTIMATE.md  ← Place it here
├── frontend/
├── backend/
└── scripts/
```

### **Step 2: Create a Cursor Rules File**
Create a `.cursorrules` file in your project root:

```bash
# Create the file
touch Mizan-1/.cursorrules
```

Add this content:
```
# Cursor AI Rules for Mizan Platform

CRITICAL: Before implementing ANY feature, you must:
1. Read the complete AGENT_CONTEXT_ULTIMATE.md file
2. Follow ALL rules and patterns specified
3. Never use mock data or placeholders
4. Use production-ready code only

Always reference AGENT_CONTEXT_ULTIMATE.md for:
- File architecture
- Tech stack requirements  
- Implementation patterns
- Design guidelines
- Quality control rules

If you violate any rule, stop and fix immediately.
```

---

## 💬 **PROMPTING STRATEGIES**

### **Strategy 1: Context-First Prompting (RECOMMENDED)**

**For Every Feature Request, Use This Template:**

```
CONTEXT: Read AGENT_CONTEXT_ULTIMATE.md completely before starting.

TASK: Implement [FEATURE_NAME] with these requirements:
- Follow Next.js 14 App Router patterns
- Use Drizzle ORM for database operations  
- Include tenant isolation (tenantId in all queries)
- Add comprehensive error handling
- Use TypeScript strict types (no 'any')
- Implement Three-Engine Architecture (for AI features)
- Follow design guidelines from the context file
- No mock data or placeholders allowed
- Production-ready code only

VALIDATION: After implementation, confirm you followed:
1. ✅ File architecture rules
2. ✅ Tech stack requirements
3. ✅ Implementation patterns
4. ✅ Quality control rules

REFERENCE: Check AGENT_CONTEXT_ULTIMATE.md for any unclear requirements.

Now implement: [SPECIFIC FEATURE DESCRIPTION]
```

### **Strategy 2: Reference-Heavy Prompting**

```
Before writing any code, reference these sections from AGENT_CONTEXT_ULTIMATE.md:
- [File Architecture] for correct file placement
- [Technical Stack Requirements] for allowed dependencies
- [Implementation Patterns] for code structure
- [Quality Control Rules] for forbidden patterns

Now implement [FEATURE] following those exact patterns.
```

### **Strategy 3: Validation-First Prompting**

```
Implement [FEATURE] and then validate against AGENT_CONTEXT_ULTIMATE.md:

After coding, check:
- Are you using Next.js 14 App Router (not Pages Router)?
- Are you using Drizzle ORM (not Prisma or raw SQL)?
- Did you include tenantId in database queries?
- Are all TypeScript types strict (no 'any')?
- Is error handling comprehensive?
- Are there any mock data or placeholders?

Fix any violations before marking complete.
```

---

## 🔄 **RECOMMENDED WORKFLOW**

### **For Each New Feature:**

#### **Phase 1: Planning (Always Do This First)**
```
PROMPT:
"Based on AGENT_CONTEXT_ULTIMATE.md, plan the implementation for [FEATURE_NAME]:

1. Which files need to be created/modified?
2. What database tables are needed?
3. What API routes are required?
4. Which components need to be built?
5. How does this integrate with existing features?

Reference the File Architecture section for correct paths."
```

#### **Phase 2: Database & Backend**
```
PROMPT:
"Implement the backend for [FEATURE_NAME] following AGENT_CONTEXT_ULTIMATE.md:

1. Create Drizzle schema files in backend/src/db/schema/
2. Create service files in backend/src/services/
3. Create API route handlers in backend/src/routes/
4. Include tenant isolation in all database queries
5. Add comprehensive error handling
6. Use TypeScript strict types

Reference the Implementation Patterns section for examples."
```

#### **Phase 3: Frontend Implementation**
```
PROMPT:
"Implement the frontend for [FEATURE_NAME] following AGENT_CONTEXT_ULTIMATE.md:

1. Create pages using Next.js 14 App Router in frontend/src/app/
2. Create components in frontend/src/components/
3. Follow the design guidelines for styling
4. Add proper error handling for API calls
5. Use TypeScript strict types

Reference the Design Guidelines and Implementation Patterns sections."
```

#### **Phase 4: Validation & Testing**
```
PROMPT:
"Review the [FEATURE_NAME] implementation against AGENT_CONTEXT_ULTIMATE.md:

Check compliance with:
1. File Architecture - correct paths and structure
2. Tech Stack Requirements - only allowed dependencies
3. Implementation Patterns - following examples
4. Quality Control Rules - no forbidden patterns
5. Design Guidelines - consistent styling

List any violations and fix them."
```

---

## ⚠️ **COMMON CURSOR MISTAKES & HOW TO FIX THEM**

### **Mistake 1: Cursor Uses Pages Router**
**Problem:** Cursor creates `pages/` directory or uses `getServerSideProps`
**Fix Prompt:**
```
STOP. You used Pages Router. According to AGENT_CONTEXT_ULTIMATE.md, you must use Next.js 14 App Router only. 

Delete the pages/ directory and recreate using:
- frontend/src/app/ for pages
- Server Components for data fetching
- No getServerSideProps or getStaticProps

Reference the Implementation Patterns section for correct examples.
```

### **Mistake 2: Cursor Uses Prisma Instead of Drizzle**
**Problem:** Cursor creates Prisma schema or uses Prisma client
**Fix Prompt:**
```
STOP. You used Prisma. According to AGENT_CONTEXT_ULTIMATE.md, you must use Drizzle ORM only.

Replace all Prisma code with Drizzle:
1. Use drizzle-orm for database operations
2. Create schemas in backend/src/db/schema/
3. Use db.select(), db.insert(), etc.

Reference the Implementation Patterns section for Drizzle examples.
```

### **Mistake 3: Cursor Forgets Tenant Isolation**
**Problem:** Database queries don't include tenantId
**Fix Prompt:**
```
VIOLATION: You forgot tenant isolation. According to AGENT_CONTEXT_ULTIMATE.md, ALL database queries must include tenantId.

Fix all queries to include:
.where(eq(table.tenantId, user.tenantId))

Reference the Feature Integration Rules section for examples.
```

### **Mistake 4: Cursor Uses Mock Data**
**Problem:** Code contains placeholder or mock data
**Fix Prompt:**
```
VIOLATION: You used mock data. According to AGENT_CONTEXT_ULTIMATE.md, NO mock data or placeholders are allowed.

Replace all mock data with:
1. Real database operations
2. Proper API calls
3. Actual business logic
4. Complete implementations

Reference the Quality Control Rules section.
```

### **Mistake 5: Cursor Ignores Design Guidelines**
**Problem:** Inconsistent styling or colors
**Fix Prompt:**
```
VIOLATION: You didn't follow design guidelines. According to AGENT_CONTEXT_ULTIMATE.md, you must use the specified color palette and styling patterns.

Fix all styling to match:
1. Use CSS variables from Design Guidelines section
2. Follow component styling patterns
3. Use consistent spacing and typography

Reference the Design Guidelines section for exact values.
```

---

## 🎯 **ADVANCED PROMPTING TECHNIQUES**

### **Technique 1: Progressive Prompting**
```
Step 1: "Based on AGENT_CONTEXT_ULTIMATE.md, what would the file structure look like for [FEATURE]?"

Step 2: "Now implement the database schema following the Drizzle patterns in the context file."

Step 3: "Now implement the API routes following the error handling patterns."

Step 4: "Now implement the frontend components following the design guidelines."
```

### **Technique 2: Error-Prevention Prompting**
```
Before implementing [FEATURE], confirm you will:
1. ✅ NOT use Pages Router (use App Router only)
2. ✅ NOT use Prisma (use Drizzle only)  
3. ✅ NOT forget tenant isolation
4. ✅ NOT use mock data
5. ✅ NOT use 'any' types

Reference AGENT_CONTEXT_ULTIMATE.md if unsure about any requirement.
```

### **Technique 3: Compliance-Check Prompting**
```
After implementation, audit your code against AGENT_CONTEXT_ULTIMATE.md:

For each file you created:
1. Does it follow the correct file architecture?
2. Does it use the required tech stack?
3. Does it follow implementation patterns?
4. Does it pass quality control rules?

Report any violations and fix them.
```

---

## 🔧 **TROUBLESHOOTING GUIDE**

### **Problem: Cursor Keeps Ignoring the Context File**
**Solutions:**
1. Include the file name in EVERY prompt: "Reference AGENT_CONTEXT_ULTIMATE.md"
2. Be more explicit: "Open and read AGENT_CONTEXT_ULTIMATE.md before coding"
3. Quote specific sections: "According to the Implementation Patterns section..."

### **Problem: Cursor Uses Wrong File Paths**
**Solutions:**
1. Always specify root: "relative to Mizan-1/ project root"
2. Give exact paths: "Create in frontend/src/app/dashboard/culture/page.tsx"
3. Reference the file architecture section specifically

### **Problem: Cursor Creates Incomplete Code**
**Solutions:**
1. Emphasize production-ready: "Complete, production-ready implementation only"
2. List specific requirements: "Must include error handling, types, validation"
3. Use validation prompts to catch issues

### **Problem: Cursor Mixes Different Patterns**
**Solutions:**
1. Be very specific about tech stack: "Use Drizzle ORM only, not Prisma"
2. Reference exact sections: "Follow the Drizzle patterns in Implementation Patterns"
3. Use correction prompts when you catch mistakes

---

## 📊 **SUCCESS METRICS**

### **How to Know Cursor is Following Guidelines:**

#### **✅ Good Signs:**
- Uses Next.js App Router patterns (`app/` directory)
- Uses Drizzle ORM queries (`db.select()`, `eq()`, etc.)
- Includes `tenantId` in database queries
- Has comprehensive error handling with try/catch
- Uses TypeScript interfaces (no `any` types)
- Follows the color palette from design guidelines
- No mock data or placeholder comments

#### **❌ Warning Signs:**
- Creates `pages/` directory (Pages Router)
- Uses Prisma (`prisma.model.findMany()`)
- Missing tenant isolation in queries
- Has mock data like `"Sample User"`
- Uses `any` types or missing type definitions
- Inconsistent styling or colors
- TODO comments without implementation

---

## 🎯 **FINAL RECOMMENDATIONS**

### **For Beginners:**
1. **Start Small:** Test the workflow with one simple feature first
2. **Be Explicit:** Always mention the context file by name
3. **Check Often:** Validate after each implementation phase
4. **Stay Consistent:** Use the same prompting template every time

### **For Best Results:**
1. **Reference Early:** Mention the context file in your first prompt
2. **Reference Often:** Include it in follow-up prompts too
3. **Reference Specifically:** Quote exact sections when needed
4. **Validate Always:** Check compliance before moving to next feature

### **Sample First Prompt:**
```
I'm starting work on the Culture Analysis feature for Mizan Platform. 

First, please read AGENT_CONTEXT_ULTIMATE.md completely to understand the project structure, requirements, and implementation patterns.

After reading the context file, plan the implementation for the Culture Analysis feature including:
1. Database schema (using Drizzle ORM)
2. Backend API routes and services
3. Frontend pages and components (using Next.js 14 App Router)
4. AI integration (using Three-Engine Architecture)

Make sure to follow all the file architecture, tech stack, and quality control rules specified in the context file.

Ready to begin?
```

---

**🎉 You're Ready to Use Cursor Like a Pro!**

Follow this workflow and Cursor will consistently produce high-quality, compliant code that matches your project requirements.