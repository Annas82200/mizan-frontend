# CLAUDE CODE ENFORCEMENT RULES - MIZAN PROJECT

## ⛔ ABSOLUTE PROHIBITIONS - VIOLATION = IMMEDIATE STOP

### 1. NO FAKE DATA - EVER
- **NEVER** create `const mock*`, `const fake*`, `const dummy*`, `const sample*` arrays
- **NEVER** use `setTimeout` to simulate API delays
- **NEVER** hardcode employee names, job titles, course names, or any business data
- **NEVER** use comments like "in production this would..." or "simulated data"

### 2. NO PLACEHOLDER IMPLEMENTATIONS
- **NEVER** return empty arrays `[]` as stub responses
- **NEVER** create functions that just return `{ success: true }` without real logic
- **NEVER** skip API integration with the excuse of "will implement later"

### 3. NO LIES OR EXAGGERATIONS
- **NEVER** claim something is "100% production ready" unless verified
- **NEVER** mark a task as complete if it uses mock data
- **NEVER** hide implementation gaps

---

## ✅ MANDATORY REQUIREMENTS FOR ALL CODE

### Frontend Pages MUST:
1. Import and use `apiClient` from `@/lib/api-client`
2. Make REAL API calls: `apiClient.get('/api/...')`, `apiClient.post('/api/...')`
3. Handle loading states with real API responses
4. Handle errors from real API failures
5. Display data retrieved from the backend database

### Backend Routes MUST:
1. Connect to real database using Drizzle ORM
2. Perform actual CRUD operations
3. Return real data from database queries
4. Have proper error handling with meaningful messages

### Before Marking ANY Task Complete:
1. Verify NO mock data exists in the file
2. Verify real API calls are made
3. Verify the build passes
4. Verify the feature works with real backend

---

## 🔍 VERIFICATION CHECKLIST (MUST CHECK BEFORE EVERY COMMIT)

Run these checks manually:

```bash
# Check for mock data patterns (MUST return 0 results)
grep -r "const mock" frontend/src/app/dashboard/
grep -r "setTimeout.*resolve.*[0-9]00" frontend/src/app/dashboard/
grep -r "Simulated data" frontend/src/app/dashboard/
grep -r "// TODO" frontend/src/app/dashboard/
grep -r "placeholder" frontend/src/app/dashboard/
```

If ANY of these return results, the code is NOT production ready.

---

## 📋 CURRENT PROJECT STATUS (UPDATE AFTER EACH SESSION)

### Frontend API Integration Status:
- [ ] /dashboard/bonus/* - NOT CONNECTED (uses mock data)
- [ ] /dashboard/talent/* - NOT CONNECTED (uses mock data)
- [ ] /dashboard/lxp/* - NOT CONNECTED (uses mock data)
- [ ] /dashboard/hiring/* - NOT CONNECTED (uses mock data)
- [ ] /dashboard/performance/* - NOT CONNECTED (uses mock data)
- [ ] /dashboard/skills/* - NOT CONNECTED (uses mock data)
- [ ] /dashboard/culture/* - PARTIAL (some real API calls)
- [ ] /dashboard/superadmin/* - PARTIAL (some real API calls)

### Backend Route Status:
- [x] /api/bonus - IMPLEMENTED
- [x] /api/talent - IMPLEMENTED (5 endpoints)
- [ ] /api/lxp - STUBS ONLY (needs real implementation)
- [x] /api/skills - IMPLEMENTED (30+ endpoints)
- [x] /api/performance - IMPLEMENTED (8 endpoints)
- [x] /api/culture-assessment - IMPLEMENTED (12 endpoints)
- [x] /api/hiring - IMPLEMENTED (via analyses route)

### Database Schema Status:
- [ ] Bonus tables (pools, criteria, allocations) - MISSING
- [ ] Talent tables (succession_plans, development_plans) - MISSING
- [x] LXP tables - COMPLETE
- [x] Hiring tables - COMPLETE
- [x] Performance tables - COMPLETE
- [x] Culture tables - COMPLETE
- [x] Skills tables - COMPLETE

---

## 🚨 IF PREVIOUS SESSION CREATED FAKE CODE

1. STOP and audit ALL code created
2. List every file with mock data
3. Replace mock data with real API calls
4. Verify with backend that endpoints exist
5. Create missing endpoints if needed
6. Update this STATUS section

---

## API CLIENT USAGE (REQUIRED PATTERN)

```typescript
// CORRECT - Real API call
import { apiClient } from '@/lib/api-client';

const loadData = async () => {
  setIsLoading(true);
  try {
    const response = await apiClient.get('/api/talent/analytics');
    setData(response.data);
  } catch (error) {
    setError('Failed to load data');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

// WRONG - Fake data (NEVER DO THIS)
const loadData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); // ❌ FAKE
  const mockData = [...]; // ❌ FAKE
  setData(mockData); // ❌ FAKE
};
```

---

## CONSEQUENCES OF VIOLATIONS

If Claude Code creates fake implementations:
1. User will audit and find them
2. Trust will be lost
3. Time and money will be wasted
4. The project will fail

**THERE IS NO EXCUSE FOR FAKE DATA. EVER.**
