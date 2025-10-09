# 🤖 Skills Profile BOT & AI Services - Complete Audit
**Date**: October 9, 2025
**Questions**: BOT implementation, AI training frameworks, AI service providers

---

## ✅ **YES - PROFILE BOT EXISTS AND IS FULLY IMPLEMENTED**

**Class**: `ProfileBuilderHOT` (Helper/Onboarding Tool)
**Location**: `backend/services/agents/profile-builder-hot.ts`
**Type**: Three-Engine AI Agent

---

## 1️⃣ **PROFILE BUILDING BOT - WHAT IT DOES**

### **Purpose**:
Help employees build comprehensive skills profiles through **conversational AI** when they don't have a resume to upload.

### **What the BOT Collects**:

```typescript
{
  // Work Experience
  currentExperience: [
    {
      company: "Company Name",
      role: "Job Title",
      startDate: "2020-01",
      endDate: "Present",
      description: "What you do",
      achievements: ["Achievement 1", "Achievement 2"]
    }
  ],
  pastExperience: [...],  // Work history

  // Education
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "University Name",
      year: "2019",
      field: "Computer Science"
    }
  ],

  // Certifications
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021-03",
      expiryDate: "2024-03"
    }
  ],

  // Projects
  projects: [
    {
      name: "E-commerce Platform",
      description: "Built a scalable online store",
      role: "Lead Developer",
      technologies: ["React", "Node.js", "MongoDB"]
    }
  ],

  // Skills (extracted from conversation)
  technicalSkills: [
    {
      skill: "Python",
      proficiency: "expert",
      yearsExperience: 5
    }
  ],
  softSkills: ["Leadership", "Communication", "Problem Solving"],
  domainKnowledge: ["Machine Learning", "Cloud Computing"],
  tools: ["AWS", "Docker", "Git"],
  languages: ["English (Native)", "Spanish (Conversational)"]
}
```

---

## 2️⃣ **HOW THE BOT WORKS - CONVERSATIONAL FLOW**

### **API Endpoints**:

#### **A. Start Conversation**
```
POST /api/skills/profile/start-conversation
```

**Response**:
```json
{
  "success": true,
  "conversation": {
    "message": "Hi! I'm here to help you build your skills profile. Let's start by telling me about your current role. What do you do?",
    "suggestions": [
      "I'm a Software Engineer at TechCorp",
      "Let me describe my current responsibilities",
      "I want to add my work history"
    ],
    "nextSteps": [
      "Share your current and past experience",
      "Add your education and certifications",
      "List your skills and expertise"
    ]
  },
  "profileStatus": {
    "exists": false,
    "completionPercentage": 0
  }
}
```

#### **B. Chat with BOT**
```
POST /api/skills/profile/chat
```

**Request**:
```json
{
  "message": "I'm a Senior Software Engineer at Google. I work on cloud infrastructure, focusing on Kubernetes and distributed systems.",
  "currentSection": "experience",
  "conversationHistory": [
    {"role": "assistant", "message": "Tell me about your current role"},
    {"role": "user", "message": "I work at Google..."}
  ]
}
```

**Response**:
```json
{
  "success": true,
  "response": "That's impressive! Working with Kubernetes and distributed systems at Google. How long have you been in this role?",
  "extractedData": {
    "experience": [{
      "company": "Google",
      "role": "Senior Software Engineer",
      "description": "Cloud infrastructure, Kubernetes, distributed systems"
    }],
    "skills": ["Kubernetes", "Distributed Systems", "Cloud Infrastructure"]
  },
  "suggestions": [
    "Tell me about your previous roles",
    "Let's add your education",
    "What certifications do you have?"
  ],
  "sectionComplete": false,
  "nextSection": "experience"
}
```

**What Happens**:
1. BOT extracts structured data from free-form conversation
2. Updates employee profile in database
3. Asks relevant follow-up questions
4. Guides employee through each section (experience → education → skills → certifications → projects)
5. Tracks completion percentage

#### **C. Get Improvement Suggestions**
```
GET /api/skills/profile/suggestions
```

**Response**:
```json
{
  "success": true,
  "missing": ["Education", "Certifications"],
  "suggestions": [
    {
      "section": "experience",
      "suggestion": "Add more details about your achievements and impact"
    },
    {
      "section": "skills",
      "suggestion": "Include proficiency levels for each skill"
    }
  ],
  "completionTips": [
    "Add your work experience with specific achievements",
    "List your technical and soft skills with proficiency",
    "Include education and certifications"
  ]
}
```

### **BOT Personality**:
- **Warm, friendly, and encouraging**
- **Patient and supportive**
- **Clear and concise**
- **Professional but approachable**
- Asks **one thing at a time** (not overwhelming)
- **Acknowledges what employee shared**
- **Suggests what to add next**

### **Smart Data Extraction**:
The BOT uses AI to extract structured data from free-form responses:

**Example**:
```
Employee: "I worked at Microsoft for 3 years as a Product Manager,
          where I launched Azure DevOps features and increased user
          engagement by 40%"

BOT extracts:
{
  "company": "Microsoft",
  "role": "Product Manager",
  "duration": "3 years",
  "description": "Launched Azure DevOps features",
  "achievements": ["Increased user engagement by 40%"],
  "skills": ["Product Management", "Azure DevOps", "User Engagement"]
}
```

---

## 3️⃣ **AI SERVICES USED - MULTI-PROVIDER ARCHITECTURE**

### ✅ **CURRENTLY USING 4 AI PROVIDERS**:

1. **OpenAI** (GPT-4, GPT-4o)
2. **Anthropic** (Claude 3.5 Sonnet, Claude 3)
3. **Google Gemini** (Gemini Pro, Gemini 2.5 Flash)
4. **Mistral** (Mistral Large)

### **AI Provider Distribution Across Agents**:

| Agent | Knowledge Engine | Data Engine | Reasoning Engine |
|-------|------------------|-------------|------------------|
| **Skills Agent** | OpenAI, Anthropic | OpenAI, Anthropic | OpenAI, Anthropic |
| **Profile BOT** | OpenAI, Anthropic | OpenAI, Anthropic | OpenAI, Anthropic |
| **Culture Agent** | OpenAI, Anthropic, Gemini, Mistral | ALL 4 | ALL 4 |
| **Structure Agent** | OpenAI, Anthropic, Gemini, Mistral | ALL 4 | ALL 4 |
| **Engagement Agent** | ALL 4 | ALL 4 | ALL 4 |
| **Recognition Agent** | ALL 4 | ALL 4 | ALL 4 |
| **Performance Agent** | OpenAI, Anthropic, Gemini | ALL 4 | Anthropic, OpenAI |
| **Benchmarking Agent** | ALL 4 | ALL 4 | ALL 4 |
| **Social Media Agent** | ALL 4 | ALL 4 | ALL 4 |

### **Why Multiple Providers?**

1. **Multi-AI Consensus**: Different AI models analyze the same data independently, then consensus is calculated
2. **Redundancy**: If one provider is down, others can continue
3. **Quality**: Each provider has different strengths (OpenAI for code, Anthropic for reasoning, Gemini for speed)
4. **Validation**: Cross-validation between providers increases accuracy

---

## 4️⃣ **ADDITIONAL FRAMEWORKS FOR SKILLS TRAINING**

### **Currently Trained On** (Existing ✅):

1. ✅ **O*NET Skills Taxonomy** - U.S. Dept of Labor, 35+ categories, 100+ skills
2. ✅ **Bloom's Taxonomy** - 6 learning levels (Remember → Create)
3. ✅ **Competency Modeling** - Technical, Behavioral, Leadership, Domain
4. ✅ **Proficiency Levels** - 1-5 scale (Novice → Expert)

---

### **RECOMMENDED ADDITIONS** 🎯:

#### **A. Industry Skills Frameworks**:

1. **SFIA (Skills Framework for the Information Age)**
   - **What**: Global skills and competency framework for digital world
   - **Contains**: 102 professional skills across 7 levels
   - **Categories**: Strategy, Change, Development, Delivery, Skills, Relationships
   - **Why**: Industry standard for IT/digital skills
   - **Integration**: Can map employee skills to SFIA levels
   - **Source**: https://sfia-online.org/

2. **SkillsFuture Singapore Framework**
   - **What**: National skills framework
   - **Contains**: Skills for future economy
   - **Focus**: Digital, green economy, care economy skills
   - **Why**: Forward-looking, includes emerging skills
   - **Integration**: Future-proof skills mapping

3. **European e-Competence Framework (e-CF)**
   - **What**: European standard for ICT professional skills
   - **Contains**: 41 competencies across 5 areas
   - **Levels**: e-1 (junior) to e-5 (principal/director)
   - **Why**: International standard recognition
   - **Integration**: Cross-border skill certification

#### **B. Learning & Development Frameworks**:

4. **Kirkpatrick's Four Levels of Training Evaluation**
   - **What**: Measures training effectiveness
   - **Levels**: Reaction → Learning → Behavior → Results
   - **Why**: Can measure if training closes skill gaps
   - **Integration**: Track training ROI in LXP module

5. **70-20-10 Learning Model**
   - **What**: 70% experience, 20% mentoring, 10% formal training
   - **Why**: Helps recommend HOW to develop skills
   - **Integration**: Diversify training recommendations (not just courses)

6. **Dreyfus Model of Skill Acquisition**
   - **What**: 5 stages: Novice → Advanced Beginner → Competent → Proficient → Expert
   - **Why**: More nuanced than 1-5 scale, includes context
   - **Integration**: Better proficiency assessment

#### **C. Job & Career Frameworks**:

7. **Holland Code (RIASEC)**
   - **What**: Career interest framework (Realistic, Investigative, Artistic, Social, Enterprising, Conventional)
   - **Why**: Maps skills to career paths
   - **Integration**: Suggest career transitions based on skills

8. **LinkedIn Skills Genome**
   - **What**: Real-time skill demand data across industries
   - **Contains**: Trending skills, skill adjacencies, skill gaps by region
   - **Why**: Market-driven, shows what's in demand
   - **Integration**: API available, can show "skills in demand"

9. **Burning Glass Technologies / Lightcast Skills Taxonomy**
   - **What**: Real-time labor market analytics
   - **Contains**: 32,000+ skills from millions of job postings
   - **Why**: Shows actual employer demand
   - **Integration**: Align employee skills with job market

#### **D. Technical Skills Frameworks**:

10. **ACM Computing Classification System**
    - **What**: Computing and IT skills taxonomy
    - **Contains**: Software engineering, AI/ML, systems, security, etc.
    - **Why**: Detailed technical skill breakdown
    - **Integration**: Tech companies benefit

11. **NIST NICE Cybersecurity Workforce Framework**
    - **What**: Cybersecurity skills and roles
    - **Contains**: 52 specialty areas, 1000+ tasks
    - **Why**: Critical for security skills
    - **Integration**: Specialized for security roles

12. **DevOps Institute Skill Framework**
    - **What**: DevOps, SRE, Platform Engineering skills
    - **Contains**: Technical and cultural competencies
    - **Why**: Modern engineering practices
    - **Integration**: Relevant for tech companies

#### **E. Soft Skills & Leadership Frameworks**:

13. **Emotional Intelligence (EQ) Framework (Goleman)**
    - **What**: Self-awareness, self-regulation, motivation, empathy, social skills
    - **Why**: Soft skills are critical for leadership
    - **Integration**: Assess and develop EQ skills

14. **Six Thinking Hats (Edward de Bono)**
    - **What**: Critical thinking and decision-making framework
    - **Why**: Structured thinking skills
    - **Integration**: Assess analytical capabilities

15. **Situational Leadership Model (Blanchard)**
    - **What**: Leadership styles (Directing, Coaching, Supporting, Delegating)
    - **Why**: Leadership skill assessment
    - **Integration**: Leadership development paths

#### **F. Industry-Specific Frameworks**:

16. **HL7 FHIR for Healthcare IT**
    - **What**: Healthcare interoperability skills
    - **Why**: Specialized for healthcare industry
    - **Integration**: Industry-specific modules

17. **PMI Project Management Body of Knowledge (PMBOK)**
    - **What**: Project management competencies
    - **Why**: Standard for PM skills
    - **Integration**: PM skill assessment

18. **ITIL Framework for IT Service Management**
    - **What**: IT service management skills
    - **Contains**: Service strategy, design, transition, operation
    - **Why**: Industry standard
    - **Integration**: IT operations skills

---

## 5️⃣ **RECOMMENDED IMPLEMENTATION PRIORITY**

### **Tier 1 - Implement Immediately** (Highest Impact):

1. **SFIA** - Global IT skills standard, 102 skills
2. **LinkedIn Skills Genome** - Market demand data (API)
3. **Emotional Intelligence (EQ)** - Critical soft skills
4. **70-20-10 Model** - Diversify training recommendations

**Why**: Broad applicability, immediate value, market-driven

### **Tier 2 - Implement Next Quarter**:

5. **Lightcast/Burning Glass** - Labor market analytics
6. **Kirkpatrick Model** - Training ROI measurement
7. **European e-CF** - International recognition
8. **Dreyfus Model** - Better proficiency levels

**Why**: Enhance quality, add international standards

### **Tier 3 - Industry-Specific (As Needed)**:

9. **NIST NICE** - For cybersecurity clients
10. **HL7 FHIR** - For healthcare clients
11. **PMI PMBOK** - For project-heavy clients
12. **DevOps Institute** - For tech companies

**Why**: Target specific verticals

---

## 6️⃣ **HOW TO INTEGRATE NEW FRAMEWORKS**

### **Code Location**: `backend/services/agents/skills-agent.ts`

**Current**:
```typescript
protected async loadFrameworks(): Promise<any> {
  const taxonomies = await db.select().from(skillsTaxonomies);

  return {
    onetFramework: taxonomies.find((t: any) => t.source === 'O*NET'),
    bloomsTaxonomy: { ... },
    competencyModel: { ... },
    skillCategories: { ... },
    proficiencyLevels: { ... }
  };
}
```

**Add New Frameworks**:
```typescript
protected async loadFrameworks(): Promise<any> {
  const taxonomies = await db.select().from(skillsTaxonomies);

  return {
    // Existing
    onetFramework: taxonomies.find((t: any) => t.source === 'O*NET'),
    bloomsTaxonomy: { ... },
    competencyModel: { ... },

    // NEW - Tier 1
    sfiaFramework: taxonomies.find((t: any) => t.source === 'SFIA') || {
      name: 'SFIA',
      skills: [...],  // 102 skills
      levels: [1, 2, 3, 4, 5, 6, 7],
      categories: ['Strategy', 'Change', 'Development', 'Delivery', 'Skills', 'Relationships']
    },
    linkedinSkillsGenome: await this.fetchLinkedInSkills(),  // API call
    emotionalIntelligence: {
      name: 'EQ Framework',
      dimensions: ['Self-Awareness', 'Self-Regulation', 'Motivation', 'Empathy', 'Social Skills'],
      levels: ['Low', 'Moderate', 'High', 'Advanced']
    },
    seventyTwentyTen: {
      name: '70-20-10 Model',
      methods: {
        experiential: 70,  // On-the-job projects
        social: 20,        // Coaching, mentoring
        formal: 10         // Courses, training
      }
    },

    // Existing
    skillCategories: { ... },
    proficiencyLevels: { ... }
  };
}
```

### **Update Database Schema**:

Add `source` field to track framework:
```sql
ALTER TABLE skills_taxonomies
ADD COLUMN source VARCHAR(50);  -- 'O*NET', 'SFIA', 'LinkedIn', etc.

-- Insert SFIA data
INSERT INTO skills_taxonomies (tenant_id, source, taxonomy)
VALUES ('global', 'SFIA', {...});
```

---

## 7️⃣ **AI PROVIDER RECOMMENDATIONS**

### **Current Setup** ✅:
- OpenAI (GPT-4, GPT-4o)
- Anthropic (Claude 3.5 Sonnet)
- Google Gemini (Gemini Pro, 2.5 Flash)
- Mistral (Mistral Large)

### **Potential Additions**:

#### **Cohere** (Already referenced in some agents, not fully integrated):
- **Strengths**: Embeddings, semantic search, multilingual
- **Use Case**: Better skill matching, international clients
- **Cost**: Competitive pricing
- **Integration**: Simple, similar API to others

#### **Perplexity AI**:
- **Strengths**: Research, up-to-date information
- **Use Case**: Market research, emerging skills detection
- **Cost**: Moderate
- **Integration**: API available

#### **Hugging Face Models** (Open Source):
- **Strengths**: Free, customizable, domain-specific models
- **Use Case**: Cost reduction for high-volume tasks
- **Cost**: Free (self-hosted) or pay-per-use (inference API)
- **Integration**: More complex, requires hosting

---

## 8️⃣ **CURRENT AI CONFIGURATION - ISSUES FOUND** ⚠️

### **Issue #1: Inconsistent Model Versions**

**Skills Agent**:
```typescript
model: 'gpt-4'  // ❌ Should be 'gpt-4o'
```

**ProfileBuilderHOT**:
```typescript
model: 'gpt-4'  // ❌ Should be 'gpt-4o'
```

**Culture Agent** (varies):
```typescript
// Some agents use correct models
model: 'claude-3-5-sonnet-20241022'  // ✅ Correct
model: 'gpt-4o'  // ✅ Correct
model: 'gemini-2.5-flash'  // ✅ Correct

// Others still use old models
model: 'gpt-4'  // ❌ Should be 'gpt-4o'
model: 'claude-3'  // ❌ Should be 'claude-3-5-sonnet'
model: 'gemini-pro'  // ❌ Should be 'gemini-2.5-flash'
```

### **Recommended Fix**:

Create a **centralized model configuration**:

```typescript
// backend/config/ai-models.ts
export const AI_MODELS = {
  openai: {
    default: 'gpt-4o',
    fast: 'gpt-4o-mini',
    legacy: 'gpt-4'
  },
  anthropic: {
    default: 'claude-3-5-sonnet-20241022',
    fast: 'claude-3-haiku-20240307',
    legacy: 'claude-3-opus-20240229'
  },
  gemini: {
    default: 'gemini-2.5-flash',
    pro: 'gemini-2.5-pro',
    legacy: 'gemini-pro'
  },
  mistral: {
    default: 'mistral-large-latest',
    fast: 'mistral-medium',
    legacy: 'mistral-small'
  }
};
```

Then update all agents to use:
```typescript
model: AI_MODELS.openai.default  // 'gpt-4o'
```

---

## 9️⃣ **COST OPTIMIZATION RECOMMENDATIONS**

### **Current Cost Structure**:
- **4 providers** × **3 engines** × **multiple agents** = **High API costs**

### **Optimization Strategies**:

1. **Tiered Model Usage**:
   - **Fast tasks**: Use cheaper models (GPT-4o-mini, Claude Haiku, Gemini Flash)
   - **Complex tasks**: Use premium models (GPT-4o, Claude Sonnet)

2. **Selective Multi-Provider**:
   - **Critical analyses**: Use all 4 providers for consensus
   - **Simple tasks**: Use single provider

3. **Caching**:
   - Cache framework data (O*NET, SFIA) - doesn't change often
   - Cache common skill extractions
   - Cache strategy-skill mappings

4. **Batch Processing**:
   - Batch multiple profile updates
   - Process off-peak hours for non-urgent tasks

---

## 🔟 **SUMMARY - YOUR QUESTIONS ANSWERED**

| Question | Answer |
|----------|--------|
| **Is there a BOT for profiles without resume?** | ✅ YES - ProfileBuilderHOT (conversational AI) |
| **What data does BOT collect?** | Experience, education, skills, certifications, projects |
| **How does BOT work?** | Conversational flow, extracts structured data from free-form text |
| **What AI services are used?** | 4 providers: OpenAI, Anthropic, Gemini, Mistral |
| **Just OpenAI?** | ❌ NO - Multi-provider architecture |
| **What frameworks for training?** | O*NET, Bloom's, Competency Model, Proficiency Levels |
| **What other frameworks to add?** | Top 4: SFIA, LinkedIn Skills Genome, EQ, 70-20-10 Model |
| **Which frameworks have highest impact?** | SFIA (global IT standard), LinkedIn (market data) |

---

## 1️⃣1️⃣ **IMMEDIATE ACTION ITEMS**

### **Priority 1 - Fix Model Versions** (15 minutes):
- [ ] Update Skills Agent: `gpt-4` → `gpt-4o`
- [ ] Update ProfileBuilderHOT: `gpt-4` → `gpt-4o`
- [ ] Create centralized AI model config

### **Priority 2 - Enhance Skills Frameworks** (2-3 days):
- [ ] Integrate SFIA framework (102 IT skills)
- [ ] Add LinkedIn Skills Genome API
- [ ] Add EQ framework for soft skills
- [ ] Implement 70-20-10 training recommendations

### **Priority 3 - Build Frontend** (1-2 weeks):
- [ ] Conversational profile builder UI (chat interface)
- [ ] Skills dashboard with framework visualizations
- [ ] Resume upload + BOT fallback

---

**Status**: ✅ **BOT EXISTS, MULTI-AI CONFIGURED, READY FOR ENHANCEMENT**
**Next Step**: Fix model versions, add top 4 frameworks, build frontend
