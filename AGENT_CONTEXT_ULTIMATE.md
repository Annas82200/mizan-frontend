# MIZAN PLATFORM - ULTIMATE AGENT CONTEXT & IMPLEMENTATION GUIDE

> **🚨 CRITICAL INSTRUCTION FOR ALL AI AGENTS:**  
> This document contains EVERYTHING needed to implement Mizan Platform features correctly.  
> Read EVERY section before writing ANY code. Follow ALL rules WITHOUT EXCEPTION.

> **⚠️ PRODUCTION-READY PRIORITY RULE:**
> - NEVER use workarounds or superficial fixes
> - Removing TODO comments WITHOUT implementing proper functionality is FORBIDDEN
> - Every fix must be a COMPLETE, production-ready implementation
> - Priority: FUNCTIONALITY > Comment Compliance
> - If you cannot implement production-ready code, DOCUMENT why and propose proper solution

---

## 📋 **TABLE OF CONTENTS**

1. [Project Overview](#project-overview)
2. [File Architecture](#file-architecture)
3. [Platform Feature Flow](#platform-feature-flow)
4. [Feature Integration Rules](#feature-integration-rules)
5. [Design Guidelines](#design-guidelines)
6. [Technical Stack Requirements](#technical-stack-requirements)
7. [Implementation Patterns](#implementation-patterns)
8. [Quality Control Rules](#quality-control-rules)
9. [Deployment Configuration](#deployment-configuration)
10. [Cursor Prompting Instructions](#cursor-prompting-instructions)

---

## 🗄️ **PROJECT OVERVIEW**

**Project Name:** Mizan Platform  
**Type:** Multi-tenant SaaS HR Analytics Platform  
**Purpose:** AI-powered organizational analysis (Culture, Structure, Skills, Performance, Hiring)  
**Stage:** Active development → Production deployment  
**Quality Standard:** 
- Zero placeholders, zero mock data, zero workarounds
- Production-ready implementation ONLY (not just production-ready comments)
- Functionality over compliance: Real implementation > Cosmetic fixes
- If incomplete, document why and propose proper solution

### Core Analysis Features:
- **Structure Analysis**: Organizational hierarchy, reporting lines, role clarity, team structures
- **Culture Analysis**: Team dynamics, values alignment, communication patterns, employee surveys
- **Skills Analysis**: Competency mapping, skill gaps, development plans, strategic skills assessment

### AI Agent Features (Triggered by Culture Analysis):
- **Recognition Agent**: Analyzes employee recognition needs and patterns (triggered by Culture Agent)
- **Engagement Agent**: Analyzes employee engagement levels and factors (triggered by Culture Agent)

### Complete Business Modules (Advanced AI Systems):
- **Performance Module**: Complete performance management system (standalone)
  - **AI Training**: Trained on all performance management theories and practices
  - **Integration**: Cross-module integration with Structure, Culture, and Skills agents
- **Hiring Module**: Complete recruitment and hiring system (triggered by Structure analysis)
  - **AI Training**: Trained on all talent acquisition practices and theories  
  - **Integration**: Uses Structure recommendations and Culture analysis for hiring decisions

### Triggered Business Modules (Activated by Analysis Results):
- **LXP Module**: Learning Experience Platform (triggered by Skills Analysis)
- **Talent Module**: Talent management system (triggered by analysis results)
- **Bonus Module**: Compensation and bonus management (triggered by analysis results)

---

## 📊 **SKILLS ANALYSIS - COMPLETE WORKFLOW**

### **Skills Analysis Module**
- **Type**: Core analysis feature with strategic skills assessment
- **Architecture**: Three-Engine AI Agent + Interactive BOT system
- **AI Training**: Trained on organizational development practices and theories
- **Scope**: Technical and soft skills across all organization types and industries

#### **🔄 Skills Analysis Complete Workflow:**

```
Step 1: Strategic Skills Framework Development
Skills Agent → Reads Client Strategy → Understands Industry Context
           → Analyzes Strategic Requirements → Identifies Necessary Skills
           → Creates Skills Framework (Technical + Soft Skills)

Step 2: Employee Skills Data Collection
Employee Portal → Upload Resume OR BOT-Assisted Resume Building
              → Skills Extraction from Documents
              → CSV Employee Data Integration (from Superadmin/Admin)
              → Skills Profile Creation

Step 3: Individual Skills Gap Analysis
Strategic Skills Framework + Employee Skills Profile
                          → Individual Gap Analysis
                          → Skills Assessment Report
                          → Development Recommendations

Step 4: LXP Trigger & Learning Path Creation
Skills Gap Identified → Trigger LXP Module
                     → Personalized Learning Paths
                     → Skills Development Programs
                     → Progress Tracking Setup

Step 5: Supervisor & Employee Notification
Gap Analysis Results → Employee Notification
                    → Supervisor Dashboard Update
                    → Development Plan Sharing
                    → Goal Setting Integration

Step 6: Department-Level Aggregation
Individual Analyses → Department Skills Overview
                   → Department Gap Analysis
                   → Team Skills Mapping
                   → Collective Development Needs

Step 7: Organization-Level Strategic Assessment
Department Data → Org-Level Skills Analysis
               → Strategic Capability Assessment
               → Answer: "Can we achieve our strategy with current skills?"
               → Strategic Skills Recommendations

Step 8: Leadership Insights & Reporting
Strategic Assessment → Superadmin Dashboard
                    → Admin Insights Panel
                    → Skills-Strategy Alignment Report
                    → Investment Recommendations
```

#### **🤖 Skills BOT Features:**

**For Employees:**
- Resume upload assistance and guidance
- Interactive resume building support
- Skills profile creation and updates
- Gap analysis explanation and guidance
- Learning recommendations and path planning

**For Supervisors:**
- Team skills overview and insights
- Individual employee development planning
- Skills gap prioritization guidance
- Performance integration recommendations
- Team development strategy support

**For Admins/Superadmins:**
- Organization-wide skills analytics
- Strategic capability assessment
- Skills investment recommendations
- Department comparison and benchmarking
- Skills-strategy alignment insights

#### **🔗 Integration Points:**

**With Strategy Documents:**
- Reads and analyzes client strategy
- Understands industry requirements
- Identifies strategic skill priorities
- Maps skills to business objectives

**With Performance Module:**
- Provides critical skills gaps for goal setting
- Integrates skills development into performance goals
- Supports skills-based performance evaluation
- Aligns skills development with strategic objectives

**With LXP Module (Triggered):**
- Sends individual skills gaps for learning path creation
- Provides strategic skills priorities for course curation
- Integrates learning progress with skills assessment
- Updates skills profiles based on learning completion

**With Talent Module (Triggered):**
- Provides skills data for talent identification
- Supports succession planning with skills mapping
- Identifies high-potential employees based on skills
- Informs talent development strategies

**With Bonus Module (Triggered):**
- Links skills development to compensation decisions
- Supports skills-based bonus calculations
- Recognizes skills acquisition achievements
- Aligns compensation with strategic skills priorities

#### **🎯 Strategic Capability Assessment:**

**Key Questions Answered:**
- Does the organization have the skills to achieve its strategy?
- What are the critical skills gaps preventing strategic success?
- Which departments need the most skills development?
- What skills investments will provide the highest strategic ROI?
- How do our skills compare to industry benchmarks?

**Assessment Framework:**
```typescript
interface StrategicSkillsAssessment {
  overallReadiness: 'ready' | 'partially-ready' | 'not-ready';
  strategicAlignment: number; // 0-100%
  criticalGaps: SkillGap[];
  strengthAreas: SkillStrength[];
  investmentPriorities: InvestmentRecommendation[];
  timeToReadiness: string; // "6 months", "1 year", etc.
  riskFactors: RiskFactor[];
  recommendations: StrategicRecommendation[];
}
```

#### **📊 Skills Data Management:**
```typescript
// Skills Analysis Data Structure
interface SkillsWorkflow {
  analysisId: string;
  strategicFramework: SkillsFramework;
  employeeProfiles: EmployeeSkillsProfile[];
  individualGaps: IndividualSkillsGap[];
  departmentAggregation: DepartmentSkillsAnalysis[];
  organizationAssessment: OrganizationSkillsAssessment;
  lxpTriggers: LXPTrigger[];
  talentTriggers: TalentTrigger[];
  bonusTriggers: BonusTrigger[];
  status: 'collecting' | 'analyzing' | 'completed';
}

interface EmployeeSkillsProfile {
  employeeId: string;
  resumeData: ResumeData;
  extractedSkills: Skill[];
  strategicSkillsGap: SkillGap[];
  developmentPlan: DevelopmentPlan;
  lxpPathId: string; // Link to triggered LXP
  progressTracking: SkillProgress[];
}

interface OrganizationSkillsAssessment {
  strategicReadiness: StrategicReadiness;
  departmentComparison: DepartmentSkillsComparison[];
  industryBenchmarks: IndustrySkillsBenchmark[];
  investmentRecommendations: SkillsInvestment[];
  timelineProjections: SkillsTimeline[];
}
```

---

## 📁 **FILE ARCHITECTURE**

```
Mizan-1/                          ← PROJECT ROOT
├── frontend/                     ← Next.js 14 App Router
│   ├── src/
│   │   ├── app/                  ← App Router (NOT pages/)
│   │   │   ├── (auth)/          ← Auth routes group
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── dashboard/       ← Main dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   ├── structure/   ← Structure analysis
│   │   │   │   ├── culture/     ← Culture analysis
│   │   │   │   │   ├── survey/  ← Culture survey pages
│   │   │   │   │   └── results/ ← Culture results
│   │   │   │   ├── skills/      ← Skills analysis
│   │   │   │   │   ├── assessment/  ← Skills assessment pages
│   │   │   │   │   ├── profiles/    ← Employee skills profiles
│   │   │   │   │   ├── gaps/        ← Skills gap analysis
│   │   │   │   │   ├── bot/         ← Skills BOT interface
│   │   │   │   │   └── strategic/   ← Strategic skills assessment
│   │   │   │   ├── performance/ ← Performance module (complete system)
│   │   │   │   │   ├── goals/        ← Goal management
│   │   │   │   │   ├── evaluations/  ← Performance evaluations
│   │   │   │   │   ├── meetings/     ← 1:1 and evaluation meetings
│   │   │   │   │   ├── calibration/  ← Calibration and aggregation
│   │   │   │   │   ├── bot/          ← Performance BOT interface
│   │   │   │   │   └── settings/     ← Performance calendar & config
│   │   │   │   ├── hiring/      ← Hiring module (complete system)
│   │   │   │   │   ├── requisitions/ ← Talent requisitions
│   │   │   │   │   ├── jobs/         ← Job postings management
│   │   │   │   │   ├── applications/ ← Application management  
│   │   │   │   │   ├── interviews/   ← Interview management
│   │   │   │   │   ├── bot/          ← Hiring BOT interface
│   │   │   │   │   └── compensation/ ← Compensation analysis
│   │   │   │   ├── lxp/         ← Learning Experience Platform
│   │   │   │   │   ├── learning-paths/ ← Personalized learning paths
│   │   │   │   │   ├── courses/      ← Course management
│   │   │   │   │   ├── progress/     ← Learning progress tracking
│   │   │   │   │   └── recommendations/ ← Learning recommendations
│   │   │   │   ├── talent/      ← Talent management module
│   │   │   │   │   ├── identification/ ← Talent identification
│   │   │   │   │   ├── development/  ← Talent development
│   │   │   │   │   ├── succession/   ← Succession planning
│   │   │   │   │   └── analytics/    ← Talent analytics
│   │   │   │   └── bonus/       ← Bonus management module
│   │   │   │       ├── calculation/  ← Bonus calculations
│   │   │   │       ├── criteria/     ← Bonus criteria management
│   │   │   │       ├── distribution/ ← Bonus distribution
│   │   │   │       └── analytics/    ← Bonus analytics
│   │   │   ├── api/             ← API routes
│   │   │   │   ├── auth/
│   │   │   │   ├── structure/
│   │   │   │   ├── culture/
│   │   │   │   │   ├── survey/  ← Culture survey API
│   │   │   │   │   └── agents/  ← Recognition/Engagement agents
│   │   │   │   ├── skills/
│   │   │   │   │   ├── assessment/  ← Skills assessment API
│   │   │   │   │   ├── profiles/    ← Employee profiles API
│   │   │   │   │   ├── gaps/        ← Gap analysis API
│   │   │   │   │   ├── bot/         ← Skills BOT API
│   │   │   │   │   └── strategic/   ← Strategic assessment API
│   │   │   │   ├── performance/ ← Performance module API
│   │   │   │   │   ├── goals/        ← Goal management APIs
│   │   │   │   │   ├── evaluations/  ← Performance evaluation APIs
│   │   │   │   │   ├── meetings/     ← Meeting management APIs
│   │   │   │   │   ├── calibration/  ← Aggregation & calibration APIs
│   │   │   │   │   ├── bot/          ← Performance BOT APIs
│   │   │   │   │   └── settings/     ← Performance settings APIs
│   │   │   │   └── hiring/      ← Hiring module API
│   │   │   │       ├── requisitions/ ← Requisition management
│   │   │   │       ├── jobs/         ← Job posting APIs
│   │   │   │       ├── applications/ ← Application processing
│   │   │   │       ├── interviews/   ← Interview management
│   │   │   │       ├── bot/          ← BOT interaction APIs
│   │   │   │       └── compensation/ ← Compensation analysis
│   │   │   │   ├── lxp/         ← Learning Experience Platform API
│   │   │   │   │   ├── learning-paths/ ← Learning paths API
│   │   │   │   │   ├── courses/      ← Course management API
│   │   │   │   │   ├── progress/     ← Progress tracking API
│   │   │   │   │   └── recommendations/ ← Recommendations API
│   │   │   │   ├── talent/      ← Talent management API
│   │   │   │   │   ├── identification/ ← Talent ID API
│   │   │   │   │   ├── development/  ← Development API
│   │   │   │   │   ├── succession/   ← Succession planning API
│   │   │   │   │   └── analytics/    ← Talent analytics API
│   │   │   │   └── bonus/       ← Bonus management API
│   │   │   │       ├── calculation/  ← Bonus calculation API
│   │   │   │       ├── criteria/     ← Criteria management API
│   │   │   │       ├── distribution/ ← Distribution API
│   │   │   │       └── analytics/    ← Bonus analytics API
│   │   │   ├── layout.tsx       ← Root layout
│   │   │   ├── page.tsx         ← Home page
│   │   │   └── globals.css      ← Global styles
│   │   ├── components/          ← Reusable components
│   │   │   ├── ui/              ← Shadcn/ui components
│   │   │   ├── dashboard/       ← Dashboard components
│   │   │   ├── structure/       ← Structure analysis components
│   │   │   ├── culture/         ← Culture analysis components
│   │   │   │   ├── survey/      ← Survey components
│   │   │   │   ├── recognition/ ← Recognition agent components
│   │   │   │   └── engagement/  ← Engagement agent components
│   │   │   ├── skills/          ← Skills analysis components
│   │   │   │   ├── assessment/  ← Assessment components
│   │   │   │   ├── profiles/    ← Profile components
│   │   │   │   ├── gaps/        ← Gap analysis components
│   │   │   │   ├── bot/         ← Skills BOT components
│   │   │   │   └── strategic/   ← Strategic assessment components
│   │   │   ├── performance/     ← Performance module components
│   │   │   │   ├── goals/        ← Goal management components
│   │   │   │   ├── evaluations/  ← Evaluation components
│   │   │   │   ├── meetings/     ← Meeting components
│   │   │   │   ├── calibration/  ← Calibration components
│   │   │   │   ├── bot/          ← Performance BOT components
│   │   │   │   └── settings/     ← Performance settings components
│   │   │   └── hiring/          ← Hiring module components
│   │   │       ├── requisitions/ ← Requisition components
│   │   │       ├── jobs/         ← Job management components
│   │   │       ├── applications/ ← Application components
│   │   │       ├── interviews/   ← Interview components
│   │   │       ├── bot/          ← BOT interface components
│   │   │       └── compensation/ ← Compensation components
│   │   │   ├── lxp/             ← Learning Experience Platform components
│   │   │   │   ├── learning-paths/ ← Learning path components
│   │   │   │   ├── courses/      ← Course components
│   │   │   │   ├── progress/     ← Progress components
│   │   │   │   └── recommendations/ ← Recommendation components
│   │   │   ├── talent/          ← Talent management components
│   │   │   │   ├── identification/ ← Talent ID components
│   │   │   │   ├── development/  ← Development components
│   │   │   │   ├── succession/   ← Succession components
│   │   │   │   └── analytics/    ← Analytics components
│   │   │   └── bonus/           ← Bonus management components
│   │   │       ├── calculation/  ← Calculation components
│   │   │       ├── criteria/     ← Criteria components
│   │   │       ├── distribution/ ← Distribution components
│   │   │       └── analytics/    ← Analytics components
│   │   ├── lib/                 ← Utility functions
│   │   │   ├── utils.ts
│   │   │   ├── auth.ts
│   │   │   ├── api.ts
│   │   │   └── constants.ts
│   │   ├── hooks/               ← Custom React hooks
│   │   ├── types/               ← TypeScript types
│   │   └── styles/              ← Additional styles
│   ├── public/                  ← Static assets
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                      ← Express.js API
│   ├── src/
│   │   ├── routes/              ← API route handlers
│   │   │   ├── auth.ts
│   │   │   ├── structure.ts
│   │   │   ├── culture.ts
│   │   │   │   └── agents/      ← Recognition/Engagement agent routes
│   │   │   ├── skills.ts
│   │   │   ├── performance.ts   ← Performance module
│   │   │   └── hiring.ts        ← Hiring module
│   │   ├── services/            ← Business logic
│   │   │   ├── authService.ts
│   │   │   ├── structureService.ts
│   │   │   ├── cultureService.ts
│   │   │   ├── recognitionService.ts ← Recognition agent service
│   │   │   ├── engagementService.ts  ← Engagement agent service
│   │   │   ├── skillsService.ts
│   │   │   │   ├── assessmentService.ts   ← Skills assessment
│   │   │   │   ├── profileService.ts      ← Employee profiles
│   │   │   │   ├── gapAnalysisService.ts  ← Gap analysis
│   │   │   │   ├── skillsBotService.ts    ← Skills BOT
│   │   │   │   └── strategicService.ts    ← Strategic assessment
│   │   │   ├── performanceService.ts ← Performance module service
│   │   │   │   ├── goalService.ts         ← Goal management
│   │   │   │   ├── evaluationService.ts   ← Performance evaluations
│   │   │   │   ├── meetingService.ts      ← Meeting management
│   │   │   │   ├── calibrationService.ts  ← Aggregation & calibration
│   │   │   │   ├── performanceBotService.ts ← Performance BOT
│   │   │   │   └── settingsService.ts     ← Performance settings
│   │   │   └── hiringService.ts      ← Hiring module service
│   │   │       ├── requisitionService.ts ← Talent requisitions
│   │   │       ├── jobService.ts         ← Job management
│   │   │       ├── applicationService.ts ← Application processing
│   │   │       ├── interviewService.ts   ← Interview management
│   │   │       ├── botService.ts         ← Hiring BOT service
│   │   │       └── compensationService.ts ← Compensation analysis
│   │   │   ├── lxpService.ts         ← Learning Experience Platform service
│   │   │   │   ├── learningPathService.ts ← Learning paths
│   │   │   │   ├── courseService.ts      ← Course management
│   │   │   │   ├── progressService.ts    ← Progress tracking
│   │   │   │   └── recommendationService.ts ← Learning recommendations
│   │   │   ├── talentService.ts      ← Talent management service
│   │   │   │   ├── identificationService.ts ← Talent identification
│   │   │   │   ├── developmentService.ts    ← Talent development
│   │   │   │   ├── successionService.ts     ← Succession planning
│   │   │   │   └── analyticsService.ts      ← Talent analytics
│   │   │   └── bonusService.ts       ← Bonus management service
│   │   │       ├── calculationService.ts    ← Bonus calculations
│   │   │       ├── criteriaService.ts       ← Bonus criteria
│   │   │       ├── distributionService.ts   ← Bonus distribution
│   │   │       └── bonusAnalyticsService.ts ← Bonus analytics
│   │   ├── ai/                  ← AI Engine (Three-Engine Architecture)
│   │   │   ├── engines/
│   │   │   │   ├── KnowledgeEngine.ts
│   │   │   │   ├── DataEngine.ts
│   │   │   │   └── ReasoningEngine.ts
│   │   │   └── modules/         ← Feature modules
│   │   │       ├── StructureModule.ts
│   │   │       ├── CultureModule.ts
│   │   │       ├── RecognitionAgent.ts ← Recognition agent
│   │   │       ├── EngagementAgent.ts  ← Engagement agent
│   │   │       ├── SkillsModule.ts
│   │   │       ├── PerformanceModule.ts ← Performance module
│   │   │       └── HiringModule.ts      ← Hiring module
│   │   ├── db/                  ← Drizzle ORM database
│   │   │   ├── schema/          ← Database table schemas
│   │   │   │   ├── users.ts
│   │   │   │   ├── tenants.ts
│   │   │   │   ├── structure.ts
│   │   │   │   ├── culture.ts
│   │   │   │   ├── surveys.ts       ← Culture surveys
│   │   │   │   ├── recognition.ts   ← Recognition agent data
│   │   │   │   ├── engagement.ts    ← Engagement agent data
│   │   │   │   ├── skills.ts
│   │   │   │   │   ├── skills_framework.ts  ← Strategic skills framework
│   │   │   │   │   ├── employee_profiles.ts ← Employee skills profiles
│   │   │   │   │   ├── skills_gaps.ts       ← Skills gap analysis
│   │   │   │   │   ├── bot_interactions.ts  ← Skills BOT data
│   │   │   │   │   └── assessments.ts       ← Skills assessments
│   │   │   │   ├── performance/     ← Performance module schemas
│   │   │   │   │   ├── goals.ts         ← Goals and goal tracking
│   │   │   │   │   ├── evaluations.ts   ← Performance evaluations
│   │   │   │   │   ├── meetings.ts      ← 1:1 and evaluation meetings
│   │   │   │   │   ├── calibration.ts   ← Calibration data
│   │   │   │   │   ├── bot_interactions.ts ← Performance BOT data
│   │   │   │   │   └── settings.ts      ← Performance configuration
│   │   │   │   └── hiring/          ← Hiring module schemas
│   │   │   │       ├── requisitions.ts ← Talent requisitions
│   │   │   │       ├── jobs.ts         ← Job postings
│   │   │   │       ├── applications.ts ← Applications
│   │   │   │       ├── interviews.ts   ← Interviews
│   │   │   │       ├── bot_interactions.ts ← BOT data
│   │   │   │       └── compensation.ts ← Compensation data
│   │   │   │   ├── lxp/             ← Learning Experience Platform schemas
│   │   │   │   │   ├── learning_paths.ts ← Learning paths
│   │   │   │   │   ├── courses.ts        ← Courses
│   │   │   │   │   ├── progress.ts       ← Learning progress
│   │   │   │   │   └── recommendations.ts ← Recommendations
│   │   │   │   ├── talent/          ← Talent management schemas
│   │   │   │   │   ├── identification.ts ← Talent identification
│   │   │   │   │   ├── development.ts    ← Development plans
│   │   │   │   │   ├── succession.ts     ← Succession planning
│   │   │   │   │   └── analytics.ts      ← Talent analytics
│   │   │   │   └── bonus/           ← Bonus management schemas
│   │   │   │       ├── calculations.ts   ← Bonus calculations
│   │   │   │       ├── criteria.ts       ← Bonus criteria
│   │   │   │       ├── distributions.ts  ← Distributions
│   │   │   │       └── analytics.ts      ← Bonus analytics
│   │   │   ├── migrations/      ← Database migrations
│   │   │   └── connection.ts    ← Database connection
│   │   ├── middleware/          ← Express middleware
│   │   │   ├── auth.ts
│   │   │   ├── tenant.ts        ← Multi-tenant isolation
│   │   │   ├── validation.ts
│   │   │   └── errorHandler.ts
│   │   ├── types/               ← Backend TypeScript types
│   │   ├── utils/               ← Utility functions
│   │   └── index.ts             ← Server entry point
│   ├── tsconfig.json
│   └── package.json
│
├── scripts/                      ← Multi-agent system
│   ├── agents/                  ← Agent scripts
│   │   ├── AGENT_CONTEXT.md     ← Original context
│   │   ├── code-analyzer.js     ← Agent 1 (Gemini)
│   │   ├── fix-generator.js     ← Agent 2 (Claude)
│   │   ├── mizan-validator.js   ← Agent 3 (Gemini)
│   │   ├── security-checker.js  ← Agent 4 (GPT-4)
│   │   └── final-consensus.js   ← Agent 5 (Claude)
│   ├── orchestrator.js          ← Main automation script
│   ├── audit-violations.js
│   └── apply-fixes.js
│
├── docs/                        ← Documentation
│   ├── architecture.md
│   ├── api-documentation.md
│   ├── setup-guide.md
│   └── deployment-guide.md
│
└── .audit-config.json           ← Audit configuration
```

**⚠️ CRITICAL PATH RULES:**
- All file paths MUST be relative to `Mizan-1/` (project root)
- ✅ Correct: `frontend/src/app/dashboard/page.tsx`
- ❌ Wrong: `app/dashboard/page.tsx`
- ✅ Correct: `backend/src/routes/culture.ts`
- ❌ Wrong: `routes/culture.ts`

---

## 🔄 **PLATFORM FEATURE FLOW**

### **1. User Authentication Flow**
```
User Access → Auth Middleware → Tenant Resolution → Feature Access
    ↓
Login/Register → JWT Token → Multi-tenant Context → Dashboard
```

### **2. Core Analysis Flow**
```
Analysis Request → Data Collection → Three-Engine Processing → Results
       ↓               ↓                    ↓                 ↓
   Dashboard → Data Engine → Knowledge Engine → Analysis Results
       ↓               ↓                    ↓                 ↓
   API Call → Database → Reasoning Engine → Department/Org Aggregation
```

### **3. Culture Analysis + Agent Triggering Flow**
```
Culture Survey → Employee Responses → Culture Analysis → Agent Triggers
       ↓                ↓                    ↓                ↓
Survey Link → Last 2 Questions → Culture Agent → Recognition Agent
       ↓                ↓                    ↓                ↓
Employee → Recognition Data → Analysis → Engagement Agent
       ↓                ↓                    ↓                ↓
Completion → Engagement Data → Combined Results → Final Culture Analysis
```

### **4. Business Module Triggering Flow**
```
Core Analyses Complete → Module Activation → Business Process
         ↓                       ↓                    ↓
Structure + Culture + → Performance Module → Performance Management
Skills Analysis              ↓                    ↓
         ↓              Hiring Module → Recruitment Process
Analysis Results              ↓                    ↓
         ↓              Module Dashboard → Business Outcomes
Trigger Conditions
```

### **5. Multi-tenant Data Flow**
```
Request → Tenant Middleware → Tenant-specific Database → Response
   ↓           ↓                      ↓                    ↓
User ID → Tenant ID → Isolated Data Access → Filtered Results
```

### **6. Detailed Culture Analysis Workflow**
```
Step 1: Survey Generation
Superadmin/Client Admin → Generate Survey Link → Send to Employee

Step 2: Employee Survey Completion  
Employee → Receives Link → Completes Culture Survey → Submits Responses

Step 3: Agent Analysis Triggering
Survey Responses → Last 2 Questions → Trigger Recognition Agent
                                  → Trigger Engagement Agent

Step 4: Agent Processing
Recognition Agent → Analyzes Recognition Patterns → Returns Analysis
Engagement Agent → Analyzes Engagement Factors → Returns Analysis

Step 5: Culture Agent Integration
Culture Agent → Receives Agent Analyses → Integrates with Survey Data
             → Generates Individual Employee Analysis

Step 6: Aggregation
Individual Analyses → Department Level Aggregation → Org Level Aggregation
                   → Final Culture Reports → Dashboard Display
```

**Implementation Status:**
- ✅ Survey System: Implemented
- ✅ Culture Analysis: Implemented  
- ✅ Recognition Agent: Implemented and Integrated (Three-Engine Architecture)
- ✅ Engagement Agent: Implemented and Integrated (Three-Engine Architecture)
```

---

## 🔀 **MODULE TRIGGERING & INTERACTION PATTERNS**

### **Complete System Trigger Map**

This section documents ALL triggering relationships between modules, data dependencies, and integration patterns. Understanding this map is CRITICAL for implementing any module correctly.

#### **Culture Analysis Triggers:**
```
Culture Survey Completion → Recognition Agent (triggered by last 2 questions)
Culture Survey Completion → Engagement Agent (triggered by last 2 questions)
Culture Analysis Results → Performance Module (provides culture goals for leaders)
```

**Trigger Data:**
- Recognition/Engagement agents receive employee responses to last 2 survey questions
- Performance Module receives leadership culture shaping priorities
- All triggers maintain tenantId for multi-tenant isolation

#### **Skills Analysis Triggers:**
```
Individual Skills Gap Detected → LXP Module (personalized gamified learning)
Skills Analysis Complete → Performance Module (provides critical skills gaps for goals)
Skills Analysis Complete → Talent Module (provides capability assessment data)
```

**Trigger Data:**
- LXP receives: employeeId, skillsGaps[], strategicPriorities, behaviorChangeTargets
- Performance receives: criticalSkillsGaps[] (organization-wide), individualGaps[] (per employee)
- Talent receives: skillsData for capability assessment in 9-box distribution

#### **Structure Analysis Triggers:**
```
Position Gap Identified → Hiring Module (initiates recruitment workflow)
Structure Recommendations → Performance Module (provides departmental goals framework)
Structure Recommendations → Succession Planning (position criticality analysis)
```

**Trigger Data:**
- Hiring receives: positionRequirements, reportingStructure, teamComposition
- Performance receives: departmentalStructure, reportingLines, roleDefinitions
- Succession Planning receives: positionCriticality[], strategicImportance[]

#### **Performance Module Triggers:**
```
Performance Results Complete → Talent Module (9-box distribution based on ratings)
Performance Results Complete → Bonus Module (bonus calculation based on ratings)
Performance Goals Set → LXP Module (learning path integration into goals)
```

**Trigger Data:**
- Talent receives: performanceRatings[], evaluationData[], employeePerformanceHistory[]
- Bonus receives: performanceRatings[], employeeRole (leader/manager/IC), eligibilityStatus
- LXP receives: goalsWithLearning[], employeeId, supervisorId for tracking

#### **Hiring Module Triggers:**
```
None - Hiring is a terminal module (does not trigger other modules)
```

**Note:** Hiring completes recruitment process but does not trigger additional workflows.

#### **LXP Module Triggers:**
```
Learning Experience Completion → Skills Module (update employee skills profile)
Learning Progress Updates → Performance Module (update goal progress tracking)
```

**Trigger Data:**
- Skills receives: completedLearning[], skillsAcquired[], behaviorChangeMetrics
- Performance receives: learningProgress%, goalsProgress[], completionStatus

#### **Talent Module Triggers:**
```
Succession Plan Created → Performance Module (development goals for successors)
Development Plan Created → LXP Module (learning recommendations for development)
```

**Trigger Data:**
- Performance receives: developmentGoals[], successorPreparation[], skillsGapsForRole[]
- LXP receives: developmentNeeds[], learningPriorities[], timelineRequirements

#### **Bonus Module Triggers:**
```
None - Bonus is a terminal module (does not trigger other modules)
```

**Note:** Bonus calculation completes compensation process without triggering workflows.

---

### **Data Dependencies Map**

#### **Performance Module Dependencies:**
```typescript
interface PerformanceModuleDependencies {
  structure: {
    departmentalStructure: Department[];
    reportingLines: ReportingStructure[];
    roleDefinitions: RoleDefinition[];
  };
  culture: {
    leadershipPriorities: CultureGoal[];
    cultureSh apingGoals: CultureMetric[];
  };
  skills: {
    criticalSkillsGaps: SkillsGap[];
    individualSkillsGaps: EmployeeSkillsGap[];
  };
  clientData: {
    strategy: ClientStrategy;
    industryContext: IndustryData;
    individualGoalsCSV: CSVData;
  };
}
```

**Required Before Execution:** Structure analysis, Culture analysis, Skills analysis must be completed.

#### **LXP Module Dependencies:**
```typescript
interface LXPModuleDependencies {
  skills: {
    individualSkillsGap: SkillsGap[];
    strategicSkillsPriorities: SkillPriority[];
  };
  culture: {
    behaviorChangeTargets: BehaviorMetric[];
    cultureAnalysisResults: CultureInsights;
  };
  tenant: {
    strategy: TenantStrategy;
    skillPriorities: SkillFocus[];
  };
  performance: {
    goalsForLearningIntegration: PerformanceGoal[];
    employeeId: string;
    supervisorId: string;
  };
}
```

**Required Before Execution:** Skills analysis (individual) must be completed. Performance goals optional for integration.

#### **Talent Module Dependencies:**
```typescript
interface TalentModuleDependencies {
  performance: {
    performanceRatings: Rating[];
    evaluationData: Evaluation[];
    performanceHistory: PerformanceRecord[];
  };
  skills: {
    skillsCapabilityData: SkillsProfile[];
    competencyAssessments: Competency[];
  };
  culture: {
    cultureFitData: CultureAlignment[];
    valueAlignment: ValueMetric[];
  };
  structure: {
    positionHierarchy: OrgStructure;
    positionCriticality: PositionImportance[];
  };
}
```

**Required Before Execution:** Performance results must be completed. Skills and Culture data enhance 9-box accuracy.

#### **Bonus Module Dependencies:**
```typescript
interface BonusModuleDependencies {
  performance: {
    employeeRatings: Rating[];
    companyPerformance: CompanyMetric;
  };
  tenant: {
    bonusBudget: number;
    payoutPercentage: number;
    roleWeightingConfig: BonusWeightConfig;
  };
  employees: {
    employeeRole: 'leader' | 'manager' | 'individual_contributor';
    eligibilityStatus: boolean;
  };
}
```

**Required Before Execution:** Performance cycle must be completed with final ratings.

---

### **Integration Patterns**

#### **Pattern 1: Request-Response Integration (Synchronous)**
```typescript
// Example: Performance Module requests data from Culture and Skills agents
export class PerformanceService {
  async generatePerformanceGoals(tenantId: string) {
    // Request culture priorities (synchronous call)
    const cultureGoals = await cultureAgent.getLeadershipPriorities(tenantId);
    
    // Request critical skills gaps (synchronous call)
    const skillsGoals = await skillsAgent.getCriticalGaps(tenantId);
    
    // Combine data for goal generation
    return await this.generateGoalsWithIntegration(cultureGoals, skillsGoals);
  }
}
```

**When to use:** When the requesting module needs immediate data to proceed.
**Modules using this:** Performance → Culture/Skills, Talent → Performance/Skills/Culture

#### **Pattern 2: Event-Based Triggering (Asynchronous)**
```typescript
// Example: Skills analysis completion triggers LXP module
export class SkillsService {
  async completeAnalysis(employeeId: string, skillsGaps: SkillsGap[]) {
    // Complete skills analysis
    await this.saveSkillsAnalysis(employeeId, skillsGaps);
    
    // Create trigger for LXP module (asynchronous)
    await triggerService.createTrigger({
      sourceModule: 'skills',
      targetModule: 'lxp',
      triggerType: 'skills_gap_detected',
      tenantId: this.tenantId,
      data: {
        employeeId,
        skillsGaps,
        strategicPriorities: await this.getStrategicPriorities(),
        behaviorChangeTargets: await this.getBehaviorTargets()
      },
      status: 'pending'
    });
    
    // LXP will process this trigger asynchronously
  }
}
```

**When to use:** When the target module can process the trigger independently and asynchronously.
**Modules using this:** Skills → LXP, Performance → Talent/Bonus, Culture → Recognition/Engagement

#### **Pattern 3: Polling for Updates (Pull-Based)**
```typescript
// Example: LXP polls for pending learning path assignments
export class LXPService {
  async checkForPendingLearning(employeeId: string) {
    // Poll trigger service for pending assignments
    const pendingTriggers = await triggerService.getPendingTriggers({
      targetModule: 'lxp',
      employeeId,
      status: 'pending'
    });
    
    // Process each pending trigger
    for (const trigger of pendingTriggers) {
      await this.processLearningAssignment(trigger);
      await triggerService.updateTriggerStatus(trigger.id, 'completed');
    }
  }
}
```

**When to use:** When the target module controls its processing timing or needs to batch process triggers.
**Modules using this:** LXP (for learning assignments), Talent (for succession planning updates)

#### **Pattern 4: Callback Integration (Push-Based)**
```typescript
// Example: LXP pushes updates back to Skills module on learning completion
export class LXPService {
  async completeLearningExperience(employeeId: string, learningId: string) {
    const learningData = await this.getLearningData(learningId);
    
    // Complete the learning experience
    await this.markComplete(learningId);
    
    // Push update back to Skills module (callback)
    await skillsAgent.updateEmployeeProfile({
      employeeId,
      skillsAcquired: learningData.skillsAcquired,
      behaviorMetrics: learningData.behaviorChangeMetrics,
      completionDate: new Date()
    });
  }
}
```

**When to use:** When the source module needs immediate confirmation or data update in the target.
**Modules using this:** LXP → Skills (profile updates), LXP → Performance (goal progress)

---

### **Trigger Processing Service (Required Implementation)**

```typescript
// Backend service for managing all module triggers
export class TriggerProcessorService {
  async createTrigger(trigger: TriggerData): Promise<Trigger> {
    // Validate tenant isolation
    const validated = await this.validateTenantAccess(trigger.tenantId);
    
    // Create trigger record in database
    return await db.insert(triggersTable).values({
      id: randomUUID(),
      sourceModule: trigger.sourceModule,
      targetModule: trigger.targetModule,
      triggerType: trigger.triggerType,
      tenantId: trigger.tenantId,
      data: JSON.stringify(trigger.data),
      status: 'pending',
      createdAt: new Date(),
      processedAt: null
    });
  }
  
  async getPendingTriggers(filter: TriggerFilter): Promise<Trigger[]> {
    return await db.select()
      .from(triggersTable)
      .where(
        and(
          eq(triggersTable.tenantId, filter.tenantId),
          eq(triggersTable.targetModule, filter.targetModule),
          eq(triggersTable.status, 'pending')
        )
      );
  }
  
  async processTrigger(triggerId: string): Promise<void> {
    const trigger = await this.getTrigger(triggerId);
    
    // Route to appropriate module handler
    switch (trigger.targetModule) {
      case 'lxp':
        await lxpService.processTrigger(trigger);
        break;
      case 'talent':
        await talentService.processTrigger(trigger);
        break;
      case 'bonus':
        await bonusService.processTrigger(trigger);
        break;
      // ... other modules
    }
    
    // Mark as completed
    await this.updateTriggerStatus(triggerId, 'completed');
  }
}
```

---

### **Succession Planning: Structure Agent Responsibility**

**Decision:** The **Structure Agent** is responsible for suggesting succession planning priorities.

**Rationale:**
1. Structure Agent analyzes organizational hierarchy and position relationships
2. Structure Agent understands position criticality to vision/mission/strategy
3. Structure Agent identifies which positions are strategic vs operational
4. Structure Agent has context on reporting structures and dependencies

**Workflow:**
```
Structure Analysis Complete → Position Criticality Assessment
                           → Strategic Position Identification
                           → Succession Planning Triggers
                           → Talent Module (executes succession planning)
```

**Implementation:**
```typescript
export class StructureAgent {
  async analyzePositionCriticality(tenantId: string): Promise<SuccessionPriority[]> {
    // Analyze each position's importance
    const positions = await this.getOrganizationalPositions(tenantId);
    const strategy = await this.getClientStrategy(tenantId);
    
    return positions.map(position => ({
      positionId: position.id,
      positionTitle: position.title,
      criticalityScore: this.calculateCriticality(position, strategy),
      strategicImportance: this.assessStrategicImportance(position, strategy),
      successionUrgency: this.calculateSuccessionUrgency(position),
      recommendedSuccessionPlan: position.criticalityScore > 80
    }));
  }
}
```

---

## 🔗 **FEATURE INTEGRATION RULES**

### **Rule 1: Multi-tenant Isolation**
```typescript
// ✅ CORRECT: Always include tenantId in queries
const cultures = await db.select()
  .from(cultureTable)
  .where(eq(cultureTable.tenantId, user.tenantId));

// ❌ WRONG: Missing tenant isolation
const cultures = await db.select().from(cultureTable);
```

### **Rule 2: Three-Engine Architecture**
```typescript
// ✅ CORRECT: Use all three engines
class CultureAnalysisService {
  constructor(
    private knowledgeEngine: KnowledgeEngine,
    private dataEngine: DataEngine,
    private reasoningEngine: ReasoningEngine
  ) {}

  async analyzeCulture(data: CultureData) {
    const context = await this.knowledgeEngine.getContext();
    const processed = await this.dataEngine.process(data);
    return this.reasoningEngine.analyze(processed, context);
  }
}

// ❌ WRONG: Direct analysis without engines
async function analyzeCulture(data: any) {
  return "Mock culture analysis"; // FORBIDDEN!
}
```

### **Rule 3: Feature Cross-Integration**
```typescript
// ✅ CORRECT: Features can reference each other
interface PerformanceAnalysis {
  cultureImpact: CultureMetrics;    // From Culture feature
  structureImpact: StructureMetrics; // From Structure feature
  skillsGaps: SkillsMetrics;        // From Skills feature
}

// ❌ WRONG: Isolated features without integration
interface PerformanceAnalysis {
  performance: number; // Isolated, no integration
}
```

### **Rule 4: Consistent Data Models**
```typescript
// ✅ CORRECT: Shared base interfaces
interface BaseAnalysis {
  id: string;
  tenantId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface CultureAnalysis extends BaseAnalysis {
  // Culture-specific fields
}

interface StructureAnalysis extends BaseAnalysis {
  // Structure-specific fields
}
```

---

## 🎨 **DESIGN GUIDELINES**

### **Color Palette**
```css
/* Primary Colors */
--primary: #2563eb;        /* Blue - Primary actions */
--primary-dark: #1e40af;   /* Darker blue for hover */
--primary-light: #3b82f6;  /* Lighter blue for backgrounds */

/* Secondary Colors */
--secondary: #7c3aed;      /* Purple - Secondary actions */
--accent: #06b6d4;         /* Cyan - Accent elements */

/* Status Colors */
--success: #10b981;        /* Green - Success states */
--warning: #f59e0b;        /* Yellow - Warning states */
--error: #ef4444;          /* Red - Error states */
--info: #3b82f6;           /* Blue - Info states */

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;

/* Feature-specific Colors */
--culture: #7c3aed;        /* Purple for Culture */
--structure: #059669;      /* Green for Structure */
--skills: #dc2626;         /* Red for Skills */
--performance: #ea580c;    /* Orange for Performance */
--hiring: #2563eb;         /* Blue for Hiring */
```

### **Typography**
```css
/* Font Families */
--font-sans: 'Inter', sans-serif;
--font-mono: 'Fira Code', monospace;

/* Font Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### **Component Styling Patterns**
```typescript
// ✅ CORRECT: Consistent button styling
const Button = ({ variant, size, children }: ButtonProps) => {
  const baseClasses = "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary-light",
    secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-light",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button className={cn(baseClasses, variants[variant], sizes[size])}>
      {children}
    </button>
  );
};
```

---

## 🛠️ **TECHNICAL STACK REQUIREMENTS**

### **Frontend Stack (Mandatory)**
```typescript
// Framework & Language
"next": "14.x"              // Next.js 14 App Router ONLY
"typescript": "5.x"         // TypeScript strict mode
"react": "18.x"             // React 18+

// Styling & UI
"tailwindcss": "3.x"        // Tailwind CSS
"@radix-ui/react-*": "*"    // Radix UI primitives (optional)
"lucide-react": "*"         // Icons

// State & Data
"swr": "*"                  // Data fetching (or React Query)
"zustand": "*"              // State management (if needed)

// Forms & Validation
"react-hook-form": "*"      // Form handling
"zod": "*"                  // Schema validation

// Utilities
"clsx": "*"                 // Conditional classes
"date-fns": "*"             // Date manipulation
```

### **Backend Stack (Mandatory)**
```typescript
// Runtime & Framework
"node": "20.x"              // Node.js 20+
"express": "4.x"            // Express.js
"typescript": "5.x"         // TypeScript strict mode

// Database & ORM
"drizzle-orm": "*"          // Drizzle ORM ONLY (NOT Prisma)
"pg": "*"                   // PostgreSQL client
"@types/pg": "*"            // PostgreSQL types

// Authentication & Security
"jsonwebtoken": "*"         // JWT tokens
"bcryptjs": "*"             // Password hashing
"helmet": "*"               // Security headers
"cors": "*"                 // CORS handling

// Validation & Middleware
"zod": "*"                  // Schema validation
"express-rate-limit": "*"   // Rate limiting

// AI & External APIs
"openai": "*"               // OpenAI API (if using)
"@anthropic-ai/sdk": "*"    // Anthropic Claude API (if using)
```

---

## 📋 **IMPLEMENTATION PATTERNS**

### **1. Next.js 14 App Router Patterns**
```typescript
// ✅ CORRECT: App Router page component
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const data = await fetchDashboardData(session.user.tenantId);
  
  return (
    <div className="p-6">
      <DashboardContent data={data} />
    </div>
  );
}

// ✅ CORRECT: API route handler
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await fetchData(session.user.tenantId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ❌ WRONG: Pages Router patterns (OLD)
export async function getServerSideProps() { } // DON'T USE
export async function getStaticProps() { }     // DON'T USE
```

### **2. Drizzle ORM Patterns**
```typescript
// ✅ CORRECT: Drizzle schema definition
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const cultureTable = pgTable('cultures', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  userId: uuid('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: ['pending', 'processing', 'completed', 'failed'] }).notNull(),
  results: text('results'), // JSON string
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ✅ CORRECT: Drizzle queries with tenant isolation
async function getCultureAnalyses(tenantId: string) {
  return await db.select()
    .from(cultureTable)
    .where(eq(cultureTable.tenantId, tenantId))
    .orderBy(desc(cultureTable.createdAt));
}

// ❌ WRONG: Raw SQL or other ORMs
const result = await db.query('SELECT * FROM cultures'); // DON'T USE
const result = await prisma.culture.findMany();          // DON'T USE
```

### **3. Three-Engine Architecture Pattern**
```typescript
// ✅ CORRECT: Three-Engine implementation
export class KnowledgeEngine {
  async getContext(domain: string): Promise<DomainContext> {
    // Fetch domain-specific knowledge, best practices, frameworks
    return {
      frameworks: await this.getFrameworks(domain),
      bestPractices: await this.getBestPractices(domain),
      benchmarks: await this.getBenchmarks(domain)
    };
  }
}

export class DataEngine {
  async process(rawData: any, context: DomainContext): Promise<ProcessedData> {
    // Clean, normalize, and structure data
    return {
      cleaned: await this.cleanData(rawData),
      normalized: await this.normalizeData(rawData),
      structured: await this.structureData(rawData, context)
    };
  }
}

export class ReasoningEngine {
  async analyze(data: ProcessedData, context: DomainContext): Promise<AnalysisResult> {
    // Apply reasoning, generate insights, make recommendations
    return {
      insights: await this.generateInsights(data, context),
      recommendations: await this.generateRecommendations(data, context),
      confidence: await this.calculateConfidence(data, context)
    };
  }
}

// ✅ CORRECT: Three-Engine Architecture for Culture Analysis
export class CultureAnalysisService {
  constructor(
    private knowledgeEngine: KnowledgeEngine,
    private dataEngine: DataEngine,
    private reasoningEngine: ReasoningEngine
  ) {}

  async analyze(rawData: CultureData): Promise<CultureAnalysisResult> {
    const context = await this.knowledgeEngine.getContext('culture');
    const processedData = await this.dataEngine.process(rawData, context);
    return await this.reasoningEngine.analyze(processedData, context);
  }
}

// ✅ CORRECT: Three-Engine Architecture for Skills Analysis
// NOTE: AI agent trained on organizational development practices and theories
export class SkillsAnalysisService {
  constructor(
    private knowledgeEngine: KnowledgeEngine,
    private dataEngine: DataEngine,
    private reasoningEngine: ReasoningEngine
  ) {}

  async processSkillsAnalysis(
    clientStrategy: ClientStrategy,
    clientContext: ClientContext
  ): Promise<SkillsWorkflow> {
    // Knowledge Engine: Get org development practices, industry skill requirements
    const context = await this.knowledgeEngine.getContext('skills');
    const industrySkills = await this.knowledgeEngine.getIndustrySkillsContext(clientContext.industry);
    
    // Data Engine: Process strategy, employee data, resumes, CSV uploads
    const processedData = await this.dataEngine.process({
      strategy: clientStrategy,
      employeeCSV: await this.getCSVData(clientContext.tenantId),
      resumeData: await this.getResumeData(clientContext.tenantId),
      industryContext: clientContext.industry
    }, context);
    
    // Reasoning Engine: Generate skills framework, gap analysis
    return await this.reasoningEngine.analyze(processedData, {
      ...context,
      industryBenchmarks: industrySkills,
      strategicRequirements: await this.getStrategicSkillRequirements(clientStrategy)
    });
  }

  async triggerLXP(skillsGaps: SkillsGap[]): Promise<LXPTrigger[]> {
    // Integration with LXP Module for learning path creation
  }

  async triggerTalentModule(skillsData: SkillsData): Promise<TalentTrigger> {
    // Integration with Talent Module for talent identification
  }

  async triggerBonusModule(skillsAchievements: SkillsAchievement[]): Promise<BonusTrigger> {
    // Integration with Bonus Module for skills-based compensation
  }
}

// ✅ CORRECT: Skills BOT Integration Service
export class SkillsBotService {
  constructor(private skillsService: SkillsAnalysisService) {}
  
  async assistEmployeeResumeUpload(employeeId: string, resumeData: any): Promise<BotResponse> {
    // BOT logic for resume upload assistance
  }
  
  async assistResumeBuilding(employeeId: string, currentData: any): Promise<BotResponse> {
    // BOT logic for interactive resume building
  }

  async explainSkillsGap(employeeId: string, gapAnalysis: SkillsGap): Promise<BotResponse> {
    // BOT logic for gap explanation and guidance
  }
}

// ✅ CORRECT: Three-Engine Architecture for Hiring Module
// NOTE: AI agent trained on all talent acquisition practices and theories
export class HiringAnalysisService {
  constructor(
    private knowledgeEngine: KnowledgeEngine,
    private dataEngine: DataEngine,
    private reasoningEngine: ReasoningEngine
  ) {}

  async processHiringRequest(
    structureRecommendation: StructureRecommendation,
    clientContext: ClientContext
  ): Promise<HiringWorkflow> {
    // Knowledge Engine: Get talent acquisition practices, industry standards
    const context = await this.knowledgeEngine.getContext('hiring');
    const industryData = await this.knowledgeEngine.getIndustryContext(clientContext.industry);
    
    // Data Engine: Process structure data and client requirements
    const processedData = await this.dataEngine.process({
      recommendation: structureRecommendation,
      clientStrategy: clientContext.strategy,
      intendedCulture: clientContext.culture,
      companySize: clientContext.size
    }, context);
    
    // Reasoning Engine: Generate hiring strategy and job requirements
    return await this.reasoningEngine.analyze(processedData, {
      ...context,
      industryBenchmarks: industryData,
      compensationData: await this.getMarketData(clientContext)
    });
  }
}

// ✅ CORRECT: Three-Engine Architecture for Performance Module
// NOTE: AI agent trained on all performance management theories and practices
export class PerformanceAnalysisService {
  constructor(
    private knowledgeEngine: KnowledgeEngine,
    private dataEngine: DataEngine,
    private reasoningEngine: ReasoningEngine
  ) {}

  async processPerformanceCycle(
    clientStrategy: ClientStrategy,
    clientContext: ClientContext
  ): Promise<PerformanceWorkflow> {
    // Knowledge Engine: Get performance management theories, best practices
    const context = await this.knowledgeEngine.getContext('performance');
    const industryStandards = await this.knowledgeEngine.getIndustryContext(clientContext.industry);
    
    // Data Engine: Process strategy, structure data, CSV uploads
    const processedData = await this.dataEngine.process({
      strategy: clientStrategy,
      departmentStructure: await this.getStructureData(clientContext.tenantId),
      individualGoalsCSV: await this.getCSVData(clientContext.tenantId),
      marketPosition: clientContext.marketPosition
    }, context);
    
    // Reasoning Engine: Generate goals, performance framework
    return await this.reasoningEngine.analyze(processedData, {
      ...context,
      industryBenchmarks: industryStandards,
      cultureGoals: await this.getCulturePriorities(clientContext.tenantId),
      skillsGaps: await this.getSkillsGaps(clientContext.tenantId)
    });
  }

  async getCulturePriorities(tenantId: string): Promise<CultureGoal[]> {
    // Integration with Culture Agent for leadership culture priorities
  }

  async getSkillsGaps(tenantId: string): Promise<SkillsGoal[]> {
    // Integration with Skills Agent for critical skills gaps
  }
}

// ✅ CORRECT: Performance BOT Integration Service
export class PerformanceBotService {
  constructor(private performanceService: PerformanceAnalysisService) {}
  
  async assistEmployee(query: string, employeeId: string): Promise<BotResponse> {
    // BOT logic for employee assistance (goals, 1:1s, evaluations)
  }
  
  async assistSupervisor(query: string, supervisorId: string): Promise<BotResponse> {
    // BOT logic for supervisor assistance (goal setting, evaluations, meetings)
  }

  async manageApprovalFlow(goalId: string, approvalLevel: 'employee' | 'supervisor' | 'leader'): Promise<ApprovalStatus> {
    // BOT logic for goal approval workflow management
  }
}
```

### **4. Error Handling Patterns**
```typescript
// ✅ CORRECT: Comprehensive error handling
export async function handleApiRequest<T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    
    if (error instanceof ValidationError) {
      throw new ApiError('Validation failed', 400, error.details);
    }
    
    if (error instanceof AuthenticationError) {
      throw new ApiError('Authentication required', 401);
    }
    
    if (error instanceof AuthorizationError) {
      throw new ApiError('Access denied', 403);
    }
    
    throw new ApiError('Internal server error', 500);
  }
}
```

---

## 🔍 **QUALITY CONTROL RULES**

### **Forbidden Patterns (NEVER USE)**
```typescript
// ❌ FORBIDDEN: Mock data or placeholders
const mockData = { name: "Sample User" };
const TODO_IMPLEMENT_LATER = "placeholder";

// ❌ FORBIDDEN: 'any' types
function processData(data: any): any { }

// ❌ FORBIDDEN: Missing error handling
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json(); // No error handling!
}

// ❌ FORBIDDEN: Missing tenant isolation
const users = await db.select().from(usersTable); // Missing tenantId filter

// ❌ FORBIDDEN: Non-production database queries
const result = await db.query('SELECT * FROM users'); // Raw SQL

// ❌ FORBIDDEN: Incomplete implementations
// TODO: implement this later - NOT ALLOWED!

// ❌ FORBIDDEN: Workaround fixes (removing TODO without implementation)
// Bad example:
// Before: // TODO: Add token validation endpoint
// After: // Compliant with AGENT_CONTEXT_ULTIMATE.md - NO TODO comments
if (token && token.length > 0) {
  setValidToken(true); // This is NOT validation!
}

// ❌ FORBIDDEN: Cosmetic compliance without functionality
// Token validation comment changed but still no real validation

// ❌ FORBIDDEN: Placeholder comments disguised as production code
// Production-ready data (but actually still using mock data)
const data = mockData;
```

### **Required Patterns (ALWAYS USE)**
```typescript
// ✅ REQUIRED: Strict TypeScript types
interface UserData {
  id: string;
  email: string;
  tenantId: string;
}

function processUser(user: UserData): ProcessedUser { }

// ✅ REQUIRED: Complete error handling
async function fetchUserData(userId: string): Promise<UserData> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    const data = await response.json();
    return userSchema.parse(data); // Zod validation
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// ✅ REQUIRED: Tenant isolation
async function getUsersByTenant(tenantId: string): Promise<User[]> {
  return await db.select()
    .from(usersTable)
    .where(eq(usersTable.tenantId, tenantId));
}

// ✅ REQUIRED: Feature completion marking
// Mark feature as COMPLETE only after all requirements are met

// ✅ REQUIRED: Production-ready implementation example
// Real token validation with backend API
async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/survey/validate/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Invalid or expired token');
    }

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Token validation error:', error);
    throw error;
  }
}
```

### **🎯 FEATURE COMPLETION RULE (CRITICAL)**
**Once a feature is fully implemented according to all requirements:**
- ✅ All code is production-ready (no mock data, no placeholders)
- ✅ All error handling is comprehensive
- ✅ All TypeScript types are strict (no 'any' types)
- ✅ All tenant isolation is implemented
- ✅ All database operations use Drizzle ORM
- ✅ All UI follows design guidelines
- ✅ All tests pass (if applicable)
- ✅ All documentation is updated

**THEN and ONLY THEN** mark the feature as **COMPLETE** with status:
```typescript
// Example completion marking
const featureStatus = {
  name: "Culture Survey System",
  status: "COMPLETE",
  completedAt: new Date().toISOString(),
  implementedBy: "Cursor AI",
  validatedBy: "Multi-Agent System"
};
```
```

### **🔍 IMPLEMENTATION VERIFICATION (MANDATORY)**

Before marking any fix as complete, verify:

**Functionality Test:**
- [ ] Does the code actually DO what it claims?
- [ ] Is there real backend integration (not just client-side checks)?
- [ ] Are edge cases handled?
- [ ] Does error handling work properly?

**NOT Acceptable:**
- Changing "// TODO: implement X" to "// X is implemented" without implementing X
- Removing "mock data" comment but keeping the mock data
- Adding "production-ready" comment to non-production code
- Replacing 'any' type with a comment about strict typing

**Acceptable:**
- Full implementation with proper API calls
- Complete error handling with try-catch and user feedback
- Actual validation logic (not just checking if value exists)
- Real data transformation/processing logic

---

#### **🌐 External Platform Integrations:**

**Supported Recruitment Platforms:**
- **LinkedIn**: Job posting, candidate sourcing, application management
- **Indeed**: Job posting, application collection, candidate tracking
- **Glassdoor**: Job posting, company branding, salary benchmarking
- **ZipRecruiter**: Multi-platform posting, application aggregation
- **Company Career Page**: Direct integration, branded experience

**Integration Configuration:**
- Managed through Client Admin Settings page
- API credentials and authentication setup
- Platform-specific job posting templates
- Automated application synchronization
- Real-time status updates across platforms

**Technical Requirements:**
```typescript
// Platform Integration Interface
interface RecruitmentPlatform {
  platform: 'linkedin' | 'indeed' | 'glassdoor' | 'ziprecruiter' | 'career_page';
  apiCredentials: PlatformCredentials;
  isActive: boolean;
  jobPostingTemplate: JobTemplate;
  applicationSyncSettings: SyncSettings;
}

// External API Integration
interface PlatformAPI {
  postJob(job: JobPosting): Promise<PlatformJobId>;
  updateJob(jobId: PlatformJobId, updates: JobUpdates): Promise<void>;
  getApplications(jobId: PlatformJobId): Promise<Application[]>;
  removeJob(jobId: PlatformJobId): Promise<void>;
}
```

---

## 📊 **BUSINESS MODULES (COMPLETE SYSTEMS)**

### **Performance Module**
- **Type**: Standalone complete performance management system
- **Triggered by**: Independent module (not triggered by other analyses)
- **Purpose**: Strategic goal setting, performance monitoring, evaluation, and calibration
- **Architecture**: Three-Engine AI Agent + Interactive BOT system
- **Training**: AI agent trained on all performance management theories and practices

#### **🔄 Performance Module Complete Workflow:**

```
Step 1: Strategic Analysis & Understanding
Performance Agent → Reads Client Strategy → Understands Industry Context
                → Analyzes Market Position → Prepares Strategic Foundation

Step 2: Goal Decomposition & Setting
Strategic Foundation → Departmental Goals (from Structure Agent data)
                   → Individual Goals (from Client CSV upload)
                   → Cross-Module Integration Requests

Step 3: Cross-Module Integration
Performance Agent → Requests Culture Priorities (from Culture Agent)
                → Requests Skills Gaps (from Skills Agent)
                → Integrates Culture & Skills Goals with Performance Goals

Step 4: Goal Approval Workflow
Generated Goals → BOT Manages Approval Flow
              → Employee Review → Supervisor Approval → Upper Leader Sign-off
              → Goal Weighting Assignment → Final Goal Setting

Step 5: Performance Cycle Management
Performance Calendar → Cycle Monitoring (Default: Quarterly)
                   → Progress Tracking → 1:1 Meeting Management
                   → Performance Check-ins → Documentation

Step 6: Meeting & Evaluation Support
BOT Scheduling → 1:1 Meeting Prep → Meeting Documentation
             → Performance Evaluation Prep → Evaluation Documentation
             → Feedback Collection → Progress Updates

Step 7: Performance Evaluation Process
Evaluation Period → Simple Evaluation Form (Max: 3 goals, 1 culture, 2 skills)
                → 5-Point Rating System → Weighted Scoring
                → Supervisor & Employee Input → Final Evaluation

Step 8: Results Aggregation & Analysis
Individual Results → Quarterly Org-Level Aggregation
                 → Annual Department-Level Analysis
                 → Annual Org-Level Calibration Data

Step 9: Calibration & Strategic Review
Calibration Meeting → Performance Analysis → Strategic Alignment Review
                  → Next Cycle Planning → System Optimization
```

#### **📊 Performance Measurement System:**

**5-Point Rating Scale:**
- **1**: Does Not Meet Expectations
- **2**: Nearly Meets Expectations  
- **3**: Meets Expectations (Standard)
- **4**: Nearly Exceeds Expectations
- **5**: Exceeds Expectations

**Goal Structure Limits:**
- **Maximum 3 Total Goals** per employee
- **Maximum 1 Culture Goal** (from Culture Agent priorities)
- **Maximum 2 Skills Goals** (from Skills Agent gaps)
- **Remaining slots** for performance/strategic goals

**Goal Weighting System:**
- Supervisor and Employee collaborate on goal weights
- Total weight must equal 100%
- Culture goals: Primarily for leaders
- Skills goals: Based on critical strategy gaps

#### **🤖 Performance BOT Features:**

**For Employees:**
- Goal review and approval assistance
- 1:1 meeting scheduling and preparation
- Performance evaluation preparation
- Progress tracking and updates
- Documentation assistance

**For Supervisors:**
- Goal setting and weighting guidance
- 1:1 meeting preparation and follow-up
- Performance evaluation facilitation
- Team performance insights
- Calibration meeting preparation

**For Leaders:**
- Departmental goal alignment
- Culture shaping priorities
- Strategic goal cascading
- Performance trend analysis
- Calibration data review

#### **🔗 Integration Points:**

**With Structure Agent:**
- Receives department names and functions
- Gets organizational hierarchy data
- Understands reporting relationships
- Cascades goals through structure

**With Culture Agent:**
- Requests culture shaping priorities
- Focuses on leadership culture goals
- Integrates culture metrics into performance
- Aligns culture transformation with performance

**With Skills Agent:**
- Requests critical skills gaps analysis
- Integrates skills development goals
- Aligns skills acquisition with strategy
- Monitors skills progress through performance

**With Client Data:**
- Processes uploaded CSV files for individual goals
- Reads client strategy documents
- Analyzes industry and market position data
- Integrates company-specific performance criteria

#### **⚙️ Configuration & Settings:**

**Performance Calendar Management:**
- Default cycle: Quarterly
- Adjustable by Superadmin (global settings)
- Adjustable by Admin (tenant settings)
- Custom performance periods support
- Holiday and business calendar integration

**System Configuration:**
- Performance evaluation templates
- Goal categories and types
- Rating scale customization (if needed)
- Approval workflow customization
- Meeting templates and guides

#### **📈 Aggregation & Reporting:**

**Quarterly Aggregation:**
- Individual performance summaries
- Department performance trends
- Org-level performance overview
- Goal completion rates
- Culture and skills progress

**Annual Calibration:**
- Department-level performance analysis
- Org-level strategic alignment review
- Performance distribution analysis
- Compensation and promotion recommendations
- Next year strategic planning input

#### **🗄️ Data Management:**
```typescript
// Performance Module Data Structure
interface PerformanceWorkflow {
  cycleId: string;
  period: 'quarterly' | 'annual';
  strategicFoundation: StrategyAnalysis;
  departmentalGoals: DepartmentalGoal[];
  individualGoals: IndividualGoal[];
  cultureGoals: CultureGoal[];
  skillsGoals: SkillsGoal[];
  approvalFlow: ApprovalStatus[];
  meetings: PerformanceMeeting[];
  evaluations: PerformanceEvaluation[];
  aggregation: PerformanceAggregation;
  calibration: CalibrationData;
  status: 'planning' | 'active' | 'evaluation' | 'completed';
}

interface PerformanceEvaluation {
  employeeId: string;
  supervisorId: string;
  goals: EvaluatedGoal[]; // Max 3 total, 1 culture, 2 skills
  overallRating: 1 | 2 | 3 | 4 | 5;
  weightedScore: number;
  feedback: string;
  developmentPlan: string;
  nextCycleGoals: Goal[];
}

interface EvaluatedGoal {
  goalId: string;
  description: string;
  type: 'performance' | 'culture' | 'skills';
  weight: number; // Percentage
  rating: 1 | 2 | 3 | 4 | 5;
  evidence: string;
  feedback: string;
}
```

### **Hiring Module** 
- **Type**: Complete recruitment and hiring system (not just analysis)
- **Triggered by**: Structure analysis recommendations that require adding positions/functions
- **Purpose**: Full recruitment process from talent requisition to position filled
- **Architecture**: Three-Engine AI Agent + Interactive BOT system

#### **🔄 Hiring Module Complete Workflow:**

```
Step 1: Module Activation
Structure Analysis → Recommendations → Position Requirements → Trigger Hiring Module

Step 2: Strategic Understanding  
Three-Engine Agent → Analyzes Client Strategy → Understands Intended Culture
                  → Reviews Industry Context → Company Size Analysis

Step 3: Talent Requisition & Job Creation
Hiring Agent → Creates Talent Requisition → Writes Job Description
            → Based on: Strategy + Industry + Recommendations
            → Manages Approval Flow (Client Admin/HR approval)

Step 4: Job Advertisement Creation & Posting
Approved Requisition → Generate Job Ad → Post to Client Career Page
                    → Post to External Platforms (LinkedIn, Indeed, etc.)
                    → Platform Integration from Client Admin Settings

Step 5: Culture Fit Assessment Creation
Culture Integration → Generate Culture Fit Questions 
                  → Use First 3 Questions from Culture Survey
                  → Prepare Culture Assessment for Applicants

Step 6: Application Management & Assessment
Applicant Applies → BOT Assists Resume Submission → Resume Assessment
                → BOT Assists Culture Assessment → Send to Culture Agent
                → Culture Fit Analysis → Applicant Scoring

Step 7: Shortlisting & Recommendations  
Assessed Applications → Generate Shortlist → Send to Hiring Manager
                    → Send to Client Admin → Compensation Recommendations
                    → Based on Market Analysis + Industry + Company Size

Step 8: Interview Support & Management
Shortlisted Candidates → BOT Assists Hiring Manager Interview Prep
                      → Interview Execution → BOT Assists Feedback Writing
                      → Decision Making → Final Selection

Step 9: Position Fulfillment
Selected Candidate → Offer Management → Onboarding Integration
                 → Position Filled → Module Completion → Analytics Update
```

#### **🤖 Hiring BOT Features:**

**For Applicants:**
- Resume submission guidance and assistance
- Culture assessment completion support
- Application status updates and communication
- FAQ responses about role and company

**For Hiring Managers:**
- Interview preparation assistance
- Question suggestions based on role requirements
- Interview feedback writing support
- Candidate comparison tools
- Decision-making guidance

#### **🔗 Integration Points:**

**With Structure Analysis:**
- Receives position recommendations
- Gets role requirements and reporting structure
- Understands team composition needs

**With Culture Agent:**
- Sends culture assessment responses for analysis
- Receives culture fit scores and insights
- Integrates culture questions from culture survey

**With Client Admin Settings:**
- Accesses recruitment platform integrations
- Uses company branding and messaging
- Applies approval workflows and permissions

#### **📊 Compensation Analysis Engine:**
- **Market Analysis**: Real-time salary data collection
- **Industry Benchmarking**: Industry-specific compensation trends  
- **Company Size Factors**: Compensation scaling based on organization size
- **Role Complexity**: Adjustment based on position requirements
- **Geographic Factors**: Location-based compensation adjustments

#### **🗄️ Data Management:**
```typescript
// Hiring Module Data Structure
interface HiringWorkflow {
  requisitionId: string;
  triggeredBy: StructureRecommendation;
  jobDescription: JobDescription;
  approvalFlow: ApprovalStatus[];
  jobPostings: JobPosting[];
  applications: Application[];
  cultureAssessments: CultureAssessment[];
  shortlist: Candidate[];
  interviews: Interview[];
  compensation: CompensationPackage;
  finalDecision: HiringDecision;
  status: 'active' | 'paused' | 'filled' | 'cancelled';
}
```

**⚠️ PENDING:** Detailed workflows needed for both modules including:
- Trigger conditions and criteria
- Step-by-step processes
- Integration points with core analyses
- User roles and permissions
- Data flows and dependencies

**✅ COMPLETED:** Both Performance and Hiring modules now have complete specifications including:
- Detailed 9-step workflows for each module
- Three-Engine Architecture implementations
- BOT integration systems
- Cross-module integration points
- Complete file architecture
- Database schemas and API structures
- Configuration and settings management

### **Triggered Modules (Activated by Analysis Results):**

#### **LXP Module (Learning Experience Platform)**
- **Type**: Complete gamified learning management system
- **Triggered by**: Skills Analysis (individual skills gaps detected)
- **Purpose**: Gamified learning experiences that provoke behavior change and teach needed skills
- **Architecture**: Three-Engine AI Agent + Interactive BOT system
- **AI Training**: Expert in organizational learning and behavior change theories

#### **🔄 LXP Module Complete Workflow:**

```
Step 1: Module Activation (Trigger from Skills Analysis)
Skills Gap Detected → LXP Module Triggered
                   → Receives: employeeId, skillsGaps[], strategicPriorities
                   → Receives: behaviorChangeTargets from Culture Analysis

Step 2: Strategic Learning Design
LXP Agent → Reads Tenant Strategy → Understands Culture Shaping Goals
         → Analyzes Skills Gaps → Identifies Behavior Change Needs
         → Designs Customized Learning Game

Step 3: Learning Experience Generation
AI Engine → Creates Gamified Learning Experience
         → Multiple Levels (progressive difficulty)
         → Scoring System (engagement and achievement tracking)
         → Behavior Change Provocations (not just knowledge transfer)
         → PC and Mobile Compatible (easy to run on work devices)

Step 4: Learning Deployment
Generated Learning Experience → Employee Dashboard
                             → Employee Notification
                             → Supervisor Notification
                             → Learning Assignment Created

Step 5: Goal Integration
Supervisor Action → Can add Learning Experience to Employee Goals
Employee Action → Can add Learning Experience to Own Goals
             → Integration with Performance Module Goal System
             → Goal Tracking Setup

Step 6: Progress Tracking
Employee Engagement → Level Progression Tracking
                   → Score Recording
                   → Time-on-Task Metrics
                   → Completion Percentage

Step 7: Behavior Change Assessment
Learning Completion → Behavior Metrics Analysis
                   → Skills Application Assessment
                   → Real-World Performance Indicators
                   → Behavior Change Validation

Step 8: Skills Profile Update
Validated Learning → Update Skills Module
                  → Mark Skills as Acquired
                  → Update Competency Levels
                  → Trigger Skills Profile Refresh

Step 9: Reporting & Analytics
Progress Data → Employee Dashboard (personal progress, scores, levels)
            → Supervisor Dashboard (team member progress)
            → Admin Dashboard (tenant-level LXP analytics)
            → Superadmin Dashboard (platform-wide LXP metrics)
```

#### **🎮 Learning Experience Design:**

**Core Characteristics:**
- **Gamified**: Not traditional courses - actual game-based experiences
- **Levels**: Progressive difficulty that adapts to learner performance
- **Scoring**: Points, achievements, leaderboards for engagement
- **Behavior-Focused**: Designed to change behavior, not just convey knowledge
- **Strategic Alignment**: Directly tied to tenant strategy and culture goals
- **Easy to Run**: Works on standard work PCs and mobile devices
- **Sophisticated**: Advanced learning science, but simple user experience

**Learning Game Types:**
- Interactive simulations (decision-making scenarios)
- Problem-solving challenges (critical thinking development)
- Skill practice exercises (competency building)
- Collaboration games (teamwork and communication)
- Leadership scenarios (leadership skill development)

#### **📊 LXP Dashboards:**

**Employee Dashboard:**
- Assigned learning experiences
- Current level and score
- Progress percentage
- Achievements earned
- Learning history
- Skills acquired through LXP
- Goals with integrated learning

**Supervisor Dashboard:**
- Team member learning progress
- Completion rates
- Skills gap closure tracking
- Learning assignment capabilities
- Integration with performance goals
- Team learning analytics

**Admin Dashboard:**
- Tenant-wide LXP metrics
- Learning effectiveness analytics
- Skills gap closure rates
- Behavior change indicators
- ROI on learning investments
- Learning experience library

**Superadmin Dashboard:**
- Platform-wide LXP analytics
- Learning effectiveness across tenants
- Best-performing learning experiences
- Industry benchmarks
- Learning engagement metrics

#### **🔗 LXP Integration Points:**

**With Skills Module:**
- Receives skills gaps for learning design
- Updates employee skills profiles on completion
- Tracks skills acquisition over time
- Validates behavior change through skills application

**With Culture Module:**
- Receives behavior change targets
- Designs experiences aligned with culture goals
- Reports culture-aligned behavior changes
- Supports culture transformation initiatives

**With Performance Module:**
- Integrates learning into performance goals
- Updates goal progress based on learning completion
- Provides learning data for performance evaluations
- Supports development planning

**With Talent Module:**
- Provides learning data for development plans
- Supports succession preparation learning paths
- Tracks high-potential employee development
- Enables targeted capability building

#### **🗄️ LXP Data Management:**
```typescript
// LXP Module Data Structure
interface LXPWorkflow {
  learningExperienceId: string;
  tenantId: string;
  employeeId: string;
  triggeredBy: 'skills_gap' | 'performance_goal' | 'talent_development';
  
  learningDesign: {
    gameType: string;
    levels: LearningLevel[];
    scoringSystem: ScoringConfig;
    behaviorChangeTargets: BehaviorMetric[];
    strategicAlignment: StrategicGoal[];
  };
  
  progress: {
    currentLevel: number;
    totalScore: number;
    completionPercentage: number;
    timeSpent: number;
    lastActivity: Date;
  };
  
  outcomes: {
    skillsAcquired: Skill[];
    behaviorChanges: BehaviorChange[];
    performanceImpact: PerformanceMetric[];
    validationStatus: 'pending' | 'validated' | 'not_validated';
  };
  
  goalIntegration: {
    integratedIntoGoals: boolean;
    performanceGoalId?: string;
    supervisorId?: string;
    goalWeight?: number;
  };
  
  status: 'assigned' | 'in_progress' | 'completed' | 'abandoned';
}

interface LearningLevel {
  levelNumber: number;
  title: string;
  description: string;
  objectives: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  requiredScore: number;
  estimatedTime: number;
  unlocked: boolean;
  completed: boolean;
}
```

---

#### **Talent Module** 
- **Type**: Complete talent management system based on 9-box theory
- **Triggered by**: Performance results (completed performance evaluations)
- **Purpose**: Talent identification, 9-box distribution, succession planning, development plans
- **Architecture**: Three-Engine AI Agent (expert in talent management theories)
- **AI Training**: Expert in 9-box theory, talent development, and succession planning practices

#### **🔄 Talent Module Complete Workflow:**

```
Step 1: Module Activation (Trigger from Performance)
Performance Cycle Complete → Talent Module Triggered
                          → Receives: performanceRatings[], evaluationData[]
                          → Receives: performanceHistory[] for trend analysis

Step 2: 9-Box Framework Configuration
Admin/Superadmin Settings → Load 9-Box Configuration
                         → Customizable Box Names (editable in settings)
                         → Performance Axis (X) and Potential Axis (Y)
                         → Distribution Thresholds

Step 3: Employee Distribution Analysis
Talent Agent → Analyzes Performance Data (current ratings + history)
            → Assesses Potential (from Skills + Culture + Performance trends)
            → Applies 9-Box Algorithm
            → Distributes Employees Across 9 Boxes

Step 4: Talent Pool Identification
9-Box Distribution → Top 3 Boxes Identified as Talent Pool
                  → High Performers + High Potential
                  → Strategic Talent Assets

Step 5: Succession Planning Analysis (Structure Agent Input)
Structure Agent → Provides Position Criticality Analysis
               → Strategic Positions Requiring Succession Plans
Talent Agent → Analyzes Talent Pool Against Critical Positions
            → Calculates Factor Weights for Each Successor Candidate
            → Generates Succession Recommendations

Step 6: Talent Development Plan Creation
Talent Pool Employees → Personalized Development Plans
                     → Leadership Development
                     → Strategic Skill Building
                     → Succession Preparation
                     → Career Path Mapping

Step 7: Performance Development Plans (Underperformers)
Bottom Boxes → Performance Improvement Plans
            → Root Cause Analysis
            → Specific Improvement Actions
            → Timeline and Milestones
            → Support and Resources

Step 8: Career Coaching Assignments (Middle Boxes)
Middle Boxes → Career Coaching Programs (Admin-Managed)
            → Career Goal Setting
            → Skills Development Guidance
            → Performance Enhancement Support
            → Career Path Exploration

Step 9: LXP Integration for Development
Development Plans → Trigger LXP Module
                 → Personalized Learning Paths
                 → Skills Building Experiences
                 → Leadership Development Games

Step 10: Dashboard and Reporting
Talent Data → Admin/Superadmin Dashboard
           → 9-Box Visualization
           → Talent Pool Overview
           → Succession Plan Status
           → Development Plan Tracking
           → Career Coaching Progress
```

#### **🎯 9-Box Theory Implementation:**

**9-Box Grid Structure:**
```
High Potential │ 7. Future Star  │ 8. Star  │ 9. Superstar
               │  (Develop)      │ (Retain) │ (Promote)
────────────────┼─────────────────┼──────────┼───────────────
Medium         │ 4. Growth       │ 5. Core  │ 6. High
Potential      │  (Develop)      │ (Value)  │ Professional
               │                 │          │ (Reward)
────────────────┼─────────────────┼──────────┼───────────────
Low Potential  │ 1. Below        │ 2. Room  │ 3. Specialist
               │  (Exit/PIP)     │ (Coach)  │ (Leverage)
               │                 │          │
               ────────────────────────────────────────────
                  Low              Medium      High
                        PERFORMANCE →
```

**Customizable Box Names:** Admin/Superadmin can rename boxes from settings to match organizational terminology.

**Talent Pool (Top 3 Boxes):**
- Box 7: Future Star (high potential, medium-high performance)
- Box 8: Star (high potential, high performance)
- Box 9: Superstar (high potential, exceptional performance)

**Action:** Talent Development Plans + Succession Planning

**Performance Development (Bottom Boxes):**
- Box 1: Below Expectations (low potential, low performance)
- Box 4: Growth Employee (medium potential, low performance)

**Action:** Performance Improvement Plans

**Career Coaching (Middle Boxes):**
- Box 2: Room for Growth (low potential, medium performance)
- Box 3: Specialist (low potential, high performance - technical expert)
- Box 5: Core Employee (medium potential, medium performance)
- Box 6: High Professional (medium potential, high performance)

**Action:** Career Coaching (Admin-managed programs)

#### **👥 Succession Planning with Factor Weights:**

**Succession Candidate Evaluation Factors:**
1. **Position Criticality to Strategy** (Weight: 25%)
   - How critical is the position to achieving vision/mission/strategy?
   - Impact on organizational success if position is vacant

2. **Performance History** (Weight: 20%)
   - Consistent high performance ratings
   - Performance trend (improving/stable/declining)
   - Track record of goal achievement

3. **Skills Match to Position** (Weight: 20%)
   - Current skills alignment with position requirements
   - Skills gap size and development timeline
   - Technical and leadership competencies

4. **Leadership Potential** (Weight: 15%)
   - Demonstrated leadership capabilities
   - Ability to influence and inspire others
   - Strategic thinking and decision-making

5. **Development Readiness** (Weight: 10%)
   - Timeline to readiness (immediate/6 months/1 year/2+ years)
   - Willingness and motivation to develop
   - Learning agility and adaptability

6. **Tenure and Experience** (Weight: 5%)
   - Organizational knowledge and relationships
   - Industry experience and expertise
   - Cultural alignment and fit

7. **Culture Fit** (Weight: 5%)
   - Alignment with organizational values
   - Culture shaping potential
   - Team and stakeholder relationships

**Succession Recommendation Output:**
```typescript
interface SuccessionRecommendation {
  criticalPosition: {
    positionId: string;
    positionTitle: string;
    criticalityScore: number; // from Structure Agent
    strategicImportance: string;
    currentIncumbent: string;
  };
  
  successorCandidates: SuccessionCandidate[]; // Ranked by total score
  
  recommendations: {
    primarySuccessor: SuccessionCandidate;
    backupSuccessors: SuccessionCandidate[];
    developmentTimeline: string;
    successorPreparationPlan: DevelopmentPlan;
    riskMitigation: RiskFactor[];
  };
}

interface SuccessionCandidate {
  employeeId: string;
  employeeName: string;
  currentPosition: string;
  
  evaluationScores: {
    positionCriticality: { score: number; weight: 0.25 };
    performanceHistory: { score: number; weight: 0.20 };
    skillsMatch: { score: number; weight: 0.20 };
    leadershipPotential: { score: number; weight: 0.15 };
    developmentReadiness: { score: number; weight: 0.10 };
    tenureExperience: { score: number; weight: 0.05 };
    cultureFit: { score: number; weight: 0.05 };
  };
  
  totalScore: number; // Weighted total
  readinessTimeline: 'immediate' | '6_months' | '1_year' | '2_plus_years';
  developmentNeeds: string[];
  strengths: string[];
  gaps: string[];
}
```

#### **🔗 Talent Module Integration Points:**

**With Performance Module:**
- Receives performance ratings and evaluations (triggers module)
- Sends development goals for talent pool
- Sends succession preparation goals
- Tracks performance improvement plan progress

**With Skills Module:**
- Receives skills data for capability assessment
- Uses skills gaps in 9-box placement decisions
- Identifies development needs for talent plans

**With Culture Module:**
- Receives culture fit data for succession planning
- Uses culture alignment in 9-box potential assessment
- Ensures succession candidates align with culture

**With Structure Module:**
- Receives position criticality analysis
- Uses organizational hierarchy for succession planning
- Understands reporting structures for talent placement

**With LXP Module:**
- Triggers learning paths for development plans
- Sends learning priorities for talent pool
- Receives learning completion data for development tracking

#### **🗄️ Talent Module Data Management:**
```typescript
interface TalentWorkflow {
  cycleId: string;
  tenantId: string;
  triggeredBy: 'performance_complete';
  
  nineBoxConfig: {
    customBoxNames: Record<number, string>; // Admin can customize
    performanceThresholds: number[];
    potentialThresholds: number[];
  };
  
  employeeDistribution: {
    box1: string[]; // Employee IDs
    box2: string[];
    box3: string[];
    box4: string[];
    box5: string[];
    box6: string[];
    box7: string[];
    box8: string[];
    box9: string[];
  };
  
  talentPool: {
    employees: string[]; // Boxes 7, 8, 9
    developmentPlans: TalentDevelopmentPlan[];
    successionCandidates: SuccessionCandidate[];
  };
  
  performanceDevelopment: {
    employees: string[]; // Bottom boxes
    improvementPlans: PerformanceImprovementPlan[];
  };
  
  careerCoaching: {
    employees: string[]; // Middle boxes
    coachingAssignments: CoachingAssignment[];
  };
  
  successionPlans: SuccessionPlan[];
  
  status: 'analyzing' | 'plans_generated' | 'active' | 'completed';
}
```

---

#### **Bonus Module**
- **Type**: Automated bonus calculation and distribution system
- **Triggered by**: Performance results (completed performance evaluations)
- **Purpose**: Calculate and distribute performance-based bonuses with role-specific weighting
- **Architecture**: Calculation engine with admin override capabilities
- **Configuration**: Managed through Settings (budget, percentages, weighting rules)

#### **🔄 Bonus Module Complete Workflow:**

```
Step 1: Module Activation (Trigger from Performance)
Performance Cycle Complete → Bonus Module Triggered
                          → Receives: performanceRatings[], employeeRoles[]
                          → Receives: eligibilityStatus per employee

Step 2: Configuration Loading
System → Loads Bonus Configuration from Settings
      → Bonus Budget (total amount from tenant)
      → Bonus Payout Percentage
      → Role-Based Weighting Rules
      → Performance Rating Percentages

Step 3: Company Performance Calculation
Bonus Agent → Calculates Overall Organization Performance
           → Aggregates Department Performance
           → Applies Company-Level Metrics
           → Generates Company Performance Score (%)

Step 4: Eligible Employee Identification
System → Filters Employees by Eligibility Status
      → Excludes: New hires (< X months), terminated, on leave
      → Includes: Active employees with completed evaluations
      → Counts Total Eligible Employees

Step 5: Base Bonus Calculation
Base Bonus per Employee = Total Budget / Number of Eligible Employees

Step 6: Role-Based Weighting Application
FOR EACH Employee:
  IF Role = Leader OR Manager:
    Company Weight = 60%
    Employee Weight = 40%
  ELSE IF Role = Individual Contributor:
    Company Weight = 40%
    Employee Weight = 60%

Step 7: Performance Rating to Percentage Conversion
Rating 5 (Exceeds Expectations)        → 110%
Rating 4 (Nearly Exceeds Expectations) → 105%
Rating 3 (Meets Expectations)          → 100%
Rating 2 (Nearly Meets Expectations)   → 80% (optional)
Rating 1 (Does Not Meet Expectations)  → 0%

Step 8: Individual Bonus Calculation
Employee Bonus = Base Bonus × [
  (Company Performance × Company Weight) +
  (Employee Performance Percentage × Employee Weight)
]

Example for Manager with Rating 4:
  Base = $10,000
  Company Performance = 95%
  Employee Performance = 105% (Rating 4)
  Bonus = $10,000 × [(0.95 × 0.60) + (1.05 × 0.40)]
  Bonus = $10,000 × [0.57 + 0.42]
  Bonus = $10,000 × 0.99 = $9,900

Step 9: Admin Review and Override
Admin Dashboard → Reviews All Bonus Calculations
               → Can Manually Override Any Amount
               → Must Provide Reason for Override
               → System Logs All Overrides

Step 10: Approval Workflow
Calculated Bonuses → Admin Approval
                  → Final Review
                  → Budget Verification
                  → Approval Status Update

Step 11: Distribution Tracking
Approved Bonuses → Distribution Records Created
                → Payment Processing Integration
                → Employee Notifications
                → Distribution Status Tracking

Step 12: Analytics and Reporting
Bonus Data → Admin/Superadmin Dashboard
          → Bonus Distribution Analytics
          → Performance-Bonus Correlation
          → Budget Utilization
          → Historical Trends
```

#### **⚙️ Bonus Configuration (Settings):**

**Admin Settings Page:**
```typescript
interface BonusConfiguration {
  tenantId: string;
  
  budget: {
    totalAmount: number;
    currency: string;
    fiscalYear: string;
  };
  
  payout: {
    payoutPercentage: number; // % of budget to distribute
    reservePercentage: number; // % held in reserve
  };
  
  roleWeighting: {
    leaders: {
      companyWeight: 0.60; // 60%
      employeeWeight: 0.40; // 40%
    };
    managers: {
      companyWeight: 0.60;
      employeeWeight: 0.40;
    };
    individualContributors: {
      companyWeight: 0.40;
      employeeWeight: 0.60;
    };
  };
  
  ratingPercentages: {
    rating5: 1.10; // 110%
    rating4: 1.05; // 105%
    rating3: 1.00; // 100%
    rating2: 0.80; // 80% (optional)
    rating1: 0.00; // 0% (always, unless overridden)
  };
  
  eligibility: {
    minimumTenure: number; // months
    excludeOnLeave: boolean;
    excludeTerminated: boolean;
    excludeNewHires: boolean;
  };
}
```

#### **🔒 Admin Override System:**

**Override Capabilities:**
- Admin can manually adjust ANY bonus amount
- System requires reason for override
- All overrides are logged with:
  - Admin ID
  - Original calculated amount
  - Override amount
  - Reason
  - Timestamp
  - Approval status

**Override Use Cases:**
- Exceptional circumstances not captured in ratings
- Equity adjustments
- Retention bonuses
- Special recognition
- Error corrections

```typescript
interface BonusOverride {
  employeeId: string;
  originalAmount: number;
  overrideAmount: number;
  reason: string;
  overriddenBy: string; // Admin ID
  overrideDate: Date;
  approved: boolean;
  approvedBy?: string;
  approvalDate?: Date;
}
```

#### **🔗 Bonus Module Integration Points:**

**With Performance Module:**
- Receives performance ratings (triggers module)
- Uses employee evaluations for calculations
- References performance cycle data
- Aligns bonus timing with performance cycles

**With Skills Module (Optional):**
- Can incorporate skills achievement bonuses
- Rewards strategic skills acquisition
- Adds skills-based bonus components

**With Culture Module (Optional):**
- Can incorporate culture contribution bonuses
- Rewards culture shaping behaviors
- Adds culture-aligned bonus components

**With Admin/Superadmin Settings:**
- Loads configuration data
- Respects tenant-specific rules
- Applies customized weighting
- Follows eligibility rules

#### **🗄️ Bonus Module Data Management:**
```typescript
interface BonusWorkflow {
  cycleId: string;
  tenantId: string;
  fiscalYear: string;
  triggeredBy: 'performance_complete';
  
  configuration: BonusConfiguration;
  
  companyPerformance: {
    overallScore: number;
    departmentScores: Record<string, number>;
    calculationDate: Date;
  };
  
  eligibleEmployees: {
    total: number;
    byRole: Record<'leader' | 'manager' | 'ic', number>;
    employeeIds: string[];
  };
  
  calculations: BonusCalculation[];
  
  overrides: BonusOverride[];
  
  approval: {
    status: 'pending' | 'approved' | 'rejected';
    reviewedBy?: string;
    reviewDate?: Date;
    comments?: string;
  };
  
  distribution: {
    status: 'pending' | 'processing' | 'completed';
    distributionDate?: Date;
    distributionMethod: string;
    employeeNotifications: boolean;
  };
  
  analytics: {
    totalDistributed: number;
    averageBonus: number;
    budgetUtilization: number;
    distributionByRole: Record<string, number>;
    distributionByRating: Record<string, number>;
  };
  
  status: 'calculating' | 'review' | 'approved' | 'distributed' | 'completed';
}

interface BonusCalculation {
  employeeId: string;
  employeeName: string;
  role: 'leader' | 'manager' | 'individual_contributor';
  performanceRating: 1 | 2 | 3 | 4 | 5;
  
  calculation: {
    baseBonus: number;
    companyPerformance: number;
    companyWeight: number;
    employeePerformance: number;
    employeeWeight: number;
    calculatedAmount: number;
  };
  
  override?: BonusOverride;
  
  finalAmount: number;
  approved: boolean;
}

---

## 🚀 **DEPLOYMENT CONFIGURATION**

### **Vercel Configuration (Frontend)**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['mizan-api.railway.app'],
  },
}

module.exports = nextConfig;
```

### **Railway Configuration (Backend)**
```json
// railway.json
{
  "version": 2,
  "build": {
    "commands": ["npm run build"]
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

### **Environment Variables**
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://mizan-api.railway.app
NEXTAUTH_URL=https://mizan-platform.vercel.app
NEXTAUTH_SECRET=your-secret-key

# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/mizan
JWT_SECRET=your-jwt-secret
PORT=5000
NODE_ENV=production
```

---

## 💬 **CURSOR PROMPTING INSTRUCTIONS**

### **Step 1: Include This Context**
```
Before implementing any feature, read the complete AGENT_CONTEXT_ULTIMATE.md file.
Follow ALL rules and patterns specified in the document.
```

### **Step 2: Feature-Specific Prompting**
```
Implement [FEATURE_NAME] following these requirements:
1. Use Next.js 14 App Router patterns
2. Include tenant isolation with tenantId
3. Use Drizzle ORM for database operations
4. Implement Three-Engine Architecture for AI features
5. Add comprehensive error handling
6. Use TypeScript strict types (no 'any')
7. Follow the design guidelines for styling
8. Include proper authentication/authorization
9. No mock data or placeholders allowed
10. Production-ready code only

Reference the AGENT_CONTEXT_ULTIMATE.md for all implementation details.
```

### **Step 3: Validation Prompting**
```
After implementation, validate that the code:
1. ✅ Follows all file architecture rules
2. ✅ Uses correct tech stack components
3. ✅ Implements proper error handling
4. ✅ Includes tenant isolation
5. ✅ Uses production-ready patterns
6. ✅ Has no mock data or placeholders
7. ✅ Follows design guidelines
8. ✅ Integrates properly with other features

If any rule is violated, fix immediately before proceeding.
```

---

## 🎯 **IMPLEMENTATION CHECKLIST**

Before marking any feature as complete, verify:

### **Code Quality**
- [ ] No 'any' types used
- [ ] All functions have proper TypeScript types
- [ ] Error handling implemented for all async operations
- [ ] No mock data or placeholders
- [ ] No TODO comments without implementation

### **Architecture Compliance**
- [ ] Uses Next.js 14 App Router (not Pages Router)
- [ ] Drizzle ORM used for database operations
- [ ] Three-Engine Architecture for AI features
- [ ] Tenant isolation implemented
- [ ] Proper file structure followed

### **Security & Performance**
- [ ] Authentication/authorization implemented
- [ ] Input validation with Zod schemas
- [ ] SQL injection prevention (Drizzle ORM)
- [ ] Rate limiting on API routes
- [ ] CORS properly configured

### **Integration**
- [ ] Follows design guidelines
- [ ] Integrates with other features
- [ ] Database migrations created
- [ ] Environment variables configured
- [ ] Documentation updated

---

## 📞 **TROUBLESHOOTING**

### **Common Issues & Solutions**

**Issue: Cursor ignores context**
**Solution:** Include the context in EVERY prompt, not just the first one.

**Issue: Mock data appears**
**Solution:** Explicitly state "NO MOCK DATA" in prompts and reference this document.

**Issue: Wrong file paths**
**Solution:** Always specify paths relative to `Mizan-1/` root.

**Issue: Missing tenant isolation**
**Solution:** Remind Cursor to include `tenantId` in all database queries.

**Issue: Incomplete error handling**
**Solution:** Reference the error handling patterns in this document.

---

**🎉 END OF ULTIMATE CONTEXT DOCUMENT**

> This document contains everything needed to implement Mizan Platform features correctly.  
> Always reference this document when prompting Cursor or other AI agents.  
> Update this document as the project evolves.