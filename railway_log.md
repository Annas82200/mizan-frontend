2025-10-18T01:45:05.871334167Z [inf]  
2025-10-18T01:45:06.989194039Z [inf]  [35m[Region: us-east4][0m
2025-10-18T01:45:06.993403003Z [inf]  [35m=========================
2025-10-18T01:45:06.993436034Z [inf]  Using Detected Dockerfile
2025-10-18T01:45:06.993439644Z [inf]  =========================
2025-10-18T01:45:06.993443200Z [inf]  [0m
2025-10-18T01:45:06.993456670Z [inf]  context: 45bx-q5_k
2025-10-18T01:45:07.172016624Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:45:07.172061352Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:45:07.172082874Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:45:07.172099922Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:45:07.181523948Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-18T01:45:07.183455808Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-18T01:45:07.447778595Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-18T01:45:07.447906016Z [inf]  [internal] load .dockerignore
2025-10-18T01:45:07.447940917Z [inf]  [internal] load .dockerignore
2025-10-18T01:45:07.447953473Z [inf]  [internal] load .dockerignore
2025-10-18T01:45:07.460236831Z [inf]  [internal] load .dockerignore
2025-10-18T01:45:07.464578172Z [inf]  [builder 8/8] RUN npm prune --production
2025-10-18T01:45:07.464629402Z [inf]  [builder 7/8] RUN npm run build
2025-10-18T01:45:07.464639167Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-18T01:45:07.464646768Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2025-10-18T01:45:07.464655457Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:45:07.464664192Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2025-10-18T01:45:07.464672212Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2025-10-18T01:45:07.464682324Z [inf]  [builder 2/8] WORKDIR /app
2025-10-18T01:45:07.464692852Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-18T01:45:07.464703722Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-18T01:45:07.464713640Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-18T01:45:07.464725304Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2025-10-18T01:45:07.464736235Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2025-10-18T01:45:07.464745915Z [inf]  [builder 6/8] COPY . .
2025-10-18T01:45:07.464754762Z [inf]  [internal] load build context
2025-10-18T01:45:07.464760356Z [inf]  [production 4/9] WORKDIR /app
2025-10-18T01:45:07.464769284Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-18T01:45:07.464787513Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:45:07.464793435Z [inf]  [internal] load build context
2025-10-18T01:45:07.464819454Z [inf]  [internal] load build context
2025-10-18T01:45:07.471823331Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:45:07.471856971Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:45:07.472094704Z [inf]  [internal] load build context
2025-10-18T01:45:07.472111699Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:45:07.493868574Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:45:07.496972349Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:45:07.525084975Z [inf]  [internal] load build context
2025-10-18T01:45:07.893881000Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-18T01:45:08.848445804Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-18T01:45:08.848497721Z [inf]  [builder 2/8] WORKDIR /app
2025-10-18T01:45:08.906952457Z [inf]  [builder 2/8] WORKDIR /app
2025-10-18T01:45:08.907954843Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-18T01:45:08.923312131Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-18T01:45:08.924102579Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-18T01:45:08.932137357Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-18T01:45:08.932919495Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-18T01:45:08.947574881Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-18T01:45:08.948566064Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-18T01:45:09.044903827Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-18T01:45:09.045881762Z [inf]  [production 4/9] WORKDIR /app
2025-10-18T01:45:09.063689523Z [inf]  [production 4/9] WORKDIR /app
2025-10-18T01:45:11.285383455Z [inf]  npm warn deprecated mimelib@0.3.1: This project is unmaintained

2025-10-18T01:45:11.56438819Z [inf]  npm warn deprecated mailparser@0.6.2: Mailparser versions older than v2.3.0 are deprecated

2025-10-18T01:45:11.589292391Z [inf]  npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

2025-10-18T01:45:11.642155558Z [inf]  npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

2025-10-18T01:45:11.830449195Z [inf]  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

2025-10-18T01:45:12.265644385Z [inf]  npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is

2025-10-18T01:45:12.290066991Z [inf]  npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is

2025-10-18T01:45:12.92606893Z [inf]  npm warn deprecated sendgrid@5.2.3: Please see v6.X+ at https://www.npmjs.com/org/sendgrid

2025-10-18T01:45:15.664170085Z [inf]  
added 433 packages, and audited 434 packages in 7s

2025-10-18T01:45:15.664190665Z [inf]  
67 packages are looking for funding

2025-10-18T01:45:15.664270375Z [inf]    run `npm fund` for details

2025-10-18T01:45:15.694152344Z [inf]  
4 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

2025-10-18T01:45:15.695372891Z [inf]  npm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice

2025-10-18T01:45:15.824123888Z [inf]  npm warn using --force Recommended protections disabled.

2025-10-18T01:45:16.232813354Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-18T01:45:16.238271457Z [inf]  [builder 6/8] COPY . .
2025-10-18T01:45:16.353551935Z [inf]  [builder 6/8] COPY . .
2025-10-18T01:45:16.355267044Z [inf]  [builder 7/8] RUN npm run build
2025-10-18T01:45:16.551774304Z [inf]  
> mizan-server@1.0.0 build
> tsc


2025-10-18T01:45:27.122420718Z [inf]  src/routes/admin.ts(592,36): error TS2339: Property 'id' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'id' does not exist on type '{ [x: string]: any; }[]'.

2025-10-18T01:45:27.12265883Z [inf]  src/routes/admin.ts(593,38): error TS2339: Property 'name' does not exist on type '{ [x: string]: any; } | { [x: string]: any; }[]'.
  Property 'name' does not exist on type '{ [x: string]: any; }[]'.
src/routes/agents.ts(3,35): error TS2305: Module '"../middleware/auth"' has no exported member 'validateTenantAccess'.
src/routes/agents.ts(6,10): error TS2724: '"../db/schema"' has no exported member named 'agentAnalysesTable'. Did you mean 'agentAnalyses'?

2025-10-18T01:45:27.122670746Z [inf]  src/routes/agents.ts(6,30): error TS2305: Module '"../db/schema"' has no exported member 'triggersTable'.

2025-10-18T01:45:27.122674218Z [inf]  src/routes/agents.ts(6,45): error TS2305: Module '"../db/schema"' has no exported member 'recommendationsTable'.

2025-10-18T01:45:27.122747985Z [inf]  src/routes/agents.ts(7,25): error TS2305: Module '"drizzle-orm"' has no exported member 'limit'.
src/routes/analyses.ts(16,10): error TS2614: Module '"../services/agents/lxp/lxp-agent"' has no exported member 'lxpAgent'. Did you mean to use 'import lxpAgent from "../services/agents/lxp/lxp-agent"' instead?

2025-10-18T01:45:27.122820261Z [inf]  src/routes/analyses.ts(17,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:45:27.122886543Z [inf]  src/routes/analyses.ts(26,11): error TS2430: Interface 'AuthenticatedRequest' incorrectly extends interface 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
  Types of property 'user' are incompatible.
    Property 'name' is missing in type '{ id: string; tenantId: string; email: string; role: string; }' but required in type 'AuthenticatedUser'.
src/routes/analyses.ts(88,27): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.122897143Z [inf]  src/routes/analyses.ts(185,25): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.122949943Z [inf]  src/routes/analyses.ts(239,25): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<void>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<void>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.123033776Z [inf]  src/routes/analyses.ts(276,25): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<void>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<void>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/analyses.ts(322,29): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/analyses.ts(349,7): error TS2353: Object literal may only specify known properties, and 'userId' does not exist in type '{ tenantId?: string; clientStrategy?: { vision?: string; mission?: string; strategy?: string; values?: string[]; }; clientContext?: { industry?: string; marketPosition?: string; size?: string; }; departmentStructure?: { ...; }[]; individualGoalsCSV?: string; }'.

2025-10-18T01:45:27.123075404Z [inf]  src/routes/analyses.ts(386,24): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.123124132Z [inf]  src/routes/analyses.ts(413,7): error TS2353: Object literal may only specify known properties, and 'userId' does not exist in type '{ tenantId?: string; clientContext?: { industry?: string; strategy?: string; location?: string; culture?: string; companySize?: string; }; structureRecommendation?: { department?: string; positionTitle?: string; reportingTo?: string; rationale?: string; }; }'.

2025-10-18T01:45:27.123159054Z [inf]  src/routes/analyses.ts(444,21): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.123184671Z [inf]  src/routes/analyses.ts(489,24): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.123204726Z [inf]  src/routes/billing.ts(6,38): error TS2307: Cannot find module '../middleware/validation' or its corresponding type declarations.
src/routes/billing.ts(8,35): error TS2305: Module '"../db/schema/payments"' has no exported member 'tenants'.

2025-10-18T01:45:27.123340352Z [inf]  src/routes/consulting.ts(5,35): error TS2305: Module '"../middleware/auth"' has no exported member 'validateTenantAccess'.
src/routes/consulting.ts(232,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(value: { tenantId: string | SQL<unknown> | Placeholder<string, any>; requestType: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 5 more ...; assignedTo?: string | ... 1 more ... | Placeholder<...>; }): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'priority' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; requestType: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 5 more ...; assignedTo?: string | ... 1 more ... | Placeholder<...>; }'.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; requestType: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 5 more ...; assignedTo?: string | ... 1 more ... | Placeholder<...>; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; requestType: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 5 more ...; assignedTo?: string | ... 1 more ... | Placeholder<...>; }[]'.
src/routes/culture-assessment.ts(5,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.
src/routes/culture-assessment.ts(726,5): error TS2304: Cannot find name 'generateEmployeeReport'.

2025-10-18T01:45:27.123351198Z [inf]  src/routes/culture-assessment.ts(852,75): error TS2304: Cannot find name 'daysSince'.
src/routes/demo.ts(7,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:45:27.123388371Z [inf]  src/routes/demo.ts(220,9): error TS2741: Property 'where' is missing in type 'Omit<import("/app/node_modules/drizzle-orm/pg-core/query-builders/select").PgSelectBase<"demo_requests", { id: import("/app/node_modules/drizzle-orm/pg-core/columns/common").PgColumn<{ name: "id"; tableName: "demo_requests"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true...' but required in type 'Omit<import("/app/node_modules/drizzle-orm/pg-core/query-builders/select").PgSelectBase<"demo_requests", { id: import("/app/node_modules/drizzle-orm/pg-core/columns/common").PgColumn<{ name: "id"; tableName: "demo_requests"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true...'.
src/routes/demo.ts(237,9): error TS2740: Type 'Omit<PgSelectBase<"demo_requests", { id: PgColumn<{ name: "id"; tableName: "demo_requests"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 19 more ...; updatedAt: PgColumn<...>; }, ... 5 more .....' is missing the following properties from type 'PgSelectBase<"demo_requests", { id: PgColumn<{ name: "id"; tableName: "demo_requests"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 19 more ...; updatedAt: PgColumn<...>; }, ... 5 more ..., { ...': config, joinsNotNullableMap, tableName, isPartialSelect, and 5 more.
src/routes/demo.ts(415,9): error TS2353: Object literal may only specify known properties, and 'notes' does not exist in type '{ id?: number | SQL<unknown>; firstName?: string | SQL<unknown>; lastName?: string | SQL<unknown>; email?: string | SQL<unknown>; company?: string | SQL<unknown>; phone?: string | SQL<unknown>; ... 14 more ...; updatedAt?: SQL<...> | Date; }'.

2025-10-18T01:45:27.123437685Z [inf]  src/routes/employee.ts(43,36): error TS2339: Property 'resumeData' does not exist on type 'PgTableWithColumns<{ name: "employee_profiles"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "employee_profiles"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...;...'.
src/routes/employee.ts(44,38): error TS2339: Property 'departmentId' does not exist on type 'PgTableWithColumns<{ name: "employee_profiles"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "employee_profiles"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...;...'.
src/routes/employee.ts(50,26): error TS2339: Property 'firstName' does not exist on type 'PgTableWithColumns<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...; updatedAt: PgColumn<......'.
src/routes/employee.ts(51,25): error TS2339: Property 'lastName' does not exist on type 'PgTableWithColumns<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...; updatedAt: PgColumn<......'.

2025-10-18T01:45:27.123442442Z [inf]  src/routes/employee.ts(60,48): error TS2339: Property 'departmentId' does not exist on type 'PgTableWithColumns<{ name: "employee_profiles"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "employee_profiles"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 11 more ...;...'.

2025-10-18T01:45:27.123476064Z [inf]  src/routes/employee.ts(174,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(value: { tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 7 more ...; completedAt?: SQL<...> | ... 1 more ... | Placeholder<...>; }): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'additionalComments' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<string, any>; ... 7 more ...; completedAt?: SQL<...> | ... 1 more ... | Placeholder<...>; }'.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<...>; ... 7 more ...; completedAt?: SQL<...> | ... 1 more ... | Placeholder<...>; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; userId: string | SQL<unknown> | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<string, any>; ... 7 more ...; completedAt?: SQL<...> | ... 1 more ... | Placeholder<...>; }[]'.

2025-10-18T01:45:27.123479677Z [inf]  src/routes/export.ts(3,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:45:27.123501054Z [inf]  src/routes/export.ts(4,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.
src/routes/export.ts(5,32): error TS2307: Cannot find module '../db/schema/structure' or its corresponding type declarations.

2025-10-18T01:45:27.123510027Z [inf]  src/routes/export.ts(72,16): error TS2393: Duplicate function implementation.
src/routes/export.ts(864,18): error TS2304: Cannot find name 'generateStructureHTML'.

2025-10-18T01:45:27.123522521Z [inf]  src/routes/export.ts(881,16): error TS2393: Duplicate function implementation.

2025-10-18T01:45:27.123531955Z [inf]  src/routes/framework.ts(5,37): error TS2305: Module '"../middleware/auth"' has no exported member 'validateTenantAccess'.

2025-10-18T01:45:27.123550335Z [inf]  src/routes/lxp.ts(6,10): error TS2305: Module '"../middleware/auth"' has no exported member 'authMiddleware'.
src/routes/lxp.ts(8,38): error TS2307: Cannot find module '../middleware/validation' or its corresponding type declarations.

2025-10-18T01:45:27.123566425Z [inf]  src/routes/lxp.ts(9,34): error TS2307: Cannot find module '../utils/apiHandler' or its corresponding type declarations.
src/routes/lxp.ts(10,28): error TS2307: Cannot find module '../services/lxpService' or its corresponding type declarations.

2025-10-18T01:45:27.123578645Z [inf]  src/routes/lxp.ts(11,37): error TS2307: Cannot find module '../services/lxp/learningPathService' or its corresponding type declarations.
src/routes/lxp.ts(12,31): error TS2307: Cannot find module '../services/lxp/courseService' or its corresponding type declarations.

2025-10-18T01:45:27.12358884Z [inf]  src/routes/lxp.ts(13,33): error TS2307: Cannot find module '../services/lxp/progressService' or its corresponding type declarations.

2025-10-18T01:45:27.123599299Z [inf]  src/routes/lxp.ts(14,39): error TS2307: Cannot find module '../services/lxp/recommendationService' or its corresponding type declarations.

2025-10-18T01:45:27.123604325Z [inf]  src/routes/lxp.ts(15,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.

2025-10-18T01:45:27.123617202Z [inf]  src/routes/lxp.ts(18,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'learningPathsTable'.
src/routes/lxp.ts(19,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'coursesTable'.

2025-10-18T01:45:27.123638455Z [inf]  src/routes/lxp.ts(20,3): error TS2724: '"../db/schema/lxp"' has no exported member named 'learningProgressTable'. Did you mean 'learningProgressEventsTable'?
src/routes/lxp.ts(21,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'learningRecommendationsTable'.

2025-10-18T01:45:27.123648038Z [inf]  src/routes/lxp.ts(22,3): error TS2724: '"../db/schema/lxp"' has no exported member named 'triggersTable'. Did you mean 'lxpTriggersTable'?

2025-10-18T01:45:27.123669008Z [inf]  src/routes/lxp.ts(117,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(316,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:45:27.123691679Z [inf]  src/routes/lxp.ts(348,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(385,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:45:27.123703565Z [inf]  src/routes/lxp.ts(446,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(510,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:45:27.123707166Z [inf]  src/routes/lxp.ts(534,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(592,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:45:27.123728741Z [inf]  src/routes/lxp.ts(617,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:45:27.123734185Z [inf]  src/routes/lxp.ts(671,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(699,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:45:27.123755493Z [inf]  src/routes/lxp.ts(734,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2025-10-18T01:45:27.123772952Z [inf]  src/routes/modules.ts(6,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.
src/routes/modules.ts(8,30): error TS2305: Module '"../../db/schema"' has no exported member 'moduleExecutions'.
src/routes/orchestrator.ts(6,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:45:27.123778065Z [inf]  src/routes/orchestrator.ts(75,22): error TS2339: Property 'tenantId' does not exist on type 'PgTableWithColumns<{ name: "tenants"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "tenants"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 14 more ...; updatedAt: PgColumn...'.

2025-10-18T01:45:27.123801841Z [inf]  src/routes/orchestrator.ts(298,22): error TS2339: Property 'tenantId' does not exist on type 'PgTableWithColumns<{ name: "tenants"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "tenants"; dataType: "string"; columnType: "PgUUID"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: undefined; baseColumn: never; }, {}, {}>; ... 14 more ...; updatedAt: PgColumn...'.
src/routes/payment.ts(5,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:45:27.123804972Z [inf]  src/routes/payment.ts(7,39): error TS2305: Module '"../../db/schema/payments"' has no exported member 'paymentSessions'.

2025-10-18T01:45:27.123815405Z [inf]  src/routes/payment.ts(112,23): error TS2339: Property 'amount' does not exist on type 'CheckoutSessionResponse'.

2025-10-18T01:45:27.123819651Z [inf]  src/routes/payment.ts(113,25): error TS2339: Property 'currency' does not exist on type 'CheckoutSessionResponse'.

2025-10-18T01:45:27.123834199Z [inf]  src/routes/payment.ts(177,47): error TS2551: Property 'getCheckoutSession' does not exist on type 'StripeService'. Did you mean 'createCheckoutSession'?

2025-10-18T01:45:27.123837548Z [inf]  src/routes/payment.ts(355,64): error TS2554: Expected 1 arguments, but got 2.

2025-10-18T01:45:27.123853491Z [inf]  src/routes/payment.ts(438,40): error TS2339: Property 'cancelSubscription' does not exist on type 'StripeService'.
src/routes/payment.ts(448,9): error TS2561: Object literal may only specify known properties, but 'cancelledAt' does not exist in type '{ id?: string | SQL<unknown>; tenantId?: string | SQL<unknown>; companyId?: string | SQL<unknown>; stripeSubscriptionId?: string | SQL<unknown>; stripeCustomerId?: string | SQL<unknown>; stripePriceId?: string | SQL<...>; ... 17 more ...; updatedAt?: SQL<...> | Date; }'. Did you mean to write 'canceledAt'?

2025-10-18T01:45:27.123881659Z [inf]  src/routes/public-structure.ts(212,23): error TS2304: Cannot find name 'StructureAnalysisOutput'.
src/routes/skills.ts(7,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.

2025-10-18T01:45:27.123925192Z [inf]  src/routes/social-media.ts(6,10): error TS2724: '"../middleware/auth"' has no exported member named 'authenticateToken'. Did you mean 'authenticate'?
src/routes/social-media.ts(6,29): error TS2724: '"../middleware/auth"' has no exported member named 'AuthenticatedRequest'. Did you mean 'AuthenticatedUser'?
src/routes/superadmin.ts(41,11): error TS2430: Interface 'AuthenticatedRequest' incorrectly extends interface 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
  Types of property 'user' are incompatible.
    Property 'name' is missing in type '{ id: string; tenantId: string; role: string; email: string; }' but required in type 'AuthenticatedUser'.

2025-10-18T01:45:27.123928561Z [inf]  src/routes/superadmin.ts(100,12): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response, next: Function) => Promise<any>' is not assignable to parameter of type 'PathParams'.

2025-10-18T01:45:27.123946808Z [inf]  src/routes/superadmin.ts(105,57): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to type 'RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
        Types of parameters 'req' and 'req' are incompatible.
          Type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>' is not assignable to type 'AuthenticatedRequest'.
            Property 'user' is optional in type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>' but required in type 'AuthenticatedRequest'.

2025-10-18T01:45:27.12396019Z [inf]  src/routes/superadmin.ts(207,24): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.123974775Z [inf]  src/routes/superadmin.ts(238,34): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.123979085Z [inf]  src/routes/superadmin.ts(276,36): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.124008623Z [inf]  src/routes/superadmin.ts(327,22): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/superadmin.ts(352,32): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.124014485Z [inf]  src/routes/superadmin.ts(397,22): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.124055141Z [inf]  src/routes/superadmin.ts(424,24): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/superadmin.ts(468,25): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/superadmin.ts(514,32): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.124064705Z [inf]  src/routes/superadmin.ts(545,30): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.124076161Z [inf]  src/routes/superadmin.ts(573,33): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.

2025-10-18T01:45:27.12410364Z [inf]  src/routes/superadmin.ts(594,38): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>' is not assignable to parameter of type 'Application<Record<string, any>>'.
      Type '(req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => Promise<Response<any, Record<string, any>>>' is missing the following properties from type 'Application<Record<string, any>>': init, defaultConfiguration, engine, set, and 63 more.
src/routes/talent.ts(4,10): error TS2305: Module '"../middleware/tenant"' has no exported member 'validateTenantAccess'.
src/routes/talent.ts(113,51): error TS2339: Property 'getNineBoxDistribution' does not exist on type 'TalentAgent'.

2025-10-18T01:45:27.124117419Z [inf]  src/routes/talent.ts(176,55): error TS2339: Property 'getSuccessionPlans' does not exist on type 'TalentAgent'.

2025-10-18T01:45:27.124128585Z [inf]  src/routes/talent.ts(239,56): error TS2339: Property 'getDevelopmentPlans' does not exist on type 'TalentAgent'.
src/routes/talent.ts(311,53): error TS2339: Property 'updateNineBoxConfig' does not exist on type 'TalentAgent'.

2025-10-18T01:45:27.1241466Z [inf]  src/routes/test-ai.ts(3,37): error TS2305: Module '"../middleware/auth"' has no exported member 'validateTenantAccess'.

2025-10-18T01:45:27.124152366Z [inf]  src/routes/test-ai.ts(4,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.
src/routes/test-ai.ts(5,30): error TS2307: Cannot find module '../db/schema/tenants' or its corresponding type declarations.

2025-10-18T01:45:27.124170784Z [inf]  src/routes/webhooks.ts(4,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.

2025-10-18T01:45:27.124175034Z [inf]  src/routes/webhooks.ts(5,30): error TS2307: Cannot find module '../db/schema/tenants' or its corresponding type declarations.

2025-10-18T01:45:27.124178972Z [inf]  src/routes/webhooks.ts(121,11): error TS2554: Expected 1 arguments, but got 2.

2025-10-18T01:45:27.12419567Z [inf]  src/routes/webhooks.ts(129,11): error TS2554: Expected 1 arguments, but got 2.
src/routes/webhooks.ts(137,11): error TS2554: Expected 1 arguments, but got 2.
src/routes/webhooks.ts(145,11): error TS2554: Expected 1 arguments, but got 2.

2025-10-18T01:45:27.124217618Z [inf]  src/routes/webhooks.ts(151,29): error TS2551: Property 'handleInvoicePaymentSucceeded' does not exist on type 'StripeService'. Did you mean 'handleInvoicePaymentFailed'?
src/routes/webhooks.ts(159,29): error TS2339: Property 'handleCustomerCreated' does not exist on type 'StripeService'.

2025-10-18T01:45:27.124231525Z [inf]  src/routes/webhooks.ts(167,29): error TS2339: Property 'handleCustomerUpdated' does not exist on type 'StripeService'.

2025-10-18T01:45:27.124242921Z [inf]  src/services/agents/agent-manager.ts(122,46): error TS2304: Cannot find name 'MizanAgent'.

2025-10-18T01:45:27.124308989Z [inf]  src/services/agents/hiring/hiring-agent.ts(167,60): error TS2345: Argument of type '{ id: string; status: "draft" | "on_hold" | "cancelled" | "pending_approval" | "approved" | "posted" | "filled"; location: string; createdAt: Date; updatedAt: Date; tenantId: string; ... 37 more ...; aiRecommendations: unknown; }' is not assignable to parameter of type 'HiringRequisition'.
  Types of property 'responsibilities' are incompatible.
    Type '{}' is missing the following properties from type 'string[]': length, pop, push, concat, and 29 more.
src/services/agents/hiring/hiring-agent.ts(173,119): error TS2345: Argument of type 'IndustryData' is not assignable to parameter of type 'IndustryCompensationData'.
  Type 'IndustryData' is missing the following properties from type 'IndustryCompensationData': location, companySize, marketData, benefits
src/services/agents/lxp/lxp-agent.ts(4,20): error TS2307: Cannot find module '../../../db/connection' or its corresponding type declarations.

2025-10-18T01:45:27.12432343Z [inf]  src/services/agents/lxp/lxp-agent.ts(6,3): error TS2724: '"../../../db/schema"' has no exported member named 'learningPathsTable'. Did you mean 'learningTable'?
src/services/agents/lxp/lxp-agent.ts(7,3): error TS2305: Module '"../../../db/schema"' has no exported member 'coursesTable'.
src/services/agents/lxp/lxp-agent.ts(8,3): error TS2305: Module '"../../../db/schema"' has no exported member 'progressTable'.

2025-10-18T01:45:27.124337783Z [inf]  src/services/agents/lxp/lxp-agent.ts(9,3): error TS2305: Module '"../../../db/schema"' has no exported member 'recommendationsTable'.

2025-10-18T01:45:27.124346014Z [inf]  src/services/agents/lxp/lxp-agent.ts(10,3): error TS2305: Module '"../../../db/schema"' has no exported member 'triggersTable'.

2025-10-18T01:45:27.124361325Z [inf]  src/services/agents/lxp/lxp-agent.ts(77,16): error TS2304: Cannot find name 'Assessment'.

2025-10-18T01:45:27.124366655Z [inf]  src/services/agents/lxp/lxp-agent.ts(140,58): error TS2339: Property 'getBehaviorChangeContext' does not exist on type 'KnowledgeEngine'.

2025-10-18T01:45:27.124369244Z [inf]  src/services/agents/lxp/lxp-agent.ts(141,62): error TS2339: Property 'getGamificationPrinciples' does not exist on type 'KnowledgeEngine'.

2025-10-18T01:45:27.124388562Z [inf]  src/services/agents/lxp/lxp-agent.ts(160,9): error TS2353: Object literal may only specify known properties, and 'behaviorChangeTheories' does not exist in type 'AnalysisContext'.

2025-10-18T01:45:27.12439356Z [inf]  src/services/agents/lxp/lxp-agent.ts(341,58): error TS2339: Property 'getBehaviorChangeContext' does not exist on type 'KnowledgeEngine'.
src/services/agents/lxp/lxp-agent.ts(345,9): error TS2353: Object literal may only specify known properties, and 'progress' does not exist in type '{ metadata?: { quality?: number; processingTime?: number; recordCount?: number; completeness?: number; anomalies?: string[]; }; cleaned?: Record<string, unknown>; normalized?: Record<string, number>; structured?: { ...; }; }'.

2025-10-18T01:45:27.124414383Z [inf]  src/services/agents/lxp/lxp-agent.ts(352,28): error TS2339: Property 'behaviorChanges' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.

2025-10-18T01:45:27.124419991Z [inf]  src/services/agents/lxp/lxp-agent.ts(352,64): error TS2339: Property 'behaviorChanges' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.
src/services/agents/lxp/lxp-agent.ts(353,99): error TS2339: Property 'behaviorChanges' does not exist on type '{ recommendations?: { priority?: "medium" | "low" | "high" | "critical"; category?: string; dependencies?: string[]; resources?: string[]; expectedImpact?: string; action?: string; timeframe?: "immediate" | "short-term" | "long-term" | "medium-term"; rationale?: string; successMetrics?: string[]; }[]; ... 4 more ......'.

2025-10-18T01:45:27.124443845Z [inf]  src/services/agents/performance/performance-agent.ts(160,79): error TS2345: Argument of type '{ id?: string; name?: string; headCount?: number; manager?: string; parentId?: string; }[]' is not assignable to parameter of type 'DepartmentStructure[]'.
  Type '{ id?: string; name?: string; headCount?: number; manager?: string; parentId?: string; }' is not assignable to type 'DepartmentStructure'.
    Property 'id' is optional in type '{ id?: string; name?: string; headCount?: number; manager?: string; parentId?: string; }' but required in type 'DepartmentStructure'.

2025-10-18T01:45:27.124461307Z [inf]  src/services/agents/performance/performance-agent.ts(352,17): error TS2769: No overload matches this call.
  Overload 2 of 2, '(values: { tenantId: string | SQL<unknown> | Placeholder<string, any>; title: string | SQL<unknown> | Placeholder<string, any>; managerId: string | SQL<unknown> | Placeholder<...>; ... 30 more ...; attachments?: unknown; }[]): PgInsertBase<...>', gave the following error.
    Object literal may only specify known properties, and 'id' does not exist in type '{ tenantId: string | SQL<unknown> | Placeholder<string, any>; title: string | SQL<unknown> | Placeholder<string, any>; managerId: string | SQL<unknown> | Placeholder<...>; ... 30 more ...; attachments?: unknown; }[]'.

2025-10-18T01:45:27.124471951Z [inf]  src/services/orchestrator/architect-ai.ts(63,3): error TS2687: All declarations of 'alignmentScore' must have identical modifiers.

2025-10-18T01:45:27.124515801Z [inf]  src/services/orchestrator/architect-ai.ts(65,3): error TS2687: All declarations of 'culturalEntropy' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(67,3): error TS2687: All declarations of 'interventions' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(68,3): error TS2687: All declarations of 'recommendations' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(73,3): error TS2687: All declarations of 'criticalGaps' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(121,3): error TS2687: All declarations of 'recommendations' must have identical modifiers.

2025-10-18T01:45:27.12453805Z [inf]  src/services/orchestrator/architect-ai.ts(121,3): error TS2717: Subsequent property declarations must have the same type.  Property 'recommendations' must be of type 'string[]', but here has type '{ title: string; description: string; }[]'.
src/services/orchestrator/architect-ai.ts(122,3): error TS2687: All declarations of 'alignmentScore' must have identical modifiers.

2025-10-18T01:45:27.124546864Z [inf]  src/services/orchestrator/architect-ai.ts(123,3): error TS2687: All declarations of 'culturalEntropy' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(124,3): error TS2687: All declarations of 'interventions' must have identical modifiers.

2025-10-18T01:45:27.124557195Z [inf]  src/services/orchestrator/architect-ai.ts(124,3): error TS2717: Subsequent property declarations must have the same type.  Property 'interventions' must be of type 'string[]', but here has type '{ type: string; priority: string; }[]'.

2025-10-18T01:45:27.12458312Z [inf]  src/services/orchestrator/architect-ai.ts(132,3): error TS2687: All declarations of 'criticalGaps' must have identical modifiers.
src/services/orchestrator/architect-ai.ts(132,3): error TS2717: Subsequent property declarations must have the same type.  Property 'criticalGaps' must be of type '{ skill: string; gap: number; priority: string; }[]', but here has type '{ skill: string; severity: string; }[]'.
src/services/orchestrator/architect-ai.ts(211,42): error TS2339: Property 'healthScore' does not exist on type 'StructureAnalysisResult | CultureAnalysisResult | SkillsAnalysisResult'.
  Property 'healthScore' does not exist on type 'SkillsAnalysisResult'.

2025-10-18T01:45:27.12463299Z [inf]  src/services/orchestrator/architect-ai.ts(212,29): error TS2339: Property 'healthScore' does not exist on type 'StructureAnalysisResult | CultureAnalysisResult | SkillsAnalysisResult'.
  Property 'healthScore' does not exist on type 'SkillsAnalysisResult'.
src/services/orchestrator/architect-ai.ts(254,49): error TS2345: Argument of type '{ companyId: string; tenantId: string; orgChart: OrgChartData; strategy: string; }' is not assignable to parameter of type 'StructureAnalysisInput'.
  Types of property 'orgChart' are incompatible.
    Type 'OrgChartData' is missing the following properties from type '{ departments: { id: string; name: string; parentId?: string; headCount: number; manager?: string; }[]; reportingLines: { from: string; to: string; type: "direct" | "dotted" | "functional"; }[]; roles: { ...; }[]; }': reportingLines, roles
src/services/orchestrator/architect-ai.ts(269,52): error TS2339: Property 'description' does not exist on type 'never'.
src/services/orchestrator/architect-ai.ts(334,7): error TS2353: Object literal may only specify known properties, and 'healthScore' does not exist in type 'SkillsAnalysisResult'.
src/services/orchestrator/architect-ai.ts(343,23): error TS2339: Property 'skill' does not exist on type '{ employeeId: string; skillGaps: SkillsGap[]; learningPaths: string[]; }'.

2025-10-18T01:45:27.124640928Z [inf]  src/services/orchestrator/architect-ai.ts(344,27): error TS2339: Property 'priority' does not exist on type '{ employeeId: string; skillGaps: SkillsGap[]; learningPaths: string[]; }'.
src/services/orchestrator/architect-ai.ts(347,46): error TS2339: Property 'title' does not exist on type '{ type: "training" | "hiring" | "development" | "restructuring"; priority: "immediate" | "short-term" | "long-term"; description: string; expectedImpact: string; estimatedCost?: string; }'.

2025-10-18T01:45:27.124668014Z [inf]  src/services/orchestrator/architect-ai.ts(386,5): error TS2353: Object literal may only specify known properties, and 'reportingLines' does not exist in type 'DefaultOrgChart'.
src/services/results/trigger-engine.ts(270,11): error TS2322: Type 'unknown' is not assignable to type 'string'.

2025-10-18T01:45:27.124673015Z [inf]  src/services/results/trigger-engine.ts(271,11): error TS2322: Type 'unknown' is not assignable to type 'string'.

2025-10-18T01:45:27.12469244Z [inf]  src/services/results/trigger-engine.ts(272,11): error TS2322: Type 'unknown' is not assignable to type 'string'.
src/services/results/trigger-engine.ts(273,11): error TS2740: Type '{}' is missing the following properties from type 'string[]': length, pop, push, concat, and 29 more.

2025-10-18T01:45:27.124695339Z [inf]  src/services/results/trigger-engine.ts(274,11): error TS2740: Type '{}' is missing the following properties from type 'string[]': length, pop, push, concat, and 29 more.

2025-10-18T01:45:27.124697455Z [inf]  src/services/results/trigger-engine.ts(275,11): error TS2322: Type 'unknown' is not assignable to type 'string'.

2025-10-18T01:45:27.124730609Z [inf]  src/services/skills/skillsBotService.ts(264,83): error TS2352: Conversion of type 'ResumeData' to type 'Record<string, unknown>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Index signature for type 'string' is missing in type 'ResumeData'.
src/services/skills/skillsBotService.ts(317,65): error TS2345: Argument of type 'ResumeBuildingData' is not assignable to parameter of type 'Record<string, unknown>'.
  Index signature for type 'string' is missing in type 'ResumeBuildingData'.

2025-10-18T01:45:27.12473593Z [inf]  src/services/skills/skillsBotService.ts(334,65): error TS2345: Argument of type 'ResumeBuildingData' is not assignable to parameter of type 'Record<string, unknown>'.
  Index signature for type 'string' is missing in type 'ResumeBuildingData'.
src/services/skills/skillsBotService.ts(675,21): error TS2339: Property 'name' does not exist on type 'ResumeData'.

2025-10-18T01:45:27.124779288Z [inf]  src/services/skills/skillsBotService.ts(676,21): error TS2339: Property 'email' does not exist on type 'ResumeData'.
src/services/workflow/automated-flow.ts(223,9): error TS2739: Type 'TriggerStepResult' is missing the following properties from type 'StepResult': success, data, timestamp
src/services/workflow/automated-flow.ts(225,9): error TS2739: Type 'ActionStepResult' is missing the following properties from type 'StepResult': success, data, timestamp
src/services/workflow/automated-flow.ts(227,9): error TS2739: Type 'ConditionStepResult' is missing the following properties from type 'StepResult': success, data, timestamp

2025-10-18T01:45:27.124787468Z [inf]  src/services/workflow/automated-flow.ts(229,9): error TS2739: Type 'DelayStepResult' is missing the following properties from type 'StepResult': success, data, timestamp

2025-10-18T01:45:27.422737112Z [err]  [builder 7/8] RUN npm run build
2025-10-18T01:45:27.441307625Z [err]  Dockerfile.prod:19
2025-10-18T01:45:27.441337499Z [err]  -------------------
2025-10-18T01:45:27.441344474Z [err]  17 |
2025-10-18T01:45:27.441351269Z [err]  18 |     # Build the application
2025-10-18T01:45:27.441357579Z [err]  19 | >>> RUN npm run build
2025-10-18T01:45:27.441362275Z [err]  20 |
2025-10-18T01:45:27.441367368Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2025-10-18T01:45:27.441371893Z [err]  -------------------
2025-10-18T01:45:27.441378718Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2