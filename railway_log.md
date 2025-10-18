2025-10-18T01:10:07.001680567Z [inf]  
2025-10-18T01:10:08.211631646Z [inf]  [35m[Region: us-east4][0m
2025-10-18T01:10:08.215091527Z [inf]  [35m=========================
2025-10-18T01:10:08.215134689Z [inf]  Using Detected Dockerfile
2025-10-18T01:10:08.215138690Z [inf]  =========================
2025-10-18T01:10:08.215141988Z [inf]  [0m
2025-10-18T01:10:08.215156757Z [inf]  context: jvnb-uTIO
2025-10-18T01:10:08.364012270Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:10:08.364070236Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:10:08.364083428Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:10:08.373428426Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:10:08.376968254Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-18T01:10:08.381448653Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-18T01:10:08.381503316Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-18T01:10:08.620787273Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-18T01:10:08.620859299Z [inf]  [internal] load .dockerignore
2025-10-18T01:10:08.620879480Z [inf]  [internal] load .dockerignore
2025-10-18T01:10:08.621045612Z [inf]  [internal] load .dockerignore
2025-10-18T01:10:08.631776814Z [inf]  [internal] load .dockerignore
2025-10-18T01:10:08.636501233Z [inf]  [builder 8/8] RUN npm prune --production
2025-10-18T01:10:08.636541110Z [inf]  [builder 7/8] RUN npm run build
2025-10-18T01:10:08.636552073Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-18T01:10:08.636561890Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2025-10-18T01:10:08.636575459Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:08.636585660Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2025-10-18T01:10:08.636595830Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2025-10-18T01:10:08.636604778Z [inf]  [builder 2/8] WORKDIR /app
2025-10-18T01:10:08.636615866Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-18T01:10:08.636624442Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-18T01:10:08.636633569Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-18T01:10:08.636642037Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2025-10-18T01:10:08.636654812Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2025-10-18T01:10:08.636669216Z [inf]  [builder 6/8] COPY . .
2025-10-18T01:10:08.636676973Z [inf]  [internal] load build context
2025-10-18T01:10:08.636686649Z [inf]  [production 4/9] WORKDIR /app
2025-10-18T01:10:08.636696195Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-18T01:10:08.636717269Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:08.636726912Z [inf]  [internal] load build context
2025-10-18T01:10:08.642640599Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:08.642694882Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:08.642885064Z [inf]  [internal] load build context
2025-10-18T01:10:08.643004404Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:08.662308114Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:08.664560008Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:08.704179057Z [inf]  [internal] load build context
2025-10-18T01:10:09.211577245Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:10.139231611Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:10:10.145694431Z [inf]  [builder 2/8] WORKDIR /app
2025-10-18T01:10:10.145737612Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-18T01:10:10.235267435Z [inf]  [builder 2/8] WORKDIR /app
2025-10-18T01:10:10.236365997Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-18T01:10:10.237403081Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-18T01:10:10.239039837Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-18T01:10:10.255186479Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-18T01:10:10.256176548Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-18T01:10:10.268773983Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-18T01:10:10.269904246Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-18T01:10:10.439651488Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-18T01:10:10.440387261Z [inf]  [production 4/9] WORKDIR /app
2025-10-18T01:10:10.453320928Z [inf]  [production 4/9] WORKDIR /app
2025-10-18T01:10:12.842520731Z [inf]  npm warn deprecated mimelib@0.3.1: This project is unmaintained

2025-10-18T01:10:13.230602929Z [inf]  npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

2025-10-18T01:10:13.423326951Z [inf]  npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

2025-10-18T01:10:13.458616715Z [inf]  npm warn deprecated mailparser@0.6.2: Mailparser versions older than v2.3.0 are deprecated

2025-10-18T01:10:13.711932197Z [inf]  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

2025-10-18T01:10:14.028603683Z [inf]  npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is

2025-10-18T01:10:14.037542273Z [inf]  npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is

2025-10-18T01:10:14.789050863Z [inf]  npm warn deprecated sendgrid@5.2.3: Please see v6.X+ at https://www.npmjs.com/org/sendgrid

2025-10-18T01:10:17.773756322Z [inf]  
added 433 packages, and audited 434 packages in 7s

67 packages are looking for funding

2025-10-18T01:10:17.77377356Z [inf]    run `npm fund` for details

2025-10-18T01:10:17.799399465Z [inf]  
4 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

2025-10-18T01:10:17.800750922Z [inf]  npm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice

2025-10-18T01:10:17.942057139Z [inf]  npm warn using --force Recommended protections disabled.

2025-10-18T01:10:18.374189992Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-18T01:10:18.374959772Z [inf]  [builder 6/8] COPY . .
2025-10-18T01:10:18.502074966Z [inf]  [builder 6/8] COPY . .
2025-10-18T01:10:18.503355746Z [inf]  [builder 7/8] RUN npm run build
2025-10-18T01:10:18.726850133Z [inf]  
> mizan-server@1.0.0 build
> tsc


2025-10-18T01:10:30.510054632Z [inf]  src/routes/admin.ts(592,36): error TS2339: Property 'id' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'id' does not exist on type '{ [x: string]: any; }[]'.

2025-10-18T01:10:30.51014946Z [inf]  src/routes/admin.ts(593,38): error TS2339: Property 'name' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'name' does not exist on type '{ [x: string]: any; }[]'.
src/routes/agents.ts(3,35): error TS2305: Module '"../middleware/auth"' has no exported member 'validateTenantAccess'.

2025-10-18T01:10:30.510187637Z [inf]  src/routes/agents.ts(6,10): error TS2724: '"../db/schema"' has no exported member named 'agentAnalysesTable'. Did you mean 'agentAnalyses'?
src/routes/agents.ts(6,30): error TS2305: Module '"../db/schema"' has no exported member 'triggersTable'.
src/routes/agents.ts(6,45): error TS2305: Module '"../db/schema"' has no exported member 'recommendationsTable'.

2025-10-18T01:10:30.510192035Z [inf]  src/routes/agents.ts(7,25): error TS2305: Module '"drizzle-orm"' has no exported member 'limit'.
src/routes/analyses.ts(16,10): error TS2614: Module '"../services/agents/lxp/lxp-agent"' has no exported member 'lxpAgent'. Did you mean to use 'import lxpAgent from "../services/agents/lxp/lxp-agent"' instead?

2025-10-18T01:10:30.510400952Z [inf]  src/routes/analyses.ts(17,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.
src/routes/analyses.ts(26,11): error TS2430: Interface 'AuthenticatedRequest' incorrectly extends interface 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
  Types of property 'user' are incompatible.
    Property 'name' is missing in type '{ id: string; tenantId: string; email: string; role: string; }' but required in type 'AuthenticatedUser'.
src/routes/analyses.ts(88,27): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/analyses.ts(185,25): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.510415574Z [inf]  src/routes/analyses.ts(239,25): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<void>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<void>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.510509402Z [inf]  src/routes/analyses.ts(276,25): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<void>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<void>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.510517834Z [inf]  src/routes/analyses.ts(322,29): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.510548032Z [inf]  src/routes/analyses.ts(349,7): error TS2353: Object literal may only specify known properties, and 'userId' does not exist in type '{ tenantId?: string; clientStrategy?: { vision?: string; mission?: string; strategy?: string; values?: string[]; }; clientContext?: { industry?: string; marketPosition?: string; size?: string; }; departmentStructure?: { ...; }[]; individualGoalsCSV?: string; }'.
src/routes/analyses.ts(386,24): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.5106071Z [inf]  src/routes/analyses.ts(413,7): error TS2353: Object literal may only specify known properties, and 'userId' does not exist in type '{ tenantId?: string; clientContext?: { industry?: string; strategy?: string; location?: string; culture?: string; companySize?: string; }; structureRecommendation?: { department?: string; positionTitle?: string; reportingTo?: string; rationale?: string; }; }'.

2025-10-18T01:10:30.510647104Z [inf]  src/routes/analyses.ts(444,21): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.510677407Z [inf]  src/routes/analyses.ts(489,24): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.510698628Z [inf]  src/routes/billing.ts(6,38): error TS2307: Cannot find module '../middleware/validation' or its corresponding type declarations.

2025-10-18T01:10:30.510701422Z [inf]  src/routes/billing.ts(8,35): error TS2305: Module '"../db/schema/payments"' has no exported member 'tenants'.

2025-10-18T01:10:30.510802727Z [inf]  src/routes/consulting.ts(5,35): error TS2305: Module '"../middleware/auth"' has no exported member 'validateTenantAccess'.
src/routes/consulting.ts(232,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(value: { tenantId: string | SQL<unknown> | Placeholder<string, any>; requestType: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 5 more ...; assignedTo?: string | ... 1 more ... | Placeholder<...>; }): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'priority' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; requestType: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 5 more ...; assignedTo?: string | ... 1 more ... | Placeholder<...>; }'.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; requestType: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 5 more ...; assignedTo?: string | ... 1 more ... | Placeholder<...>; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; requestType: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 5 more ...; assignedTo?: string | ... 1 more ... | Placeholder<...>; }[]'.

2025-10-18T01:10:30.510834856Z [inf]  src/routes/culture-assessment.ts(5,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.
src/routes/culture-assessment.ts(726,5): error TS2304: Cannot find name 'generateEmployeeReport'.

2025-10-18T01:10:30.510839979Z [inf]  src/routes/culture-assessment.ts(852,75): error TS2304: Cannot find name 'daysSince'.

2025-10-18T01:10:30.510854983Z [inf]  src/routes/demo.ts(7,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:10:30.51086058Z [inf]  src/routes/demo.ts(220,9): error TS2741: Property 'where' is missing in type 'Omit<import("/app/node_modules/drizzle-orm/pg-core/query-builders/select").PgSelectBase<"demo_requests", { id: import("/app/node_modules/drizzle-orm/pg-core/columns/common").PgColumn<{ name: "id"; tableName: "demo_requests"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true...' but required in type 'Omit<import("/app/node_modules/drizzle-orm/pg-core/query-builders/select").PgSelectBase<"demo_requests", { id: import("/app/node_modules/drizzle-orm/pg-core/columns/common").PgColumn<{ name: "id"; tableName: "demo_requests"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true...'.

2025-10-18T01:10:30.51087564Z [inf]  src/routes/demo.ts(237,9): error TS2740: Type 'Omit<PgSelectBase<"demo_requests", { id: PgColumn<{ name: "id"; tableName: "demo_requests"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 19 more ...; updatedAt: PgColumn<...>; }, ... 5 more .....' is missing the following properties from type 'PgSelectBase<"demo_requests", { id: PgColumn<{ name: "id"; tableName: "demo_requests"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 19 more ...; updatedAt: PgColumn<...>; }, ... 5 more ..., { ...': config, joinsNotNullableMap, tableName, isPartialSelect, and 5 more.

2025-10-18T01:10:30.510879114Z [inf]  src/routes/demo.ts(415,9): error TS2353: Object literal may only specify known properties, and 'notes' does not exist in type '{ id?: number | SQL<unknown>; firstName?: string | SQL<unknown>; lastName?: string | SQL<unknown>; email?: string | SQL<unknown>; company?: string | SQL<unknown>; phone?: string | SQL<unknown>; ... 14 more ...; updatedAt?: SQL<...> | Date; }'.

2025-10-18T01:10:30.510890128Z [inf]  src/routes/employee.ts(43,36): error TS2339: Property 'resumeData' does not exist on type 'PgTableWithColumns<{ name: "employee_profiles"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "employee_profiles"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...;...'.

2025-10-18T01:10:30.510897718Z [inf]  src/routes/employee.ts(44,38): error TS2339: Property 'departmentId' does not exist on type 'PgTableWithColumns<{ name: "employee_profiles"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "employee_profiles"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...;...'.

2025-10-18T01:10:30.510936065Z [inf]  src/routes/employee.ts(50,26): error TS2339: Property 'firstName' does not exist on type 'PgTableWithColumns<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...; updatedAt: PgColumn<......'.
src/routes/employee.ts(51,25): error TS2339: Property 'lastName' does not exist on type 'PgTableWithColumns<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...; updatedAt: PgColumn<......'.
src/routes/employee.ts(60,48): error TS2339: Property 'departmentId' does not exist on type 'PgTableWithColumns<{ name: "employee_profiles"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "employee_profiles"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...;...'.

2025-10-18T01:10:30.51094348Z [inf]  src/routes/employee.ts(174,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(value: { tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 7 more ...; completedAt?: SQL<...> | ... 1 more ... | Placeholder<...>; }): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'additionalComments' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<string, any>; ... 7 more ...; completedAt?: SQL<...> | ... 1 more ... | Placeholder<...>; }'.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 7 more ...; completedAt?: SQL<...> | ... 1 more ... | Placeholder<...>; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<string, any>; ... 7 more ...; completedAt?: SQL<...> | ... 1 more ... | Placeholder<...>; }[]'.

2025-10-18T01:10:30.510979214Z [inf]  src/routes/export.ts(3,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.
src/routes/export.ts(4,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.
src/routes/export.ts(5,32): error TS2307: Cannot find module '../db/schema/structure' or its corresponding type declarations.
src/routes/export.ts(72,16): error TS2393: Duplicate function implementation.

2025-10-18T01:10:30.510993656Z [inf]  src/routes/export.ts(864,18): error TS2304: Cannot find name 'generateStructureHTML'.
src/routes/export.ts(881,16): error TS2393: Duplicate function implementation.

2025-10-18T01:10:30.51101916Z [inf]  src/routes/framework.ts(5,37): error TS2305: Module '"../middleware/auth"' has no exported member 'validateTenantAccess'.
src/routes/lxp.ts(6,10): error TS2305: Module '"../middleware/auth"' has no exported member 'authMiddleware'.

2025-10-18T01:10:30.51102322Z [inf]  src/routes/lxp.ts(8,38): error TS2307: Cannot find module '../middleware/validation' or its corresponding type declarations.

2025-10-18T01:10:30.51104888Z [inf]  src/routes/lxp.ts(9,34): error TS2307: Cannot find module '../utils/apiHandler' or its corresponding type declarations.
src/routes/lxp.ts(10,28): error TS2307: Cannot find module '../services/lxpService' or its corresponding type declarations.
src/routes/lxp.ts(11,37): error TS2307: Cannot find module '../services/lxp/learningPathService' or its corresponding type declarations.

2025-10-18T01:10:30.511062739Z [inf]  src/routes/lxp.ts(12,31): error TS2307: Cannot find module '../services/lxp/courseService' or its corresponding type declarations.
src/routes/lxp.ts(13,33): error TS2307: Cannot find module '../services/lxp/progressService' or its corresponding type declarations.
src/routes/lxp.ts(14,39): error TS2307: Cannot find module '../services/lxp/recommendationService' or its corresponding type declarations.

2025-10-18T01:10:30.511093377Z [inf]  src/routes/lxp.ts(15,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.
src/routes/lxp.ts(18,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'learningPathsTable'.
src/routes/lxp.ts(19,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'coursesTable'.

2025-10-18T01:10:30.511109106Z [inf]  src/routes/lxp.ts(20,3): error TS2724: '"../db/schema/lxp"' has no exported member named 'learningProgressTable'. Did you mean 'learningProgressEventsTable'?
src/routes/lxp.ts(21,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'learningRecommendationsTable'.

2025-10-18T01:10:30.511137168Z [inf]  src/routes/lxp.ts(22,3): error TS2724: '"../db/schema/lxp"' has no exported member named 'triggersTable'. Did you mean 'lxpTriggersTable'?
src/routes/lxp.ts(117,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511143528Z [inf]  src/routes/lxp.ts(316,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511154751Z [inf]  src/routes/lxp.ts(348,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511159773Z [inf]  src/routes/lxp.ts(385,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511182775Z [inf]  src/routes/lxp.ts(446,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(510,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(534,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511187382Z [inf]  src/routes/lxp.ts(592,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511191544Z [inf]  src/routes/lxp.ts(617,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511204229Z [inf]  src/routes/lxp.ts(671,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511217603Z [inf]  src/routes/lxp.ts(699,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(734,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:10:30.511231435Z [inf]  src/routes/modules.ts(6,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:10:30.511233939Z [inf]  src/routes/modules.ts(8,30): error TS2305: Module '"../../db/schema"' has no exported member 'moduleExecutions'.

2025-10-18T01:10:30.511245938Z [inf]  src/routes/orchestrator.ts(6,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:10:30.511263508Z [inf]  src/routes/orchestrator.ts(75,22): error TS2339: Property 'tenantId' does not exist on type 'PgTableWithColumns<{ name: "tenants"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "tenants"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 14 more ...; updatedAt: PgColumn...'.
src/routes/orchestrator.ts(298,22): error TS2339: Property 'tenantId' does not exist on type 'PgTableWithColumns<{ name: "tenants"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "tenants"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 14 more ...; updatedAt: PgColumn...'.

2025-10-18T01:10:30.511275425Z [inf]  src/routes/payment.ts(5,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:10:30.511278165Z [inf]  src/routes/payment.ts(7,39): error TS2305: Module '"../../db/schema/payments"' has no exported member 'paymentSessions'.

2025-10-18T01:10:30.511299636Z [inf]  src/routes/payment.ts(112,23): error TS2339: Property 'amount' does not exist on type 'CheckoutSessionResponse'.
src/routes/payment.ts(113,25): error TS2339: Property 'currency' does not exist on type 'CheckoutSessionResponse'.

2025-10-18T01:10:30.511313671Z [inf]  src/routes/payment.ts(177,47): error TS2551: Property 'getCheckoutSession' does not exist on type 'StripeService'. Did you mean 'createCheckoutSession'?

2025-10-18T01:10:30.511325617Z [inf]  src/routes/payment.ts(355,64): error TS2554: Expected 1 arguments, but got 2.

2025-10-18T01:10:30.511332597Z [inf]  src/routes/payment.ts(438,40): error TS2339: Property 'cancelSubscription' does not exist on type 'StripeService'.

2025-10-18T01:10:30.511338041Z [inf]  src/routes/payment.ts(448,9): error TS2561: Object literal may only specify known properties, but 'cancelledAt' does not exist in type '{ id?: string | SQL<unknown>; tenantId?: string | SQL<unknown>; companyId?: string | SQL<unknown>; stripeSubscriptionId?: string | SQL<unknown>; stripeCustomerId?: string | SQL<unknown>; stripePriceId?: string | SQL<...>; ... 17 more ...; updatedAt?: SQL<...> | Date; }'. Did you mean to write 'canceledAt'?

2025-10-18T01:10:30.511355912Z [inf]  src/routes/public-structure.ts(212,23): error TS2304: Cannot find name 'StructureAnalysisOutput'.

2025-10-18T01:10:30.511360237Z [inf]  src/routes/skills.ts(7,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:10:30.511381667Z [inf]  src/routes/social-media.ts(6,10): error TS2724: '"../middleware/auth"' has no exported member named 'authenticateToken'. Did you mean 'authenticate'?
src/routes/social-media.ts(6,29): error TS2724: '"../middleware/auth"' has no exported member named 'AuthenticatedRequest'. Did you mean 'AuthenticatedUser'?

2025-10-18T01:10:30.511420373Z [inf]  src/routes/superadmin.ts(41,11): error TS2430: Interface 'AuthenticatedRequest' incorrectly extends interface 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
  Types of property 'user' are incompatible.
    Property 'name' is missing in type '{ id: string; tenantId: string; role: string; email: string; }' but required in type 'AuthenticatedUser'.
src/routes/superadmin.ts(100,12): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response, next: Function) => Promise<any>' is not assignable to parameter of type 'PathParams'.

2025-10-18T01:10:30.511430531Z [inf]  src/routes/superadmin.ts(105,57): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to type 'RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        Types of parameters 'req' and 'req' are incompatible.
          Type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>' is not assignable to type 'AuthenticatedRequest'.
            Property 'user' is optional in type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>' but required in type 'AuthenticatedRequest'.

2025-10-18T01:10:30.51143476Z [inf]  src/routes/superadmin.ts(207,24): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.511468154Z [inf]  src/routes/superadmin.ts(238,34): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/superadmin.ts(276,36): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/superadmin.ts(327,22): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.511486469Z [inf]  src/routes/superadmin.ts(352,32): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.511511252Z [inf]  src/routes/superadmin.ts(397,22): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/superadmin.ts(424,24): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.511541065Z [inf]  src/routes/superadmin.ts(468,25): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/superadmin.ts(514,32): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/superadmin.ts(545,30): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.511561117Z [inf]  src/routes/superadmin.ts(573,33): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.5115678Z [inf]  src/routes/superadmin.ts(594,38): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:10:30.511575717Z [inf]  src/routes/talent.ts(4,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:10:30.51158949Z [inf]  src/routes/talent.ts(113,51): error TS2339: Property 'getNineBoxDistribution' does not exist on type 'TalentAgent'.
src/routes/talent.ts(176,55): error TS2339: Property 'getSuccessionPlans' does not exist on type 'TalentAgent'.

2025-10-18T01:10:30.511599368Z [inf]  src/routes/talent.ts(239,56): error TS2339: Property 'getDevelopmentPlans' does not exist on type 'TalentAgent'.

2025-10-18T01:10:30.511608324Z [inf]  src/routes/talent.ts(311,53): error TS2339: Property 'updateNineBoxConfig' does not exist on type 'TalentAgent'.

2025-10-18T01:10:30.511610901Z [inf]  src/routes/test-ai.ts(3,37): error TS2305: Module '"../middleware/auth"' has no exported member 'validateTenantAccess'.

2025-10-18T01:10:30.51162951Z [inf]  src/routes/test-ai.ts(4,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.
src/routes/test-ai.ts(5,30): error TS2307: Cannot find module '../db/schema/tenants' or its corresponding type declarations.

2025-10-18T01:10:30.511636234Z [inf]  src/routes/webhooks.ts(4,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.

2025-10-18T01:10:30.51168792Z [inf]  src/routes/webhooks.ts(5,30): error TS2307: Cannot find module '../db/schema/tenants' or its corresponding type declarations.
src/routes/webhooks.ts(121,11): error TS2554: Expected 1 arguments, but got 2.
src/routes/webhooks.ts(129,11): error TS2554: Expected 1 arguments, but got 2.
src/routes/webhooks.ts(137,11): error TS2554: Expected 1 arguments, but got 2.
src/routes/webhooks.ts(145,11): error TS2554: Expected 1 arguments, but got 2.
src/routes/webhooks.ts(151,29): error TS2551: Property 'handleInvoicePaymentSucceeded' does not exist on type 'StripeService'. Did you mean 'handleInvoicePaymentFailed'?
src/routes/webhooks.ts(159,29): error TS2339: Property 'handleCustomerCreated' does not exist on type 'StripeService'.

2025-10-18T01:10:30.511700371Z [inf]  src/routes/webhooks.ts(167,29): error TS2339: Property 'handleCustomerUpdated' does not exist on type 'StripeService'.

2025-10-18T01:10:30.51170373Z [inf]  src/services/agents/agent-manager.ts(122,46): error TS2304: Cannot find name 'MizanAgent'.

2025-10-18T01:10:30.511757322Z [inf]  src/services/agents/hiring/hiring-agent.ts(167,60): error TS2345: Argument of type '{ id: string; status: "draft" | "on_hold" | "cancelled" | "pending_approval" | "approved" | "posted" | "filled"; location: string; createdAt: Date; updatedAt: Date; tenantId: string; ... 37 more ...; aiRecommendations: unknown; }' is not assignable to parameter of type 'HiringRequisition'.
  Types of property 'responsibilities' are incompatible.
    Type '{}' is missing the following properties from type 'string[]': length, pop, push, concat, and 29 more.

2025-10-18T01:10:30.511762897Z [inf]  src/services/agents/hiring/hiring-agent.ts(173,119): error TS2345: Argument of type 'IndustryData' is not assignable to parameter of type 'IndustryCompensationData'.
  Type 'IndustryData' is missing the following properties from type 'IndustryCompensationData': location, companySize, marketData, benefits

2025-10-18T01:10:30.511775845Z [inf]  src/services/agents/lxp/lxp-agent.ts(4,20): error TS2307: Cannot find module '../../../db/connection' or its corresponding type declarations.
src/services/agents/lxp/lxp-agent.ts(6,3): error TS2724: '"../../../db/schema"' has no exported member named 'learningPathsTable'. Did you mean 'learningTable'?

2025-10-18T01:10:30.511786285Z [inf]  src/services/agents/lxp/lxp-agent.ts(7,3): error TS2305: Module '"../../../db/schema"' has no exported member 'coursesTable'.

2025-10-18T01:10:30.511788833Z [inf]  src/services/agents/lxp/lxp-agent.ts(8,3): error TS2305: Module '"../../../db/schema"' has no exported member 'progressTable'.

2025-10-18T01:10:30.511804591Z [inf]  src/services/agents/lxp/lxp-agent.ts(9,3): error TS2305: Module '"../../../db/schema"' has no exported member 'recommendationsTable'.
src/services/agents/lxp/lxp-agent.ts(10,3): error TS2305: Module '"../../../db/schema"' has no exported member 'triggersTable'.

2025-10-18T01:10:30.511821105Z [inf]  src/services/agents/lxp/lxp-agent.ts(77,16): error TS2304: Cannot find name 'Assessment'.

2025-10-18T01:10:30.511824678Z [inf]  src/services/agents/lxp/lxp-agent.ts(140,58): error TS2339: Property 'getBehaviorChangeContext' does not exist on type 'KnowledgeEngine'.

2025-10-18T01:10:30.511839708Z [inf]  src/services/agents/lxp/lxp-agent.ts(141,62): error TS2339: Property 'getGamificationPrinciples' does not exist on type 'KnowledgeEngine'.

2025-10-18T01:10:30.511843529Z [inf]  src/services/agents/lxp/lxp-agent.ts(160,9): error TS2353: Object literal may only specify known properties, and 'behaviorChangeTheories' does not exist in type 'AnalysisContext'.

2025-10-18T01:10:30.51185844Z [inf]  src/services/agents/lxp/lxp-agent.ts(341,58): error TS2339: Property 'getBehaviorChangeContext' does not exist on type 'KnowledgeEngine'.
src/services/agents/lxp/lxp-agent.ts(345,9): error TS2353: Object literal may only specify known properties, and 'progress' does not exist in type '{ metadata?: { quality?: number; processingTime?: number; recordCount?: number; completeness?: number; anomalies?: string[]; }; cleaned?: Record<string, unknown>; normalized?: Record<string, number>; structured?: { ...; }; }'.

2025-10-18T01:10:30.511875885Z [inf]  src/services/agents/lxp/lxp-agent.ts(352,28): error TS2339: Property 'behaviorChanges' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.
src/services/agents/lxp/lxp-agent.ts(352,64): error TS2339: Property 'behaviorChanges' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.

2025-10-18T01:10:30.511899031Z [inf]  src/services/agents/lxp/lxp-agent.ts(353,99): error TS2339: Property 'behaviorChanges' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.
src/services/agents/performance/performance-agent.ts(160,79): error TS2345: Argument of type '{ id?: string; name?: string; headCount?: number; manager?: string; parentId?: string; }[]' is not assignable to parameter of type 'DepartmentStructure[]'.
  Type '{ id?: string; name?: string; headCount?: number; manager?: string; parentId?: string; }' is not assignable to type 'DepartmentStructure'.
    Property 'id' is optional in type '{ id?: string; name?: string; headCount?: number; manager?: string; parentId?: string; }' but required in type 'DepartmentStructure'.

2025-10-18T01:10:30.511917038Z [inf]  src/services/agents/performance/performance-agent.ts(352,17): error TS2769: No overload matches this call.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; title: string | SQL<unknown> | Placeholder<string, any>; managerId: string | SQL<unknown> | Placeholder<...>; ... 30 more ...; attachments?: unknown; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; title: string | SQL<unknown> | Placeholder<string, any>; managerId: string | SQL<unknown> | Placeholder<...>; ... 30 more ...; attachments?: unknown; }[]'.

2025-10-18T01:10:30.511931735Z [inf]  src/services/orchestrator/architect-ai.ts(63,3): error TS2687: All declarations of 'alignmentScore' must have identical modifiers.

2025-10-18T01:10:30.511934276Z [inf]  src/services/orchestrator/architect-ai.ts(65,3): error TS2687: All declarations of 'culturalEntropy' must have identical modifiers.

2025-10-18T01:10:30.511963035Z [inf]  src/services/orchestrator/architect-ai.ts(67,3): error TS2687: All declarations of 'interventions' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(68,3): error TS2687: All declarations of 'recommendations' must have identical modifiers.

2025-10-18T01:10:30.511968614Z [inf]  src/services/orchestrator/architect-ai.ts(73,3): error TS2687: All declarations of 'criticalGaps' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(121,3): error TS2687: All declarations of 'recommendations' must have identical modifiers.

2025-10-18T01:10:30.511986949Z [inf]  src/services/orchestrator/architect-ai.ts(121,3): error TS2717: Subsequent property declarations must have the same type.  Property 'recommendations' must be of type 'string[]', but here has type '{ title: string; description: string; }[]'.
src/services/orchestrator/architect-ai.ts(122,3): error TS2687: All declarations of 'alignmentScore' must have identical modifiers.

2025-10-18T01:10:30.512006234Z [inf]  src/services/orchestrator/architect-ai.ts(123,3): error TS2687: All declarations of 'culturalEntropy' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(124,3): error TS2687: All declarations of 'interventions' must have identical modifiers.

2025-10-18T01:10:30.512014451Z [inf]  src/services/orchestrator/architect-ai.ts(124,3): error TS2717: Subsequent property declarations must have the same type.  Property 'interventions' must be of type 'string[]', but here has type '{ type: string; priority: string; }[]'.

2025-10-18T01:10:30.512026419Z [inf]  src/services/orchestrator/architect-ai.ts(132,3): error TS2687: All declarations of 'criticalGaps' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(132,3): error TS2717: Subsequent property declarations must have the same type.  Property 'criticalGaps' must be of type '{ skill: string; gap: number; priority: string; }[]', but here has type '{ skill: string; severity: string; }[]'.

2025-10-18T01:10:30.512038732Z [inf]  src/services/orchestrator/architect-ai.ts(211,42): error TS2339: Property 'healthScore' does not exist on type 'StructureAnalysisResult | CultureAnalysisResult | SkillsAnalysisResult'.
  Property 'healthScore' does not exist on type 'SkillsAnalysisResult'.

2025-10-18T01:10:30.512046108Z [inf]  src/services/orchestrator/architect-ai.ts(212,29): error TS2339: Property 'healthScore' does not exist on type 'StructureAnalysisResult | CultureAnalysisResult | SkillsAnalysisResult'.
  Property 'healthScore' does not exist on type 'SkillsAnalysisResult'.

2025-10-18T01:10:30.512066007Z [inf]  src/services/orchestrator/architect-ai.ts(254,49): error TS2345: Argument of type '{ companyId: string; tenantId: string; orgChart: OrgChartData; strategy: string; }' is not assignable to parameter of type 'StructureAnalysisInput'.
  Types of property 'orgChart' are incompatible.
    Type 'OrgChartData' is missing the following properties from type '{ departments: { id: string; name: string; parentId?: string; headCount: number; manager?: string; }[]; reportingLines: { from: string; to: string; type: "direct" | "dotted" | "functional"; }[]; roles: { ...; }[]; }': reportingLines, roles
src/services/orchestrator/architect-ai.ts(269,52): error TS2339: Property 'description' does not exist on type 'never'.

2025-10-18T01:10:30.51207335Z [inf]  src/services/orchestrator/architect-ai.ts(334,7): error TS2353: Object literal may only specify known properties, and 'healthScore' does not exist in type 'SkillsAnalysisResult'.

2025-10-18T01:10:30.512082781Z [inf]  src/services/orchestrator/architect-ai.ts(343,23): error TS2339: Property 'skill' does not exist on type '{ employeeId: string; skillGaps: SkillsGap[]; learningPaths: string[]; }'.
src/services/orchestrator/architect-ai.ts(344,27): error TS2339: Property 'priority' does not exist on type '{ employeeId: string; skillGaps: SkillsGap[]; learningPaths: string[]; }'.

2025-10-18T01:10:30.512095482Z [inf]  src/services/orchestrator/architect-ai.ts(347,46): error TS2339: Property 'title' does not exist on type '{ type: "training" | "hiring" | "development" | "restructuring"; priority: "immediate" | "short-term" | "long-term"; description: string; expectedImpact: string; estimatedCost?: string; }'.

2025-10-18T01:10:30.512102244Z [inf]  src/services/orchestrator/architect-ai.ts(386,5): error TS2353: Object literal may only specify known properties, and 'reportingLines' does not exist in type 'DefaultOrgChart'.

2025-10-18T01:10:30.512115039Z [inf]  src/services/results/trigger-engine.ts(270,11): error TS2322: Type 'unknown' is not assignable to type 'string'.

2025-10-18T01:10:30.5121248Z [inf]  src/services/results/trigger-engine.ts(271,11): error TS2322: Type 'unknown' is not assignable to type 'string'.

2025-10-18T01:10:30.512127848Z [inf]  src/services/results/trigger-engine.ts(272,11): error TS2322: Type 'unknown' is not assignable to type 'string'.

2025-10-18T01:10:30.512135051Z [inf]  src/services/results/trigger-engine.ts(273,11): error TS2740: Type '{}' is missing the following properties from type 'string[]': length, pop, push, concat, and 29 more.

2025-10-18T01:10:30.512142534Z [inf]  src/services/results/trigger-engine.ts(274,11): error TS2740: Type '{}' is missing the following properties from type 'string[]': length, pop, push, concat, and 29 more.

2025-10-18T01:10:30.512152732Z [inf]  src/services/results/trigger-engine.ts(275,11): error TS2322: Type 'unknown' is not assignable to type 'string'.

2025-10-18T01:10:30.512171315Z [inf]  src/services/skills/skillsBotService.ts(264,83): error TS2352: Conversion of type 'ResumeData' to type 'Record<string, unknown>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Index signature for type 'string' is missing in type 'ResumeData'.

2025-10-18T01:10:30.512174516Z [inf]  src/services/skills/skillsBotService.ts(317,65): error TS2345: Argument of type 'ResumeBuildingData' is not assignable to parameter of type 'Record<string, unknown>'.
  Index signature for type 'string' is missing in type 'ResumeBuildingData'.

2025-10-18T01:10:30.512176699Z [inf]  src/services/skills/skillsBotService.ts(334,65): error TS2345: Argument of type 'ResumeBuildingData' is not assignable to parameter of type 'Record<string, unknown>'.
  Index signature for type 'string' is missing in type 'ResumeBuildingData'.

2025-10-18T01:10:30.512195628Z [inf]  src/services/skills/skillsBotService.ts(675,21): error TS2339: Property 'name' does not exist on type 'ResumeData'.

2025-10-18T01:10:30.512198344Z [inf]  src/services/skills/skillsBotService.ts(676,21): error TS2339: Property 'email' does not exist on type 'ResumeData'.

2025-10-18T01:10:30.512213642Z [inf]  src/services/workflow/automated-flow.ts(223,9): error TS2739: Type 'TriggerStepResult' is missing the following properties from type 'StepResult': success, data, timestamp
src/services/workflow/automated-flow.ts(225,9): error TS2739: Type 'ActionStepResult' is missing the following properties from type 'StepResult': success, data, timestamp

2025-10-18T01:10:30.512222307Z [inf]  src/services/workflow/automated-flow.ts(227,9): error TS2739: Type 'ConditionStepResult' is missing the following properties from type 'StepResult': success, data, timestamp

2025-10-18T01:10:30.512231768Z [inf]  src/services/workflow/automated-flow.ts(229,9): error TS2739: Type 'DelayStepResult' is missing the following properties from type 'StepResult': success, data, timestamp

2025-10-18T01:10:31.038525849Z [err]  [builder 7/8] RUN npm run build
2025-10-18T01:10:31.066358203Z [err]  Dockerfile.prod:19
2025-10-18T01:10:31.066398760Z [err]  -------------------
2025-10-18T01:10:31.066410280Z [err]  17 |
2025-10-18T01:10:31.066414397Z [err]  18 |     # Build the application
2025-10-18T01:10:31.066420281Z [err]  19 | >>> RUN npm run build
2025-10-18T01:10:31.066423871Z [err]  20 |
2025-10-18T01:10:31.066428581Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2025-10-18T01:10:31.066432303Z [err]  -------------------
2025-10-18T01:10:31.066436930Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2