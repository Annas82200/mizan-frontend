# Mizan Dashboard Development - Complete Roadmap

## 🎯 OVERVIEW: 3 Dashboard Types

After login, users are routed to one of three dashboards based on their role:

1. **Superadmin Dashboard** - Platform-wide analytics, tenant management, **FULL MODULE ACCESS**
2. **Admin Dashboard** - Company-level insights, team management
3. **Employee Dashboard** - Personal growth, performance, team view

## 🚨 IMPORTANT UPDATES

### Superadmin Complete Feature Set
**IMPORTANT**: Superadmin has **100% functionality** to ALL platform features:

#### Core Platform Management:
- ✅ **Client Management & Configuration** - Add/edit/delete tenants, configure settings
- ✅ **Platform Analytics & Monitoring** - System-wide metrics, performance, usage analytics
- ✅ **Trigger Engine Management** - Automated workflows, event-based actions
- ✅ **Framework Configuration (7 Cylinders)** - Global and per-tenant framework settings
- ✅ **AI Training Center Access** - Model management, training workflows, AI configuration

#### Full Module Access (100% Functionality):
- ✅ All 6 modules (Structure, Culture, Skills, Performance, Hiring, LXP)
- ✅ Full CRUD operations on all data
- ✅ Ability to run analyses on ANY tenant's data
- ✅ View and manage all workflows
- ✅ Access to all features that Admin/Employee have, PLUS cross-tenant operations

---

## 🏗️ PHASE 1: Foundation & Architecture

### Task 1.1: Dashboard Layout System
- [ ] Create shared `DashboardLayout.tsx` component with:
  - Top navbar (logo, user dropdown, notifications)
  - Sidebar navigation (collapsible on mobile)
  - Main content area (responsive grid)
  - Footer (minimal)
- [ ] Build `Sidebar.tsx` component with role-based menu items
- [ ] Create `TopNavbar.tsx` with user profile dropdown
- [ ] Design 4 responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (1024-1440px), wide (> 1440px)

**Files to create**:
- `/frontend/src/components/dashboard/DashboardLayout.tsx`
- `/frontend/src/components/dashboard/Sidebar.tsx`
- `/frontend/src/components/dashboard/TopNavbar.tsx`

### Task 1.2: Shared Dashboard Components
- [ ] `StatCard.tsx` - Display metrics (e.g., "Entropy Score: 42")
  - Props: title, value, icon, trend (up/down), color
  - Hover effects, smooth transitions
- [ ] `ChartWrapper.tsx` - Container for all chart types
  - Integration with Recharts library
  - Loading states, error handling
- [ ] `TableComponent.tsx` - Data table with sorting/filtering
  - Pagination support
  - Export to CSV functionality
- [ ] `LoadingSpinner.tsx` - Consistent loading state
- [ ] `EmptyState.tsx` - When no data exists yet
- [ ] `NotificationBell.tsx` - Real-time notification dropdown

**Files to create**:
- `/frontend/src/components/dashboard/StatCard.tsx`
- `/frontend/src/components/dashboard/ChartWrapper.tsx`
- `/frontend/src/components/dashboard/TableComponent.tsx`
- `/frontend/src/components/dashboard/LoadingSpinner.tsx`
- `/frontend/src/components/dashboard/EmptyState.tsx`
- `/frontend/src/components/dashboard/NotificationBell.tsx`

### Task 1.3: Routing & Auth Protection
- [ ] Set up React Router with protected routes
- [ ] Create `ProtectedRoute.tsx` wrapper that checks:
  - If user is logged in (has valid token)
  - If user has permission for that dashboard
  - Redirects to login if not authenticated
- [ ] Store user role in localStorage after login
- [ ] Create logout function that clears token + redirects

**Files to create**:
- `/frontend/src/components/ProtectedRoute.tsx`
- `/frontend/src/hooks/useAuth.ts`

### Task 1.4: Backend API Integration Setup
- [x] Already exists: `/frontend/src/lib/api-client.ts` - Axios instance with base URL
- [x] Already has: Authentication header interceptor
- [x] Already has: Response interceptor for 401 errors
- [ ] Enhance existing API services with dashboard endpoints

**Note**: Backend API client is already set up! Just need to add dashboard-specific endpoints.

---

## 👑 PHASE 2: Superadmin Dashboard
**(Platform owner view - manages all tenants + FULL MODULE ACCESS)**

### Task 2.1: Superadmin Home Page
**Route**: `/dashboard/superadmin`

#### Sections:
- [ ] Hero Stats (4 cards across top)
  - Total Tenants (companies using Mizan)
  - Total Users (across all tenants)
  - Monthly Recurring Revenue (MRR)
  - Platform Health Score (uptime, performance)

- [ ] Tenant Overview Table
  - Columns: Company Name, Plan, Employees, MRR, Status, Last Active
  - Actions: View Details, Upgrade Plan, Suspend Account
  - Search & filter by plan, status, date joined

- [ ] Revenue Chart
  - Line chart showing MRR growth over last 12 months
  - Toggle between MRR, ARR, churn rate

- [ ] Recent Activity Feed
  - New tenant signups, plan upgrades/downgrades
  - Support tickets opened, system alerts

#### Backend Endpoints Needed:
```typescript
GET /api/superadmin/stats - Platform-wide metrics
GET /api/superadmin/tenants - All companies
GET /api/superadmin/revenue - Financial data
GET /api/superadmin/activity - Recent events
```

### Task 2.2: Tenant Management Page
**Route**: `/dashboard/superadmin/tenants`

- [ ] Tenant List View with bulk actions
- [ ] Tenant Detail Page (click on a tenant)
  - Company info, subscription details, usage metrics
  - Admin users list, billing history, activity logs
  - Actions: Edit plan, impersonate, suspend/reactivate

#### Backend Endpoints:
```typescript
GET /api/superadmin/tenants/:id - Single tenant details
PUT /api/superadmin/tenants/:id - Update tenant
POST /api/superadmin/tenants/:id/impersonate - Login as tenant admin
```

### Task 2.3: Client/Tenant Management & Configuration
**Route**: `/dashboard/superadmin/clients`

- [ ] **Add New Client/Tenant** functionality with form
  - Company information, plan selection, billing details
  - Initial admin user setup
  - Framework configuration (7 Cylinders)
- [ ] **Tenant Configuration Management**
  - Edit company settings, subscription plans
  - Framework customization per tenant
  - Feature flags & permissions
- [ ] **Client Status Management**
  - Activate, suspend, or delete tenants
  - Impersonate tenant admin for support
  - Monitor tenant health & usage

### Task 2.4: Platform Analytics & Monitoring
**Route**: `/dashboard/superadmin/analytics`

- [ ] **System-Wide Metrics Dashboard**
  - Platform uptime & performance
  - API response times & error rates
  - Database performance metrics
- [ ] **Usage Analytics**
  - DAU/WAU/MAU across all tenants
  - Feature adoption rates
  - Module usage statistics
- [ ] **AI Agent Analytics**
  - Agent usage by tenant
  - Completion times & success rates
  - Cost per analysis

### Task 2.5: Trigger Engine Management
**Route**: `/dashboard/superadmin/triggers`

- [ ] **Trigger Configuration Dashboard**
  - View all automated triggers across platform
  - Create/edit/delete trigger rules
  - Monitor trigger execution logs
- [ ] **Workflow Automation**
  - Set up automated workflows
  - Configure event-based actions
  - Schedule recurring tasks

### Task 2.6: Framework Configuration (7 Cylinders)
**Route**: `/dashboard/superadmin/framework`

- [ ] **7-Cylinder Configuration**
  - Global framework settings
  - Customize framework per tenant
  - Version management & updates
- [ ] **Framework Library**
  - Best practices repository
  - Template configurations
  - Industry-specific presets

### Task 2.7: AI Training Center Access
**Route**: `/dashboard/superadmin/ai-training`

- [ ] **AI Model Management**
  - View all AI models & versions
  - Training data management
  - Model performance metrics
- [ ] **Training Workflows**
  - Initiate new training runs
  - Monitor training progress
  - Deploy updated models
- [ ] **AI Configuration**
  - Prompt engineering interface
  - Fine-tuning parameters
  - Quality assurance & testing

### Task 2.8: **CRITICAL** - Superadmin Full Module Access
**Routes**:
- `/dashboard/superadmin/structure`
- `/dashboard/superadmin/culture`
- `/dashboard/superadmin/skills`
- `/dashboard/superadmin/performance`
- `/dashboard/superadmin/hiring`
- `/dashboard/superadmin/lxp`

#### Requirements:
- [ ] **Tenant Selector** dropdown at top of each module page
- [ ] Run analyses on ANY tenant's data
- [ ] View all historical analyses across all tenants
- [ ] Full CRUD on all module data
- [ ] All features that Admin has, PLUS cross-tenant views

#### Backend Endpoints (extend existing with superadmin access):
```typescript
// Structure Module
POST /api/superadmin/structure/analyze?tenantId=xxx
GET /api/superadmin/structure/reports?tenantId=xxx

// Culture Module
POST /api/superadmin/culture/analyze?tenantId=xxx
GET /api/superadmin/culture/reports?tenantId=xxx

// Skills Module
POST /api/superadmin/skills/analyze?tenantId=xxx
GET /api/superadmin/skills/reports?tenantId=xxx

// Performance Module
GET /api/superadmin/performance/goals?tenantId=xxx
POST /api/superadmin/performance/reviews?tenantId=xxx

// Hiring Module
GET /api/superadmin/hiring/requisitions?tenantId=xxx
POST /api/superadmin/hiring/candidates?tenantId=xxx

// LXP Module
GET /api/superadmin/lxp/courses?tenantId=xxx
POST /api/superadmin/lxp/enroll?tenantId=xxx
```

### Task 2.9: Billing & Revenue Page
**Route**: `/dashboard/superadmin/billing`

- [ ] Revenue Dashboard (MRR breakdown, churn rate, LTV)
- [ ] Invoices Table (all invoices, retry failed payments)
- [ ] Subscription Changes Log
- [ ] Payment reconciliation & reports

---

## 🏢 PHASE 3: Admin Dashboard
**(Company admin view - manages their organization)**

### Task 3.1: Admin Home Page
**Route**: `/dashboard/admin`

- [ ] Key Metrics (6 cards): Entropy Score, Culture Alignment, Skills Gap, etc.
- [ ] 7-Cylinder Health Visualization
- [ ] Recent Analyses table
- [ ] AI-generated Action Items/Recommendations

### Task 3.2: Structure Analysis Page
**Route**: `/dashboard/admin/structure`

- [ ] CSV upload for org chart
- [ ] HRIS integration buttons
- [ ] Interactive org chart visualization
- [ ] Entropy report with download

### Task 3.3: Culture Analysis Page
**Route**: `/dashboard/admin/culture`

- [ ] Launch culture survey
- [ ] 7-Cylinder breakdown
- [ ] Culture trends over time
- [ ] Values alignment map

### Task 3.4: Skills Analysis Page
**Route**: `/dashboard/admin/skills`

- [ ] Skills inventory
- [ ] Capability gaps analysis
- [ ] Skills matrix heat map
- [ ] Learning path recommendations

### Task 3.5: Team Management Page
**Route**: `/dashboard/admin/team`

- [ ] Employee directory with search/filter
- [ ] Add new employee (form + bulk CSV)
- [ ] Org structure editor (drag-drop)
- [ ] Permissions management

### Task 3.6: Performance Management Page
**Route**: `/dashboard/admin/performance`

- [ ] Performance overview & distribution
- [ ] Review cycles scheduler
- [ ] Goals dashboard (company → team → individual)
- [ ] 1:1 meeting tracker

### Task 3.7: Settings Page
**Route**: `/dashboard/admin/settings`

- [ ] Company profile
- [ ] Subscription & billing
- [ ] Integrations (HRIS, SSO/SAML, API keys)
- [ ] Notifications preferences
- [ ] Data export & privacy

---

## 👤 PHASE 4: Employee Dashboard
**(Individual employee view - personal growth & contribution)**

### Task 4.1: Employee Home Page
**Route**: `/dashboard/employee`

- [ ] Welcome header with today's agenda
- [ ] My Metrics (4 cards): Alignment, Skills Progress, Recognition, Goals
- [ ] 7-Cylinder personal profile
- [ ] Upcoming actions

### Task 4.2: My Profile Page
**Route**: `/dashboard/employee/profile`

- [ ] Personal information & photo
- [ ] Reporting structure
- [ ] Skills & certifications
- [ ] Work preferences

### Task 4.3: My Growth Page
**Route**: `/dashboard/employee/growth`

- [ ] Skills development with progress bars
- [ ] Learning paths & recommendations
- [ ] Career path progression
- [ ] Achievements & badges

### Task 4.4: My Performance Page
**Route**: `/dashboard/employee/performance`

- [ ] Goals dashboard (OKRs)
- [ ] Performance history & trends
- [ ] Feedback received (360, recognition)
- [ ] 1:1 notes with manager

### Task 4.5: My Team Page
**Route**: `/dashboard/employee/team`

- [ ] Team members overview
- [ ] Team health metrics
- [ ] Recognition board
- [ ] Team calendar

---

## 🔧 PHASE 5: Technical Implementation

### Task 5.1: State Management
- [ ] Choose: React Context + useReducer OR Redux Toolkit
- [ ] Set up global state for: auth, dashboard data caching, notifications
- [ ] Create custom hooks: `useAuth()`, `useDashboardData()`, `useAnalytics()`

### Task 5.2: Data Fetching & Caching
- [ ] Install React Query (TanStack Query)
- [ ] Set up query client with caching strategy
- [ ] Create query hooks for each endpoint

### Task 5.3: Real-time Updates
- [ ] Set up WebSocket connection for notifications
- [ ] Create notification system (toast + bell)

### Task 5.4: Charts & Visualizations
- [ ] Install Recharts library
- [ ] Create reusable chart components (Line, Bar, Pie, Radar, HeatMap)
- [ ] Add chart interactions (tooltips, drill-down, export)

### Task 5.5: Forms & Validation
- [ ] Install React Hook Form + Zod
- [ ] Create form components (inputs, file upload, date picker)
- [ ] Set up validation schemas

### Task 5.6: Permissions & Access Control
- [ ] Create `usePermissions()` hook
- [ ] Define permission matrix (Superadmin > Admin > Employee)
- [ ] Implement UI & API-level checks

### Task 5.7: Error Handling & Loading States
- [ ] Create error boundary component
- [ ] Add loading skeletons for all pages
- [ ] Handle API errors gracefully
- [ ] Log errors to monitoring service

### Task 5.8: Testing
- [ ] Set up Jest + React Testing Library
- [ ] Write unit tests for components
- [ ] Write integration tests for flows
- [ ] Set up E2E tests with Cypress

---

## 📱 PHASE 6: Mobile Responsiveness
- [ ] Mobile-specific sidebar (bottom navigation)
- [ ] Optimize charts for mobile
- [ ] Scrollable tables on mobile
- [ ] Pull-to-refresh functionality
- [ ] Touch interactions & swipe gestures

---

## 🎨 PHASE 7: Polish & Optimization
- [ ] Code splitting by route
- [ ] Lazy load charts/heavy components
- [ ] Optimize images (WebP format)
- [ ] Virtual scrolling for long lists
- [ ] Accessibility (a11y) - ARIA labels, keyboard nav, screen reader
- [ ] Dark mode (optional)

---

## 🚀 PHASE 8: Deployment
- [ ] Set up environment variables for production
- [ ] Configure Vercel deployment
- [ ] Set up CI/CD pipeline
- [ ] Configure custom domain
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Google Analytics or Plausible)
- [ ] Monitor Core Web Vitals

---

## 📝 PHASE 9: Documentation
- [ ] Developer README with setup instructions
- [ ] Document folder structure & API integration
- [ ] Component storybook (optional)
- [ ] User guides for each dashboard
- [ ] Video tutorials (optional)
- [ ] In-app tooltips/help

---

## ✅ Definition of Done Checklist
For each dashboard page, it's "done" when:
- [ ] All API endpoints are integrated and working
- [ ] Loading states are implemented
- [ ] Error handling is in place
- [ ] Mobile responsive
- [ ] Matches design (colors, fonts, spacing)
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Code reviewed
- [ ] Deployed to staging
- [ ] User tested (if possible)

---

## 📅 Estimated Timeline

- **Phase 1-2** (Foundation + Superadmin): 3-4 weeks
- **Phase 3** (Admin Dashboard): 4-5 weeks
- **Phase 4** (Employee Dashboard): 2-3 weeks
- **Phase 5-8** (Technical + Polish): 2-3 weeks

**Total: ~12-15 weeks for full completion**

---

## 🎯 Priority Order (if time is limited)

1. ✅ **Phase 1** - Foundation (must do first)
2. ✅ **Phase 3** - Admin Dashboard (most important for customers)
3. ✅ **Phase 4** - Employee Dashboard (second priority)
4. ✅ **Phase 2** - Superadmin Dashboard (can build last, BUT with full module access)

---

## 🔑 Key Technical Decisions

### Stack Confirmation:
- ✅ **Frontend**: Next.js 14 App Router + React + TypeScript
- ✅ **Styling**: Tailwind CSS (Mizan design system)
- ✅ **API Client**: Axios (already set up in `/lib/api-client.ts`)
- ✅ **State**: React Query for server state, Context for UI state
- ✅ **Charts**: Recharts
- ✅ **Forms**: React Hook Form + Zod
- ✅ **Testing**: Jest + React Testing Library + Cypress

### File Structure:
```
/frontend/src
├── /app
│   ├── /dashboard
│   │   ├── /superadmin
│   │   │   ├── page.tsx                    # Home ✅
│   │   │   ├── /tenants/page.tsx           # Tenant list view
│   │   │   ├── /clients/page.tsx           # Add/manage clients (NEW)
│   │   │   ├── /analytics/page.tsx         # Platform analytics & monitoring
│   │   │   ├── /triggers/page.tsx          # Trigger engine management (NEW)
│   │   │   ├── /framework/page.tsx         # 7-Cylinder configuration (NEW)
│   │   │   ├── /ai-training/page.tsx       # AI Training Center (NEW)
│   │   │   ├── /billing/page.tsx           # Revenue & billing
│   │   │   ├── /structure/page.tsx         # Structure module - full access
│   │   │   ├── /culture/page.tsx           # Culture module - full access
│   │   │   ├── /skills/page.tsx            # Skills module - full access
│   │   │   ├── /performance/page.tsx       # Performance module - full access
│   │   │   ├── /hiring/page.tsx            # Hiring module - full access
│   │   │   └── /lxp/page.tsx               # LXP module - full access
│   │   ├── /admin
│   │   │   ├── page.tsx                    # Home
│   │   │   ├── /structure/page.tsx
│   │   │   ├── /culture/page.tsx
│   │   │   ├── /skills/page.tsx
│   │   │   ├── /team/page.tsx
│   │   │   ├── /performance/page.tsx
│   │   │   └── /settings/page.tsx
│   │   └── /employee
│   │       ├── page.tsx                    # Home
│   │       ├── /profile/page.tsx
│   │       ├── /growth/page.tsx
│   │       ├── /performance/page.tsx
│   │       └── /team/page.tsx
├── /components
│   ├── /dashboard                          # Shared dashboard components
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopNavbar.tsx
│   │   ├── StatCard.tsx                    # ✅ Created
│   │   ├── ChartWrapper.tsx                # ✅ Created
│   │   ├── TableComponent.tsx              # ✅ Created
│   │   ├── LoadingSpinner.tsx              # ✅ Created
│   │   ├── EmptyState.tsx                  # ✅ Created
│   │   ├── NotificationBell.tsx
│   │   └── index.ts                        # ✅ Created
│   ├── ProtectedRoute.tsx
│   └── /icons                              # Already exists
├── /hooks
│   ├── useAuth.ts
│   ├── usePermissions.ts
│   └── useDashboardData.ts
├── /lib
│   └── api-client.ts                       # Already exists!
└── /types
    └── dashboard.ts                        # Dashboard-specific types
```

---

## 🚦 Next Steps

1. **Review & Confirm**: Confirm this roadmap aligns with your vision
2. **Start Phase 1**: Begin with DashboardLayout and shared components
3. **Backend Coordination**: Ensure backend team adds superadmin module endpoints
4. **Design Assets**: Get Figma designs for dashboard layouts (if available)
5. **Set Sprint Goals**: Break this into 2-week sprints

**Ready to start building!** 🚀
