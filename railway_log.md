2025-10-19T13:25:58.876371473Z [inf]  
2025-10-19T13:26:00.347337406Z [inf]  [35m[Region: us-east4][0m
2025-10-19T13:26:00.352180094Z [inf]  [35m=========================
2025-10-19T13:26:00.352222980Z [inf]  Using Detected Dockerfile
2025-10-19T13:26:00.352229394Z [inf]  =========================
2025-10-19T13:26:00.352235016Z [inf]  [0m
2025-10-19T13:26:00.352256165Z [inf]  context: vvnv-ddH3
2025-10-19T13:26:00.492463603Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-19T13:26:00.492513968Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-19T13:26:00.492533911Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-19T13:26:00.500269614Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-19T13:26:00.501936609Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-19T13:26:00.509599101Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-19T13:26:00.509627057Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-19T13:26:00.748019155Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-19T13:26:00.748201104Z [inf]  [internal] load .dockerignore
2025-10-19T13:26:00.748212174Z [inf]  [internal] load .dockerignore
2025-10-19T13:26:00.748223200Z [inf]  [internal] load .dockerignore
2025-10-19T13:26:00.756961083Z [inf]  [internal] load .dockerignore
2025-10-19T13:26:00.760510039Z [inf]  [builder 8/8] RUN npm prune --production
2025-10-19T13:26:00.760541973Z [inf]  [builder 7/8] RUN npm run build
2025-10-19T13:26:00.760550485Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-19T13:26:00.760556747Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2025-10-19T13:26:00.760570605Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-19T13:26:00.760578450Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2025-10-19T13:26:00.760584783Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2025-10-19T13:26:00.760590777Z [inf]  [builder 2/8] WORKDIR /app
2025-10-19T13:26:00.760601408Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-19T13:26:00.760606742Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-19T13:26:00.760612166Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-19T13:26:00.760618867Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2025-10-19T13:26:00.760624779Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2025-10-19T13:26:00.760633494Z [inf]  [builder 6/8] COPY . .
2025-10-19T13:26:00.760639055Z [inf]  [internal] load build context
2025-10-19T13:26:00.760646478Z [inf]  [production 4/9] WORKDIR /app
2025-10-19T13:26:00.760651892Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-19T13:26:00.761047842Z [inf]  [internal] load build context
2025-10-19T13:26:00.761075754Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-19T13:26:00.767620201Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-19T13:26:00.767689759Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-19T13:26:00.767806564Z [inf]  [internal] load build context
2025-10-19T13:26:00.767940365Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-19T13:26:00.791079446Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-19T13:26:00.793506179Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-19T13:26:00.817281985Z [inf]  [internal] load build context
2025-10-19T13:26:01.090436382Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-19T13:26:01.976462567Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-19T13:26:01.976506519Z [inf]  [builder 2/8] WORKDIR /app
2025-10-19T13:26:02.032704613Z [inf]  [builder 2/8] WORKDIR /app
2025-10-19T13:26:02.033423264Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-19T13:26:02.055435785Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-19T13:26:02.056035294Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-19T13:26:02.056874092Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-19T13:26:02.059491751Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-19T13:26:02.121494650Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-19T13:26:02.122515163Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-19T13:26:02.334457422Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-19T13:26:02.335144088Z [inf]  [production 4/9] WORKDIR /app
2025-10-19T13:26:02.345811079Z [inf]  [production 4/9] WORKDIR /app
2025-10-19T13:26:04.56933721Z [inf]  npm warn deprecated mimelib@0.3.1: This project is unmaintained

2025-10-19T13:26:04.802166557Z [inf]  npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

2025-10-19T13:26:04.891501608Z [inf]  npm warn deprecated mailparser@0.6.2: Mailparser versions older than v2.3.0 are deprecated

2025-10-19T13:26:04.945438442Z [inf]  npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

2025-10-19T13:26:05.09268885Z [inf]  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

2025-10-19T13:26:05.435286873Z [inf]  npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is

2025-10-19T13:26:05.435555898Z [inf]  npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is

2025-10-19T13:26:06.082810341Z [inf]  npm warn deprecated sendgrid@5.2.3: Please see v6.X+ at https://www.npmjs.com/org/sendgrid

2025-10-19T13:26:08.925769054Z [inf]  
added 433 packages, and audited 434 packages in 7s

2025-10-19T13:26:08.92581145Z [inf]  

2025-10-19T13:26:08.925825046Z [inf]  67 packages are looking for funding

2025-10-19T13:26:08.925859531Z [inf]    run `npm fund` for details

2025-10-19T13:26:08.96072084Z [inf]  
4 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

2025-10-19T13:26:08.962302177Z [inf]  npm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice

2025-10-19T13:26:09.114149053Z [inf]  npm warn using --force Recommended protections disabled.

2025-10-19T13:26:09.541896662Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-19T13:26:09.545597810Z [inf]  [builder 6/8] COPY . .
2025-10-19T13:26:09.686542995Z [inf]  [builder 6/8] COPY . .
2025-10-19T13:26:09.687482148Z [inf]  [builder 7/8] RUN npm run build
2025-10-19T13:26:09.927296776Z [inf]  
> mizan-server@1.0.0 build
> tsc


2025-10-19T13:26:20.168902728Z [inf]  src/routes/public-structure.ts(233,9): error TS2353: Object literal may only specify known properties, and 'keyFindings' does not exist in type 'StructureAnalysisOutput'.

2025-10-19T13:26:20.169121923Z [inf]  src/services/agents/hiring/hiring-agent.ts(193,17): error TS2353: Object literal may only specify known properties, and 'averageSalary' does not exist in type '{ p25: number; p50: number; p75: number; }'.
src/services/agents/hiring/hiring-agent.ts(193,45): error TS2339: Property 'averageSalary' does not exist on type 'IndustryData'.
src/services/agents/hiring/hiring-agent.ts(194,43): error TS2339: Property 'salaryRange' does not exist on type 'IndustryData'.
src/services/agents/hiring/hiring-agent.ts(195,42): error TS2339: Property 'growthRate' does not exist on type 'IndustryData'.
src/services/agents/hiring/hiring-agent.ts(197,36): error TS2339: Property 'benefits' does not exist on type 'IndustryData'.
src/services/agents/lxp/lxp-agent.ts(371,11): error TS2353: Object literal may only specify known properties, and 'progress' does not exist in type '{ quality?: number; processingTime?: number; recordCount?: number; completeness?: number; anomalies?: string[]; }'.
src/services/agents/lxp/lxp-agent.ts(380,79): error TS2339: Property 'includes' does not exist on type '{ description?: string; type?: "trend" | "gap" | "strength" | "weakness" | "opportunity" | "threat"; category?: string; confidence?: number; impact?: "medium" | "low" | "high"; evidence?: string[]; relatedMetrics?: string[]; }'.

2025-10-19T13:26:20.169161724Z [inf]  src/services/agents/performance/performance-agent.ts(362,17): error TS2769: No overload matches this call.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; title: string | SQL<unknown> | Placeholder<string, any>; managerId: string | SQL<unknown> | Placeholder<...>; ... 30 more ...; attachments?: unknown; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'tenantId' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; title: string | SQL<unknown> | Placeholder<string, any>; managerId: string | SQL<unknown> | Placeholder<...>; ... 30 more ...; attachments?: unknown; }[]'.

2025-10-19T13:26:20.169286076Z [inf]  src/services/orchestrator/architect-ai.ts(265,23): error TS2339: Property 'parentId' does not exist on type '{ id: string; name: string; headId?: string; headCount?: number; }'.
src/services/orchestrator/architect-ai.ts(267,22): error TS2339: Property 'manager' does not exist on type '{ id: string; name: string; headId?: string; headCount?: number; }'.
src/services/orchestrator/architect-ai.ts(281,49): error TS2345: Argument of type '{ companyId: string; tenantId: string; orgChart: { departments: { id: string; name: string; parentId: any; headCount: number; manager: any; }[]; reportingLines: { from: string; to: string; type: string; }[]; roles: { ...; }[]; }; strategy: string; }' is not assignable to parameter of type 'StructureAnalysisInput'.
  The types of 'orgChart.reportingLines' are incompatible between these types.
    Type '{ from: string; to: string; type: string; }[]' is not assignable to type '{ from: string; to: string; type: "direct" | "dotted" | "functional"; }[]'.
      Type '{ from: string; to: string; type: string; }' is not assignable to type '{ from: string; to: string; type: "direct" | "dotted" | "functional"; }'.
        Types of property 'type' are incompatible.
          Type 'string' is not assignable to type '"direct" | "dotted" | "functional"'.

2025-10-19T13:26:20.1693001Z [inf]  src/services/orchestrator/architect-ai.ts(296,52): error TS2339: Property 'description' does not exist on type 'never'.

2025-10-19T13:26:20.169333733Z [inf]  src/services/orchestrator/architect-ai.ts(418,3): error TS2741: Property 'employees' is missing in type '{ departments: { id: string; name: string; headId: string; headCount: number; }[]; reportingLines: undefined[]; roles: { id: string; title: string; department: any; departmentId: string; reportsTo: string; }[]; }' but required in type 'DefaultOrgChart'.

2025-10-19T13:26:20.169345436Z [inf]  src/services/orchestrator/architect-ai.ts(429,31): error TS2339: Property 'find' does not exist on type 'PgTableWithColumns<{ name: "departments"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "departments"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 8 more ...; updatedAt: P...'.

2025-10-19T13:26:20.169427835Z [inf]  src/services/skills/skillsBotService.ts(268,83): error TS2352: Conversion of type 'ResumeData' to type 'Record<string, unknown>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Index signature for type 'string' is missing in type 'ResumeData'.

2025-10-19T13:26:20.169437909Z [inf]  src/services/skills/skillsBotService.ts(321,65): error TS2345: Argument of type 'ResumeBuildingData' is not assignable to parameter of type 'Record<string, unknown>'.
  Index signature for type 'string' is missing in type 'ResumeBuildingData'.

2025-10-19T13:26:20.169458688Z [inf]  src/services/skills/skillsBotService.ts(338,65): error TS2345: Argument of type 'ResumeBuildingData' is not assignable to parameter of type 'Record<string, unknown>'.
  Index signature for type 'string' is missing in type 'ResumeBuildingData'.

2025-10-19T13:26:20.293221852Z [err]  [builder 7/8] RUN npm run build
2025-10-19T13:26:20.345719751Z [err]  Dockerfile.prod:19
2025-10-19T13:26:20.345751370Z [err]  -------------------
2025-10-19T13:26:20.345756717Z [err]  17 |
2025-10-19T13:26:20.345760803Z [err]  18 |     # Build the application
2025-10-19T13:26:20.345765469Z [err]  19 | >>> RUN npm run build
2025-10-19T13:26:20.345769662Z [err]  20 |
2025-10-19T13:26:20.345773994Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2025-10-19T13:26:20.345777733Z [err]  -------------------
2025-10-19T13:26:20.345781999Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2