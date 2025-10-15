2025-10-15T20:21:13.952800111Z [inf]  
2025-10-15T20:21:15.317527270Z [inf]  [35m[Region: us-east4][0m
2025-10-15T20:21:15.323336213Z [inf]  [35m=========================
2025-10-15T20:21:15.323368748Z [inf]  Using Detected Dockerfile
2025-10-15T20:21:15.323377515Z [inf]  =========================
2025-10-15T20:21:15.323384483Z [inf]  [0m
2025-10-15T20:21:15.323406045Z [inf]  context: 1zsc-K4oP
2025-10-15T20:21:15.528628026Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:21:15.528689137Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:21:15.528709530Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:21:15.543830618Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:21:15.547196255Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-15T20:21:15.609098273Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-15T20:21:15.609407689Z [inf]  [internal] load .dockerignore
2025-10-15T20:21:15.609607595Z [inf]  [internal] load .dockerignore
2025-10-15T20:21:15.609925044Z [inf]  [internal] load .dockerignore
2025-10-15T20:21:15.622552643Z [inf]  [internal] load .dockerignore
2025-10-15T20:21:15.627684922Z [inf]  [builder 8/8] RUN npm prune --production
2025-10-15T20:21:15.627721577Z [inf]  [builder 7/8] RUN npm run build
2025-10-15T20:21:15.627740128Z [inf]  [builder 6/8] COPY . .
2025-10-15T20:21:15.627752783Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T20:21:15.627766551Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T20:21:15.627777585Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T20:21:15.627790605Z [inf]  [internal] load build context
2025-10-15T20:21:15.627801888Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T20:21:15.627813293Z [inf]  [production 4/9] WORKDIR /app
2025-10-15T20:21:15.627828668Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-15T20:21:15.627841341Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-15T20:21:15.627854770Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2025-10-15T20:21:15.627867183Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T20:21:15.627913211Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2025-10-15T20:21:15.627925412Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2025-10-15T20:21:15.627940983Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2025-10-15T20:21:15.627952374Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2025-10-15T20:21:15.627978328Z [inf]  [internal] load build context
2025-10-15T20:21:15.627992027Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T20:21:15.635731991Z [inf]  [internal] load build context
2025-10-15T20:21:15.689991899Z [inf]  [internal] load build context
2025-10-15T20:21:15.695795381Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T20:21:15.695840559Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T20:21:15.695867615Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T20:21:15.695885512Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T20:21:15.695906804Z [inf]  [builder 6/8] COPY . .
2025-10-15T20:21:15.833296909Z [inf]  [builder 6/8] COPY . .
2025-10-15T20:21:15.835674491Z [inf]  [builder 7/8] RUN npm run build
2025-10-15T20:21:16.150353851Z [inf]  
> mizan-server@1.0.0 build
> tsc


2025-10-15T20:21:26.952822769Z [inf]  index.ts(41,20): error TS2307: Cannot find module './db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.952972166Z [inf]  index.ts(42,32): error TS2307: Cannot find module './db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.952984699Z [inf]  index.ts(52,25): error TS2307: Cannot find module './src/routes/entry.js' or its corresponding type declarations.

2025-10-15T20:21:26.953007595Z [inf]  index.ts(157,15): error TS7006: Parameter 't' implicitly has an 'any' type.

2025-10-15T20:21:26.953016201Z [inf]  index.ts(157,20): error TS7031: Binding element 'eq' implicitly has an 'any' type.

2025-10-15T20:21:26.953060491Z [inf]  index.ts(170,15): error TS7006: Parameter 'u' implicitly has an 'any' type.

2025-10-15T20:21:26.953093165Z [inf]  index.ts(170,20): error TS7031: Binding element 'eq' implicitly has an 'any' type.
index.ts(215,15): error TS7006: Parameter 'u' implicitly has an 'any' type.
index.ts(215,20): error TS7031: Binding element 'eq' implicitly has an 'any' type.

2025-10-15T20:21:26.953257187Z [inf]  index.ts(312,35): error TS2307: Cannot find module './db/index.js' or its corresponding type declarations.
index.ts(444,41): error TS2307: Cannot find module './db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.953271642Z [inf]  scripts/migrate.ts(2,20): error TS2307: Cannot find module '../db/client.js' or its corresponding type declarations.

2025-10-15T20:21:26.953306338Z [inf]  scripts/seed.ts(1,20): error TS2307: Cannot find module '../db/client.js' or its corresponding type declarations.

2025-10-15T20:21:26.953313401Z [inf]  scripts/seed.ts(11,8): error TS2307: Cannot find module '../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.953329641Z [inf]  scripts/seed.ts(321,41): error TS7006: Parameter 'u' implicitly has an 'any' type.

2025-10-15T20:21:26.953346327Z [inf]  src/index.ts(1,26): error TS2307: Cannot find module './skills.js' or its corresponding type declarations.

2025-10-15T20:21:26.95336588Z [inf]  src/index.ts(2,30): error TS2307: Cannot find module './superadmin.js' or its corresponding type declarations.

2025-10-15T20:21:26.953490325Z [inf]  src/index.ts(3,26): error TS2307: Cannot find module './test-ai.js' or its corresponding type declarations.
src/index.ts(4,26): error TS2307: Cannot find module './upload.js' or its corresponding type declarations.

2025-10-15T20:21:26.953568192Z [inf]  src/index.ts(5,28): error TS2307: Cannot find module './webhooks.js' or its corresponding type declarations.

2025-10-15T20:21:26.953580204Z [inf]  src/index.ts(6,29): error TS2307: Cannot find module './workflows.js' or its corresponding type declarations.
src/index.ts(7,26): error TS2307: Cannot find module './talent.js' or its corresponding type declarations.

2025-10-15T20:21:26.95366415Z [inf]  src/index.ts(8,25): error TS2307: Cannot find module './bonus.js' or its corresponding type declarations.

2025-10-15T20:21:26.953676802Z [inf]  src/middleware/auth.ts(3,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.953740195Z [inf]  src/middleware/auth.ts(4,23): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.
src/middleware/auth.ts(26,17): error TS7030: Not all code paths return a value.
src/middleware/auth.ts(47,9): error TS2322: Type '{ userId: string; } | null' is not assignable to type 'AuthenticatedUser | undefined'.
  Type 'null' is not assignable to type 'AuthenticatedUser | undefined'.
src/middleware/tenant.ts(2,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.953769971Z [inf]  src/middleware/tenant.ts(3,32): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.
src/middleware/tenant.ts(31,23): error TS7030: Not all code paths return a value.

2025-10-15T20:21:26.953778411Z [inf]  src/routes/admin.ts(6,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/routes/admin.ts(16,8): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.95385184Z [inf]  src/routes/admin.ts(70,53): error TS7006: Parameter 'sum' implicitly has an 'any' type.
src/routes/admin.ts(70,58): error TS7006: Parameter 'c' implicitly has an 'any' type.
src/routes/admin.ts(89,50): error TS7006: Parameter 'a' implicitly has an 'any' type.
src/routes/admin.ts(412,44): error TS7006: Parameter 'sum' implicitly has an 'any' type.
src/routes/admin.ts(412,49): error TS7006: Parameter 'a' implicitly has an 'any' type.

2025-10-15T20:21:26.953924404Z [inf]  src/routes/agents.ts(2,10): error TS2459: Module '"../services/agents/agent-manager.js"' declares 'AgentManager' locally, but it is not exported.
src/routes/agents.ts(3,10): error TS2724: '"../middleware/auth.js"' has no exported member named 'authenticateToken'. Did you mean 'authenticate'?
src/routes/analyses.ts(7,20): error TS2307: Cannot find module './db/index.js' or its corresponding type declarations.
src/routes/analyses.ts(8,39): error TS2307: Cannot find module './db/schema/strategy.js' or its corresponding type declarations.
src/routes/analyses.ts(9,25): error TS2307: Cannot find module './db/schema.js' or its corresponding type declarations.
src/routes/analyses.ts(72,11): error TS2739: Type '{ roles: Role[]; departments: Department[]; reportingLines: ReportingLine[]; }' is missing the following properties from type 'StructureData': totalEmployees, organizationLevels
src/routes/analyses.ts(85,9): error TS2322: Type 'TenantStrategy | undefined' is not assignable to type 'StrategyData | undefined'.
  Property 'id' is missing in type 'TenantStrategy' but required in type 'StrategyData'.

2025-10-15T20:21:26.953933895Z [inf]  src/routes/analyses.ts(90,9): error TS2353: Object literal may only specify known properties, and 'keyInsights' does not exist in type 'StructureAnalysisOutput'.

2025-10-15T20:21:26.953938027Z [inf]  src/routes/analyses.ts(96,60): error TS2554: Expected 1 arguments, but got 2.

2025-10-15T20:21:26.953941454Z [inf]  src/routes/analyses.ts(180,29): error TS7030: Not all code paths return a value.

2025-10-15T20:21:26.954000815Z [inf]  src/routes/analyses.ts(239,24): error TS7030: Not all code paths return a value.
src/routes/analyses.ts(288,21): error TS7030: Not all code paths return a value.
src/routes/auth.ts(7,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/routes/auth.ts(8,32): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.954008015Z [inf]  src/routes/billing.ts(6,20): error TS2307: Cannot find module './db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.954012858Z [inf]  src/routes/billing.ts(7,41): error TS2307: Cannot find module './db/schema/payments.js' or its corresponding type declarations.

2025-10-15T20:21:26.95405542Z [inf]  src/routes/bonus.ts(12,91): error TS7030: Not all code paths return a value.
src/routes/consulting.ts(6,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.954067747Z [inf]  src/routes/consulting.ts(7,49): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.
src/routes/culture-assessment.ts(5,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/routes/culture-assessment.ts(13,8): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.954074467Z [inf]  src/routes/culture-assessment.ts(525,31): error TS7006: Parameter 'emp' implicitly has an 'any' type.

2025-10-15T20:21:26.954162187Z [inf]  src/routes/culture-assessment.ts(531,21): error TS7006: Parameter 'assessments' implicitly has an 'any' type.
src/routes/culture-assessment.ts(531,36): error TS7031: Binding element 'desc' implicitly has an 'any' type.
src/routes/culture-assessment.ts(583,42): error TS7006: Parameter 'inv' implicitly has an 'any' type.

2025-10-15T20:21:26.954213522Z [inf]  src/routes/culture-assessment.ts(584,40): error TS7006: Parameter 'inv' implicitly has an 'any' type.
src/routes/culture-assessment.ts(585,40): error TS7006: Parameter 'inv' implicitly has an 'any' type.
src/routes/culture-assessment.ts(599,36): error TS7006: Parameter 'inv' implicitly has an 'any' type.
src/routes/culture-assessment.ts(779,17): error TS7006: Parameter 'assessments' implicitly has an 'any' type.
src/routes/culture-assessment.ts(779,32): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:21:26.954218477Z [inf]  src/routes/culture-assessment.ts(823,17): error TS7006: Parameter 'assessments' implicitly has an 'any' type.

2025-10-15T20:21:26.954249143Z [inf]  src/routes/culture-assessment.ts(823,32): error TS7031: Binding element 'desc' implicitly has an 'any' type.
src/routes/culture-assessment.ts(862,17): error TS7006: Parameter 'assessments' implicitly has an 'any' type.
src/routes/culture-assessment.ts(862,32): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:21:26.954265383Z [inf]  src/routes/culture-assessment.ts(900,17): error TS7006: Parameter 'assessments' implicitly has an 'any' type.
src/routes/culture-assessment.ts(900,32): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:21:26.954295037Z [inf]  src/routes/culture-assessment.ts(994,17): error TS7006: Parameter 'reports' implicitly has an 'any' type.
src/routes/culture-assessment.ts(994,28): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:21:26.954304517Z [inf]  src/routes/culture-assessment.ts(1037,23): error TS7006: Parameter 'a' implicitly has an 'any' type.
src/routes/culture-assessment.ts(1404,15): error TS7006: Parameter 'reports' implicitly has an 'any' type.

2025-10-15T20:21:26.95431022Z [inf]  src/routes/culture-assessment.ts(1404,26): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:21:26.954317839Z [inf]  src/routes/culture-assessment.ts(1425,5): error TS7006: Parameter 'a' implicitly has an 'any' type.

2025-10-15T20:21:26.954422485Z [inf]  src/routes/culture-assessment.ts(1433,70): error TS7006: Parameter 'a' implicitly has an 'any' type.
src/routes/culture-assessment.ts(1478,15): error TS7006: Parameter 'reports' implicitly has an 'any' type.
src/routes/culture-assessment.ts(1478,26): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:21:26.954438847Z [inf]  src/routes/demo.ts(3,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/routes/demo.ts(4,30): error TS2307: Cannot find module '../../db/schema/payments.js' or its corresponding type declarations.

2025-10-15T20:21:26.954449511Z [inf]  src/routes/demo.ts(6,10): error TS2724: '"../middleware/auth.js"' has no exported member named 'authenticateToken'. Did you mean 'authenticate'?

2025-10-15T20:21:26.954475327Z [inf]  src/routes/employee.ts(6,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/routes/employee.ts(12,8): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.954483747Z [inf]  src/routes/framework.ts(2,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.954518131Z [inf]  src/routes/framework.ts(3,33): error TS2307: Cannot find module '../../db/schema/core.js' or its corresponding type declarations.
src/routes/framework.ts(127,28): error TS7006: Parameter 'config' implicitly has an 'any' type.
src/routes/modules.ts(6,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.954530677Z [inf]  src/routes/modules.ts(7,36): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.
src/routes/modules.ts(23,15): error TS7006: Parameter 'performanceReviews' implicitly has an 'any' type.

2025-10-15T20:21:26.954556607Z [inf]  src/routes/modules.ts(23,37): error TS7031: Binding element 'eq' implicitly has an 'any' type.
src/routes/modules.ts(23,41): error TS7031: Binding element 'and' implicitly has an 'any' type.

2025-10-15T20:21:26.954566891Z [inf]  src/routes/orchestrator.ts(7,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/routes/orchestrator.ts(8,37): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.954588056Z [inf]  src/routes/payment.ts(4,10): error TS2724: '"../middleware/auth.js"' has no exported member named 'authenticateToken'. Did you mean 'authenticate'?
src/routes/payment.ts(5,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.954602977Z [inf]  src/routes/payment.ts(6,30): error TS2307: Cannot find module '../../db/schema/payments.js' or its corresponding type declarations.
src/routes/skills.ts(7,29): error TS2307: Cannot find module '../../services/agents/skills/skills-agent.js' or its corresponding type declarations.

2025-10-15T20:21:26.954627175Z [inf]  src/routes/skills.ts(8,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/routes/skills.ts(9,236): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.954640217Z [inf]  src/routes/skills.ts(49,81): error TS7030: Not all code paths return a value.

2025-10-15T20:21:26.954644856Z [inf]  src/routes/skills.ts(70,83): error TS7030: Not all code paths return a value.

2025-10-15T20:21:26.954674811Z [inf]  src/routes/skills.ts(92,55): error TS7030: Not all code paths return a value.

2025-10-15T20:21:26.954698125Z [inf]  src/routes/skills.ts(122,51): error TS7030: Not all code paths return a value.
src/routes/skills.ts(143,52): error TS7030: Not all code paths return a value.

2025-10-15T20:21:26.954724358Z [inf]  src/routes/superadmin.ts(2,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.95473092Z [inf]  src/routes/superadmin.ts(3,32): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.
src/routes/superadmin.ts(168,44): error TS7006: Parameter 'tenant' implicitly has an 'any' type.

2025-10-15T20:21:26.95475233Z [inf]  src/routes/superadmin.ts(290,40): error TS7006: Parameter 't' implicitly has an 'any' type.
src/routes/superadmin.ts(323,52): error TS7006: Parameter 'sum' implicitly has an 'any' type.

2025-10-15T20:21:26.954774482Z [inf]  src/routes/superadmin.ts(323,57): error TS7006: Parameter 'tenant' implicitly has an 'any' type.
src/routes/superadmin.ts(352,17): error TS7006: Parameter 'tenants' implicitly has an 'any' type.

2025-10-15T20:21:26.954778186Z [inf]  src/routes/superadmin.ts(352,28): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:21:26.954782206Z [inf]  src/routes/superadmin.ts(357,17): error TS7006: Parameter 'users' implicitly has an 'any' type.

2025-10-15T20:21:26.954808733Z [inf]  src/routes/superadmin.ts(357,26): error TS7031: Binding element 'desc' implicitly has an 'any' type.
src/routes/superadmin.ts(363,29): error TS7006: Parameter 'tenant' implicitly has an 'any' type.

2025-10-15T20:21:26.954837804Z [inf]  src/routes/superadmin.ts(363,37): error TS7006: Parameter 'idx' implicitly has an 'any' type.
src/routes/superadmin.ts(370,27): error TS7006: Parameter 'user' implicitly has an 'any' type.
src/routes/superadmin.ts(370,33): error TS7006: Parameter 'idx' implicitly has an 'any' type.

2025-10-15T20:21:26.954875462Z [inf]  src/routes/talent.ts(13,91): error TS7030: Not all code paths return a value.

2025-10-15T20:21:26.954884422Z [inf]  src/routes/upload.ts(6,20): error TS2307: Cannot find module './db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.954887907Z [inf]  src/routes/upload.ts(7,47): error TS2307: Cannot find module './db/schema/core.js' or its corresponding type declarations.

2025-10-15T20:21:26.95492629Z [inf]  src/routes/upload.ts(8,39): error TS2307: Cannot find module './db/schema/strategy.js' or its corresponding type declarations.

2025-10-15T20:21:26.954937074Z [inf]  src/routes/upload.ts(353,20): error TS2304: Cannot find name 'structure'.
src/routes/upload.ts(365,26): error TS2339: Property 'roles' does not exist on type 'StructureAnalysisOutput'.

2025-10-15T20:21:26.954952128Z [inf]  src/services/agents/agent-manager.ts(6,20): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.954971487Z [inf]  src/services/agents/agent-manager.ts(7,88): error TS2307: Cannot find module '../../../db/schema.js' or its corresponding type declarations.
src/services/agents/agent-manager.ts(313,27): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:21:26.954986317Z [inf]  src/services/agents/agent-manager.ts(394,34): error TS7006: Parameter 't' implicitly has an 'any' type.

2025-10-15T20:21:26.955042125Z [inf]  src/services/agents/bonus/bonus-agent.ts(45,15): error TS2739: Type '{ insights: { type: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; description: string; confidence: number; category: string; impact: "high" | "medium" | "low"; evidence: string[]; relatedMetrics: string[]; }[]; ... 4 more ...; risks: { ...; }[]; }' is missing the following properties from type 'BonusAnalysisResult': recommendBonus, recommendedAmount, bonusType, rationale
src/services/agents/bonus/bonus-agent.ts(46,15): error TS2353: Object literal may only specify known properties, and 'employeeId' does not exist in type '{ metadata: { processingTime: number; quality: number; recordCount: number; completeness: number; anomalies: string[]; }; cleaned: Record<string, unknown>; normalized: Record<string, number>; structured: { ...; }; }'.

2025-10-15T20:21:26.955064702Z [inf]  src/services/agents/bonus/bonus-agent.ts(79,72): error TS2769: No overload matches this call.
  Overload 1 of 2, '(value: { tenantId: string | SQL<unknown> | Placeholder<string, any>; employeeId: string | SQL<unknown> | Placeholder<string, any>; triggerSource: string | SQL<...> | Placeholder<...>; ... 11 more ...; triggerData?: unknown; }): PgInsertBase<...>', gave the following error.
    Type 'number' is not assignable to type 'string | SQL<unknown> | Placeholder<string, any>'.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; employeeId: string | SQL<unknown> | Placeholder<string, any>; triggerSource: string | SQL<...> | Placeholder<...>; ... 11 more ...; triggerData?: unknown; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; employeeId: string | SQL<unknown> | Placeholder<string, any>; triggerSource: string | SQL<...> | Placeholder<...>; ... 11 more ...; triggerData?: unknown; }[]'.
src/services/agents/culture/culture-agent.ts(11,20): error TS2307: Cannot find module '../../../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.955099122Z [inf]  src/services/agents/culture/culture-agent.ts(12,57): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955162127Z [inf]  src/services/agents/hiring/hiring-agent.ts(108,15): error TS2739: Type '{ insights: { type: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; description: string; confidence: number; category: string; impact: "high" | "medium" | "low"; evidence: string[]; relatedMetrics: string[]; }[]; ... 4 more ...; risks: { ...; }[]; }' is missing the following properties from type 'HiringAnalysisResult': responsibilities, requirements, compensation, interview
src/services/agents/hiring/hiring-agent.ts(110,13): error TS2322: Type 'IndustryData' is not assignable to type 'Record<string, number>'.
  Index signature for type 'string' is missing in type 'IndustryData'.

2025-10-15T20:21:26.955189585Z [inf]  src/services/agents/hiring/hiring-agent.ts(139,32): error TS2339: Property 'positionTitle' does not exist on type '{}'.
src/services/agents/hiring/hiring-agent.ts(140,29): error TS2339: Property 'department' does not exist on type '{}'.
src/services/agents/hiring/hiring-agent.ts(143,30): error TS2339: Property 'rationale' does not exist on type '{}'.
src/services/agents/lxp/lxp-agent.ts(48,17): error TS2353: Object literal may only specify known properties, and 'skillsGaps' does not exist in type '{ metadata: { processingTime: number; quality: number; recordCount: number; completeness: number; anomalies: string[]; }; cleaned: Record<string, unknown>; normalized: Record<string, number>; structured: { ...; }; }'.

2025-10-15T20:21:26.955217091Z [inf]  src/services/agents/lxp/lxp-agent.ts(66,36): error TS2339: Property 'recommendedPath' does not exist on type '{ insights: { type: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; description: string; confidence: number; category: string; impact: "high" | "medium" | "low"; evidence: string[]; relatedMetrics: string[]; }[]; ... 4 more ...; risks: { ...; }[]; }'.

2025-10-15T20:21:26.955227248Z [inf]  src/services/agents/lxp/lxp-agent.ts(72,27): error TS2339: Property 'recommendedPath' does not exist on type '{ insights: { type: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; description: string; confidence: number; category: string; impact: "high" | "medium" | "low"; evidence: string[]; relatedMetrics: string[]; }[]; ... 4 more ...; risks: { ...; }[]; }'.
src/services/agents/lxp/lxp-agent.ts(72,60): error TS2339: Property 'recommendedPath' does not exist on type '{ insights: { type: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; description: string; confidence: number; category: string; impact: "high" | "medium" | "low"; evidence: string[]; relatedMetrics: string[]; }[]; ... 4 more ...; risks: { ...; }[]; }'.

2025-10-15T20:21:26.955236338Z [inf]  src/services/agents/lxp/lxp-agent.ts(73,49): error TS2339: Property 'recommendedPath' does not exist on type '{ insights: { type: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; description: string; confidence: number; category: string; impact: "high" | "medium" | "low"; evidence: string[]; relatedMetrics: string[]; }[]; ... 4 more ...; risks: { ...; }[]; }'.

2025-10-15T20:21:26.955249562Z [inf]  src/services/agents/performance/performance-agent.ts(10,66): error TS2459: Module '"../skills/skills-agent.js"' declares 'SkillCategoryAnalysis' locally, but it is not exported.

2025-10-15T20:21:26.95526468Z [inf]  src/services/agents/performance/performance-agent.ts(72,27): error TS2304: Cannot find name 'CultureAgent'.
src/services/agents/performance/performance-agent.ts(73,26): error TS2304: Cannot find name 'SkillsAgent'.

2025-10-15T20:21:26.955285387Z [inf]  src/services/agents/performance/performance-agent.ts(106,15): error TS2741: Property 'summary' is missing in type '{ insights: { type: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; description: string; confidence: number; category: string; impact: "high" | "medium" | "low"; evidence: string[]; relatedMetrics: string[]; }[]; ... 4 more ...; risks: { ...; }[]; }' but required in type 'PerformanceAnalysisResult'.

2025-10-15T20:21:26.95528991Z [inf]  src/services/agents/performance/performance-agent.ts(108,13): error TS2322: Type 'IndustryData' is not assignable to type 'Record<string, number>'.
  Index signature for type 'string' is missing in type 'IndustryData'.

2025-10-15T20:21:26.955315348Z [inf]  src/services/agents/skills/skills-agent.ts(4,20): error TS2307: Cannot find module '../../../../db/index.js' or its corresponding type declarations.
src/services/agents/skills/skills-agent.ts(5,84): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955321902Z [inf]  src/services/agents/skills/skills-agent.ts(724,39): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955325385Z [inf]  src/services/agents/structure-agent.ts(2,20): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.955343238Z [inf]  src/services/agents/structure-agent.ts(3,58): error TS2307: Cannot find module '../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955355415Z [inf]  src/services/agents/structure/structure-agent.ts(4,20): error TS2307: Cannot find module '../../../../db/index.js' or its corresponding type declarations.
src/services/agents/structure/structure-agent.ts(5,45): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955416335Z [inf]  src/services/agents/structure/structure-agent.ts(507,39): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.
src/services/agents/talent/talent-agent.ts(48,15): error TS2740: Type '{ insights: { type: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; description: string; confidence: number; category: string; impact: "high" | "medium" | "low"; evidence: string[]; relatedMetrics: string[]; }[]; ... 4 more ...; risks: { ...; }[]; }' is missing the following properties from type 'TalentAnalysisResult': isHighPotential, potentialRating, strengths, developmentAreas, and 2 more.
src/services/agents/talent/talent-agent.ts(49,15): error TS2353: Object literal may only specify known properties, and 'employeeId' does not exist in type '{ metadata: { processingTime: number; quality: number; recordCount: number; completeness: number; anomalies: string[]; }; cleaned: Record<string, unknown>; normalized: Record<string, number>; structured: { ...; }; }'.

2025-10-15T20:21:26.955472772Z [inf]  src/services/auth.ts(4,20): error TS2307: Cannot find module './db/client.js' or its corresponding type declarations.
src/services/auth.ts(5,42): error TS2307: Cannot find module './db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955484022Z [inf]  src/services/auth.ts(35,39): error TS2304: Cannot find name 'SALT_ROUNDS'.

2025-10-15T20:21:26.955489004Z [inf]  src/services/modules/hiring/core/culture-fit-assessor.ts(5,20): error TS2307: Cannot find module '../../../../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.955514536Z [inf]  src/services/modules/hiring/hiring-module.ts(6,20): error TS2307: Cannot find module '../../../../db/index.js' or its corresponding type declarations.
src/services/modules/hiring/hiring-module.ts(7,61): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955519766Z [inf]  src/services/modules/hiring/hiring-module.ts(89,20): error TS7006: Parameter 's' implicitly has an 'any' type.

2025-10-15T20:21:26.955543025Z [inf]  src/services/modules/hiring/hiring-module.ts(150,49): error TS7006: Parameter 'r' implicitly has an 'any' type.
src/services/modules/hiring/hiring-module.ts(274,22): error TS7006: Parameter 'app' implicitly has an 'any' type.

2025-10-15T20:21:26.955577162Z [inf]  src/services/modules/lxp/lxp-module.ts(6,20): error TS2307: Cannot find module '../../../../db/index.js' or its corresponding type declarations.
src/services/modules/lxp/lxp-module.ts(7,59): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.
src/services/modules/lxp/lxp-module.ts(145,44): error TS7006: Parameter 'course' implicitly has an 'any' type.

2025-10-15T20:21:26.955594014Z [inf]  src/services/modules/lxp/lxp-module.ts(149,29): error TS7006: Parameter 'course' implicitly has an 'any' type.

2025-10-15T20:21:26.95560119Z [inf]  src/services/monitoring/health-check.ts(6,20): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.955620762Z [inf]  src/services/monitoring/metrics.ts(177,35): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.
src/services/monitoring/metrics.ts(178,57): error TS2307: Cannot find module '../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.95563996Z [inf]  src/services/orchestrator/architect-ai.ts(6,20): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.
src/services/orchestrator/architect-ai.ts(7,47): error TS2307: Cannot find module '../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955666171Z [inf]  src/services/orchestrator/architect-ai.ts(299,48): error TS7006: Parameter 'acc' implicitly has an 'any' type.

2025-10-15T20:21:26.955674161Z [inf]  src/services/orchestrator/architect-ai.ts(299,53): error TS7006: Parameter 'user' implicitly has an 'any' type.
src/services/orchestrator/architect-ai.ts(307,38): error TS7006: Parameter 'dept' implicitly has an 'any' type.

2025-10-15T20:21:26.955704445Z [inf]  src/services/orchestrator/architect-ai.ts(314,26): error TS7006: Parameter 'user' implicitly has an 'any' type.
src/services/queue.ts(5,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.955713457Z [inf]  src/services/queue.ts(6,45): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955718211Z [inf]  src/services/results/trigger-engine.ts(4,20): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.
src/services/results/trigger-engine.ts(5,45): error TS2307: Cannot find module '../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.955749435Z [inf]  src/services/skills/skillsBotService.ts(8,20): error TS2307: Cannot find module '../../../db/client.js' or its corresponding type declarations.
src/services/skills/skillsBotService.ts(14,8): error TS2307: Cannot find module '../../../db/schema/skills.js' or its corresponding type declarations.

2025-10-15T20:21:26.95575452Z [inf]  src/services/skills/skillsBotService.ts(15,23): error TS2307: Cannot find module '../../../db/schema/core.js' or its corresponding type declarations.

2025-10-15T20:21:26.955757803Z [inf]  src/services/skills/skillsBotService.ts(18,39): error TS2307: Cannot find module './skillsAnalysisService.js' or its corresponding type declarations.

2025-10-15T20:21:26.955787006Z [inf]  src/services/skills/skillsBotService.ts(62,14): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?

2025-10-15T20:21:26.955792234Z [inf]  src/services/skills/skillsBotService.ts(70,21): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?

2025-10-15T20:21:26.955808435Z [inf]  src/services/skills/skillsBotService.ts(115,14): error TS2304: Cannot find name 'BotResponse'.
src/services/skills/skillsBotService.ts(181,14): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:21:26.955828805Z [inf]  src/services/skills/skillsBotService.ts(224,14): error TS2304: Cannot find name 'BotResponse'.
src/services/skills/skillsBotService.ts(270,14): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:21:26.955853946Z [inf]  src/services/skills/skillsBotService.ts(311,14): error TS2304: Cannot find name 'BotResponse'.
src/services/skills/skillsBotService.ts(426,15): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:21:26.955861641Z [inf]  src/services/skills/skillsBotService.ts(447,81): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?

2025-10-15T20:21:26.955868163Z [inf]  src/services/skills/skillsBotService.ts(461,83): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?

2025-10-15T20:21:26.955872346Z [inf]  src/services/skills/skillsBotService.ts(473,85): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?

2025-10-15T20:21:26.95590577Z [inf]  src/services/skills/skillsBotService.ts(492,88): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?
src/services/skills/skillsBotService.ts(504,85): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:21:26.955913465Z [inf]  src/services/skills/skillsBotService.ts(516,80): error TS2304: Cannot find name 'BotResponse'.
src/services/skills/skillsBotService.ts(546,57): error TS2339: Property 'length' does not exist on type '{}'.

2025-10-15T20:21:26.955924692Z [inf]  src/services/skills/skillsBotService.ts(574,58): error TS2339: Property 'length' does not exist on type '{}'.
src/services/skills/skillsBotService.ts(577,56): error TS2339: Property 'length' does not exist on type '{}'.

2025-10-15T20:21:26.955947752Z [inf]  src/services/skills/skillsBotService.ts(580,50): error TS2339: Property 'length' does not exist on type '{}'.

2025-10-15T20:21:26.955996217Z [inf]  src/services/social-media/scheduler.ts(5,20): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.
src/services/social-media/scheduler.ts(6,55): error TS2307: Cannot find module '../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.956119756Z [inf]  src/services/stripe-service.ts(3,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/services/stripe-service.ts(4,55): error TS2307: Cannot find module '../../db/schema/payments.js' or its corresponding type declarations.

2025-10-15T20:21:26.956200245Z [inf]  src/services/stripe.ts(4,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/services/stripe.ts(5,35): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.
src/services/workflow/automated-flow.ts(3,20): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.

2025-10-15T20:21:26.956212677Z [inf]  src/services/workflow/automated-flow.ts(4,48): error TS2307: Cannot find module '../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.956264876Z [inf]  src/types/hiring.ts(13,8): error TS2307: Cannot find module '../../db/schema/hiring.js' or its corresponding type declarations.

2025-10-15T20:21:26.956311096Z [inf]  src/types/lxp.ts(14,8): error TS2307: Cannot find module '../../db/schema/lxp-extended.js' or its corresponding type declarations.

2025-10-15T20:21:26.956375812Z [inf]  src/types/performance.ts(16,8): error TS2307: Cannot find module '../../db/schema/performance.js' or its corresponding type declarations.

2025-10-15T20:21:26.956405223Z [inf]  src/types/shared.ts(15,8): error TS2307: Cannot find module '../../db/schema/core.js' or its corresponding type declarations.
src/types/shared.ts(20,8): error TS2307: Cannot find module '../../db/schema/triggers.js' or its corresponding type declarations.

2025-10-15T20:21:26.956414485Z [inf]  src/utils/module-access.ts(6,20): error TS2307: Cannot find module '../../db/index.js' or its corresponding type declarations.
src/utils/module-access.ts(7,25): error TS2307: Cannot find module '../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:26.956443528Z [inf]  utils/module-access.ts(4,20): error TS2307: Cannot find module '../db/index.js' or its corresponding type declarations.
utils/module-access.ts(5,25): error TS2307: Cannot find module '../db/schema.js' or its corresponding type declarations.

2025-10-15T20:21:27.190177109Z [err]  [builder 7/8] RUN npm run build
2025-10-15T20:21:27.210074546Z [err]  Dockerfile.prod:19
2025-10-15T20:21:27.210131432Z [err]  -------------------
2025-10-15T20:21:27.210140756Z [err]  17 |
2025-10-15T20:21:27.210148366Z [err]  18 |     # Build the application
2025-10-15T20:21:27.210157996Z [err]  19 | >>> RUN npm run build
2025-10-15T20:21:27.210163565Z [err]  20 |
2025-10-15T20:21:27.210169658Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2025-10-15T20:21:27.210175721Z [err]  -------------------
2025-10-15T20:21:27.210183196Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2