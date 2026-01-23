2026-01-12T18:19:04.174788052Z [inf]  
2026-01-12T18:19:05.569386884Z [inf]  [35m[Region: us-east4][0m
2026-01-12T18:19:05.577116199Z [inf]  [35m=========================
2026-01-12T18:19:05.577137607Z [inf]  Using Detected Dockerfile
2026-01-12T18:19:05.577141482Z [inf]  =========================
2026-01-12T18:19:05.577146055Z [inf]  [0m
2026-01-12T18:19:05.577156720Z [inf]  context: fvgx-Hyo7
2026-01-12T18:19:05.708361191Z [inf]  [internal] load build definition from Dockerfile.prod
2026-01-12T18:19:05.708401803Z [inf]  [internal] load build definition from Dockerfile.prod
2026-01-12T18:19:05.708424202Z [inf]  [internal] load build definition from Dockerfile.prod
2026-01-12T18:19:05.717059887Z [inf]  [internal] load build definition from Dockerfile.prod
2026-01-12T18:19:05.719191585Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2026-01-12T18:19:05.801102038Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2026-01-12T18:19:05.801345485Z [inf]  [internal] load .dockerignore
2026-01-12T18:19:05.801370819Z [inf]  [internal] load .dockerignore
2026-01-12T18:19:05.801810704Z [inf]  [internal] load .dockerignore
2026-01-12T18:19:05.810540049Z [inf]  [internal] load .dockerignore
2026-01-12T18:19:05.816660855Z [inf]  [builder 8/8] RUN npm prune --production
2026-01-12T18:19:05.816684530Z [inf]  [builder 7/8] RUN npm run build
2026-01-12T18:19:05.816697123Z [inf]  [builder 4/8] COPY tsconfig.json ./
2026-01-12T18:19:05.816707792Z [inf]  [builder 3/8] COPY package*.json ./
2026-01-12T18:19:05.816716960Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2026-01-12T18:19:05.816727506Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2026-01-12T18:19:05.816733623Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2026-01-12T18:19:05.816739323Z [inf]  [builder 2/8] WORKDIR /app
2026-01-12T18:19:05.816744895Z [inf]  [production 4/9] WORKDIR /app
2026-01-12T18:19:05.816752372Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2026-01-12T18:19:05.816760146Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2026-01-12T18:19:05.816774100Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2026-01-12T18:19:05.816780380Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2026-01-12T18:19:05.816786280Z [inf]  [internal] load build context
2026-01-12T18:19:05.816792887Z [inf]  [builder 6/8] COPY . .
2026-01-12T18:19:05.816799669Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c23e06d4bb95c71e7d704537c9d9272f488ac03a370d448
2026-01-12T18:19:05.816804914Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2026-01-12T18:19:05.816820357Z [inf]  [internal] load build context
2026-01-12T18:19:05.816825797Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c23e06d4bb95c71e7d704537c9d9272f488ac03a370d448
2026-01-12T18:19:05.821449753Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c23e06d4bb95c71e7d704537c9d9272f488ac03a370d448
2026-01-12T18:19:05.821808240Z [inf]  [internal] load build context
2026-01-12T18:19:05.821831584Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c23e06d4bb95c71e7d704537c9d9272f488ac03a370d448
2026-01-12T18:19:05.821844896Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:658d0f63e501824d6c23e06d4bb95c71e7d704537c9d9272f488ac03a370d448
2026-01-12T18:19:05.821931769Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2026-01-12T18:19:05.891131497Z [inf]  [internal] load build context
2026-01-12T18:19:05.893695537Z [inf]  [builder 2/8] WORKDIR /app
2026-01-12T18:19:05.893748550Z [inf]  [builder 3/8] COPY package*.json ./
2026-01-12T18:19:05.910097271Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2026-01-12T18:19:05.911082415Z [inf]  [builder 3/8] COPY package*.json ./
2026-01-12T18:19:05.912670924Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2026-01-12T18:19:05.914139376Z [inf]  [builder 4/8] COPY tsconfig.json ./
2026-01-12T18:19:05.929678929Z [inf]  [builder 4/8] COPY tsconfig.json ./
2026-01-12T18:19:05.930984049Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2026-01-12T18:19:06.051857509Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2026-01-12T18:19:06.053714832Z [inf]  [production 4/9] WORKDIR /app
2026-01-12T18:19:06.063539900Z [inf]  [production 4/9] WORKDIR /app
2026-01-12T18:19:08.20441751Z [inf]  npm warn deprecated mimelib@0.3.1: This project is unmaintained

2026-01-12T18:19:08.375529721Z [inf]  npm warn deprecated mailparser@0.6.2: Mailparser versions older than v2.3.0 are deprecated

2026-01-12T18:19:08.459588605Z [inf]  npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

2026-01-12T18:19:08.539881604Z [inf]  npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

2026-01-12T18:19:08.572147862Z [inf]  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

2026-01-12T18:19:09.303856994Z [inf]  npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is

2026-01-12T18:19:09.30415363Z [inf]  npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is

2026-01-12T18:19:09.788396829Z [inf]  npm warn deprecated sendgrid@5.2.3: Please see v6.X+ at https://www.npmjs.com/org/sendgrid

2026-01-12T18:19:12.624622313Z [inf]  
added 445 packages, and audited 446 packages in 6s

2026-01-12T18:19:12.624635321Z [inf]  
67 packages are looking for funding
  run `npm fund` for details

2026-01-12T18:19:12.65888178Z [inf]  
10 vulnerabilities (4 moderate, 6 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.

2026-01-12T18:19:12.659920224Z [inf]  npm notice
npm notice New major version of npm available! 10.8.2 -> 11.7.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.7.0
npm notice To update run: npm install -g npm@11.7.0
npm notice

2026-01-12T18:19:12.776362133Z [inf]  npm warn using --force Recommended protections disabled.

2026-01-12T18:19:13.125353217Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2026-01-12T18:19:13.127245035Z [inf]  [builder 6/8] COPY . .
2026-01-12T18:19:13.253478388Z [inf]  [builder 6/8] COPY . .
2026-01-12T18:19:13.255049571Z [inf]  [builder 7/8] RUN npm run build
2026-01-12T18:19:13.434341609Z [inf]  
> mizan-server@1.0.0 build
> tsc


2026-01-12T18:19:23.166906091Z [inf]  src/routes/lxp.ts(6,10): error TS2305: Module '"../middleware/auth"' has no exported member 'authMiddleware'.

2026-01-12T18:19:23.16707302Z [inf]  src/routes/lxp.ts(8,10): error TS2614: Module '"../middleware/validation"' has no exported member 'validationMiddleware'. Did you mean to use 'import validationMiddleware from "../middleware/validation"' instead?

2026-01-12T18:19:23.167085548Z [inf]  src/routes/lxp.ts(9,34): error TS2307: Cannot find module '../utils/apiHandler' or its corresponding type declarations.

2026-01-12T18:19:23.167112496Z [inf]  src/routes/lxp.ts(10,28): error TS2307: Cannot find module '../services/lxpService' or its corresponding type declarations.

2026-01-12T18:19:23.167150564Z [inf]  src/routes/lxp.ts(11,37): error TS2307: Cannot find module '../services/lxp/learningPathService' or its corresponding type declarations.
src/routes/lxp.ts(12,31): error TS2307: Cannot find module '../services/lxp/courseService' or its corresponding type declarations.
src/routes/lxp.ts(13,33): error TS2307: Cannot find module '../services/lxp/progressService' or its corresponding type declarations.

2026-01-12T18:19:23.16717715Z [inf]  src/routes/lxp.ts(14,39): error TS2307: Cannot find module '../services/lxp/recommendationService' or its corresponding type declarations.

2026-01-12T18:19:23.167202654Z [inf]  src/routes/lxp.ts(15,20): error TS2307: Cannot find module '../db/connection' or its corresponding type declarations.

2026-01-12T18:19:23.167355808Z [inf]  src/routes/lxp.ts(18,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'learningPathsTable'.
src/routes/lxp.ts(19,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'coursesTable'.

2026-01-12T18:19:23.16736442Z [inf]  src/routes/lxp.ts(20,3): error TS2724: '"../db/schema/lxp"' has no exported member named 'learningProgressTable'. Did you mean 'learningProgressEventsTable'?

2026-01-12T18:19:23.167385316Z [inf]  src/routes/lxp.ts(21,3): error TS2305: Module '"../db/schema/lxp"' has no exported member 'learningRecommendationsTable'.

2026-01-12T18:19:23.167395645Z [inf]  src/routes/lxp.ts(22,3): error TS2724: '"../db/schema/lxp"' has no exported member named 'triggersTable'. Did you mean 'lxpTriggersTable'?

2026-01-12T18:19:23.167425939Z [inf]  src/routes/lxp.ts(117,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.167446748Z [inf]  src/routes/lxp.ts(316,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.167487238Z [inf]  src/routes/lxp.ts(348,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.167613637Z [inf]  src/routes/lxp.ts(385,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.167621347Z [inf]  src/routes/lxp.ts(446,25): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.167699758Z [inf]  src/routes/lxp.ts(510,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.
src/routes/lxp.ts(534,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.167704556Z [inf]  src/routes/lxp.ts(592,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.167759999Z [inf]  src/routes/lxp.ts(617,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.16779068Z [inf]  src/routes/lxp.ts(671,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.1678092Z [inf]  src/routes/lxp.ts(699,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.167831734Z [inf]  src/routes/lxp.ts(734,23): error TS2339: Property 'userId' does not exist on type 'AuthenticatedUser'.

2026-01-12T18:19:23.230640191Z [err]  [builder 7/8] RUN npm run build
2026-01-12T18:19:23.245931042Z [err]  Dockerfile.prod:19
2026-01-12T18:19:23.245945227Z [err]  -------------------
2026-01-12T18:19:23.245949443Z [err]  17 |
2026-01-12T18:19:23.245953523Z [err]  18 |     # Build the application
2026-01-12T18:19:23.245957873Z [err]  19 | >>> RUN npm run build
2026-01-12T18:19:23.245961525Z [err]  20 |
2026-01-12T18:19:23.245965202Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2026-01-12T18:19:23.245968699Z [err]  -------------------
2026-01-12T18:19:23.245972475Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2