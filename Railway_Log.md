2025-10-15T21:54:29.068909748Z [inf]  [35m[Region: us-east4][0m
2025-10-15T21:54:29.073427268Z [inf]  [35m=========================
2025-10-15T21:54:29.073455120Z [inf]  Using Detected Dockerfile
2025-10-15T21:54:29.073460245Z [inf]  =========================
2025-10-15T21:54:29.073464611Z [inf]  [0m
2025-10-15T21:54:29.073480803Z [inf]  context: ljps-mj_w
2025-10-15T21:54:29.267508187Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:54:29.267571397Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:54:29.267589446Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:54:29.294350322Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T21:54:29.298487234Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-15T21:54:29.302427991Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-15T21:54:29.302466194Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-15T21:54:29.391757185Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-15T21:54:29.393110300Z [inf]  [internal] load .dockerignore
2025-10-15T21:54:29.393181994Z [inf]  [internal] load .dockerignore
2025-10-15T21:54:29.393349566Z [inf]  [internal] load .dockerignore
2025-10-15T21:54:29.424127443Z [inf]  [internal] load .dockerignore
2025-10-15T21:54:29.432217520Z [inf]  [builder 8/8] RUN npm prune --production
2025-10-15T21:54:29.432289155Z [inf]  [builder 7/8] RUN npm run build
2025-10-15T21:54:29.432303111Z [inf]  [builder 6/8] COPY . .
2025-10-15T21:54:29.432312601Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T21:54:29.432332377Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T21:54:29.432340466Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T21:54:29.432349105Z [inf]  [internal] load build context
2025-10-15T21:54:29.432357125Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T21:54:29.432365067Z [inf]  [production 4/9] WORKDIR /app
2025-10-15T21:54:29.432391061Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-15T21:54:29.432399520Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-15T21:54:29.432413899Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T21:54:29.432444882Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2025-10-15T21:54:29.432453952Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2025-10-15T21:54:29.432495471Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2025-10-15T21:54:29.432503762Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2025-10-15T21:54:29.432510861Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2025-10-15T21:54:29.432528273Z [inf]  [internal] load build context
2025-10-15T21:54:29.434290317Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T21:54:29.470575549Z [inf]  [internal] load build context
2025-10-15T21:54:29.470636090Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T21:54:29.471047600Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T21:54:29.471158187Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-15T21:54:29.556062761Z [inf]  [internal] load build context
2025-10-15T21:54:29.562202826Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T21:54:29.562261736Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T21:54:29.562297283Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T21:54:29.810875818Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-15T21:54:29.814097182Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-15T21:54:29.819809798Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T21:54:29.823601575Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T21:54:29.913377889Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T21:54:29.918008855Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T21:54:29.956712141Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-15T21:54:29.960466018Z [inf]  [production 4/9] WORKDIR /app
2025-10-15T21:54:30.049591151Z [inf]  [production 4/9] WORKDIR /app
2025-10-15T21:54:33.663593605Z [inf]  npm warn deprecated mimelib@0.3.1: This project is unmaintained

2025-10-15T21:54:33.976338644Z [inf]  npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

2025-10-15T21:54:34.123547993Z [inf]  npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

2025-10-15T21:54:34.255043975Z [inf]  npm warn deprecated mailparser@0.6.2: Mailparser versions older than v2.3.0 are deprecated

2025-10-15T21:54:34.483145243Z [inf]  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

2025-10-15T21:54:34.882325165Z [inf]  npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is

2025-10-15T21:54:34.895137185Z [inf]  npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is

2025-10-15T21:54:35.802088639Z [inf]  npm warn deprecated sendgrid@5.2.3: Please see v6.X+ at https://www.npmjs.com/org/sendgrid

2025-10-15T21:54:39.409335464Z [inf]  
added 433 packages, and audited 434 packages in 9s

2025-10-15T21:54:39.409359665Z [inf]  
67 packages are looking for funding
  run `npm fund` for details

2025-10-15T21:54:39.437429078Z [inf]  
4 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

2025-10-15T21:54:39.438832041Z [inf]  npm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice

2025-10-15T21:54:39.604587055Z [inf]  npm warn using --force Recommended protections disabled.

2025-10-15T21:54:40.237900820Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T21:54:40.253772633Z [inf]  [builder 6/8] COPY . .
2025-10-15T21:54:40.453901345Z [inf]  [builder 6/8] COPY . .
2025-10-15T21:54:40.457522915Z [inf]  [builder 7/8] RUN npm run build
2025-10-15T21:54:40.724276225Z [inf]  
> mizan-server@1.0.0 build
> tsc


2025-10-15T21:54:54.169535274Z [inf]  src/routes/analyses.ts(76,7): error TS2322: Type 'unknown' is not assignable to type 'number'.

2025-10-15T21:54:54.169752728Z [inf]  src/routes/analyses.ts(77,7): error TS2322: Type 'unknown' is not assignable to type 'number'.

2025-10-15T21:54:54.169774021Z [inf]  src/routes/analyses.ts(84,73): error TS2345: Argument of type '{ tenantId: any; structureData: StructureData; strategyData: StrategyData; }' is not assignable to parameter of type '{ tenantId: string; companyName: string; structureData: StructureData; strategyData?: StrategyData; useFastMode?: boolean; }'.
  Property 'companyName' is missing in type '{ tenantId: any; structureData: StructureData; strategyData: StrategyData; }' but required in type '{ tenantId: string; companyName: string; structureData: StructureData; strategyData?: StrategyData; useFastMode?: boolean; }'.

2025-10-15T21:54:54.169821977Z [inf]  src/routes/analyses.ts(88,30): error TS2339: Property 'id' does not exist on type 'TenantStrategy'.

2025-10-15T21:54:54.169835704Z [inf]  src/routes/analyses.ts(98,22): error TS2352: Conversion of type '{ overallScore: number; overallHealthInterpretation: string; spanAnalysis: { average: number; distribution: {}; outliers: undefined[]; }; layerAnalysis: { totalLayers: number; layerDistribution: {}; recommendations: undefined[]; }; recommendations: undefined[]; confidenceScore: number; }' to type 'StructureAnalysisOutput' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Property 'strategyAlignment' is missing in type '{ overallScore: number; overallHealthInterpretation: string; spanAnalysis: { average: number; distribution: {}; outliers: undefined[]; }; layerAnalysis: { totalLayers: number; layerDistribution: {}; recommendations: undefined[]; }; recommendations: undefined[]; confidenceScore: number; }' but required in type 'StructureAnalysisOutput'.
src/routes/analyses.ts(120,28): error TS2339: Property 'id' does not exist on type 'TenantStrategy'.

2025-10-15T21:54:54.169892547Z [inf]  src/routes/skills.ts(52,52): error TS2345: Argument of type '{ industry?: string; strategy?: string; tenantId?: string; companyId?: string; resumeData?: { employeeId?: string; resumeText?: string; }[]; organizationName?: string; employeeData?: { name?: string; role?: string; skills?: { ...; }[]; department?: string; employeeId?: string; experience?: number; }[]; }' is not assignable to parameter of type 'SkillsAnalysisInput'.
  Property 'tenantId' is optional in type '{ industry?: string; strategy?: string; tenantId?: string; companyId?: string; resumeData?: { employeeId?: string; resumeText?: string; }[]; organizationName?: string; employeeData?: { name?: string; role?: string; skills?: { ...; }[]; department?: string; employeeId?: string; experience?: number; }[]; }' but required in type 'SkillsAnalysisInput'.
src/routes/skills.ts(99,23): error TS2448: Block-scoped variable 'skillsFramework' used before its declaration.

2025-10-15T21:54:54.169928261Z [inf]  src/routes/skills.ts(107,32): error TS2304: Cannot find name 'SkillsFramework'.

2025-10-15T21:54:54.170098513Z [inf]  src/routes/skills.ts(109,60): error TS2304: Cannot find name 'Skill'.

2025-10-15T21:54:54.170124751Z [inf]  src/services/agents/bonus/bonus-agent.ts(91,72): error TS2769: No overload matches this call.
  Overload 1 of 2, '(value: { tenantId: string | SQL<unknown> | Placeholder<string, any>; employeeId: string | SQL<unknown> | Placeholder<string, any>; triggerSource: string | SQL<...> | Placeholder<...>; ... 11 more ...; triggerData?: unknown; }): PgInsertBase<...>', gave the following error.
    Type 'number' is not assignable to type 'string | SQL<unknown> | Placeholder<string, any>'.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; employeeId: string | SQL<unknown> | Placeholder<string, any>; triggerSource: string | SQL<...> | Placeholder<...>; ... 11 more ...; triggerData?: unknown; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; employeeId: string | SQL<unknown> | Placeholder<string, any>; triggerSource: string | SQL<...> | Placeholder<...>; ... 11 more ...; triggerData?: unknown; }[]'.

2025-10-15T21:54:54.170208164Z [inf]  src/services/agents/hiring/hiring-agent.ts(111,13): error TS2353: Object literal may only specify known properties, and 'compensationData' does not exist in type 'AnalysisContext'.

2025-10-15T21:54:54.170216657Z [inf]  src/services/agents/lxp/lxp-agent.ts(52,17): error TS2353: Object literal may only specify known properties, and 'domain' does not exist in type '{ frameworks?: { name?: string; description?: string; applicability?: number; components?: string[]; }[]; benchmarks?: { industry?: string; metric?: string; percentile25?: number; percentile50?: number; percentile75?: number; percentile90?: number; }[]; bestPractices?: { ...; }[]; industryContext?: { ...; }; }'.

2025-10-15T21:54:54.170253024Z [inf]  src/services/agents/lxp/lxp-agent.ts(60,17): error TS2353: Object literal may only specify known properties, and 'domain' does not exist in type 'AnalysisContext'.

2025-10-15T21:54:54.170285629Z [inf]  src/services/agents/performance/performance-agent.ts(10,10): error TS2724: '"../culture/culture-agent"' has no exported member named 'CultureAgent'. Did you mean 'cultureAgent'?

2025-10-15T21:54:54.170441255Z [inf]  src/services/agents/performance/performance-agent.ts(83,29): error TS2663: Cannot find name 'cultureAgent'. Did you mean the instance member 'this.cultureAgent'?
src/services/agents/performance/performance-agent.ts(84,28): error TS2663: Cannot find name 'skillsAgent'. Did you mean the instance member 'this.skillsAgent'?

2025-10-15T21:54:54.170504582Z [inf]  src/services/agents/performance/performance-agent.ts(113,13): error TS2353: Object literal may only specify known properties, and 'cultureGoals' does not exist in type 'AnalysisContext'.

2025-10-15T21:54:54.170606984Z [inf]  src/services/agents/performance/performance-agent.ts(119,41): error TS2551: Property 'confidenceScore' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'. Did you mean 'confidence'?

2025-10-15T21:54:54.170623729Z [inf]  src/services/agents/performance/performance-agent.ts(139,156): error TS2304: Cannot find name 'CultureAnalysisOutput'.

2025-10-15T21:54:54.170655824Z [inf]  src/services/agents/performance/performance-agent.ts(139,191): error TS2304: Cannot find name 'SkillsAnalysisResult'.

2025-10-15T21:54:54.170664185Z [inf]  src/services/agents/performance/performance-agent.ts(159,92): error TS2304: Cannot find name 'CultureAnalysisOutput'.

2025-10-15T21:54:54.170850297Z [inf]  src/services/agents/performance/performance-agent.ts(161,33): error TS2304: Cannot find name 'CultureAnalysisInput'.
src/services/agents/performance/performance-agent.ts(166,36): error TS2304: Cannot find name 'CultureAnalysisOutput'.
src/services/agents/performance/performance-agent.ts(175,97): error TS2304: Cannot find name 'SkillsAnalysisResult'.

2025-10-15T21:54:54.170893964Z [inf]  src/services/agents/performance/performance-agent.ts(177,32): error TS2304: Cannot find name 'SkillsAnalysisInput'.
src/services/agents/performance/performance-agent.ts(189,41): error TS2304: Cannot find name 'SkillCategoryAnalysis'.

2025-10-15T21:54:54.170901301Z [inf]  src/services/agents/performance/performance-agent.ts(278,168): error TS2304: Cannot find name 'CultureAnalysisOutput'.

2025-10-15T21:54:54.170950986Z [inf]  src/services/agents/performance/performance-agent.ts(278,203): error TS2304: Cannot find name 'SkillsAnalysisResult'.
src/services/agents/performance/performance-agent.ts(344,92): error TS2304: Cannot find name 'CultureAnalysisOutput'.
src/services/agents/performance/performance-agent.ts(344,127): error TS2304: Cannot find name 'SkillsAnalysisResult'.

2025-10-15T21:54:54.171002601Z [inf]  src/services/agents/structure/structure-agent.ts(456,11): error TS2322: Type '{ id: string; name: string; level: any; users: { [x: string]: any; }[]; parentId: any; }[]' is not assignable to type 'DepartmentData[]'.
  Type '{ id: string; name: string; level: any; users: { [x: string]: any; }[]; parentId: any; }' is not assignable to type 'DepartmentData'.
    Types of property 'users' are incompatible.
      Type '{ [x: string]: any; }[]' is not assignable to type '{ id: string; name?: string; }[]'.
        Property 'id' is missing in type '{ [x: string]: any; }' but required in type '{ id: string; name?: string; }'.

2025-10-15T21:54:54.171063411Z [inf]  src/services/agents/structure/structure-agent.ts(459,16): error TS2339: Property 'level' does not exist on type '{ id: string; name: string; createdAt: Date; updatedAt: Date; tenantId: string; managerId: string; description: string; parentDepartmentId: string; budget: string; headCount: number; users: { ...; }[]; }'.
src/services/agents/structure/structure-agent.ts(461,19): error TS2339: Property 'parentId' does not exist on type '{ id: string; name: string; createdAt: Date; updatedAt: Date; tenantId: string; managerId: string; description: string; parentDepartmentId: string; budget: string; headCount: number; users: { ...; }[]; }'.

2025-10-15T21:54:54.17107393Z [inf]  src/services/skills/skillsBotService.ts(62,40): error TS2554: Expected 0 arguments, but got 2.

2025-10-15T21:54:54.171149231Z [inf]  src/services/skills/skillsBotService.ts(113,7): error TS2741: Property 'message' is missing in type '{ response: string; suggestions: string[]; }' but required in type 'BotResponse'.
src/services/skills/skillsBotService.ts(144,11): error TS2353: Object literal may only specify known properties, and 'actionType' does not exist in type 'BotResponse'.
src/services/skills/skillsBotService.ts(152,18): error TS2339: Property 'skillsAnalysisService' does not exist on type 'SkillsBotService'.
src/services/skills/skillsBotService.ts(167,11): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.

2025-10-15T21:54:54.171176632Z [inf]  src/services/skills/skillsBotService.ts(172,11): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.

2025-10-15T21:54:54.171183749Z [inf]  src/services/skills/skillsBotService.ts(210,11): error TS2353: Object literal may only specify known properties, and 'actionType' does not exist in type 'BotResponse'.

2025-10-15T21:54:54.171215773Z [inf]  src/services/skills/skillsBotService.ts(217,7): error TS2741: Property 'message' is missing in type '{ response: string; suggestions: string[]; resources: any[]; nextSteps: string[]; }' but required in type 'BotResponse'.

2025-10-15T21:54:54.171223646Z [inf]  src/services/skills/skillsBotService.ts(244,9): error TS2741: Property 'message' is missing in type '{ response: string; suggestions: string[]; }' but required in type 'BotResponse'.

2025-10-15T21:54:54.171282981Z [inf]  src/services/skills/skillsBotService.ts(258,7): error TS2741: Property 'message' is missing in type '{ response: string; suggestions: string[]; resources: any[]; nextSteps: string[]; }' but required in type 'BotResponse'.
src/services/skills/skillsBotService.ts(298,11): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.
src/services/skills/skillsBotService.ts(303,11): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.

2025-10-15T21:54:54.171289658Z [inf]  src/services/skills/skillsBotService.ts(339,11): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.

2025-10-15T21:54:54.171324Z [inf]  src/services/skills/skillsBotService.ts(344,11): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.
src/services/skills/skillsBotService.ts(398,7): error TS2322: Type '{ id: string; createdAt: Date; tenantId: string; employeeId: string; profileId: string; analysisType: string; criticalGaps: unknown; moderateGaps: unknown; strengthAreas: unknown; trainingRecommendations: unknown; developmentPlan: unknown; ... 5 more ...; analyzedBy: string; }[]' is not assignable to type 'SkillGap[]'.
  Type '{ id: string; createdAt: Date; tenantId: string; employeeId: string; profileId: string; analysisType: string; criticalGaps: unknown; moderateGaps: unknown; strengthAreas: unknown; trainingRecommendations: unknown; developmentPlan: unknown; ... 5 more ...; analyzedBy: string; }' is missing the following properties from type 'SkillGap': skill, currentLevel, requiredLevel, gap, priority

2025-10-15T21:54:54.171335374Z [inf]  src/services/skills/skillsBotService.ts(469,7): error TS2353: Object literal may only specify known properties, and 'actionType' does not exist in type 'BotResponse'.

2025-10-15T21:54:54.171341427Z [inf]  src/services/skills/skillsBotService.ts(474,5): error TS2741: Property 'message' is missing in type '{ response: string; suggestions: string[]; }' but required in type 'BotResponse'.

2025-10-15T21:54:54.17137205Z [inf]  src/services/skills/skillsBotService.ts(495,9): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.

2025-10-15T21:54:54.171379311Z [inf]  src/services/skills/skillsBotService.ts(505,5): error TS2741: Property 'message' is missing in type '{ response: string; suggestions: string[]; }' but required in type 'BotResponse'.

2025-10-15T21:54:54.171415491Z [inf]  src/services/skills/skillsBotService.ts(517,5): error TS2741: Property 'message' is missing in type '{ response: string; suggestions: string[]; }' but required in type 'BotResponse'.

2025-10-15T21:54:54.171421812Z [inf]  src/services/skills/skillsBotService.ts(538,9): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.

2025-10-15T21:54:54.171457346Z [inf]  src/services/skills/skillsBotService.ts(543,9): error TS2322: Type '{ title: string; url: string; type: string; }' is not assignable to type 'string'.
src/services/skills/skillsBotService.ts(558,57): error TS2339: Property 'length' does not exist on type 'unknown'.

2025-10-15T21:54:54.171491533Z [inf]  src/services/skills/skillsBotService.ts(586,58): error TS2339: Property 'length' does not exist on type 'unknown'.
src/services/skills/skillsBotService.ts(589,56): error TS2339: Property 'length' does not exist on type 'unknown'.

2025-10-15T21:54:54.171506716Z [inf]  src/services/skills/skillsBotService.ts(592,50): error TS2339: Property 'length' does not exist on type 'unknown'.

2025-10-15T21:54:54.171510975Z [inf]  src/services/skills/skillsBotService.ts(626,5): error TS2322: Type '{ id: string; createdAt: Date; tenantId: string; employeeId: string; profileId: string; analysisType: string; criticalGaps: unknown; moderateGaps: unknown; strengthAreas: unknown; trainingRecommendations: unknown; developmentPlan: unknown; ... 5 more ...; analyzedBy: string; }[]' is not assignable to type 'SkillGap[]'.
  Type '{ id: string; createdAt: Date; tenantId: string; employeeId: string; profileId: string; analysisType: string; criticalGaps: unknown; moderateGaps: unknown; strengthAreas: unknown; trainingRecommendations: unknown; developmentPlan: unknown; ... 5 more ...; analyzedBy: string; }' is missing the following properties from type 'SkillGap': skill, currentLevel, requiredLevel, gap, priority

2025-10-15T21:54:54.412574703Z [err]  [builder 7/8] RUN npm run build
2025-10-15T21:54:54.430028521Z [err]  Dockerfile.prod:19
2025-10-15T21:54:54.430093060Z [err]  -------------------
2025-10-15T21:54:54.430103108Z [err]  17 |
2025-10-15T21:54:54.430110865Z [err]  18 |     # Build the application
2025-10-15T21:54:54.430119161Z [err]  19 | >>> RUN npm run build
2025-10-15T21:54:54.430124898Z [err]  20 |
2025-10-15T21:54:54.430133841Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2025-10-15T21:54:54.430139505Z [err]  -------------------
2025-10-15T21:54:54.430146127Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2