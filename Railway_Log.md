2025-10-15T21:29:14.669596348Z [inf]  
2025-10-15T21:29:16.030710057Z [inf]  [35m[Region: us-east4][0m
2025-10-15T21:29:16.038311704Z [inf]  [35m=========================
2025-10-15T21:29:16.038347856Z [inf]  Using Detected Dockerfile
2025-10-15T21:29:16.038354911Z [inf]  =========================
2025-10-15T21:29:16.038360911Z [inf]  [0m
2025-10-15T21:29:16.038388768Z [inf]  context: 1zsc-K4oP
2025-10-15T21:29:16.229388238Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:29:16.229448114Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:29:16.229466753Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:29:16.229520484Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:29:16.252904813Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:29:16.258698646Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-15T21:29:16.262557624Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-15T21:29:16.262601185Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-15T21:29:16.358666474Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-15T21:29:16.358947355Z [inf]  [internal] load .dockerignore
2025-10-15T21:29:16.359144265Z [inf]  [internal] load .dockerignore
2025-10-15T21:29:16.359721411Z [inf]  [internal] load .dockerignore
2025-10-15T21:29:16.384305169Z [inf]  [internal] load .dockerignore
2025-10-15T21:29:16.392904798Z [inf]  [production 4/9] WORKDIR /app
2025-10-15T21:29:16.392944737Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-15T21:29:16.392953560Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-15T21:29:16.392976514Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T21:29:16.394077372Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2025-10-15T21:29:16.394121184Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2025-10-15T21:29:16.394140036Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2025-10-15T21:29:16.394164109Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2025-10-15T21:29:16.394179241Z [inf]  [builder 8/8] RUN npm prune --production
2025-10-15T21:29:16.394190485Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T21:29:16.394202587Z [inf]  [builder 6/8] COPY . .
2025-10-15T21:29:16.394214472Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T21:29:16.394234234Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T21:29:16.394245659Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T21:29:16.394256358Z [inf]  [internal] load build context
2025-10-15T21:29:16.394265758Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2025-10-15T21:29:16.394272810Z [inf]  [builder 7/8] RUN npm run build
2025-10-15T21:29:16.394301734Z [inf]  [internal] load build context
2025-10-15T21:29:16.394309502Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T21:29:16.400685758Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T21:29:16.403957433Z [inf]  [internal] load build context
2025-10-15T21:29:16.474428507Z [inf]  [internal] load build context
2025-10-15T21:29:16.478334236Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T21:29:16.478381058Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T21:29:16.734342805Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T21:29:16.738299632Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T21:29:16.783764512Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T21:29:16.787152277Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T21:29:20.157644127Z [inf]  npm warn deprecated mimelib@0.3.1: This project is unmaintained

2025-10-15T21:29:20.495517191Z [inf]  npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

2025-10-15T21:29:20.585325417Z [inf]  npm warn deprecated mailparser@0.6.2: Mailparser versions older than v2.3.0 are deprecated

2025-10-15T21:29:20.713707306Z [inf]  npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

2025-10-15T21:29:21.0446797Z [inf]  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

2025-10-15T21:29:21.432528907Z [inf]  npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is

2025-10-15T21:29:21.480709666Z [inf]  npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is

2025-10-15T21:29:22.299265548Z [inf]  npm warn deprecated sendgrid@5.2.3: Please see v6.X+ at https://www.npmjs.com/org/sendgrid

2025-10-15T21:29:25.722230842Z [inf]  
added 433 packages, and audited 434 packages in 9s

2025-10-15T21:29:25.722307942Z [inf]  
67 packages are looking for funding
  run `npm fund` for details

2025-10-15T21:29:25.750094846Z [inf]  
4 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

2025-10-15T21:29:25.751688528Z [inf]  npm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice

2025-10-15T21:29:25.916940762Z [inf]  npm warn using --force Recommended protections disabled.

2025-10-15T21:29:26.665536494Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T21:29:26.668649629Z [inf]  [builder 6/8] COPY . .
2025-10-15T21:29:26.880776092Z [inf]  [builder 6/8] COPY . .
2025-10-15T21:29:26.883859414Z [inf]  [builder 7/8] RUN npm run build
2025-10-15T21:29:27.147936009Z [inf]  
> mizan-server@1.0.0 build
> tsc


2025-10-15T21:29:40.049803134Z [inf]  src/middleware/auth.ts(50,9): error TS2739: Type '{ userId: string; }' is missing the following properties from type 'AuthenticatedUser': id, tenantId, email, name, role

2025-10-15T21:29:40.050112358Z [inf]  src/routes/analyses.ts(72,11): error TS2739: Type '{ roles: Role[]; departments: Department[]; reportingLines: ReportingLine[]; }' is missing the following properties from type 'StructureData': totalEmployees, organizationLevels

2025-10-15T21:29:40.05016448Z [inf]  src/routes/analyses.ts(85,9): error TS2741: Property 'id' is missing in type 'TenantStrategy' but required in type 'StrategyData'.

2025-10-15T21:29:40.050182233Z [inf]  src/routes/analyses.ts(90,9): error TS2353: Object literal may only specify known properties, and 'keyInsights' does not exist in type 'StructureAnalysisOutput'.

2025-10-15T21:29:40.050189357Z [inf]  src/routes/analyses.ts(96,60): error TS2554: Expected 1 arguments, but got 2.

2025-10-15T21:29:40.050250453Z [inf]  src/routes/analyses.ts(209,36): error TS2339: Property 'marketPosition' does not exist on type '{ id: string; name: string; domain: string; plan: string; status: string; industry: string; employeeCount: number; vision: string; mission: string; strategy: string; values: string[]; stripeCustomerId: string; stripeSubscriptionId: string; primaryContact: string; createdAt: Date; updatedAt: Date; }'.
src/routes/analyses.ts(263,30): error TS2339: Property 'location' does not exist on type '{ id: string; name: string; domain: string; plan: string; status: string; industry: string; employeeCount: number; vision: string; mission: string; strategy: string; values: string[]; stripeCustomerId: string; stripeSubscriptionId: string; primaryContact: string; createdAt: Date; updatedAt: Date; }'.

2025-10-15T21:29:40.050301818Z [inf]  src/routes/culture-assessment.ts(1127,40): error TS2339: Property 'name' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'name' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.050493395Z [inf]  src/routes/culture-assessment.ts(1449,18): error TS2339: Property 'id' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'id' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.050549287Z [inf]  src/routes/culture-assessment.ts(1450,21): error TS2339: Property 'email' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'email' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.050616248Z [inf]  src/routes/culture-assessment.ts(1451,20): error TS2339: Property 'name' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'name' does not exist on type '{ [x: string]: any; }[]'.
src/routes/skills.ts(52,52): error TS2345: Argument of type '{ industry?: string; strategy?: string; tenantId?: string; companyId?: string; resumeData?: { employeeId?: string; resumeText?: string; }[]; organizationName?: string; employeeData?: { name?: string; role?: string; skills?: { ...; }[]; department?: string; employeeId?: string; experience?: number; }[]; }' is not assignable to parameter of type 'SkillsAnalysisInput'.
  Property 'tenantId' is optional in type '{ industry?: string; strategy?: string; tenantId?: string; companyId?: string; resumeData?: { employeeId?: string; resumeText?: string; }[]; organizationName?: string; employeeData?: { name?: string; role?: string; skills?: { ...; }[]; department?: string; employeeId?: string; experience?: number; }[]; }' but required in type 'SkillsAnalysisInput'.

2025-10-15T21:29:40.050712054Z [inf]  src/routes/skills.ts(106,94): error TS2345: Argument of type '{ id: string; industry: string; createdAt: Date; updatedAt: Date; tenantId: string; technicalSkills: unknown; softSkills: unknown; frameworkName: string; strategicSkills: unknown; prioritization: unknown; createdBy: string; }' is not assignable to parameter of type 'SkillsFramework'.
  Type '{ id: string; industry: string; createdAt: Date; updatedAt: Date; tenantId: string; technicalSkills: unknown; softSkills: unknown; frameworkName: string; strategicSkills: unknown; prioritization: unknown; createdBy: string; }' is missing the following properties from type 'SkillsFramework': industryBenchmarks, criticalSkills, emergingSkills, obsoleteSkills

2025-10-15T21:29:40.050873316Z [inf]  src/routes/skills.ts(150,56): error TS2769: No overload matches this call.
  Overload 1 of 2, '(value: { name: string | SQL<unknown> | Placeholder<string, any>; tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<...>; ... 6 more ...; verified?: boolean | ... 1 more ... | Placeholder<...>; }): PgInsertBase<...>', gave the following error.
    Argument of type '{ name?: string; category?: "leadership" | "technical" | "communication" | "soft" | "analytical"; level?: "beginner" | "intermediate" | "advanced" | "expert"; yearsOfExperience?: number; verified?: boolean; id: `${string}-${string}-${string}-${string}-${string}`; userId: string; tenantId: string; }' is not assignable to parameter of type '{ name: string | SQL<unknown> | Placeholder<string, any>; tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<...>; ... 6 more ...; verified?: boolean | ... 1 more ... | Placeholder<...>; }'.
      Property 'name' is optional in type '{ name?: string; category?: "leadership" | "technical" | "communication" | "soft" | "analytical"; level?: "beginner" | "intermediate" | "advanced" | "expert"; yearsOfExperience?: number; verified?: boolean; id: `${string}-${string}-${string}-${string}-${string}`; userId: string; tenantId: string; }' but required in type '{ name: string | SQL<unknown> | Placeholder<string, any>; tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<...>; ... 6 more ...; verified?: boolean | ... 1 more ... | Placeholder<...>; }'.
  Overload 2 of 2, '(values: { name: string | SQL<unknown> | Placeholder<string, any>; tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<...>; ... 6 more ...; verified?: boolean | ... 1 more ... | Placeholder<...>; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ name: string | SQL<unknown> | Placeholder<string, any>; tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<...>; ... 6 more ...; verified?: boolean | ... 1 more ... | Placeholder<...>; }[]'.

2025-10-15T21:29:40.050911072Z [inf]  src/routes/upload.ts(353,20): error TS2304: Cannot find name 'randomUUID'.

2025-10-15T21:29:40.050939202Z [inf]  src/routes/upload.ts(365,26): error TS2339: Property 'roles' does not exist on type 'StructureAnalysisOutput'.

2025-10-15T21:29:40.051017161Z [inf]  src/services/agents/bonus/bonus-agent.ts(2,20): error TS2307: Cannot find module '../../db/index' or its corresponding type declarations.

2025-10-15T21:29:40.051049749Z [inf]  src/services/agents/bonus/bonus-agent.ts(3,38): error TS2307: Cannot find module '../../db/schema/bonus' or its corresponding type declarations.

2025-10-15T21:29:40.051166693Z [inf]  src/services/agents/bonus/bonus-agent.ts(45,15): error TS2739: Type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......' is missing the following properties from type 'BonusAnalysisResult': recommendBonus, recommendedAmount, bonusType, rationale

2025-10-15T21:29:40.051211065Z [inf]  src/services/agents/bonus/bonus-agent.ts(46,15): error TS2353: Object literal may only specify known properties, and 'employeeId' does not exist in type '{ metadata?: { quality?: number; processingTime?: number; recordCount?: number; completeness?: number; anomalies?: string[]; }; cleaned?: Record<string, unknown>; normalized?: Record<string, number>; structured?: { ...; }; }'.

2025-10-15T21:29:40.051330689Z [inf]  src/services/agents/hiring/hiring-agent.ts(2,20): error TS2307: Cannot find module '../../db/index' or its corresponding type declarations.
src/services/agents/hiring/hiring-agent.ts(3,103): error TS2307: Cannot find module '../../db/schema' or its corresponding type declarations.

2025-10-15T21:29:40.051490599Z [inf]  src/services/agents/hiring/hiring-agent.ts(108,15): error TS2739: Type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......' is missing the following properties from type 'HiringAnalysisResult': responsibilities, requirements, compensation, interview

2025-10-15T21:29:40.051509271Z [inf]  src/services/agents/hiring/hiring-agent.ts(110,13): error TS2322: Type 'IndustryData' is not assignable to type 'Record<string, number>'.
  Index signature for type 'string' is missing in type 'IndustryData'.

2025-10-15T21:29:40.051524258Z [inf]  src/services/agents/lxp/lxp-agent.ts(2,20): error TS2307: Cannot find module '../../db/index' or its corresponding type declarations.

2025-10-15T21:29:40.051535454Z [inf]  src/services/agents/lxp/lxp-agent.ts(3,59): error TS2307: Cannot find module '../../db/schema/lxp-extended' or its corresponding type declarations.

2025-10-15T21:29:40.051538751Z [inf]  src/services/agents/lxp/lxp-agent.ts(4,28): error TS2307: Cannot find module '../../db/schema/skills' or its corresponding type declarations.

2025-10-15T21:29:40.05158488Z [inf]  src/services/agents/lxp/lxp-agent.ts(48,17): error TS2353: Object literal may only specify known properties, and 'skillsGaps' does not exist in type '{ metadata?: { quality?: number; processingTime?: number; recordCount?: number; completeness?: number; anomalies?: string[]; }; cleaned?: Record<string, unknown>; normalized?: Record<string, number>; structured?: { ...; }; }'.
src/services/agents/lxp/lxp-agent.ts(66,36): error TS2339: Property 'recommendedPath' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.

2025-10-15T21:29:40.051593605Z [inf]  src/services/agents/lxp/lxp-agent.ts(72,27): error TS2339: Property 'recommendedPath' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.
src/services/agents/lxp/lxp-agent.ts(72,60): error TS2339: Property 'recommendedPath' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.

2025-10-15T21:29:40.051608855Z [inf]  src/services/agents/lxp/lxp-agent.ts(73,49): error TS2339: Property 'recommendedPath' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.

2025-10-15T21:29:40.051626995Z [inf]  src/services/agents/performance/performance-agent.ts(2,20): error TS2307: Cannot find module '../../db/index' or its corresponding type declarations.

2025-10-15T21:29:40.051632962Z [inf]  src/services/agents/performance/performance-agent.ts(3,203): error TS2307: Cannot find module '../../db/schema' or its corresponding type declarations.

2025-10-15T21:29:40.051662849Z [inf]  src/services/agents/performance/performance-agent.ts(72,27): error TS2304: Cannot find name 'CultureAgent'.
src/services/agents/performance/performance-agent.ts(73,26): error TS2304: Cannot find name 'SkillsAgent'.

2025-10-15T21:29:40.051667582Z [inf]  src/services/agents/performance/performance-agent.ts(106,15): error TS2741: Property 'summary' is missing in type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......' but required in type 'PerformanceAnalysisResult'.

2025-10-15T21:29:40.051725076Z [inf]  src/services/agents/performance/performance-agent.ts(108,13): error TS2322: Type 'IndustryData' is not assignable to type 'Record<string, number>'.
  Index signature for type 'string' is missing in type 'IndustryData'.
src/services/agents/structure/structure-agent.ts(456,68): error TS2345: Argument of type '(d: { id: string; name: string; level?: number | null; users?: Array<{ id: string; name?: string; }> | null; parentId?: string | null; }) => { id: string; name: string; level: number; users: { ...; }[]; parentId: string; }' is not assignable to parameter of type '(value: { id: string; name: string; createdAt: Date; updatedAt: Date; tenantId: string; managerId: string; description: string; parentDepartmentId: string; budget: string; headCount: number; users: { ...; }[]; }, index: number, array: { ...; }[]) => { ...; }'.
  Types of parameters 'd' and 'value' are incompatible.
    Type '{ id: string; name: string; createdAt: Date; updatedAt: Date; tenantId: string; managerId: string; description: string; parentDepartmentId: string; budget: string; headCount: number; users: { ...; }[]; }' is not assignable to type '{ id: string; name: string; level?: number; users?: { id: string; name?: string; }[]; parentId?: string; }'.
      Types of property 'users' are incompatible.
        Type '{ [x: string]: any; }[]' is not assignable to type '{ id: string; name?: string; }[]'.
          Property 'id' is missing in type '{ [x: string]: any; }' but required in type '{ id: string; name?: string; }'.

2025-10-15T21:29:40.051758771Z [inf]  src/services/agents/talent/talent-agent.ts(2,20): error TS2307: Cannot find module '../../db/index' or its corresponding type declarations.
src/services/agents/talent/talent-agent.ts(3,32): error TS2307: Cannot find module '../../db/schema/performance' or its corresponding type declarations.

2025-10-15T21:29:40.051765396Z [inf]  src/services/agents/talent/talent-agent.ts(4,23): error TS2307: Cannot find module '../../db/schema/core' or its corresponding type declarations.

2025-10-15T21:29:40.051781244Z [inf]  src/services/agents/talent/talent-agent.ts(48,15): error TS2740: Type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......' is missing the following properties from type 'TalentAnalysisResult': isHighPotential, potentialRating, strengths, developmentAreas, and 2 more.

2025-10-15T21:29:40.051787089Z [inf]  src/services/agents/talent/talent-agent.ts(49,15): error TS2353: Object literal may only specify known properties, and 'employeeId' does not exist in type '{ metadata?: { quality?: number; processingTime?: number; recordCount?: number; completeness?: number; anomalies?: string[]; }; cleaned?: Record<string, unknown>; normalized?: Record<string, number>; structured?: { ...; }; }'.

2025-10-15T21:29:40.051854783Z [inf]  src/services/auth.ts(97,14): error TS2339: Property 'id' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'id' does not exist on type '{ [x: string]: any; }[]'.
src/services/auth.ts(98,17): error TS2339: Property 'email' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'email' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.051861587Z [inf]  src/services/auth.ts(99,16): error TS2339: Property 'name' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'name' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.051877862Z [inf]  src/services/auth.ts(100,16): error TS2339: Property 'role' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'role' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.051899502Z [inf]  src/services/auth.ts(101,20): error TS2339: Property 'tenantId' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'tenantId' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.051903893Z [inf]  src/services/auth.ts(102,22): error TS2339: Property 'tenant' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'tenant' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.051926545Z [inf]  src/services/auth.ts(103,22): error TS2339: Property 'tenant' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'tenant' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.051930057Z [inf]  src/services/auth.ts(139,32): error TS2339: Property 'name' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'name' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.051971979Z [inf]  src/services/auth.ts(140,32): error TS2339: Property 'plan' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'plan' does not exist on type '{ [x: string]: any; }[]'.

2025-10-15T21:29:40.051987349Z [inf]  src/services/monitoring/health-check.ts(87,25): error TS2351: This expression is not constructable.
  Not all constituents of type 'typeof import("/app/node_modules/ioredis/built/index") | typeof Redis' are constructable.
    Type 'typeof import("/app/node_modules/ioredis/built/index")' has no construct signatures.

2025-10-15T21:29:40.051994221Z [inf]  src/services/skills/skillsBotService.ts(18,39): error TS2307: Cannot find module './skillsAnalysisService' or its corresponding type declarations.

2025-10-15T21:29:40.052067601Z [inf]  src/services/skills/skillsBotService.ts(110,9): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.
src/services/skills/skillsBotService.ts(132,11): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.
src/services/skills/skillsBotService.ts(155,9): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.
src/services/skills/skillsBotService.ts(198,11): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052082632Z [inf]  src/services/skills/skillsBotService.ts(214,9): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052099639Z [inf]  src/services/skills/skillsBotService.ts(241,11): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052118502Z [inf]  src/services/skills/skillsBotService.ts(255,9): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.05213366Z [inf]  src/services/skills/skillsBotService.ts(286,9): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052145928Z [inf]  src/services/skills/skillsBotService.ts(327,9): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052168952Z [inf]  src/services/skills/skillsBotService.ts(394,7): error TS2322: Type '{ id: string; createdAt: Date; tenantId: string; employeeId: string; profileId: string; analysisType: string; criticalGaps: unknown; moderateGaps: unknown; strengthAreas: unknown; trainingRecommendations: unknown; developmentPlan: unknown; ... 5 more ...; analyzedBy: string; }[]' is not assignable to type 'SkillGap[]'.
  Type '{ id: string; createdAt: Date; tenantId: string; employeeId: string; profileId: string; analysisType: string; criticalGaps: unknown; moderateGaps: unknown; strengthAreas: unknown; trainingRecommendations: unknown; developmentPlan: unknown; ... 5 more ...; analyzedBy: string; }' is missing the following properties from type 'SkillGap': skill, currentLevel, requiredLevel, gap, priority

2025-10-15T21:29:40.052174829Z [inf]  src/services/skills/skillsBotService.ts(444,29): error TS2339: Property 'response' does not exist on type 'BotResponse'.

2025-10-15T21:29:40.05217813Z [inf]  src/services/skills/skillsBotService.ts(447,29): error TS2339: Property 'resources' does not exist on type 'BotResponse'.

2025-10-15T21:29:40.052211358Z [inf]  src/services/skills/skillsBotService.ts(448,29): error TS2339: Property 'nextSteps' does not exist on type 'BotResponse'.
src/services/skills/skillsBotService.ts(450,27): error TS2339: Property 'requiresAction' does not exist on type 'BotResponse'.

2025-10-15T21:29:40.052227795Z [inf]  src/services/skills/skillsBotService.ts(457,7): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.05224961Z [inf]  src/services/skills/skillsBotService.ts(471,7): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052270253Z [inf]  src/services/skills/skillsBotService.ts(483,7): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052285573Z [inf]  src/services/skills/skillsBotService.ts(502,7): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052302756Z [inf]  src/services/skills/skillsBotService.ts(514,7): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052320172Z [inf]  src/services/skills/skillsBotService.ts(526,7): error TS2353: Object literal may only specify known properties, and 'response' does not exist in type 'BotResponse'.

2025-10-15T21:29:40.052338196Z [inf]  src/services/skills/skillsBotService.ts(554,57): error TS2339: Property 'length' does not exist on type 'unknown'.

2025-10-15T21:29:40.052357362Z [inf]  src/services/skills/skillsBotService.ts(582,58): error TS2339: Property 'length' does not exist on type 'unknown'.

2025-10-15T21:29:40.05238313Z [inf]  src/services/skills/skillsBotService.ts(585,56): error TS2339: Property 'length' does not exist on type 'unknown'.

2025-10-15T21:29:40.052387121Z [inf]  src/services/skills/skillsBotService.ts(588,50): error TS2339: Property 'length' does not exist on type 'unknown'.

2025-10-15T21:29:40.052419055Z [inf]  src/services/skills/skillsBotService.ts(622,5): error TS2322: Type '{ id: string; createdAt: Date; tenantId: string; employeeId: string; profileId: string; analysisType: string; criticalGaps: unknown; moderateGaps: unknown; strengthAreas: unknown; trainingRecommendations: unknown; developmentPlan: unknown; ... 5 more ...; analyzedBy: string; }[]' is not assignable to type 'SkillGap[]'.
  Type '{ id: string; createdAt: Date; tenantId: string; employeeId: string; profileId: string; analysisType: string; criticalGaps: unknown; moderateGaps: unknown; strengthAreas: unknown; trainingRecommendations: unknown; developmentPlan: unknown; ... 5 more ...; analyzedBy: string; }' is missing the following properties from type 'SkillGap': skill, currentLevel, requiredLevel, gap, priority

2025-10-15T21:29:40.052571252Z [inf]  src/services/stripe.ts(448,31): error TS2339: Property 'metadata' does not exist on type 'Response<Customer | DeletedCustomer>'.
  Property 'metadata' does not exist on type 'DeletedCustomer & { lastResponse: { headers: { [key: string]: string; }; requestId: string; statusCode: number; apiVersion?: string; idempotencyKey?: string; stripeAccount?: string; }; }'.

2025-10-15T21:29:40.052580625Z [inf]  src/services/stripe.ts(469,31): error TS2339: Property 'metadata' does not exist on type 'Response<Customer | DeletedCustomer>'.
  Property 'metadata' does not exist on type 'DeletedCustomer & { lastResponse: { headers: { [key: string]: string; }; requestId: string; statusCode: number; apiVersion?: string; idempotencyKey?: string; stripeAccount?: string; }; }'.

2025-10-15T21:29:40.519190730Z [err]  [builder 7/8] RUN npm run build
2025-10-15T21:29:40.536898944Z [err]  Dockerfile.prod:19
2025-10-15T21:29:40.536957531Z [err]  -------------------
2025-10-15T21:29:40.536965124Z [err]  17 |
2025-10-15T21:29:40.536971790Z [err]  18 |     # Build the application
2025-10-15T21:29:40.536980029Z [err]  19 | >>> RUN npm run build
2025-10-15T21:29:40.536985425Z [err]  20 |
2025-10-15T21:29:40.536992429Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2025-10-15T21:29:40.536998988Z [err]  -------------------
2025-10-15T21:29:40.537005755Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2