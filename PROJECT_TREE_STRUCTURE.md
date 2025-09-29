# MIZAN PLATFORM - COMPLETE PROJECT TREE STRUCTURE

## 📁 ROOT DIRECTORY
```
Mizan-1/
├── 📄 package.json                    # Main project dependencies
├── 📄 package-lock.json              # Dependency lock file
├── 📄 next.config.js                 # Next.js configuration
├── 📄 postcss.config.js              # PostCSS configuration
├── 📄 tailwind.config.js             # Tailwind CSS configuration
├── 📄 tsconfig.json                  # TypeScript configuration
├── 📄 Dockerfile                     # Main Docker configuration
├── 📄 DEPLOY.md                      # Deployment documentation
├── 📄 VERCEL_ENV.md                  # Vercel environment docs
├── 📁 public/                        # Static assets
│   └── 📄 mizan-framework-updated.json
├── 📁 backend/                       # Backend server (Railway deployed)
└── 📁 src/                          # Frontend application (Vercel deployed)
```

## 🖥️ FRONTEND (src/)
```
src/
├── 📁 app/                          # Next.js App Router
│   ├── 📄 layout.tsx                # Root layout
│   ├── 📄 page.tsx                  # Home page
│   ├── 📄 globals.css               # Global styles
│   ├── 📄 providers.tsx             # Context providers
│   ├── 📁 api/                      # API routes
│   │   └── 📁 superadmin/
│   │       └── 📁 clients/
│   │           └── 📁 [clientId]/
│   │               ├── 📄 route.ts
│   │               ├── 📁 analyze/
│   │               │   └── 📄 route.ts
│   │               ├── 📁 data/
│   │               │   └── 📄 route.ts
│   │               ├── 📁 surveys/
│   │               │   └── 📄 route.ts
│   │               └── 📁 upload/
│   │                   └── 📄 route.ts
│   ├── 📁 superadmin/               # Superadmin system
│   │   ├── 📄 page.tsx              # Superadmin dashboard (RESTORED)
│   │   ├── 📁 clients/              # Client management
│   │   │   └── 📁 [clientId]/
│   │   │       └── 📄 page.tsx      # Individual client page
│   │   └── 📁 data-management/
│   │       └── 📄 page.tsx          # Data management page
│   ├── 📁 admin/                    # Admin pages
│   │   ├── 📄 page.tsx
│   │   ├── 📁 dashboard/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 culture-report/
│   │       └── 📄 page.tsx
│   ├── 📁 auth/                     # Authentication
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 register/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 forgot-password/
│   │       └── 📄 page.tsx
│   ├── 📁 client/                   # Client dashboard
│   │   ├── 📁 dashboard/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 data-collection/
│   │       └── 📄 page.tsx
│   ├── 📁 employee/                 # Employee pages
│   │   ├── 📄 page.tsx
│   │   ├── 📁 dashboard/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 culture-survey/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 culture-results/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 culture-onboarding/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 survey/
│   │       └── 📄 page.tsx
│   ├── 📁 companies/                # Company pages
│   │   ├── 📄 page.tsx
│   │   ├── 📁 about/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 pricing/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 demo/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 blog/
│   │       └── 📄 page.tsx
│   ├── 📁 culture/                  # Culture analysis
│   │   └── 📁 reports/
│   │       └── 📄 page.tsx
│   ├── 📁 entry/                    # Entry points
│   │   ├── 📄 page.tsx
│   │   └── 📁 structure-landing/
│   │       └── 📄 page.tsx
│   ├── 📁 hiring/                   # Hiring module
│   │   └── 📄 page.tsx
│   ├── 📁 individuals/              # Individual assessments
│   │   └── 📄 page.tsx
│   ├── 📁 assessment/               # Assessment pages
│   │   └── 📁 [id]/
│   │       └── 📄 page.tsx
│   ├── 📁 dashboard/                # Main dashboard
│   │   └── 📄 page.tsx
│   ├── 📁 payment/                  # Payment pages
│   │   └── 📄 page.tsx
│   ├── 📁 pricing/                  # Pricing pages
│   │   └── 📄 page.tsx
│   ├── 📁 pro/                      # Pro features
│   │   └── 📁 culture-landnig/
│   │       └── 📄 page.tsx
│   ├── 📁 request-demo/             # Demo requests
│   │   └── 📄 page.tsx
│   ├── 📁 privacy/                  # Privacy policy
│   │   └── 📄 page.tsx
│   ├── 📁 terms/                    # Terms of service
│   │   └── 📄 page.tsx
│   └── 📁 test-*/                   # Test pages
│       ├── 📄 test-all-services/page.tsx
│       ├── 📄 test-complete-culture/page.tsx
│       └── 📄 test-culture/page.tsx
├── 📁 components/                   # Reusable components
│   ├── 📄 action-modules.tsx
│   ├── 📄 automated-flow-status.tsx
│   ├── 📄 engagement-pulse.tsx
│   ├── 📄 icons.tsx
│   ├── 📄 navigation.tsx
│   ├── 📁 charts/                   # Chart components
│   │   ├── 📄 cylinder-radar.tsx
│   │   ├── 📄 cylinder-radar-enhanced.tsx
│   │   ├── 📄 entropy-gauge.tsx
│   │   └── 📄 value-comparison.tsx
│   ├── 📁 hiring/                   # Hiring components
│   │   ├── 📄 candidate-detail.tsx
│   │   ├── 📄 candidate-pipeline.tsx
│   │   ├── 📄 culture-assessment.tsx
│   │   ├── 📄 interview-scheduler.tsx
│   │   ├── 📄 job-posting-manager.tsx
│   │   └── 📄 requisition-form.tsx
│   ├── 📁 icons/                    # Icon components
│   │   ├── 📄 index.tsx
│   │   ├── 📄 mizan-custom-icons.tsx
│   │   └── 📄 mizan-icons.tsx
│   └── 📁 ui/                       # UI components
│       ├── 📄 alert.tsx
│       ├── 📄 avatar.tsx
│       ├── 📄 badge.tsx
│       ├── 📄 button.tsx
│       ├── 📄 card.tsx
│       ├── 📄 label.tsx
│       ├── 📄 mizan-logo-animation.tsx
│       ├── 📄 progress.tsx
│       ├── 📄 radio-group.tsx
│       ├── 📄 select.tsx
│       ├── 📄 slider.tsx
│       ├── 📄 switch.tsx
│       ├── 📄 tabs.tsx
│       ├── 📄 textarea.tsx
│       └── 📄 use-toast.ts
├── 📁 contexts/                     # React contexts
│   ├── 📄 auth.tsx                  # Authentication context
│   └── 📄 client-context.tsx        # Client management context
├── 📁 hooks/                        # Custom React hooks
│   ├── 📄 useActionModules.ts
│   ├── 📄 useAnalysis.ts
│   ├── 📄 useAssessment.ts
│   ├── 📄 useAutomation.ts
│   ├── 📄 useCultureAssessment.ts
│   ├── 📄 useCultureReports.ts
│   ├── 📄 useHiring.ts
│   └── 📄 useTenant.ts
├── 📁 lib/                          # Utility libraries
│   ├── 📄 api-client.ts             # API client
│   ├── 📄 auth.ts                   # Authentication utilities
│   ├── 📄 theme.ts                  # Theme utilities
│   ├── 📄 utils.ts                  # General utilities
│   └── 📁 api/                      # API functions
│       ├── 📄 analyses.ts
│       ├── 📄 automation.ts
│       ├── 📄 client.ts
│       ├── 📄 dashboard.ts
│       ├── 📄 entry.ts
│       ├── 📄 modules.ts
│       └── 📄 tenant.ts
└── 📁 styles/                       # Styles
    └── 📄 mizan-colors.css          # Mizan color scheme
```

## 🖥️ BACKEND (backend/)
```
backend/
├── 📄 package.json                  # Backend dependencies
├── 📄 package-lock.json            # Backend dependency lock
├── 📄 tsconfig.json                # Backend TypeScript config
├── 📄 Dockerfile                   # Backend Docker config
├── 📄 index.ts                     # Main server file
├── 📄 index-simple.ts              # Railway deployment file
├── 📄 server.js                    # Alternative server
├── 📄 minimal-server.js            # Minimal server
├── 📄 test-auth.js                 # Auth testing
├── 📄 mizan-framework-updated.json # Framework data
├── 📄 drizzle.config.ts            # Database config
├── 📁 db/                          # Database
│   ├── 📄 client.ts                # DB client
│   ├── 📄 index.ts                 # DB index
│   ├── 📄 schema.ts                # Main schema
│   └── 📁 schema/                  # Schema modules
│       ├── 📄 agents.ts
│       ├── 📄 audit.ts
│       ├── 📄 benchmarking.ts
│       ├── 📄 core.ts
│       ├── 📄 culture.ts
│       ├── 📄 learning.ts
│       ├── 📄 performance.ts
│       ├── 📄 skills.ts
│       ├── 📄 strategy.ts
│       └── 📄 triggers.ts
├── 📁 middleware/                  # Middleware
│   ├── 📄 auth.ts                  # Authentication middleware
│   └── 📄 tenant.ts                # Tenant middleware
├── 📁 routes/                      # API routes
│   ├── 📄 admin.ts                 # Admin routes
│   ├── 📄 agents.ts                # Agent routes
│   ├── 📄 analyses.ts              # Analysis routes
│   ├── 📄 auth.ts                  # Auth routes
│   ├── 📄 billing.ts               # Billing routes
│   ├── 📄 consulting.ts            # Consulting routes
│   ├── 📄 culture-assessment.ts    # Culture assessment routes
│   ├── 📄 employee.ts              # Employee routes
│   ├── 📄 entry.ts                 # Entry routes
│   ├── 📄 hris.ts                  # HRIS routes
│   ├── 📄 modules.ts               # Module routes
│   ├── 📄 orchestrator.ts          # Orchestrator routes
│   ├── 📄 superadmin.ts            # Superadmin routes
│   └── 📄 upload.ts                # Upload routes
├── 📁 scripts/                     # Scripts
│   ├── 📄 migrate.ts               # Database migration
│   └── 📄 seed.ts                  # Database seeding
└── 📁 services/                    # Business logic services
    ├── 📄 auth.ts                  # Authentication service
    ├── 📄 email.ts                 # Email service
    ├── 📄 logger.ts                # Logging service
    ├── 📄 queue.ts                 # Queue service
    ├── 📄 socialmedia.ts           # Social media service
    ├── 📄 stripe.ts                # Payment service
    ├── 📁 agents/                  # AI Agents
    │   ├── 📄 agent-manager.ts     # Agent manager
    │   ├── 📄 benchmarking-agent.ts
    │   ├── 📄 culture-agent.ts
    │   ├── 📄 engagement-agent.ts
    │   ├── 📄 performance-agent.ts
    │   ├── 📄 recognition-agent.ts
    │   ├── 📄 skills-agent.ts
    │   ├── 📄 structure-agent.ts
    │   └── 📁 base/                # Base agent classes
    │       ├── 📄 base-agent.ts
    │       └── 📄 three-engine-agent.ts
    ├── 📁 ai-providers/            # AI Provider integrations
    │   ├── 📄 claude.ts            # Anthropic Claude
    │   ├── 📄 cohere.ts            # Cohere
    │   ├── 📄 ensemble.ts          # Ensemble AI
    │   ├── 📄 gemini.ts            # Google Gemini
    │   ├── 📄 mistral.ts           # Mistral AI
    │   ├── 📄 openai.ts            # OpenAI
    │   ├── 📄 router.ts            # AI Router
    │   └── 📄 types.ts             # AI Types
    ├── 📁 data/                    # Data services
    │   ├── 📄 seed.ts              # Data seeding
    │   └── 📄 store.ts             # Data storage
    ├── 📁 hiring/                  # Hiring services
    │   ├── 📄 culture-fit-assessor.ts
    │   ├── 📄 hiring-module.ts
    │   ├── 📄 interview-bot.ts
    │   ├── 📄 job-posting-generator.ts
    │   └── 📄 job-publishers.ts
    ├── 📁 hris/                    # HRIS integration
    │   └── 📄 index.ts
    ├── 📁 lxp/                     # Learning Experience Platform
    │   └── 📄 pipeline.ts
    ├── 📁 orchestrator/            # AI Orchestration
    │   └── 📄 architect-ai.ts
    ├── 📁 reports/                 # Report generation
    │   └── 📄 structure-report.ts
    ├── 📁 results/                 # Results processing
    │   ├── 📄 trigger-engine.ts
    │   └── 📄 unified-results.ts
    ├── 📁 social-media/            # Social media services
    │   ├── 📄 campaign-manager.ts
    │   ├── 📄 content-generator.ts
    │   ├── 📄 init.ts
    │   ├── 📄 scheduler.ts
    │   └── 📁 platforms/           # Platform integrations
    │       ├── 📄 facebook.ts
    │       ├── 📄 instagram.ts
    │       ├── 📄 linkedin.ts
    │       └── 📄 twitter.ts
    └── 📁 workflow/                # Workflow automation
        └── 📄 automated-flow.ts
```

## 🚀 DEPLOYMENT STRUCTURE
```
Production Environment:
├── Frontend: https://www.mizan.work (Vercel)
├── Backend: https://mizan-backend-production.up.railway.app (Railway)
├── Database: PostgreSQL (Railway)
└── Domain: Custom domain configured

Development Environment:
├── Frontend: http://localhost:3000
├── Backend: http://localhost:3001
└── Database: Local PostgreSQL
```

## 📊 KEY FEATURES BY DIRECTORY

### **Frontend Features**
- **Superadmin System**: Complete client management and dashboard
- **Individual Client Pages**: Detailed client management with analysis
- **API Routes**: Frontend API handlers for client operations
- **Components**: Reusable UI components and charts
- **Contexts**: State management for clients and authentication
- **Hooks**: Custom React hooks for various functionalities

### **Backend Features**
- **API Routes**: Complete REST API for all operations
- **AI Agents**: Full AI agent system with multiple providers
- **Database**: Complete schema and data management
- **Services**: Business logic for all platform features
- **Middleware**: Authentication and tenant management
- **Scripts**: Database migration and seeding

## 🔧 CONFIGURATION FILES
```
Root Level:
├── package.json              # Frontend dependencies
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.js        # PostCSS configuration
└── Dockerfile               # Docker configuration

Backend Level:
├── package.json             # Backend dependencies
├── tsconfig.json           # Backend TypeScript configuration
├── drizzle.config.ts       # Database configuration
└── Dockerfile              # Backend Docker configuration
```

## 📁 FILE COUNT SUMMARY
- **Total Frontend Files**: ~150+ files
- **Total Backend Files**: ~100+ files
- **Configuration Files**: ~10 files
- **Documentation Files**: ~5 files
- **Total Project Files**: ~265+ files

## 🎯 CRITICAL FILES FOR DEVELOPMENT

### **Frontend Critical Files**
1. `src/app/superadmin/page.tsx` - Main superadmin dashboard
2. `src/app/superadmin/clients/[clientId]/page.tsx` - Individual client pages
3. `src/contexts/client-context.tsx` - Client state management
4. `src/app/api/superadmin/` - API route handlers

### **Backend Critical Files**
1. `backend/index-simple.ts` - Main server file (Railway deployment)
2. `backend/routes/superadmin.ts` - Superadmin API routes
3. `backend/routes/entry.ts` - Analysis API routes
4. `backend/services/agents/` - AI agent implementations

### **Configuration Critical Files**
1. `package.json` - Frontend dependencies
2. `backend/package.json` - Backend dependencies
3. `next.config.js` - Next.js configuration
4. `tailwind.config.js` - Styling configuration

This tree structure represents the complete Mizan platform with all implemented features, configurations, and deployment setup.
