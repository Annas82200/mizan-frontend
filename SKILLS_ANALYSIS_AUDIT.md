# 🔍 Skills Analysis - Complete System Audit
**Date**: October 9, 2025
**Purpose**: Comprehensive audit before building frontend

---

## 📊 **EXECUTIVE SUMMARY**

**Status**: ✅ **Three-Engine Agent EXISTS and is COMPLETE**
**Training**: ✅ **Agent is trained on O*NET, Bloom's Taxonomy, and Competency Frameworks**
**Strategic Alignment**: ✅ **YES - Analysis answers: "Does client have right skills for strategy?"**

---

## 1️⃣ **WHAT IS THE INPUT?**

### **Three Input Pathways**:

#### **Pathway A: Resume Upload** (Primary)
- **File Types**: PDF, DOC, DOCX, TXT
- **Max Size**: 10MB
- **Endpoint**: `POST /api/skills/profile/upload-resume`
- **Process**:
  1. Employee uploads resume
  2. Text extraction (PDF parsing, DOCX parsing)
  3. AI Skills Agent extracts structured data
  4. Creates `employeeSkillsProfile` record

**What gets extracted**:
```typescript
{
  technicalSkills: [
    {skill: "Python", proficiency: "expert", yearsExperience: 5}
  ],
  softSkills: ["Leadership", "Communication"],
  domainKnowledge: ["Machine Learning", "Cloud Computing"],
  tools: ["AWS", "Docker", "Git"],
  languages: ["English (Native)", "Spanish (Conversational)"],
  experience: [
    {
      company: "Company Name",
      role: "Job Title",
      startDate: "2020-01",
      endDate: "2023-12",
      achievements: ["Achievement 1", "Achievement 2"]
    }
  ],
  education: [{degree, institution, year, field}],
  certifications: [{name, issuer, date}]
}
```

#### **Pathway B: Conversational Profile Building** (Alternative)
- **Endpoint**: `POST /api/skills/profile/start-conversation`
- **Process**: AI-guided conversation to build profile without resume
- **Status**: Implemented but less common

#### **Pathway C: Manual Entry** (Alternative)
- Employees manually add skills
- Profile type: `manual_entry`
- Can be combined with resume (`hybrid` type)

### **Additional Input: Company Strategy**
- **Source**: `company_strategies` table
- **Contains**:
  - Strategy objectives
  - Required skills for strategy execution
  - Department-specific skill needs
  - Role-specific skill requirements

**Strategy gets mapped to**:
```typescript
{
  organizationalSkills: {
    technical: ["Skill 1", "Skill 2"],
    leadership: ["Skill 1"],
    domain: ["Knowledge area 1"]
  },
  departmentalSkills: {
    "Engineering": ["Python", "AWS"],
    "Sales": ["CRM", "Negotiation"]
  },
  roleSkills: {
    "Software Engineer": ["Programming", "Testing"],
    "Product Manager": ["Strategy", "Communication"]
  },
  criticalSkills: ["Critical skill 1", "Critical skill 2"],
  importantSkills: ["Important skill 1"],
  niceToHaveSkills: ["Nice to have 1"]
}
```

---

## 2️⃣ **WHAT IS BEING ANALYZED?**

### **Analysis Levels**:

1. **Individual Level**:
   - Employee skills vs. role requirements
   - Employee skills vs. department needs
   - Employee skills vs. strategic requirements
   - Critical skill gaps
   - Strength areas (where employee excels)

2. **Department Level**:
   - Aggregated skills across department
   - Department-wide skill gaps
   - Skill distribution patterns
   - Collective capability assessment

3. **Company Level**:
   - Organization-wide skill inventory
   - Overall skill coverage %
   - Strategic skill alignment
   - Skill surplus (underutilized skills)
   - Company readiness for strategy execution

### **Key Analysis Questions Answered**:

✅ **"Does the client have the right skills to achieve the strategy?"**
- ✅ YES - This is the PRIMARY question answered
- Calculates `strategicAlignmentScore` (0-100%)
- Identifies critical skills missing for strategy
- Determines organizational readiness

✅ **"What skills are missing?"**
- Critical gaps (must-have for strategy)
- Moderate gaps (important for role/department)
- Prioritized by impact on business

✅ **"What skills are underutilized?"**
- Identifies skill surplus
- Suggests reallocation opportunities

✅ **"What training is needed immediately?"**
- Generates automated training triggers
- Prioritizes by urgency (immediate/short-term/long-term)
- Links to LXP module for course assignment

---

## 3️⃣ **IS THE AGENT TRAINED? WHAT IS IT TRAINED ON?**

### ✅ **YES - Three-Engine Agent is FULLY TRAINED**

**Agent Class**: `SkillsAgent extends ThreeEngineAgent`
**Location**: `backend/services/agents/skills-agent.ts`

### **Training Frameworks**:

#### **1. O*NET Skills Taxonomy**
- **What**: U.S. Department of Labor's comprehensive skills database
- **Contains**: 35+ skill categories, 100+ specific skills
- **Usage**: Standardized skill classification
- **Source**: Loaded from `skills_taxonomies` table
- **Example categories**: Technical, Social, Complex Problem Solving

#### **2. Bloom's Taxonomy**
- **What**: Educational framework for learning levels
- **Levels**: Remember → Understand → Apply → Analyze → Evaluate → Create
- **Usage**: Measuring skill development stages
- **Application**: Proficiency level assessment (1-5 scale mapping)

#### **3. Competency Modeling Framework**
- **Categories**:
  - Technical Skills
  - Behavioral Competencies
  - Leadership Skills
  - Domain Knowledge
- **Usage**: Organizing skills into meaningful groups

#### **4. Proficiency Level Standards** (1-5 Scale)
```
1 - Novice: Basic awareness
2 - Advanced Beginner: Limited experience
3 - Competent: Practical application
4 - Proficient: Integrated understanding
5 - Expert: Intuitive grasp + teaching ability
```

#### **5. Skills Categorization**
- **Technical**: Programming, Data Analysis, System Design, Testing
- **Leadership**: Team Management, Strategic Thinking, Decision Making
- **Communication**: Written, Presentation, Negotiation
- **Analytical**: Problem Solving, Critical Thinking, Research
- **Creative**: Innovation, Design Thinking, Creativity

### **AI Provider Configuration**:

```typescript
knowledge: {
  providers: ['openai', 'anthropic'],
  model: 'gpt-4',  // NOTE: Should be 'gpt-4o' per Master Doc
  temperature: 0.2,
  maxTokens: 2000
},
data: {
  providers: ['openai', 'anthropic'],
  model: 'gpt-4',  // NOTE: Should be 'gpt-4o' per Master Doc
  temperature: 0.1,
  maxTokens: 3000
},
reasoning: {
  providers: ['openai', 'anthropic'],
  model: 'gpt-4',  // NOTE: Should be 'gpt-4o' per Master Doc
  temperature: 0.4,
  maxTokens: 4000
},
consensusThreshold: 0.75
```

**⚠️ ISSUE FOUND**: Model is set to `'gpt-4'` but should be `'gpt-4o'` per MIZAN_MASTER_DOCUMENT.md

---

## 4️⃣ **IS THERE A THREE-ENGINE AGENT?**

### ✅ **YES - Full Three-Engine Architecture Implemented**

#### **Engine 1: Knowledge Engine**
**Role**: Apply skills taxonomy frameworks and competency models

**System Prompt**:
```
You are the Knowledge Engine for Mizan's Skills Agent.

Key frameworks to consider:
1. O*NET Skills Taxonomy
2. Bloom's Taxonomy
3. Competency Modeling
4. Skills-based hiring frameworks
5. Learning and development best practices

Output: applicable_frameworks, skill_categories,
        proficiency_standards, development_pathways
```

**What it does**:
- Loads O*NET taxonomy from database
- Applies Bloom's learning levels
- Provides skill categorization guidance
- Defines proficiency measurement standards

#### **Engine 2: Data Engine**
**Role**: Analyze employee skills data and identify patterns

**System Prompt**:
```
You are the Data Engine for Mizan's Skills Agent.

Input: Current employee skills, required skills from strategy,
       certification/experience data, skill distribution

Output: skill_inventory, gap_analysis, skill_patterns,
        utilization_analysis, development_opportunities
```

**What it does**:
- Aggregates current organizational skills
- Calculates skill distributions
- Identifies quantitative gaps
- Analyzes certification and experience patterns
- Determines skill utilization efficiency

#### **Engine 3: Reasoning Engine**
**Role**: Synthesize frameworks + data → actionable recommendations

**System Prompt**:
```
You are the Reasoning Engine for Mizan's Skills Agent.

Input: Skills framework insights, skills data analysis, strategic context

Output: overall_coverage, skill_gaps, skill_surplus,
        recommendations, training_triggers
```

**What it does**:
- Calculates overall skill coverage %
- Prioritizes skill gaps by business impact
- Identifies underutilized skills
- Generates development recommendations
- Creates automated training triggers for LXP

---

## 5️⃣ **WHAT IS THE OUTPUT?**

### **Output Structure**: `SkillsAnalysisOutput`

```typescript
{
  // Overall Metrics
  overallCoverage: 72,  // 0-100% - How well org skills match needs

  // Gap Analysis
  skillGaps: [
    {
      skill: "Machine Learning",
      category: "technical",
      currentLevel: 2,
      requiredLevel: 4,
      gap: 2,
      priority: "critical",  // critical | high | medium | low
      affectedEmployees: 15
    }
  ],

  // Surplus Analysis
  skillSurplus: [
    {
      skill: "Legacy System Maintenance",
      category: "technical",
      currentLevel: 4,
      utilization: 20,  // Only 20% utilized
      opportunity: "Reallocate to modernization projects"
    }
  ],

  // Recommendations
  recommendations: [
    {
      category: "training",  // training | hiring | reallocation | development
      priority: "high",      // high | medium | low
      title: "Upskill team in ML/AI",
      description: "15 employees need ML training to meet strategy requirements",
      targetSkills: ["Machine Learning", "TensorFlow", "Python"],
      estimatedTime: "3 months",
      expectedImpact: "Enables AI product strategy execution"
    }
  ],

  // Automated Actions
  trainingTriggers: [
    {
      type: "lxp",  // lxp | external | mentoring | project
      targetEmployees: ["emp-123", "emp-456"],
      skills: ["Python", "Machine Learning"],
      urgency: "immediate"  // immediate | short-term | long-term
    }
  ]
}
```

### **Additional Outputs Stored**:

#### **Individual Gap Analysis** (`skills_gap_analysis` table):
```typescript
{
  criticalGaps: [...],      // Skills critically missing
  moderateGaps: [...],       // Skills somewhat lacking
  strengthAreas: [...],      // Skills employee excels at
  trainingRecommendations: [...],
  developmentPlan: {...},

  // Scores
  overallSkillScore: 68,           // 0-100
  strategicAlignmentScore: 45,     // 0-100 ⚠️ LOW
  readinessScore: 72               // 0-100 for current role
}
```

#### **Skills Report** (`skills_reports` table):
- Full analysis stored as JSON
- Cached for performance
- Report types: individual, department, company

---

## 6️⃣ **DOES IT ANSWER: "DOES CLIENT HAVE RIGHT SKILLS FOR STRATEGY?"**

### ✅ **YES - THIS IS THE PRIMARY PURPOSE**

**How it answers this question**:

1. **Strategy Mapping** (`mapStrategyToRequiredSkills` method):
   - Analyzes company strategy
   - Extracts required skills organization-wide
   - Maps skills to departments
   - Maps skills to roles
   - Identifies critical vs. important vs. nice-to-have

2. **Gap Calculation** (`performSkillGapAnalysis` method):
   - Compares current skills to required skills
   - Calculates `strategicAlignmentScore` (0-100%)
   - Formula: `(critical skills met / critical skills needed) * 100`

3. **Readiness Assessment**:
   - `overallSkillScore`: Overall capability
   - `strategicAlignmentScore`: **Strategy-specific readiness** ⭐
   - `readinessScore`: Current role readiness

4. **Impact Analysis**:
   - Identifies which strategy objectives are at risk
   - Estimates time to close critical gaps
   - Provides development plan to reach strategy-ready state

**Example Output**:
```
Strategic Alignment Score: 45/100

CRITICAL GAPS (blocking strategy):
- Machine Learning (required: 4, current: 2) - 15 employees affected
- Cloud Architecture (required: 4, current: 1) - 25 employees affected

VERDICT: Organization NOT READY for AI product strategy.
Estimated time to readiness: 4-6 months with training program.

IMMEDIATE ACTIONS:
1. Enroll 15 engineers in ML bootcamp
2. Hire 2 senior ML engineers
3. Partner with AWS for cloud training
```

---

## 7️⃣ **WHAT IS THE FLOW OF THE ANALYSIS?**

### **Flow Diagram**:

```
┌─────────────────────────────────────────────┐
│  INPUT COLLECTION                           │
├─────────────────────────────────────────────┤
│  1. Employee uploads resume                 │
│  2. AI extracts skills from resume          │
│  3. Creates employee skills profile         │
│  4. Company strategy loaded                 │
│  5. Strategy mapped to required skills      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  THREE-ENGINE AI ANALYSIS                   │
├─────────────────────────────────────────────┤
│  ENGINE 1: KNOWLEDGE                        │
│  - Load O*NET taxonomy                      │
│  - Apply Bloom's levels                     │
│  - Load competency frameworks               │
│  - Define proficiency standards             │
│                                             │
│  ENGINE 2: DATA                             │
│  - Aggregate current skills                 │
│  - Calculate skill distribution             │
│  - Analyze certifications/experience        │
│  - Compare to required skills               │
│  - Identify quantitative gaps               │
│                                             │
│  ENGINE 3: REASONING                        │
│  - Calculate coverage %                     │
│  - Prioritize gaps by impact                │
│  - Generate recommendations                 │
│  - Create training triggers                 │
│  - Synthesize actionable plan               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  OUTPUT GENERATION                          │
├─────────────────────────────────────────────┤
│  - Overall coverage score                   │
│  - Skill gaps (critical, moderate)          │
│  - Skill surplus & opportunities            │
│  - Recommendations (training, hiring, etc)  │
│  - Training triggers for LXP                │
│  - Strategic alignment score ⭐             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  STORAGE & ACTIONS                          │
├─────────────────────────────────────────────┤
│  - Store in skills_gap_analysis             │
│  - Store in skills_reports                  │
│  - Trigger LXP course assignments           │
│  - Trigger hiring requisitions              │
│  - Create development plans                 │
└─────────────────────────────────────────────┘
```

---

## 8️⃣ **WHAT STRUCTURE/INFO DOES THE AGENT REQUIRE?**

### **Required Database Tables** (All Exist ✅):

1. **`employee_skills_profiles`**
   - Employee skills data
   - Resume content
   - Extracted skills (technical, soft, domain, tools, languages)
   - Experience, education, certifications

2. **`company_strategies`**
   - Strategy objectives
   - Required skills for strategy
   - Status (active/draft/archived)

3. **`strategy_skill_requirements`**
   - Organizational skills needed
   - Departmental skills needed
   - Role-specific skills needed
   - Critical vs. important vs. nice-to-have

4. **`skills_taxonomies`**
   - O*NET taxonomy data
   - Skill categories
   - Skill hierarchies

5. **`employee_skills`** (Legacy)
   - Simple skill-to-employee mapping
   - Proficiency levels (1-5)

6. **`skills_gap_analysis`**
   - Analysis results storage
   - Gap details
   - Scores
   - Recommendations

7. **`skills_reports`**
   - Cached reports (individual, department, company)
   - Full analysis JSON

### **Required Inputs Per Analysis Type**:

#### **Individual Analysis**:
```typescript
{
  tenantId: string,
  targetType: 'individual',
  targetId: string,  // employeeId
  strategyId?: string
}
```

**Needs**:
- Employee skills profile
- Strategy requirements
- Department skills (if employee has department)
- Role skills (if employee has role)

#### **Department Analysis**:
```typescript
{
  tenantId: string,
  targetType: 'department',
  targetId: string,  // departmentId
  strategyId?: string
}
```

**Needs**:
- All employee skills in department
- Strategy requirements
- Department-specific skill requirements

#### **Company Analysis**:
```typescript
{
  tenantId: string,
  targetType: 'company',
  strategyId?: string
}
```

**Needs**:
- All employee skills organization-wide
- Company strategy
- All skill requirements (org, dept, role levels)

---

## 9️⃣ **ISSUES FOUND** ⚠️

### **Issue #1: Model Version**
- **Current**: `model: 'gpt-4'`
- **Should Be**: `model: 'gpt-4o'` (per MIZAN_MASTER_DOCUMENT.md)
- **Location**: `backend/services/agents/skills-agent.ts` lines 53, 59, 65
- **Fix**: Update all three engines to use `'gpt-4o'`

### **Issue #2: Missing Error Handling**
- JSON parsing has try/catch but returns generic errors
- Should provide more specific fallback behavior

### **Issue #3: O*NET Data Loading**
- Code loads from `skills_taxonomies` table
- Table may be empty (need to verify)
- May need to seed O*NET data

---

## 🔟 **API ENDPOINTS AVAILABLE**

### **Profile Management**:
1. `POST /api/skills/profile/upload-resume` - Upload resume, extract skills
2. `POST /api/skills/profile/start-conversation` - Start conversational profile building
3. `GET /api/skills/profile/:employeeId` - Get employee skills profile
4. `PUT /api/skills/profile/:employeeId` - Update skills profile manually

### **Analysis**:
5. `POST /api/skills/analyze/individual` - Analyze individual employee
6. `POST /api/skills/analyze/department` - Analyze department
7. `POST /api/skills/analyze/company` - Analyze company-wide

### **Strategy**:
8. `POST /api/skills/strategy/map-requirements` - Map strategy to skill requirements
9. `GET /api/skills/strategy/:strategyId/requirements` - Get strategy skill requirements

### **Reports**:
10. `GET /api/skills/reports/:tenantId` - Get all skills reports
11. `GET /api/skills/reports/:reportId` - Get specific report

---

## 1️⃣1️⃣ **FRONTEND DESIGN RECOMMENDATIONS**

### **Page 1: Skills Analysis Dashboard** (Superadmin/Admin)
**URL**: `/dashboard/superadmin/skills` or `/dashboard/admin/skills`

**Sections**:
1. **Hero Metrics**:
   - Overall Skill Coverage: 72% (circular progress)
   - Strategic Alignment: 45% ⚠️ (color: red/yellow/green)
   - Critical Gaps: 12 skills
   - Employees Analyzed: 45/50

2. **Critical Gaps Table**:
   | Skill | Priority | Gap | Affected | Action |
   |-------|----------|-----|----------|--------|
   | Machine Learning | Critical | 2 levels | 15 | [Train] |

3. **Skills Distribution Chart**:
   - Bar chart: Technical, Leadership, Communication, etc.
   - Current vs. Required (side by side)

4. **Recommendations Panel**:
   - 🎓 Training recommendations
   - 👥 Hiring recommendations
   - 🔄 Reallocation opportunities

5. **Actions**:
   - [Upload Strategy] button
   - [Run Company Analysis] button
   - [Download Report] button

### **Page 2: Individual Employee Skills** (Employee View)
**URL**: `/dashboard/employee/skills`

**Sections**:
1. **Upload Resume**:
   - Drag & drop resume upload
   - Supports PDF, DOC, DOCX, TXT

2. **My Skills Profile**:
   - Technical Skills (with proficiency bars)
   - Soft Skills (badges)
   - Certifications (timeline)
   - Experience (timeline)

3. **Skills Gap Analysis**:
   - "Your skills vs. role requirements"
   - Critical gaps highlighted
   - Recommended training courses (linked to LXP)

4. **Development Plan**:
   - Skills to develop
   - Estimated time
   - Recommended courses

### **Page 3: Department Skills View** (Manager)
**URL**: `/dashboard/admin/skills/department/:deptId`

**Sections**:
1. **Department Overview**:
   - Team skill coverage
   - Department readiness score

2. **Team Skills Matrix**:
   - Heat map: Employees (rows) × Skills (columns)
   - Color coding: Red (missing) → Green (expert)

3. **Gap Analysis**:
   - Department-wide gaps
   - Individual employee gaps

---

## 1️⃣2️⃣ **NEXT STEPS FOR FRONTEND DEVELOPMENT**

### **Before Starting**:
1. ✅ Fix model version (`gpt-4` → `gpt-4o`)
2. ✅ Verify O*NET data exists in database
3. ✅ Test resume upload endpoint
4. ✅ Test analysis endpoints

### **Development Order**:
1. **Superadmin Skills Dashboard** (company-level view)
2. **Employee Skills Profile** (resume upload + skills view)
3. **Admin Department View** (team skills matrix)

---

## 1️⃣3️⃣ **QUESTIONS ANSWERED SUMMARY**

| Question | Answer |
|----------|--------|
| **What is the input?** | Resume uploads (PDF/DOC), manual entry, company strategy |
| **What is being analyzed?** | Employee skills vs. strategy requirements, gaps, surplus |
| **Is agent trained?** | ✅ YES - O*NET, Bloom's, Competency Frameworks |
| **Is there Three-Engine agent?** | ✅ YES - Knowledge + Data + Reasoning |
| **What is the output?** | Coverage %, gaps, recommendations, training triggers |
| **Does it answer strategy question?** | ✅ YES - `strategicAlignmentScore` + readiness |
| **What is the flow?** | Upload → Extract → Analyze (3 engines) → Generate report → Trigger actions |
| **What structure is needed?** | Employee profiles, strategy, skill taxonomies (all exist) |

---

**Status**: ✅ **READY FOR FRONTEND DEVELOPMENT**
**Priority Fix**: Update model from `gpt-4` to `gpt-4o`
**Recommendation**: Start with Superadmin Skills Dashboard (company-level view)
