2026-01-23T21:32:54.108528928Z [inf]  
2026-01-23T21:32:55.499886075Z [inf]  [35m[Region: us-east4][0m
2026-01-23T21:32:55.507153121Z [inf]  [35m=========================
2026-01-23T21:32:55.507173935Z [inf]  Using Detected Dockerfile
2026-01-23T21:32:55.507177667Z [inf]  =========================
2026-01-23T21:32:55.507181479Z [inf]  [0m
2026-01-23T21:32:55.507193604Z [inf]  context: g2rk-ansF
2026-01-23T21:32:55.681475197Z [inf]  [internal] load build definition from Dockerfile.prod
2026-01-23T21:32:55.681525022Z [inf]  [internal] load build definition from Dockerfile.prod
2026-01-23T21:32:55.681544648Z [inf]  [internal] load build definition from Dockerfile.prod
2026-01-23T21:32:55.692505334Z [inf]  [internal] load build definition from Dockerfile.prod
2026-01-23T21:32:55.695528311Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2026-01-23T21:32:55.784195539Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2026-01-23T21:32:55.784971126Z [inf]  [internal] load .dockerignore
2026-01-23T21:32:55.785100597Z [inf]  [internal] load .dockerignore
2026-01-23T21:32:55.785486908Z [inf]  [internal] load .dockerignore
2026-01-23T21:32:55.796609668Z [inf]  [internal] load .dockerignore
2026-01-23T21:32:55.804126062Z [inf]  [builder 7/8] RUN npm run build
2026-01-23T21:32:55.804147983Z [inf]  [builder 6/8] COPY . .
2026-01-23T21:32:55.804159182Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2026-01-23T21:32:55.804167002Z [inf]  [builder 4/8] COPY tsconfig.json ./
2026-01-23T21:32:55.804174647Z [inf]  [builder 3/8] COPY package*.json ./
2026-01-23T21:32:55.804181695Z [inf]  [internal] load build context
2026-01-23T21:32:55.804189563Z [inf]  [builder 2/8] WORKDIR /app
2026-01-23T21:32:55.804195282Z [inf]  [production 4/9] WORKDIR /app
2026-01-23T21:32:55.804200728Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2026-01-23T21:32:55.804207215Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2026-01-23T21:32:55.804212495Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:3960ed74dfe320a67bf8da9555b6bade25ebda2b22b6081d2f60fd7d5d430e9c
2026-01-23T21:32:55.804256422Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2026-01-23T21:32:55.804264210Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2026-01-23T21:32:55.804270181Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2026-01-23T21:32:55.804276868Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2026-01-23T21:32:55.804285348Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2026-01-23T21:32:55.804292874Z [inf]  [builder 8/8] RUN npm prune --production
2026-01-23T21:32:55.806305735Z [inf]  [internal] load build context
2026-01-23T21:32:55.809168131Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:3960ed74dfe320a67bf8da9555b6bade25ebda2b22b6081d2f60fd7d5d430e9c
2026-01-23T21:32:55.815650529Z [inf]  [internal] load build context
2026-01-23T21:32:55.815681756Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:3960ed74dfe320a67bf8da9555b6bade25ebda2b22b6081d2f60fd7d5d430e9c
2026-01-23T21:32:55.815970359Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:3960ed74dfe320a67bf8da9555b6bade25ebda2b22b6081d2f60fd7d5d430e9c
2026-01-23T21:32:55.817650630Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2026-01-23T21:32:55.920181623Z [inf]  [internal] load build context
2026-01-23T21:32:55.931586773Z [inf]  [builder 2/8] WORKDIR /app
2026-01-23T21:32:55.931624215Z [inf]  [builder 3/8] COPY package*.json ./
2026-01-23T21:32:56.032789293Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2026-01-23T21:32:56.034382637Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2026-01-23T21:32:56.035212313Z [inf]  [builder 3/8] COPY package*.json ./
2026-01-23T21:32:56.037211175Z [inf]  [builder 4/8] COPY tsconfig.json ./
2026-01-23T21:32:56.099816991Z [inf]  [builder 4/8] COPY tsconfig.json ./
2026-01-23T21:32:56.101828587Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2026-01-23T21:32:56.320432796Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2026-01-23T21:32:56.322893779Z [inf]  [production 4/9] WORKDIR /app
2026-01-23T21:32:56.395519857Z [inf]  [production 4/9] WORKDIR /app
2026-01-23T21:32:58.89239411Z [inf]  npm warn deprecated mimelib@0.3.1: This project is unmaintained

2026-01-23T21:32:59.233971645Z [inf]  npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

2026-01-23T21:32:59.2672008Z [inf]  npm warn deprecated mailparser@0.6.2: Mailparser versions older than v2.3.0 are deprecated

2026-01-23T21:32:59.268829363Z [inf]  npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

2026-01-23T21:32:59.71486994Z [inf]  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

2026-01-23T21:32:59.961728684Z [inf]  npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is

2026-01-23T21:32:59.997457067Z [inf]  npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is

2026-01-23T21:33:00.90078774Z [inf]  npm warn deprecated sendgrid@5.2.3: Please see v6.X+ at https://www.npmjs.com/org/sendgrid

2026-01-23T21:33:04.325809121Z [inf]  
added 441 packages, and audited 442 packages in 8s

2026-01-23T21:33:04.32599719Z [inf]  

2026-01-23T21:33:04.326051054Z [inf]  67 packages are looking for funding
  run `npm fund` for details

2026-01-23T21:33:04.374940965Z [inf]  
10 vulnerabilities (4 moderate, 6 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.

2026-01-23T21:33:04.376319271Z [inf]  npm notice
npm notice New major version of npm available! 10.8.2 -> 11.8.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.8.0
npm notice To update run: npm install -g npm@11.8.0
npm notice

2026-01-23T21:33:04.519772158Z [inf]  npm warn using --force Recommended protections disabled.

2026-01-23T21:33:07.230240035Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2026-01-23T21:33:07.233916318Z [inf]  [builder 6/8] COPY . .
2026-01-23T21:33:07.471839002Z [inf]  [builder 6/8] COPY . .
2026-01-23T21:33:07.476075741Z [inf]  [builder 7/8] RUN npm run build
2026-01-23T21:33:07.700265547Z [inf]  
> mizan-server@1.0.0 build
> tsc


2026-01-23T21:33:20.32381121Z [inf]  src/routes/auth.ts(4,20): error TS2307: Cannot find module 'bcrypt' or its corresponding type declarations.

2026-01-23T21:33:20.324096064Z [inf]  src/services/auth.ts(1,25): error TS2307: Cannot find module 'bcrypt' or its corresponding type declarations.

2026-01-23T21:33:20.734207715Z [err]  [builder 7/8] RUN npm run build
2026-01-23T21:33:20.760081300Z [err]  Dockerfile.prod:19
2026-01-23T21:33:20.760124328Z [err]  -------------------
2026-01-23T21:33:20.760129288Z [err]  17 |
2026-01-23T21:33:20.760134534Z [err]  18 |     # Build the application
2026-01-23T21:33:20.760140169Z [err]  19 | >>> RUN npm run build
2026-01-23T21:33:20.760144192Z [err]  20 |
2026-01-23T21:33:20.760148939Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2026-01-23T21:33:20.760152713Z [err]  -------------------
2026-01-23T21:33:20.760156810Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2