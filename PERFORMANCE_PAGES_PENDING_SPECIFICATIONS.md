# Performance Module - Pages Requiring Specifications

This document outlines the three Performance Module pages that require detailed specifications before implementation. These pages were identified during Phase 2 implementation of the Mizan Platform.

---

## 📋 Summary

The following pages require user specifications before production-ready implementation:

1. **Performance Evaluations Page** (`/dashboard/performance/evaluations`)
2. **1:1 Meetings Page** (`/dashboard/performance/meetings`)
3. **Performance Calibration Page** (`/dashboard/performance/calibration`)

All three pages have complete database schemas and backend support but lack UI/UX specifications and business logic requirements.

---

## 1. Performance Evaluations Page

**Route**: `/dashboard/performance/evaluations`
**Database Table**: `performanceEvaluations` (implemented)
**Backend Support**: Partial (schema ready, API endpoints need completion)

### Current Status
- ✅ Database schema fully implemented with all necessary fields
- ✅ Relationships with performance cycles, reviews, and goals established
- ❌ Frontend page not implemented (requires specifications)
- ❌ API endpoints for CRUD operations not implemented

### Database Schema Available
The `performanceEvaluations` table includes:
- Meeting scheduling and management
- Pre-meeting preparation tracking
- Agenda and discussion points
- Ratings and scores (goal achievement, competency, behavior)
- Action items and development objectives
- Employee agreement and signatures
- BOT assistance integration
- Attachment support

### Specifications Needed

**User Experience Questions:**
1. **View/List Mode**: How should evaluations be displayed to users?
   - List view with filters (status, date, type)?
   - Calendar view showing scheduled evaluations?
   - Dashboard cards with summary metrics?

2. **Creation Workflow**: What is the step-by-step flow for scheduling an evaluation?
   - Single-page form or multi-step wizard?
   - Auto-populate from employee goals?
   - Template selection for different evaluation types?

3. **Evaluation Meeting Interface**: What happens during the actual evaluation meeting?
   - Real-time collaboration between manager and employee?
   - Offline mode for note-taking?
   - Integration with video conferencing tools?

4. **Pre-Meeting Preparation**: How do users prepare?
   - Guided preparation workflow?
   - Self-assessment forms?
   - Goals review interface?

5. **Post-Meeting Actions**: What happens after the evaluation?
   - Automated action item tracking?
   - Development plan creation?
   - Follow-up scheduling?

6. **Permissions and Visibility**: Who can see what?
   - Can employees view evaluations before completion?
   - Can HR access all evaluations?
   - Department head visibility?

---

## 2. 1:1 Meetings Page (One-on-One Pulse Checks)

**Route**: `/dashboard/performance/meetings`
**Database Table**: `oneOnOneMeetings` (implemented)
**Backend Support**: Partial (schema ready, API endpoints need completion)

### Current Status
- ✅ Database schema fully implemented with comprehensive fields
- ✅ Distinction from performance evaluations established (regular pulse checks vs formal reviews)
- ❌ Frontend page not implemented (requires specifications)
- ❌ API endpoints for CRUD operations not implemented

### Database Schema Available
The `oneOnOneMeetings` table includes:
- Meeting scheduling and tracking
- Preparation notes for both employee and manager
- Agenda with suggested topics
- Meeting notes and outcomes
- Action items and follow-up
- Performance and feedback discussion
- Satisfaction ratings
- Integration outputs (engagement, recognition, development needs)

### Specifications Needed

**User Experience Questions:**
1. **Meeting Scheduling**: How are 1:1s scheduled?
   - Recurring meeting templates?
   - Auto-scheduling based on frequency preferences?
   - Calendar integration?

2. **Preparation Interface**: How do users prepare for 1:1s?
   - Guided agenda builder?
   - Topic suggestions from BOT?
   - Review of previous action items?

3. **Meeting Modes**: How are meetings conducted?
   - Live collaborative note-taking?
   - Separate employee/manager views during meeting?
   - Post-meeting summary generation?

4. **Action Item Management**: How are action items tracked?
   - Dedicated action item board?
   - Integration with task management?
   - Automatic reminders and follow-ups?

5. **Meeting History**: How is history displayed?
   - Timeline view of all past 1:1s?
   - Search and filter capabilities?
   - Trend analysis (satisfaction over time)?

6. **Frequency and Cadence**: How is meeting frequency managed?
   - Per-employee customization?
   - Team-wide defaults?
   - Automatic rescheduling logic?

---

## 3. Performance Calibration Page

**Route**: `/dashboard/performance/calibration`
**Database Table**: `performanceCalibrations` (implemented)
**Backend Support**: Partial (schema ready, API endpoints need completion)

### Current Status
- ✅ Database schema fully implemented for calibration sessions
- ✅ Support for ratings, rankings, and distribution calibration types
- ❌ Frontend page not implemented (requires specifications)
- ❌ API endpoints for CRUD operations not implemented

### Database Schema Available
The `performanceCalibrations` table includes:
- Calibration session management
- Participant and facilitator tracking
- Department inclusion
- Rating adjustments and ranking results
- Distribution targets and actual distribution
- Discussion notes and decisions
- Escalation tracking
- Analytics (employees calibrated, ratings changed, effectiveness score)

### Specifications Needed

**User Experience Questions:**
1. **Calibration Session Setup**: How do managers/HR initiate calibration?
   - Department selection interface?
   - Participant invitation workflow?
   - Distribution target configuration?

2. **Calibration Meeting Interface**: What does the calibration session look like?
   - Side-by-side employee comparison?
   - Drag-and-drop ranking interface?
   - Real-time distribution visualization?
   - Discussion and note-taking features?

3. **Calibration Types**: How are different calibration methods handled?
   - **Ratings**: Adjust individual ratings to match distribution curve?
   - **Rankings**: Stack-rank employees within a group?
   - **Distribution**: Force-distribution (e.g., 20-70-10 model)?

4. **Consensus Building**: How is agreement reached?
   - Voting mechanisms?
   - Facilitator override capabilities?
   - Escalation workflow for disagreements?

5. **Pre-Calibration Preparation**: What data is reviewed beforehand?
   - Individual performance summaries?
   - Goals achievement overview?
   - Previous calibration results?

6. **Post-Calibration Actions**: What happens after calibration?
   - Automated notification to affected employees?
   - Final rating updates to performance reviews?
   - Calibration report generation?

7. **Permissions and Access**: Who can participate?
   - Manager-only sessions?
   - HR facilitation required?
   - Skip-level manager participation?

---

## 🔧 Technical Requirements (Already Implemented)

### Backend Infrastructure Ready
All three pages have complete backend support:

1. **Database Schemas**: Production-ready with all necessary fields, relationships, and constraints
2. **TypeScript Types**: Fully typed interfaces exported from schema
3. **Database Relationships**:
   - Links to performance cycles
   - Links to employees and managers
   - Links to performance reviews (where applicable)

### Missing Components

**For All Three Pages:**
1. Frontend React components (`page.tsx` files)
2. API route handlers (`/api/performance/evaluations`, `/api/performance/meetings`, `/api/performance/calibration`)
3. UI/UX specifications and wireframes
4. Business logic requirements
5. User stories and acceptance criteria

---

## 📝 Recommended Next Steps

### Phase 1: Requirements Gathering
1. **User Interviews**: Interview HR managers, department managers, and employees to understand:
   - Current performance evaluation processes
   - 1:1 meeting practices and pain points
   - Calibration session workflows (if any)

2. **Competitive Analysis**: Review how other platforms handle:
   - Performance evaluation workflows (Lattice, CultureAmp, 15Five)
   - 1:1 meeting management (Fellow, Soapbox)
   - Calibration sessions (Workday, SAP SuccessFactors)

3. **Wireframe Design**: Create mockups for:
   - List/dashboard views
   - Create/edit forms
   - Meeting/session interfaces
   - Mobile-responsive layouts

### Phase 2: Specification Documentation
Create detailed specifications including:
1. User stories with acceptance criteria
2. Screen-by-screen UI specifications
3. API endpoint definitions
4. Permission matrices
5. Data validation rules
6. Error handling scenarios
7. Notification triggers

### Phase 3: Implementation
1. Build API endpoints following Mizan patterns (tenant isolation, TypeScript types, error handling)
2. Implement frontend pages with production-ready standards (zero TODOs, zero placeholders)
3. Add comprehensive error handling
4. Implement loading states and optimistic updates
5. Add unit and integration tests

---

## ⚠️ Important Notes

### Production-Ready Standards Apply
When specifications are provided and implementation begins, all code must meet Mizan's production-ready standards:

- ✅ Zero TODO comments
- ✅ Zero mock/placeholder data
- ✅ Zero `any` types in TypeScript
- ✅ Complete error handling
- ✅ Proper tenant isolation on all database queries
- ✅ Loading states and user feedback
- ✅ Responsive design
- ✅ Accessibility compliance

### Database Migrations Required
Before implementing these pages in production:
1. Run database migrations to create the tables
2. Ensure proper indexes for performance
3. Set up foreign key constraints
4. Test with sample data

### Integration Points
Consider integration with:
- **Calendar systems** (Google Calendar, Outlook) for meeting scheduling
- **Notification system** for reminders and alerts
- **Email templates** for meeting invites and summaries
- **Video conferencing** (Zoom, Teams) for remote meetings
- **Document storage** for meeting notes and attachments

---

## 📞 Contact

For questions about these pages or to provide specifications, please contact the Mizan development team.

**Database Schemas Location**: `/backend/db/schema/performance.ts`
**Existing Implementations**: See `/frontend/src/app/dashboard/performance/` for working examples (Dashboard, Goals, BOT, Settings)

---

**Last Updated**: January 2, 2026
**Status**: Awaiting User Specifications
**Phase 2 Completion**: 4/7 pages implemented (57%)
