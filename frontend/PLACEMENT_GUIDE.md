# Mizan Frontend - Page Placement Guide

This guide shows you **exactly where to place** each page you've developed with Claude.

## 📍 Directory Structure Overview

```
/frontend/src/app
├── page.tsx                          # ✅ HOME PAGE (Already placed)
├── layout.tsx                        # Root layout
├── globals.css                       # Global styles
│
├── /(auth)                          # 🔐 Authentication Pages
│   ├── layout.tsx                   # Auth layout (minimal, no nav)
│   ├── /login
│   │   └── page.tsx                 # Login page
│   ├── /register
│   │   └── page.tsx                 # Registration page
│   └── /forgot-password
│       └── page.tsx                 # Password reset
│
├── /(superadmin)                    # 👑 SuperAdmin Portal
│   ├── layout.tsx                   # SuperAdmin layout (with sidebar)
│   ├── /dashboard
│   │   └── page.tsx                 # SuperAdmin Dashboard
│   ├── /clients
│   │   ├── page.tsx                 # All clients list
│   │   └── /[clientId]
│   │       └── page.tsx             # Client details
│   ├── /analytics
│   │   └── page.tsx                 # Platform analytics
│   └── /settings
│       └── page.tsx                 # System settings
│
├── /(admin)                         # 🏢 Admin/Client Portal
│   ├── layout.tsx                   # Admin layout (with navigation)
│   ├── /dashboard
│   │   └── page.tsx                 # Company dashboard
│   ├── /culture
│   │   ├── page.tsx                 # Culture analysis home
│   │   ├── /analyze
│   │   │   └── page.tsx             # Run culture analysis
│   │   └── /reports
│   │       ├── page.tsx             # All culture reports
│   │       └── /[reportId]
│   │           └── page.tsx         # Single report view
│   ├── /skills
│   │   ├── page.tsx                 # Skills analysis home
│   │   └── /analyze
│   │       └── page.tsx             # Run skills analysis
│   ├── /structure
│   │   ├── page.tsx                 # Structure analysis home
│   │   └── /analyze
│   │       └── page.tsx             # Run structure analysis
│   ├── /employees
│   │   ├── page.tsx                 # Employee list
│   │   ├── /add
│   │   │   └── page.tsx             # Add employee
│   │   └── /[employeeId]
│   │       ├── page.tsx             # Employee profile
│   │       ├── /performance
│   │       │   └── page.tsx         # Employee performance
│   │       └── /learning
│   │           └── page.tsx         # Employee learning
│   ├── /hiring
│   │   ├── page.tsx                 # Hiring dashboard
│   │   ├── /requisitions
│   │   │   ├── page.tsx             # All requisitions
│   │   │   └── /[reqId]
│   │   │       └── page.tsx         # Requisition details
│   │   └── /candidates
│   │       ├── page.tsx             # All candidates
│   │       └── /[candidateId]
│   │           └── page.tsx         # Candidate profile
│   ├── /performance
│   │   ├── page.tsx                 # Performance overview
│   │   └── /reviews
│   │       └── page.tsx             # All reviews
│   ├── /learning
│   │   ├── page.tsx                 # LXP admin view
│   │   ├── /courses
│   │   │   ├── page.tsx             # Course catalog
│   │   │   └── /[courseId]
│   │   │       └── page.tsx         # Course details
│   │   └── /paths
│   │       └── page.tsx             # Learning paths
│   └── /settings
│       ├── page.tsx                 # Company settings
│       └── /billing
│           └── page.tsx             # Billing & subscription
│
└── /(employee)                      # 👤 Employee Portal
    ├── layout.tsx                   # Employee layout
    ├── /dashboard
    │   └── page.tsx                 # Employee dashboard
    ├── /learning
    │   ├── page.tsx                 # My learning
    │   ├── /courses
    │   │   ├── page.tsx             # My courses
    │   │   └── /[courseId]
    │   │       └── page.tsx         # Course player
    │   └── /paths
    │       └── page.tsx             # My learning paths
    ├── /performance
    │   ├── page.tsx                 # My performance
    │   ├── /goals
    │   │   └── page.tsx             # My goals
    │   └── /reviews
    │       └── page.tsx             # My reviews
    ├── /profile
    │   ├── page.tsx                 # My profile
    │   └── /skills
    │       └── page.tsx             # My skills
    └── /settings
        └── page.tsx                 # Personal settings
```

## 🎯 How to Place Your Pages

### Step 1: Identify Page Type
Look at your page and determine:
- Who uses it? (SuperAdmin, Admin, or Employee)
- What does it do? (Dashboard, Analysis, Management, etc.)

### Step 2: Find the Right Location
Use the table below:

| Page Description | Place In | URL Will Be |
|------------------|----------|-------------|
| Public landing page | `/src/app/page.tsx` | `/` |
| Login page | `/src/app/(auth)/login/page.tsx` | `/login` |
| SuperAdmin dashboard | `/src/app/(superadmin)/dashboard/page.tsx` | `/dashboard` |
| Admin company dashboard | `/src/app/(admin)/dashboard/page.tsx` | `/dashboard` |
| Employee dashboard | `/src/app/(employee)/dashboard/page.tsx` | `/dashboard` |
| Culture analysis | `/src/app/(admin)/culture/analyze/page.tsx` | `/culture/analyze` |
| Employee courses | `/src/app/(employee)/learning/courses/page.tsx` | `/learning/courses` |
| Hiring candidates | `/src/app/(admin)/hiring/candidates/page.tsx` | `/hiring/candidates` |

### Step 3: Create the File

```bash
# Example: Adding Admin Culture Analysis page
mkdir -p src/app/\(admin\)/culture/analyze
touch src/app/\(admin\)/culture/analyze/page.tsx
```

Then paste your code into that file.

### Step 4: Update Imports

Change from inline code to imports:

**Before:**
```tsx
// All code in one file with inline icons
const StructureIcon = () => { /* svg */ }
```

**After:**
```tsx
'use client';

import { StructureIcon } from '@/components/icons';
import { api } from '@/lib/api-client';
```

## 🔧 Quick Conversion Template

For each page you have, use this template:

```tsx
'use client'; // Add this if your page uses hooks or interactivity

import React from 'react';
// Import icons
import { StructureIcon, CultureIcon } from '@/components/icons';
// Import API client
import { api } from '@/lib/api-client';
// Import UI components as needed
// import { Button } from '@/components/ui/button';

export default function PageName() {
  // Your page code here

  return (
    <div>
      {/* Your JSX */}
    </div>
  );
}
```

## 📋 Checklist for Each Page

When placing a page, ensure:

- [ ] File is in correct location based on user role
- [ ] File is named `page.tsx`
- [ ] Has `'use client'` directive if needed (uses useState, etc.)
- [ ] Imports are updated to use `@/components/icons`
- [ ] Uses `@/lib/api-client` for API calls
- [ ] Uses Tailwind classes with Mizan colors (`text-mizan-primary`, etc.)
- [ ] Has proper TypeScript types
- [ ] Export default function with descriptive name

## 🎨 Using Mizan Design System

Replace inline colors with Tailwind classes:

```tsx
// Before
style={{ color: '#3F3D56' }}

// After
className="text-mizan-primary"
```

Available colors:
- `text-mizan-primary` - #3F3D56 (deep charcoal)
- `text-mizan-secondary` - #545454 (medium gray)
- `bg-mizan-gold` - #CCA404 (signature gold)
- `bg-mizan-background` - #FAFAFA (light background)

## 📁 Example: Placing a Culture Analysis Page

Let's say you have a Culture Analysis page. Here's how to place it:

1. **Determine**: Admin users run culture analysis
2. **Location**: `/src/app/(admin)/culture/analyze/page.tsx`
3. **Create**:
```bash
mkdir -p src/app/\(admin\)/culture/analyze
```

4. **Add file** `page.tsx`:
```tsx
'use client';

import React, { useState } from 'react';
import { CultureIcon } from '@/components/icons';
import { api } from '@/lib/api-client';

export default function CultureAnalyze() {
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const tenantId = 'tenant-123'; // Get from auth context
      const result = await api.culture.analyze(tenantId, {
        /* analysis data */
      });
      console.log('Analysis result:', result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-mizan-primary mb-6">
        Culture Analysis
      </h1>
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="px-6 py-3 bg-mizan-gold text-white rounded-full"
      >
        {loading ? 'Analyzing...' : 'Start Analysis'}
      </button>
    </div>
  );
}
```

5. **Access**: Navigate to `/culture/analyze` (when logged in as admin)

## 🚀 Next Steps

1. Share your next page
2. I'll tell you exactly where it goes
3. We'll place it together
4. Connect it to the backend API
5. Test the integration

---

**Questions?** Just paste your page code and ask "Where does this go?" and I'll place it for you! 🎯
