# Mizan Frontend

Modern, responsive frontend for the Mizan AI-powered HR platform built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
/frontend
├── /public                 # Static assets
├── /src
│   ├── /app               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── globals.css    # Global styles
│   │   ├── /(superadmin)  # SuperAdmin routes
│   │   ├── /(admin)       # Admin/Client routes
│   │   └── /(employee)    # Employee routes
│   ├── /components        # Reusable components
│   │   ├── /ui            # UI components
│   │   ├── /icons         # Custom SVG icons
│   │   ├── /navigation    # Navigation components
│   │   └── /sections      # Page sections
│   ├── /lib               # Utilities
│   │   ├── api-client.ts  # Backend API client
│   │   └── utils.ts       # Helper functions
│   ├── /types             # TypeScript types
│   ├── /hooks             # Custom React hooks
│   └── /contexts          # React contexts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Design System

### Brand Colors
- **Primary**: `#3F3D56` (Deep charcoal)
- **Secondary**: `#545454` (Medium gray)
- **Gold**: `#CCA404` (Signature gold)
- **Background**: `#FAFAFA` (Light background)

### Typography
- **Headings**: Playfair Display
- **Body**: Inter

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:3001` (configurable via `NEXT_PUBLIC_API_URL`).

### API Client Usage

```typescript
import { api } from '@/lib/api-client';

// Example: Login
const response = await api.auth.login(email, password);

// Example: Get culture reports
const reports = await api.culture.getReports(tenantId);
```

### Available API Methods

- **Auth**: `login`, `register`, `logout`, `me`
- **Culture**: `analyze`, `getReport`, `getReports`
- **Skills**: `analyze`, `getReport`, `getReports`
- **Performance**: `getGoals`, `createGoal`, `getReviews`
- **Hiring**: `getRequisitions`, `getCandidates`, `assessCandidate`
- **LXP**: `getCourses`, `enrollCourse`, `getLearningPaths`
- **Admin**: `getClients`, `getClientDetails`
- **SuperAdmin**: `getAllClients`, `createClient`

## 📄 Page Placement Guide

### Where to Place Your Pages

| Page Type | Location | Example |
|-----------|----------|---------|
| **Public Pages** | `/src/app/` | Landing page, Pricing, Blog |
| **Auth Pages** | `/src/app/(auth)/` | Login, Register, Forgot Password |
| **SuperAdmin** | `/src/app/(superadmin)/` | System Dashboard, All Clients |
| **Admin/Client** | `/src/app/(admin)/` | Company Dashboard, Employees |
| **Employee** | `/src/app/(employee)/` | My Dashboard, My Learning |

### Route Groups (Folders with parentheses)
- `(superadmin)` - SuperAdmin portal
- `(admin)` - Client/Admin portal
- `(employee)` - Employee portal
- `(auth)` - Authentication pages

These folders don't appear in the URL but help organize code and apply layouts.

## 🛠️ Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom + shadcn/ui
- **Icons**: Lucide React + Custom SVGs
- **HTTP Client**: Axios
- **State Management**: Zustand (when needed)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Animations**: Framer Motion

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Add remaining pages** from your Claude development
3. **Connect pages to backend APIs**
4. **Test authentication flow**
5. **Implement role-based routing**

## 📝 Adding New Pages

### Example: Adding Admin Dashboard

1. Create route folder:
```bash
mkdir -p src/app/\(admin\)/dashboard
```

2. Create page file:
```typescript
// src/app/(admin)/dashboard/page.tsx
'use client';

import { api } from '@/lib/api-client';

export default function AdminDashboard() {
  // Your dashboard code
  return <div>Admin Dashboard</div>;
}
```

3. Access at: `/dashboard` (when logged in as admin)

## 🔐 Authentication

Authentication is handled through the API client. Tokens are stored in localStorage and automatically attached to requests.

```typescript
import { api, setAuthToken } from '@/lib/api-client';

// Login
const { data } = await api.auth.login(email, password);
setAuthToken(data.token);

// Logout
clearAuthToken();
```

## 🎨 Using Custom Icons

```typescript
import { StructureIcon, CultureIcon, SkillsIcon } from '@/components/icons';

<StructureIcon className="w-10 h-10" color="#3F3D56" />
```

## 📞 Support

For questions or issues, refer to the main project documentation or contact the development team.

---

**Built with ❤️ for Mizan Platform**
