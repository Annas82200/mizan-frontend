2025-10-15T20:41:18.762883850Z [inf]  
2025-10-15T20:41:20.001394430Z [inf]  [35m[Region: us-east4][0m
2025-10-15T20:41:20.004579021Z [inf]  [35m=========================
2025-10-15T20:41:20.004600421Z [inf]  Using Detected Dockerfile
2025-10-15T20:41:20.004607073Z [inf]  =========================
2025-10-15T20:41:20.004610105Z [inf]  [0m
2025-10-15T20:41:20.004621584Z [inf]  context: xgc2-wsj9
2025-10-15T20:41:20.152099346Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:41:20.152142527Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:41:20.152160213Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:41:20.152171748Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:41:20.169946994Z [inf]  [internal] load build definition from Dockerfile.prod
2025-10-15T20:41:20.173995727Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-15T20:41:20.177188362Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-15T20:41:20.177217098Z [inf]  [auth] library/node:pull token for registry-1.docker.io
2025-10-15T20:41:20.274608189Z [inf]  [internal] load metadata for docker.io/library/node:20-alpine
2025-10-15T20:41:20.275082841Z [inf]  [internal] load .dockerignore
2025-10-15T20:41:20.275113933Z [inf]  [internal] load .dockerignore
2025-10-15T20:41:20.275323711Z [inf]  [internal] load .dockerignore
2025-10-15T20:41:20.292854371Z [inf]  [internal] load .dockerignore
2025-10-15T20:41:20.297734127Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T20:41:20.297764203Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T20:41:20.297771430Z [inf]  [internal] load build context
2025-10-15T20:41:20.297781884Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T20:41:20.297790015Z [inf]  [production 4/9] WORKDIR /app
2025-10-15T20:41:20.297797519Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-15T20:41:20.297804010Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-15T20:41:20.297814181Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T20:41:20.297858564Z [inf]  [production 9/9] RUN mkdir -p /app/logs /app/uploads && chown -R mizan:nodejs /app/logs /app/uploads
2025-10-15T20:41:20.297865749Z [inf]  [production 8/9] COPY --from=builder --chown=mizan:nodejs /app/db ./db
2025-10-15T20:41:20.297875953Z [inf]  [production 7/9] COPY --from=builder --chown=mizan:nodejs /app/package*.json ./
2025-10-15T20:41:20.297881797Z [inf]  [production 6/9] COPY --from=builder --chown=mizan:nodejs /app/node_modules ./node_modules
2025-10-15T20:41:20.297890207Z [inf]  [production 5/9] COPY --from=builder --chown=mizan:nodejs /app/dist ./dist
2025-10-15T20:41:20.297895580Z [inf]  [builder 8/8] RUN npm prune --production
2025-10-15T20:41:20.297900704Z [inf]  [builder 7/8] RUN npm run build
2025-10-15T20:41:20.297907942Z [inf]  [builder 6/8] COPY . .
2025-10-15T20:41:20.297914911Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T20:41:20.298171370Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T20:41:20.298211917Z [inf]  [internal] load build context
2025-10-15T20:41:20.304329368Z [inf]  [builder 2/8] WORKDIR /app
2025-10-15T20:41:20.304366843Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T20:41:20.304396399Z [inf]  [builder 1/8] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
2025-10-15T20:41:20.304410069Z [inf]  [internal] load build context
2025-10-15T20:41:20.304519902Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-15T20:41:20.401469985Z [inf]  [internal] load build context
2025-10-15T20:41:20.406222434Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T20:41:20.443545147Z [inf]  [builder 3/8] COPY package*.json ./
2025-10-15T20:41:20.446300591Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T20:41:20.458730979Z [inf]  [production 2/9] RUN addgroup -g 1001 -S nodejs
2025-10-15T20:41:20.460714763Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-15T20:41:20.477411525Z [inf]  [builder 4/8] COPY tsconfig.json ./
2025-10-15T20:41:20.479992816Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T20:41:20.697573470Z [inf]  [production 3/9] RUN adduser -S mizan -u 1001
2025-10-15T20:41:20.700033433Z [inf]  [production 4/9] WORKDIR /app
2025-10-15T20:41:20.739544938Z [inf]  [production 4/9] WORKDIR /app
2025-10-15T20:41:23.10639492Z [inf]  npm warn deprecated mimelib@0.3.1: This project is unmaintained

2025-10-15T20:41:23.339741555Z [inf]  npm warn deprecated mailparser@0.6.2: Mailparser versions older than v2.3.0 are deprecated

2025-10-15T20:41:23.380542887Z [inf]  npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

2025-10-15T20:41:23.428094138Z [inf]  npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

2025-10-15T20:41:23.495573062Z [inf]  npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead

2025-10-15T20:41:24.270160479Z [inf]  npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is

2025-10-15T20:41:24.397978385Z [inf]  npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is

2025-10-15T20:41:24.709634478Z [inf]  npm warn deprecated sendgrid@5.2.3: Please see v6.X+ at https://www.npmjs.com/org/sendgrid

2025-10-15T20:41:28.298279065Z [inf]  
added 433 packages, and audited 434 packages in 8s

2025-10-15T20:41:28.298301807Z [inf]  
67 packages are looking for funding
  run `npm fund` for details

2025-10-15T20:41:28.326683513Z [inf]  
4 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

2025-10-15T20:41:28.328226391Z [inf]  npm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice

2025-10-15T20:41:28.462310574Z [inf]  npm warn using --force Recommended protections disabled.

2025-10-15T20:41:29.273130892Z [inf]  [builder 5/8] RUN npm ci && npm cache clean --force
2025-10-15T20:41:29.275559603Z [inf]  [builder 6/8] COPY . .
2025-10-15T20:41:29.410218298Z [inf]  [builder 6/8] COPY . .
2025-10-15T20:41:29.412892408Z [inf]  [builder 7/8] RUN npm run build
2025-10-15T20:41:29.640112251Z [inf]  
> mizan-server@1.0.0 build
> tsc


2025-10-15T20:41:37.14880738Z [inf]  index.ts(41,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.148961447Z [inf]  index.ts(42,32): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
index.ts(44,41): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.148967827Z [inf]  index.ts(45,32): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.1489725Z [inf]  index.ts(46,32): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149001975Z [inf]  index.ts(47,29): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
index.ts(48,34): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.14902266Z [inf]  index.ts(49,33): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149025963Z [inf]  index.ts(50,34): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149210457Z [inf]  index.ts(51,25): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.14921869Z [inf]  index.ts(52,24): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149270974Z [inf]  index.ts(53,25): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
index.ts(54,28): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.14929063Z [inf]  index.ts(55,25): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149304775Z [inf]  index.ts(56,30): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149340085Z [inf]  index.ts(57,27): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149345722Z [inf]  index.ts(58,26): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149470095Z [inf]  index.ts(59,28): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.14949657Z [inf]  index.ts(60,27): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149596205Z [inf]  index.ts(61,27): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
index.ts(62,29): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
index.ts(63,26): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149635993Z [inf]  index.ts(64,26): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149643165Z [inf]  index.ts(65,35): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
index.ts(66,27): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149679405Z [inf]  index.ts(67,27): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
index.ts(68,24): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
index.ts(69,26): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149685127Z [inf]  index.ts(160,15): error TS7006: Parameter 't' implicitly has an 'any' type.

2025-10-15T20:41:37.149689459Z [inf]  index.ts(160,20): error TS7031: Binding element 'eq' implicitly has an 'any' type.

2025-10-15T20:41:37.1497007Z [inf]  index.ts(173,15): error TS7006: Parameter 'u' implicitly has an 'any' type.

2025-10-15T20:41:37.149715457Z [inf]  index.ts(173,20): error TS7031: Binding element 'eq' implicitly has an 'any' type.
index.ts(218,15): error TS7006: Parameter 'u' implicitly has an 'any' type.

2025-10-15T20:41:37.149727839Z [inf]  index.ts(218,20): error TS7031: Binding element 'eq' implicitly has an 'any' type.

2025-10-15T20:41:37.149755586Z [inf]  index.ts(315,35): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149763246Z [inf]  index.ts(447,41): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.14978569Z [inf]  scripts/migrate.ts(2,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149789737Z [inf]  scripts/seed.ts(1,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149798545Z [inf]  scripts/seed.ts(11,8): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.149809977Z [inf]  scripts/seed.ts(12,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../src/services/auth.js'?

2025-10-15T20:41:37.149848859Z [inf]  scripts/seed.ts(321,41): error TS7006: Parameter 'u' implicitly has an 'any' type.
src/ai/engines/DataEngine.ts(8,31): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './KnowledgeEngine.js'?

2025-10-15T20:41:37.149892781Z [inf]  src/ai/engines/ReasoningEngine.ts(8,31): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './KnowledgeEngine.js'?
src/ai/engines/ReasoningEngine.ts(9,31): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './DataEngine.js'?

2025-10-15T20:41:37.149912658Z [inf]  src/ai/engines/ReasoningEngine.ts(118,17): error TS2339: Property 'benchmarks' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.149924797Z [inf]  src/ai/engines/ReasoningEngine.ts(119,39): error TS2339: Property 'benchmarks' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.14993641Z [inf]  src/ai/engines/ReasoningEngine.ts(172,17): error TS2339: Property 'bestPractices' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.149950117Z [inf]  src/ai/engines/ReasoningEngine.ts(173,38): error TS2339: Property 'bestPractices' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.149968612Z [inf]  src/ai/engines/ReasoningEngine.ts(229,17): error TS2339: Property 'benchmarks' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.149981498Z [inf]  src/ai/engines/ReasoningEngine.ts(229,39): error TS2339: Property 'benchmarks' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.149997705Z [inf]  src/ai/engines/ReasoningEngine.ts(336,17): error TS2339: Property 'industryContext' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.150002887Z [inf]  src/ai/engines/ReasoningEngine.ts(337,41): error TS2339: Property 'industryContext' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.150011514Z [inf]  src/ai/engines/ReasoningEngine.ts(690,75): error TS18046: 'value' is of type 'unknown'.

2025-10-15T20:41:37.150029263Z [inf]  src/ai/engines/ReasoningEngine.ts(706,17): error TS2339: Property 'benchmarks' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.150069113Z [inf]  src/ai/engines/ReasoningEngine.ts(707,39): error TS2339: Property 'benchmarks' does not exist on type 'AnalysisContext'.
src/ai/engines/ReasoningEngine.ts(758,18): error TS2339: Property 'benchmarks' does not exist on type 'AnalysisContext'.
src/ai/engines/ReasoningEngine.ts(763,37): error TS2339: Property 'benchmarks' does not exist on type 'AnalysisContext'.

2025-10-15T20:41:37.150104607Z [inf]  src/ai/modules/EngagementAgent.ts(1,53): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../services/agents/base/three-engine-agent.js'?
src/ai/modules/EngagementAgent.ts(67,31): error TS2339: Property 'analyze' does not exist on type 'EngagementAgent'.
src/ai/modules/EngagementAgent.ts(120,31): error TS2339: Property 'analyze' does not exist on type 'EngagementAgent'.

2025-10-15T20:41:37.15013526Z [inf]  src/ai/modules/RecognitionAgent.ts(1,53): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../services/agents/base/three-engine-agent.js'?
src/ai/modules/RecognitionAgent.ts(66,31): error TS2339: Property 'analyze' does not exist on type 'RecognitionAgent'.

2025-10-15T20:41:37.150158271Z [inf]  src/ai/modules/RecognitionAgent.ts(129,31): error TS2339: Property 'analyze' does not exist on type 'RecognitionAgent'.

2025-10-15T20:41:37.150177552Z [inf]  src/db/client.ts(5,25): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema.js'?

2025-10-15T20:41:37.150182419Z [inf]  src/db/index.ts(5,25): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema.js'?

2025-10-15T20:41:37.150224911Z [inf]  src/db/schema.ts(2,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/core.js'?
src/db/schema.ts(3,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/strategy.js'?
src/db/schema.ts(4,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/culture.js'?

2025-10-15T20:41:37.150249829Z [inf]  src/db/schema.ts(5,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/skills.js'?

2025-10-15T20:41:37.150263037Z [inf]  src/db/schema.ts(6,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/performance.js'?
src/db/schema.ts(7,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/agents.js'?

2025-10-15T20:41:37.15027521Z [inf]  src/db/schema.ts(8,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/benchmarking.js'?

2025-10-15T20:41:37.150293074Z [inf]  src/db/schema.ts(9,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/triggers.js'?

2025-10-15T20:41:37.150308316Z [inf]  src/db/schema.ts(10,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/learning.js'?

2025-10-15T20:41:37.15032519Z [inf]  src/db/schema.ts(11,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/lxp-extended.js'?

2025-10-15T20:41:37.150337133Z [inf]  src/db/schema.ts(12,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/hiring.js'?

2025-10-15T20:41:37.15035592Z [inf]  src/db/schema.ts(13,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/audit.js'?

2025-10-15T20:41:37.150369855Z [inf]  src/db/schema.ts(14,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/payments.js'?

2025-10-15T20:41:37.15038395Z [inf]  src/db/schema.ts(15,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/social-media.js'?

2025-10-15T20:41:37.150488421Z [inf]  src/db/schema.ts(16,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/workflows.js'?

2025-10-15T20:41:37.150502608Z [inf]  src/db/schema.ts(17,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './schema/consulting.js'?

2025-10-15T20:41:37.150518445Z [inf]  src/db/schema/agents.ts(3,25): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core.js'?

2025-10-15T20:41:37.150524746Z [inf]  src/db/schema/benchmarking.ts(3,25): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core.js'?

2025-10-15T20:41:37.150544616Z [inf]  src/db/schema/bonus.ts(3,23): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core.js'?

2025-10-15T20:41:37.15056531Z [inf]  src/db/schema/consulting.ts(3,25): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core.js'?

2025-10-15T20:41:37.150575727Z [inf]  src/db/schema/culture.ts(3,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core.js'?

2025-10-15T20:41:37.150593061Z [inf]  src/db/schema/performance.ts(11,45): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core.js'?

2025-10-15T20:41:37.150609963Z [inf]  src/db/schema/skills.ts(3,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core.js'?

2025-10-15T20:41:37.150638207Z [inf]  src/db/schema/strategy.ts(3,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core.js'?

2025-10-15T20:41:37.150672835Z [inf]  src/index.ts(1,26): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/index.ts(2,30): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.150701889Z [inf]  src/index.ts(3,26): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/index.ts(4,26): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.150705841Z [inf]  src/index.ts(5,28): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.150734925Z [inf]  src/index.ts(6,29): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/index.ts(7,26): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15076027Z [inf]  src/index.ts(8,25): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.150764454Z [inf]  src/middleware/auth.ts(3,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.150790853Z [inf]  src/middleware/auth.ts(4,23): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/middleware/auth.ts(6,29): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/auth.js'?

2025-10-15T20:41:37.150815241Z [inf]  src/middleware/auth.ts(26,17): error TS7030: Not all code paths return a value.
src/middleware/tenant.ts(2,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15085022Z [inf]  src/middleware/tenant.ts(3,32): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/middleware/tenant.ts(31,23): error TS7030: Not all code paths return a value.

2025-10-15T20:41:37.150864657Z [inf]  src/routes/admin.ts(5,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?
src/routes/admin.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.150868725Z [inf]  src/routes/admin.ts(16,8): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15092988Z [inf]  src/routes/admin.ts(19,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/email.js'?
src/routes/agents.ts(2,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/agent-manager.js'?
src/routes/agents.ts(3,46): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?
src/routes/analyses.ts(2,75): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/structure-agent.js'?
src/routes/analyses.ts(3,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/culture/culture-agent.js'?
src/routes/analyses.ts(4,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/orchestrator/architect-ai.js'?

2025-10-15T20:41:37.150937198Z [inf]  src/routes/analyses.ts(5,37): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/results/unified-results.js'?

2025-10-15T20:41:37.150963217Z [inf]  src/routes/analyses.ts(6,29): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/results/trigger-engine.js'?
src/routes/analyses.ts(7,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/analyses.ts(8,39): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/analyses.ts(9,25): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.150984678Z [inf]  src/routes/analyses.ts(11,69): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/org-design-expert.js'?
src/routes/analyses.ts(12,74): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/culture-design-expert.js'?

2025-10-15T20:41:37.150997957Z [inf]  src/routes/analyses.ts(13,83): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../types/structure-types.js'?
src/routes/analyses.ts(14,34): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/performance/performance-agent.js'?

2025-10-15T20:41:37.151009587Z [inf]  src/routes/analyses.ts(15,29): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/hiring/hiring-agent.js'?

2025-10-15T20:41:37.15102066Z [inf]  src/routes/analyses.ts(16,26): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/lxp/lxp-agent.js'?

2025-10-15T20:41:37.151125749Z [inf]  src/routes/analyses.ts(180,29): error TS7030: Not all code paths return a value.
src/routes/analyses.ts(239,24): error TS7030: Not all code paths return a value.
src/routes/analyses.ts(288,21): error TS7030: Not all code paths return a value.
src/routes/auth.ts(7,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151137237Z [inf]  src/routes/auth.ts(8,32): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15114101Z [inf]  src/routes/billing.ts(4,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151168458Z [inf]  src/routes/billing.ts(5,31): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/tenant.js'?

2025-10-15T20:41:37.151171767Z [inf]  src/routes/billing.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151192486Z [inf]  src/routes/billing.ts(7,41): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15119834Z [inf]  src/routes/billing.ts(9,31): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/stripe-service.js'?

2025-10-15T20:41:37.151211313Z [inf]  src/routes/bonus.ts(2,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/bonus/bonus-agent.js'?

2025-10-15T20:41:37.151232755Z [inf]  src/routes/bonus.ts(3,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?
src/routes/bonus.ts(12,91): error TS7030: Not all code paths return a value.

2025-10-15T20:41:37.15125191Z [inf]  src/routes/consulting.ts(5,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151257906Z [inf]  src/routes/consulting.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151261249Z [inf]  src/routes/consulting.ts(7,49): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151281875Z [inf]  src/routes/consulting.ts(9,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/email.js'?

2025-10-15T20:41:37.151293487Z [inf]  src/routes/culture-assessment.ts(5,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151308732Z [inf]  src/routes/culture-assessment.ts(13,8): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151320307Z [inf]  src/routes/culture-assessment.ts(14,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/culture/culture-agent.js'?

2025-10-15T20:41:37.151329227Z [inf]  src/routes/culture-assessment.ts(15,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/engagement/engagement-agent.js'?

2025-10-15T20:41:37.151336537Z [inf]  src/routes/culture-assessment.ts(16,34): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/recognition/recognition-agent.js'?

2025-10-15T20:41:37.1513547Z [inf]  src/routes/culture-assessment.ts(17,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151377015Z [inf]  src/routes/culture-assessment.ts(525,31): error TS7006: Parameter 'emp' implicitly has an 'any' type.
src/routes/culture-assessment.ts(531,21): error TS7006: Parameter 'assessments' implicitly has an 'any' type.

2025-10-15T20:41:37.151416412Z [inf]  src/routes/culture-assessment.ts(531,36): error TS7031: Binding element 'desc' implicitly has an 'any' type.
src/routes/culture-assessment.ts(583,42): error TS7006: Parameter 'inv' implicitly has an 'any' type.
src/routes/culture-assessment.ts(584,40): error TS7006: Parameter 'inv' implicitly has an 'any' type.

2025-10-15T20:41:37.151434Z [inf]  src/routes/culture-assessment.ts(585,40): error TS7006: Parameter 'inv' implicitly has an 'any' type.

2025-10-15T20:41:37.15143973Z [inf]  src/routes/culture-assessment.ts(599,36): error TS7006: Parameter 'inv' implicitly has an 'any' type.

2025-10-15T20:41:37.151458975Z [inf]  src/routes/culture-assessment.ts(779,17): error TS7006: Parameter 'assessments' implicitly has an 'any' type.

2025-10-15T20:41:37.151484371Z [inf]  src/routes/culture-assessment.ts(779,32): error TS7031: Binding element 'desc' implicitly has an 'any' type.
src/routes/culture-assessment.ts(823,17): error TS7006: Parameter 'assessments' implicitly has an 'any' type.

2025-10-15T20:41:37.151496982Z [inf]  src/routes/culture-assessment.ts(823,32): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:41:37.151507626Z [inf]  src/routes/culture-assessment.ts(862,17): error TS7006: Parameter 'assessments' implicitly has an 'any' type.

2025-10-15T20:41:37.151549064Z [inf]  src/routes/culture-assessment.ts(862,32): error TS7031: Binding element 'desc' implicitly has an 'any' type.
src/routes/culture-assessment.ts(900,17): error TS7006: Parameter 'assessments' implicitly has an 'any' type.

2025-10-15T20:41:37.151572387Z [inf]  src/routes/culture-assessment.ts(900,32): error TS7031: Binding element 'desc' implicitly has an 'any' type.
src/routes/culture-assessment.ts(994,17): error TS7006: Parameter 'reports' implicitly has an 'any' type.
src/routes/culture-assessment.ts(994,28): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:41:37.151582637Z [inf]  src/routes/culture-assessment.ts(1037,23): error TS7006: Parameter 'a' implicitly has an 'any' type.

2025-10-15T20:41:37.151596766Z [inf]  src/routes/culture-assessment.ts(1404,15): error TS7006: Parameter 'reports' implicitly has an 'any' type.

2025-10-15T20:41:37.151602953Z [inf]  src/routes/culture-assessment.ts(1404,26): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:41:37.151621114Z [inf]  src/routes/culture-assessment.ts(1425,5): error TS7006: Parameter 'a' implicitly has an 'any' type.
src/routes/culture-assessment.ts(1433,70): error TS7006: Parameter 'a' implicitly has an 'any' type.

2025-10-15T20:41:37.151642878Z [inf]  src/routes/culture-assessment.ts(1478,15): error TS7006: Parameter 'reports' implicitly has an 'any' type.
src/routes/culture-assessment.ts(1478,26): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:41:37.15165287Z [inf]  src/routes/demo.ts(3,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/demo.ts(4,30): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151667586Z [inf]  src/routes/demo.ts(6,35): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151682822Z [inf]  src/routes/demo.ts(7,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/email.js'?

2025-10-15T20:41:37.151688281Z [inf]  src/routes/employee.ts(5,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151696476Z [inf]  src/routes/employee.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/employee.ts(12,8): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151710123Z [inf]  src/routes/export.ts(2,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151729739Z [inf]  src/routes/framework.ts(2,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/framework.ts(3,33): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151737166Z [inf]  src/routes/framework.ts(5,43): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.15174636Z [inf]  src/routes/framework.ts(127,28): error TS7006: Parameter 'config' implicitly has an 'any' type.

2025-10-15T20:41:37.151763745Z [inf]  src/routes/modules.ts(5,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151770221Z [inf]  src/routes/modules.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151786161Z [inf]  src/routes/modules.ts(7,36): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151800555Z [inf]  src/routes/modules.ts(23,15): error TS7006: Parameter 'performanceReviews' implicitly has an 'any' type.

2025-10-15T20:41:37.151804853Z [inf]  src/routes/modules.ts(23,37): error TS7031: Binding element 'eq' implicitly has an 'any' type.

2025-10-15T20:41:37.15182693Z [inf]  src/routes/modules.ts(23,41): error TS7031: Binding element 'and' implicitly has an 'any' type.
src/routes/orchestrator.ts(5,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151854409Z [inf]  src/routes/orchestrator.ts(6,50): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/orchestrator/architect-ai.js'?

2025-10-15T20:41:37.151859451Z [inf]  src/routes/orchestrator.ts(7,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151885332Z [inf]  src/routes/orchestrator.ts(8,37): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/orchestrator.ts(82,21): error TS7006: Parameter 'error' implicitly has an 'any' type.

2025-10-15T20:41:37.15190224Z [inf]  src/routes/payment.ts(3,31): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/stripe-service.js'?

2025-10-15T20:41:37.151915562Z [inf]  src/routes/payment.ts(4,35): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.151927974Z [inf]  src/routes/payment.ts(5,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15194841Z [inf]  src/routes/payment.ts(6,30): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.151962692Z [inf]  src/routes/public-structure.ts(3,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/structure-agent.js'?

2025-10-15T20:41:37.152002351Z [inf]  src/routes/public-structure.ts(4,37): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../types/structure-types.js'?

2025-10-15T20:41:37.152026954Z [inf]  src/routes/skills.ts(6,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.152033312Z [inf]  src/routes/skills.ts(7,29): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15203678Z [inf]  src/routes/skills.ts(8,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.152046784Z [inf]  src/routes/skills.ts(9,236): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.152058145Z [inf]  src/routes/skills.ts(49,81): error TS7030: Not all code paths return a value.

2025-10-15T20:41:37.152070959Z [inf]  src/routes/skills.ts(70,83): error TS7030: Not all code paths return a value.

2025-10-15T20:41:37.152076294Z [inf]  src/routes/skills.ts(92,55): error TS7030: Not all code paths return a value.

2025-10-15T20:41:37.152086054Z [inf]  src/routes/skills.ts(122,51): error TS7030: Not all code paths return a value.

2025-10-15T20:41:37.152106157Z [inf]  src/routes/skills.ts(143,52): error TS7030: Not all code paths return a value.

2025-10-15T20:41:37.152160199Z [inf]  src/routes/superadmin.ts(2,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/superadmin.ts(3,32): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/superadmin.ts(5,43): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?
src/routes/superadmin.ts(168,44): error TS7006: Parameter 'tenant' implicitly has an 'any' type.
src/routes/superadmin.ts(290,40): error TS7006: Parameter 't' implicitly has an 'any' type.
src/routes/superadmin.ts(323,52): error TS7006: Parameter 'sum' implicitly has an 'any' type.
src/routes/superadmin.ts(323,57): error TS7006: Parameter 'tenant' implicitly has an 'any' type.
src/routes/superadmin.ts(352,17): error TS7006: Parameter 'tenants' implicitly has an 'any' type.

2025-10-15T20:41:37.15217019Z [inf]  src/routes/superadmin.ts(352,28): error TS7031: Binding element 'desc' implicitly has an 'any' type.

2025-10-15T20:41:37.152174065Z [inf]  src/routes/superadmin.ts(357,17): error TS7006: Parameter 'users' implicitly has an 'any' type.

2025-10-15T20:41:37.152219351Z [inf]  src/routes/superadmin.ts(357,26): error TS7031: Binding element 'desc' implicitly has an 'any' type.
src/routes/superadmin.ts(363,29): error TS7006: Parameter 'tenant' implicitly has an 'any' type.
src/routes/superadmin.ts(363,37): error TS7006: Parameter 'idx' implicitly has an 'any' type.
src/routes/superadmin.ts(370,27): error TS7006: Parameter 'user' implicitly has an 'any' type.
src/routes/superadmin.ts(370,33): error TS7006: Parameter 'idx' implicitly has an 'any' type.

2025-10-15T20:41:37.152245537Z [inf]  src/routes/talent.ts(2,50): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/talent/talent-agent.js'?
src/routes/talent.ts(3,41): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.152256539Z [inf]  src/routes/talent.ts(13,91): error TS7030: Not all code paths return a value.
src/routes/test-ai.ts(2,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/culture/culture-agent.js'?

2025-10-15T20:41:37.152268922Z [inf]  src/routes/test-ai.ts(3,43): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.152282501Z [inf]  src/routes/upload.ts(4,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../middleware/auth.js'?

2025-10-15T20:41:37.152287571Z [inf]  src/routes/upload.ts(5,34): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/agents/structure/structure-agent.js'?

2025-10-15T20:41:37.152299634Z [inf]  src/routes/upload.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.152304397Z [inf]  src/routes/upload.ts(7,47): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.152321405Z [inf]  src/routes/upload.ts(8,39): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/routes/upload.ts(10,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../types/shared.js'?

2025-10-15T20:41:37.152339108Z [inf]  src/routes/upload.ts(353,20): error TS2304: Cannot find name 'structure'.

2025-10-15T20:41:37.1523456Z [inf]  src/routes/upload.ts(365,26): error TS2339: Property 'roles' does not exist on type 'StructureAnalysisOutput'.

2025-10-15T20:41:37.152360513Z [inf]  src/routes/webhooks.ts(3,31): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../services/stripe-service.js'?
src/services/agents/agent-manager.ts(1,55): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './culture/culture-agent.js'?

2025-10-15T20:41:37.152374954Z [inf]  src/services/agents/agent-manager.ts(2,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './engagement/engagement-agent.js'?

2025-10-15T20:41:37.152379612Z [inf]  src/services/agents/agent-manager.ts(3,34): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './recognition/recognition-agent.js'?

2025-10-15T20:41:37.152407807Z [inf]  src/services/agents/agent-manager.ts(4,29): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './skills/skills-agent.js'?
src/services/agents/agent-manager.ts(5,57): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './structure-agent.js'?
src/services/agents/agent-manager.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.152416042Z [inf]  src/services/agents/agent-manager.ts(7,88): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.152425781Z [inf]  src/services/agents/agent-manager.ts(313,27): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.152430135Z [inf]  src/services/agents/agent-manager.ts(394,34): error TS7006: Parameter 't' implicitly has an 'any' type.

2025-10-15T20:41:37.152444833Z [inf]  src/services/agents/base/three-engine-agent.ts(1,28): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../ai-providers/ensemble.js'?

2025-10-15T20:41:37.15244932Z [inf]  src/services/agents/base/three-engine-agent.ts(2,76): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../ai-providers/types.js'?

2025-10-15T20:41:37.152480374Z [inf]  src/services/agents/bonus/bonus-agent.ts(2,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/index.js'?

2025-10-15T20:41:37.152485324Z [inf]  src/services/agents/bonus/bonus-agent.ts(3,38): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/schema/bonus.js'?

2025-10-15T20:41:37.152521708Z [inf]  src/services/agents/bonus/bonus-agent.ts(4,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/KnowledgeEngine.js'?
src/services/agents/bonus/bonus-agent.ts(5,28): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/DataEngine.js'?
src/services/agents/bonus/bonus-agent.ts(6,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/ReasoningEngine.js'?
src/services/agents/culture/culture-agent.ts(10,53): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../base/three-engine-agent.js'?

2025-10-15T20:41:37.1525483Z [inf]  src/services/agents/culture/culture-agent.ts(11,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/agents/culture/culture-agent.ts(12,57): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.152552519Z [inf]  src/services/agents/culture/culture-agent.ts(200,31): error TS2339: Property 'analyze' does not exist on type 'CultureAgentV2'.

2025-10-15T20:41:37.152571732Z [inf]  src/services/agents/culture/culture-agent.ts(527,31): error TS2339: Property 'analyze' does not exist on type 'CultureAgentV2'.

2025-10-15T20:41:37.152575779Z [inf]  src/services/agents/engagement/engagement-agent.ts(1,69): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../base/three-engine-agent.js'?

2025-10-15T20:41:37.152586136Z [inf]  src/services/agents/engagement/engagement-agent.ts(66,31): error TS2339: Property 'analyze' does not exist on type 'EngagementAgent'.

2025-10-15T20:41:37.152605717Z [inf]  src/services/agents/engagement/engagement-agent.ts(107,31): error TS2339: Property 'analyze' does not exist on type 'EngagementAgent'.

2025-10-15T20:41:37.15264656Z [inf]  src/services/agents/hiring/hiring-agent.ts(2,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/index.js'?

2025-10-15T20:41:37.152655382Z [inf]  src/services/agents/hiring/hiring-agent.ts(3,103): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/schema.js'?

2025-10-15T20:41:37.1526779Z [inf]  src/services/agents/hiring/hiring-agent.ts(4,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/KnowledgeEngine.js'?

2025-10-15T20:41:37.152700497Z [inf]  src/services/agents/hiring/hiring-agent.ts(5,28): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/DataEngine.js'?

2025-10-15T20:41:37.152709702Z [inf]  src/services/agents/hiring/hiring-agent.ts(6,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/ReasoningEngine.js'?

2025-10-15T20:41:37.152747675Z [inf]  src/services/agents/hiring/hiring-agent.ts(139,32): error TS2339: Property 'positionTitle' does not exist on type '{}'.
src/services/agents/hiring/hiring-agent.ts(140,29): error TS2339: Property 'department' does not exist on type '{}'.

2025-10-15T20:41:37.1527531Z [inf]  src/services/agents/hiring/hiring-agent.ts(143,30): error TS2339: Property 'rationale' does not exist on type '{}'.

2025-10-15T20:41:37.152808285Z [inf]  src/services/agents/lxp/lxp-agent.ts(2,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/index.js'?
src/services/agents/lxp/lxp-agent.ts(3,59): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/schema/lxp-extended.js'?
src/services/agents/lxp/lxp-agent.ts(4,28): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/schema/skills.js'?
src/services/agents/lxp/lxp-agent.ts(5,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/KnowledgeEngine.js'?

2025-10-15T20:41:37.15281803Z [inf]  src/services/agents/lxp/lxp-agent.ts(6,28): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/DataEngine.js'?

2025-10-15T20:41:37.152863401Z [inf]  src/services/agents/lxp/lxp-agent.ts(7,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/ReasoningEngine.js'?
src/services/agents/lxp/lxp-agent.ts(91,51): error TS7006: Parameter 'course' implicitly has an 'any' type.

2025-10-15T20:41:37.152867078Z [inf]  src/services/agents/lxp/lxp-agent.ts(92,33): error TS7006: Parameter 'skill' implicitly has an 'any' type.

2025-10-15T20:41:37.152898336Z [inf]  src/services/agents/performance/performance-agent.ts(2,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/index.js'?

2025-10-15T20:41:37.152904037Z [inf]  src/services/agents/performance/performance-agent.ts(3,203): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/schema.js'?

2025-10-15T20:41:37.152961382Z [inf]  src/services/agents/performance/performance-agent.ts(4,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/KnowledgeEngine.js'?
src/services/agents/performance/performance-agent.ts(5,28): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/DataEngine.js'?
src/services/agents/performance/performance-agent.ts(6,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/ReasoningEngine.js'?

2025-10-15T20:41:37.152967107Z [inf]  src/services/agents/performance/performance-agent.ts(9,75): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../culture/culture-agent.js'?

2025-10-15T20:41:37.152985215Z [inf]  src/services/agents/performance/performance-agent.ts(10,95): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../skills/skills-agent.js'?

2025-10-15T20:41:37.153006696Z [inf]  src/services/agents/performance/performance-agent.ts(72,27): error TS2304: Cannot find name 'CultureAgent'.

2025-10-15T20:41:37.153030023Z [inf]  src/services/agents/performance/performance-agent.ts(73,26): error TS2304: Cannot find name 'SkillsAgent'.

2025-10-15T20:41:37.153090242Z [inf]  src/services/agents/performance/performance-agent.ts(142,55): error TS7006: Parameter 'g' implicitly has an 'any' type.

2025-10-15T20:41:37.153113914Z [inf]  src/services/agents/recognition/recognition-agent.ts(1,69): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../base/three-engine-agent.js'?

2025-10-15T20:41:37.153143553Z [inf]  src/services/agents/recognition/recognition-agent.ts(64,31): error TS2339: Property 'analyze' does not exist on type 'RecognitionAgent'.

2025-10-15T20:41:37.153149445Z [inf]  src/services/agents/recognition/recognition-agent.ts(104,31): error TS2339: Property 'analyze' does not exist on type 'RecognitionAgent'.

2025-10-15T20:41:37.153166147Z [inf]  src/services/agents/skills-agent.ts(4,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './skills/skills-agent.js'?

2025-10-15T20:41:37.153208786Z [inf]  src/services/agents/skills/skills-agent.ts(4,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.153223754Z [inf]  src/services/agents/skills/skills-agent.ts(5,84): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.153245688Z [inf]  src/services/agents/skills/skills-agent.ts(421,31): error TS2339: Property 'analyze' does not exist on type 'SkillsAgent'.

2025-10-15T20:41:37.153259656Z [inf]  src/services/agents/skills/skills-agent.ts(517,31): error TS2339: Property 'analyze' does not exist on type 'SkillsAgent'.

2025-10-15T20:41:37.153290791Z [inf]  src/services/agents/skills/skills-agent.ts(724,39): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:41:37.153300757Z [inf]  src/services/agents/structure-agent.ts(1,53): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './base/three-engine-agent.js'?

2025-10-15T20:41:37.153315882Z [inf]  src/services/agents/structure-agent.ts(2,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.153331186Z [inf]  src/services/agents/structure-agent.ts(3,58): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.153348345Z [inf]  src/services/agents/structure-agent.ts(5,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../ai-providers/router.js'?

2025-10-15T20:41:37.15335967Z [inf]  src/services/agents/structure-agent.ts(16,8): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../types/structure-types.js'?

2025-10-15T20:41:37.153377757Z [inf]  src/services/agents/structure-agent.ts(98,31): error TS2339: Property 'analyze' does not exist on type 'StructureAgent'.

2025-10-15T20:41:37.153402722Z [inf]  src/services/agents/structure-agent.ts(233,29): error TS2339: Property 'reasoningAI' does not exist on type 'StructureAgent'.

2025-10-15T20:41:37.153412575Z [inf]  src/services/agents/structure/structure-agent.ts(3,53): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../base/three-engine-agent.js'?

2025-10-15T20:41:37.153431737Z [inf]  src/services/agents/structure/structure-agent.ts(4,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15343561Z [inf]  src/services/agents/structure/structure-agent.ts(5,45): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15346367Z [inf]  src/services/agents/structure/structure-agent.ts(417,31): error TS2339: Property 'analyze' does not exist on type 'StructureAgentV2'.
src/services/agents/structure/structure-agent.ts(507,39): error TS2307: Cannot find module '../../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:41:37.15347811Z [inf]  src/services/agents/structure/structure-agent.ts(574,47): error TS2554: Expected 0 arguments, but got 2.

2025-10-15T20:41:37.153505443Z [inf]  src/services/agents/talent/talent-agent.ts(2,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/index.js'?

2025-10-15T20:41:37.153514237Z [inf]  src/services/agents/talent/talent-agent.ts(3,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/schema/performance.js'?

2025-10-15T20:41:37.153549404Z [inf]  src/services/agents/talent/talent-agent.ts(4,23): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../db/schema/core.js'?
src/services/agents/talent/talent-agent.ts(5,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/KnowledgeEngine.js'?
src/services/agents/talent/talent-agent.ts(6,28): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/DataEngine.js'?

2025-10-15T20:41:37.15355309Z [inf]  src/services/agents/talent/talent-agent.ts(7,33): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../ai/engines/ReasoningEngine.js'?

2025-10-15T20:41:37.153590812Z [inf]  src/services/ai-providers/claude.ts(2,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
src/services/ai-providers/claude.ts(3,27): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../data/store.js'?
src/services/ai-providers/claude.ts(42,43): error TS7006: Parameter 'c' implicitly has an 'any' type.

2025-10-15T20:41:37.15359543Z [inf]  src/services/ai-providers/claude.ts(45,110): error TS7053: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ knowledge: string; data: string; reasoning: string; }'.

2025-10-15T20:41:37.15362087Z [inf]  src/services/ai-providers/cohere.ts(1,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
src/services/ai-providers/cohere.ts(2,27): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../data/store.js'?

2025-10-15T20:41:37.153631547Z [inf]  src/services/ai-providers/cohere.ts(60,16): error TS7053: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ knowledge: string; data: string; reasoning: string; }'.

2025-10-15T20:41:37.153652829Z [inf]  src/services/ai-providers/ensemble.ts(3,76): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?

2025-10-15T20:41:37.15366589Z [inf]  src/services/ai-providers/ensemble.ts(4,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './router.js'?

2025-10-15T20:41:37.153670515Z [inf]  src/services/ai-providers/ensemble.ts(27,53): error TS7006: Parameter 'provider' implicitly has an 'any' type.

2025-10-15T20:41:37.153702765Z [inf]  src/services/ai-providers/ensemble.ts(34,45): error TS7006: Parameter 'r' implicitly has an 'any' type.
src/services/ai-providers/ensemble.ts(217,69): error TS7006: Parameter 's' implicitly has an 'any' type.

2025-10-15T20:41:37.153732882Z [inf]  src/services/ai-providers/gemini.ts(1,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?

2025-10-15T20:41:37.153738488Z [inf]  src/services/ai-providers/mistral.ts(1,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?

2025-10-15T20:41:37.153772573Z [inf]  src/services/ai-providers/openai.ts(2,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './types.js'?
src/services/ai-providers/openai.ts(3,27): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../data/store.js'?

2025-10-15T20:41:37.153789117Z [inf]  src/services/ai-providers/openai.ts(46,45): error TS7006: Parameter 'c' implicitly has an 'any' type.

2025-10-15T20:41:37.153805493Z [inf]  src/services/ai-providers/openai.ts(49,26): error TS7053: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ knowledge: string; data: string; reasoning: string; }'.

2025-10-15T20:41:37.153838227Z [inf]  src/services/ai-providers/openai.ts(60,14): error TS7053: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ knowledge: string; data: string; reasoning: string; }'.

2025-10-15T20:41:37.153880643Z [inf]  src/services/ai/multi-provider-manager.ts(7,28): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../ai-providers/ensemble.js'?

2025-10-15T20:41:37.153891086Z [inf]  src/services/ai/multi-provider-manager.ts(8,48): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../ai-providers/types.js'?

2025-10-15T20:41:37.15397825Z [inf]  src/services/auth.ts(4,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/auth.ts(5,42): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/auth.ts(36,39): error TS2304: Cannot find name 'SALT_ROUNDS'.

2025-10-15T20:41:37.154002893Z [inf]  src/services/data/store.ts(147,8): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './seed.js'?

2025-10-15T20:41:37.154008022Z [inf]  src/services/data/store.ts(203,65): error TS7006: Parameter 'item' implicitly has an 'any' type.

2025-10-15T20:41:37.154024963Z [inf]  src/services/data/store.ts(236,65): error TS7006: Parameter 'item' implicitly has an 'any' type.

2025-10-15T20:41:37.154061423Z [inf]  src/services/data/store.ts(237,62): error TS7006: Parameter 'item' implicitly has an 'any' type.

2025-10-15T20:41:37.154104156Z [inf]  src/services/data/store.ts(272,64): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/services/data/store.ts(273,41): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/services/data/store.ts(274,66): error TS7006: Parameter 'item' implicitly has an 'any' type.

2025-10-15T20:41:37.154123434Z [inf]  src/services/modules/hiring/core/culture-fit-assessor.ts(5,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.15415656Z [inf]  src/services/modules/hiring/core/culture-fit-assessor.ts(6,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../agents/culture/culture-agent.js'?

2025-10-15T20:41:37.154175626Z [inf]  src/services/modules/hiring/core/culture-fit-assessor.ts(8,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../../utils/logger.js'?

2025-10-15T20:41:37.154214893Z [inf]  src/services/modules/hiring/hiring-module.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.154221023Z [inf]  src/services/modules/hiring/hiring-module.ts(7,61): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/modules/hiring/hiring-module.ts(9,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../utils/logger.js'?

2025-10-15T20:41:37.15423138Z [inf]  src/services/modules/hiring/hiring-module.ts(11,34): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './core/culture-fit-assessor.js'?

2025-10-15T20:41:37.15425791Z [inf]  src/services/modules/hiring/hiring-module.ts(89,20): error TS7006: Parameter 's' implicitly has an 'any' type.
src/services/modules/hiring/hiring-module.ts(150,49): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.154274912Z [inf]  src/services/modules/hiring/hiring-module.ts(274,22): error TS7006: Parameter 'app' implicitly has an 'any' type.

2025-10-15T20:41:37.154281441Z [inf]  src/services/modules/lxp/lxp-module.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.154297637Z [inf]  src/services/modules/lxp/lxp-module.ts(7,59): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/modules/lxp/lxp-module.ts(9,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../../utils/logger.js'?

2025-10-15T20:41:37.154319454Z [inf]  src/services/modules/lxp/lxp-module.ts(145,44): error TS7006: Parameter 'course' implicitly has an 'any' type.
src/services/modules/lxp/lxp-module.ts(149,29): error TS7006: Parameter 'course' implicitly has an 'any' type.

2025-10-15T20:41:37.15432436Z [inf]  src/services/monitoring/health-check.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.154337515Z [inf]  src/services/monitoring/health-check.ts(8,34): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './metrics.js'?

2025-10-15T20:41:37.154341587Z [inf]  src/services/monitoring/health-check.ts(9,24): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../utils/logger.js'?

2025-10-15T20:41:37.154380071Z [inf]  src/services/monitoring/metrics.ts(7,24): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../utils/logger.js'?

2025-10-15T20:41:37.154391809Z [inf]  src/services/monitoring/metrics.ts(177,35): error TS2307: Cannot find module '../../../db/index.js' or its corresponding type declarations.
src/services/monitoring/metrics.ts(178,57): error TS2307: Cannot find module '../../../db/schema.js' or its corresponding type declarations.

2025-10-15T20:41:37.154451992Z [inf]  src/services/orchestrator/architect-ai.ts(3,34): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../agents/structure/structure-agent.js'?
src/services/orchestrator/architect-ai.ts(4,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../agents/culture/culture-agent.js'?
src/services/orchestrator/architect-ai.ts(5,29): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../agents/skills/skills-agent.js'?
src/services/orchestrator/architect-ai.ts(6,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/orchestrator/architect-ai.ts(7,47): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/orchestrator/architect-ai.ts(276,51): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.154456118Z [inf]  src/services/orchestrator/architect-ai.ts(299,48): error TS7006: Parameter 'acc' implicitly has an 'any' type.

2025-10-15T20:41:37.154476593Z [inf]  src/services/orchestrator/architect-ai.ts(299,53): error TS7006: Parameter 'user' implicitly has an 'any' type.
src/services/orchestrator/architect-ai.ts(307,38): error TS7006: Parameter 'dept' implicitly has an 'any' type.

2025-10-15T20:41:37.154495474Z [inf]  src/services/orchestrator/architect-ai.ts(314,26): error TS7006: Parameter 'user' implicitly has an 'any' type.
src/services/org-design-expert.ts(14,83): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../types/structure-types.js'?

2025-10-15T20:41:37.154522617Z [inf]  src/services/org-design-expert.ts(396,17): error TS7006: Parameter 'role' implicitly has an 'any' type.

2025-10-15T20:41:37.154526871Z [inf]  src/services/org-design-expert.ts(403,45): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.154560496Z [inf]  src/services/org-design-expert.ts(528,17): error TS7006: Parameter 'role' implicitly has an 'any' type.
src/services/queue.ts(5,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/queue.ts(6,45): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.154565361Z [inf]  src/services/reports/structure-report.ts(4,23): error TS2307: Cannot find module 'chart' or its corresponding type declarations.

2025-10-15T20:41:37.154603888Z [inf]  src/services/results/trigger-engine.ts(3,32): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './unified-results.js'?
src/services/results/trigger-engine.ts(4,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/results/trigger-engine.ts(5,45): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.154608129Z [inf]  src/services/results/trigger-engine.ts(8,23): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../modules/lxp/lxp-module.js'?

2025-10-15T20:41:37.154627544Z [inf]  src/services/results/trigger-engine.ts(9,31): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../modules/hiring/hiring-module.js'?
src/services/results/trigger-engine.ts(10,50): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../types/trigger-types.js'?

2025-10-15T20:41:37.154642573Z [inf]  src/services/results/trigger-engine.ts(417,5): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154646327Z [inf]  src/services/results/trigger-engine.ts(430,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.154663208Z [inf]  src/services/results/trigger-engine.ts(441,5): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(466,48): error TS7006: Parameter 'risk' implicitly has an 'any' type.

2025-10-15T20:41:37.154669675Z [inf]  src/services/results/trigger-engine.ts(474,60): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154680486Z [inf]  src/services/results/trigger-engine.ts(489,49): error TS7006: Parameter 'risk' implicitly has an 'any' type.

2025-10-15T20:41:37.154688452Z [inf]  src/services/results/trigger-engine.ts(493,58): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154697745Z [inf]  src/services/results/trigger-engine.ts(497,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.154707455Z [inf]  src/services/results/trigger-engine.ts(510,59): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154727423Z [inf]  src/services/results/trigger-engine.ts(518,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.154733564Z [inf]  src/services/results/trigger-engine.ts(526,50): error TS7006: Parameter 'gap' implicitly has an 'any' type.

2025-10-15T20:41:37.154762119Z [inf]  src/services/results/trigger-engine.ts(541,57): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154766242Z [inf]  src/services/results/trigger-engine.ts(545,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(549,48): error TS7006: Parameter 'gap' implicitly has an 'any' type.

2025-10-15T20:41:37.154791857Z [inf]  src/services/results/trigger-engine.ts(553,57): error TS7006: Parameter 'r' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(567,57): error TS7006: Parameter 'strength' implicitly has an 'any' type.

2025-10-15T20:41:37.154814945Z [inf]  src/services/results/trigger-engine.ts(578,60): error TS7006: Parameter 'strength' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(586,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.154818763Z [inf]  src/services/results/trigger-engine.ts(603,54): error TS7006: Parameter 'strength' implicitly has an 'any' type.

2025-10-15T20:41:37.154852827Z [inf]  src/services/results/trigger-engine.ts(607,58): error TS7006: Parameter 'strength' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(612,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(617,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.154862586Z [inf]  src/services/results/trigger-engine.ts(631,67): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154873401Z [inf]  src/services/results/trigger-engine.ts(643,62): error TS7006: Parameter 'strength' implicitly has an 'any' type.

2025-10-15T20:41:37.15487897Z [inf]  src/services/results/trigger-engine.ts(652,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(663,56): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.154889232Z [inf]  src/services/results/trigger-engine.ts(681,60): error TS7006: Parameter 'strength' implicitly has an 'any' type.

2025-10-15T20:41:37.154905531Z [inf]  src/services/results/trigger-engine.ts(686,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(694,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.154912966Z [inf]  src/services/results/trigger-engine.ts(708,62): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154922309Z [inf]  src/services/results/trigger-engine.ts(722,67): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154940479Z [inf]  src/services/results/trigger-engine.ts(732,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(745,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.154957125Z [inf]  src/services/results/trigger-engine.ts(764,65): error TS7006: Parameter 'weakness' implicitly has an 'any' type.

2025-10-15T20:41:37.154982149Z [inf]  src/services/results/trigger-engine.ts(769,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.154987506Z [inf]  src/services/results/trigger-engine.ts(776,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155018719Z [inf]  src/services/results/trigger-engine.ts(783,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.155030995Z [inf]  src/services/results/trigger-engine.ts(797,52): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155062473Z [inf]  src/services/results/trigger-engine.ts(807,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155082547Z [inf]  src/services/results/trigger-engine.ts(818,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155111932Z [inf]  src/services/results/trigger-engine.ts(839,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155118093Z [inf]  src/services/results/trigger-engine.ts(846,52): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155122379Z [inf]  src/services/results/trigger-engine.ts(853,55): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155162779Z [inf]  src/services/results/trigger-engine.ts(859,57): error TS7006: Parameter 'r' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(873,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(883,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(894,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155166962Z [inf]  src/services/results/trigger-engine.ts(905,57): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15519487Z [inf]  src/services/results/trigger-engine.ts(925,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(932,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(939,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155214624Z [inf]  src/services/results/trigger-engine.ts(946,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155218439Z [inf]  src/services/results/trigger-engine.ts(953,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.155221835Z [inf]  src/services/results/trigger-engine.ts(969,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155240912Z [inf]  src/services/results/trigger-engine.ts(981,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(991,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155245196Z [inf]  src/services/results/trigger-engine.ts(1002,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155280329Z [inf]  src/services/results/trigger-engine.ts(1023,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1030,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1037,58): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155282938Z [inf]  src/services/results/trigger-engine.ts(1044,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155300066Z [inf]  src/services/results/trigger-engine.ts(1051,57): error TS7006: Parameter 'r' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1067,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155313753Z [inf]  src/services/results/trigger-engine.ts(1077,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155325223Z [inf]  src/services/results/trigger-engine.ts(1088,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155329797Z [inf]  src/services/results/trigger-engine.ts(1099,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155360409Z [inf]  src/services/results/trigger-engine.ts(1121,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1128,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1135,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155366897Z [inf]  src/services/results/trigger-engine.ts(1142,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155370177Z [inf]  src/services/results/trigger-engine.ts(1149,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.155415802Z [inf]  src/services/results/trigger-engine.ts(1165,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1177,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1188,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1199,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155438067Z [inf]  src/services/results/trigger-engine.ts(1210,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1232,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155442836Z [inf]  src/services/results/trigger-engine.ts(1239,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155463639Z [inf]  src/services/results/trigger-engine.ts(1246,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1253,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155467908Z [inf]  src/services/results/trigger-engine.ts(1260,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155487109Z [inf]  src/services/results/trigger-engine.ts(1267,57): error TS7006: Parameter 'r' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1283,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155509541Z [inf]  src/services/results/trigger-engine.ts(1296,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1307,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155513769Z [inf]  src/services/results/trigger-engine.ts(1318,57): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155530622Z [inf]  src/services/results/trigger-engine.ts(1329,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1351,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155549248Z [inf]  src/services/results/trigger-engine.ts(1358,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1365,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155557179Z [inf]  src/services/results/trigger-engine.ts(1372,55): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155577863Z [inf]  src/services/results/trigger-engine.ts(1379,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155582165Z [inf]  src/services/results/trigger-engine.ts(1386,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.155619575Z [inf]  src/services/results/trigger-engine.ts(1404,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155643711Z [inf]  src/services/results/trigger-engine.ts(1416,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155660569Z [inf]  src/services/results/trigger-engine.ts(1427,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155673699Z [inf]  src/services/results/trigger-engine.ts(1438,57): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155691116Z [inf]  src/services/results/trigger-engine.ts(1449,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15571059Z [inf]  src/services/results/trigger-engine.ts(1473,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155715565Z [inf]  src/services/results/trigger-engine.ts(1480,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155755718Z [inf]  src/services/results/trigger-engine.ts(1487,58): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1494,55): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1501,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1513,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.155765472Z [inf]  src/services/results/trigger-engine.ts(1532,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155779687Z [inf]  src/services/results/trigger-engine.ts(1546,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155805815Z [inf]  src/services/results/trigger-engine.ts(1557,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.155835641Z [inf]  src/services/results/trigger-engine.ts(1568,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156008421Z [inf]  src/services/results/trigger-engine.ts(1579,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1589,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156065791Z [inf]  src/services/results/trigger-engine.ts(1631,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156085205Z [inf]  src/services/results/trigger-engine.ts(1638,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156088092Z [inf]  src/services/results/trigger-engine.ts(1645,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156118188Z [inf]  src/services/results/trigger-engine.ts(1651,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1664,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.156142295Z [inf]  src/services/results/trigger-engine.ts(1683,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1695,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156158044Z [inf]  src/services/results/trigger-engine.ts(1706,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156173158Z [inf]  src/services/results/trigger-engine.ts(1717,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156199562Z [inf]  src/services/results/trigger-engine.ts(1727,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156206099Z [inf]  src/services/results/trigger-engine.ts(1738,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15621852Z [inf]  src/services/results/trigger-engine.ts(1749,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156232835Z [inf]  src/services/results/trigger-engine.ts(1774,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156265568Z [inf]  src/services/results/trigger-engine.ts(1781,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156269726Z [inf]  src/services/results/trigger-engine.ts(1788,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156307451Z [inf]  src/services/results/trigger-engine.ts(1795,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1801,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(1808,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156328173Z [inf]  src/services/results/trigger-engine.ts(1815,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156333228Z [inf]  src/services/results/trigger-engine.ts(1828,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.15635933Z [inf]  src/services/results/trigger-engine.ts(1847,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156363655Z [inf]  src/services/results/trigger-engine.ts(1859,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156388425Z [inf]  src/services/results/trigger-engine.ts(1870,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156394388Z [inf]  src/services/results/trigger-engine.ts(1881,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156416883Z [inf]  src/services/results/trigger-engine.ts(1892,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156423244Z [inf]  src/services/results/trigger-engine.ts(1903,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156438037Z [inf]  src/services/results/trigger-engine.ts(1914,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156451869Z [inf]  src/services/results/trigger-engine.ts(1939,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156467634Z [inf]  src/services/results/trigger-engine.ts(1946,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156483859Z [inf]  src/services/results/trigger-engine.ts(1953,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156509843Z [inf]  src/services/results/trigger-engine.ts(1960,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156516715Z [inf]  src/services/results/trigger-engine.ts(1967,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156532988Z [inf]  src/services/results/trigger-engine.ts(1974,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156558075Z [inf]  src/services/results/trigger-engine.ts(1981,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156580768Z [inf]  src/services/results/trigger-engine.ts(1994,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.156585113Z [inf]  src/services/results/trigger-engine.ts(2013,75): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156607665Z [inf]  src/services/results/trigger-engine.ts(2025,58): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156612059Z [inf]  src/services/results/trigger-engine.ts(2036,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156634237Z [inf]  src/services/results/trigger-engine.ts(2047,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2058,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156639429Z [inf]  src/services/results/trigger-engine.ts(2069,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156672666Z [inf]  src/services/results/trigger-engine.ts(2080,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156678262Z [inf]  src/services/results/trigger-engine.ts(2091,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2116,73): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2123,56): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156681733Z [inf]  src/services/results/trigger-engine.ts(2130,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156767691Z [inf]  src/services/results/trigger-engine.ts(2137,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2144,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2151,57): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2158,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2165,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156773397Z [inf]  src/services/results/trigger-engine.ts(2178,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.156791843Z [inf]  src/services/results/trigger-engine.ts(2197,75): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15679544Z [inf]  src/services/results/trigger-engine.ts(2209,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156818816Z [inf]  src/services/results/trigger-engine.ts(2220,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156829192Z [inf]  src/services/results/trigger-engine.ts(2231,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156846792Z [inf]  src/services/results/trigger-engine.ts(2242,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156872022Z [inf]  src/services/results/trigger-engine.ts(2253,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156886149Z [inf]  src/services/results/trigger-engine.ts(2264,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156891938Z [inf]  src/services/results/trigger-engine.ts(2275,73): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156915091Z [inf]  src/services/results/trigger-engine.ts(2300,73): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156927889Z [inf]  src/services/results/trigger-engine.ts(2307,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156937563Z [inf]  src/services/results/trigger-engine.ts(2314,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156957362Z [inf]  src/services/results/trigger-engine.ts(2321,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2328,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15697946Z [inf]  src/services/results/trigger-engine.ts(2335,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2342,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.156993174Z [inf]  src/services/results/trigger-engine.ts(2349,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157010114Z [inf]  src/services/results/trigger-engine.ts(2362,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.157028001Z [inf]  src/services/results/trigger-engine.ts(2382,76): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157042249Z [inf]  src/services/results/trigger-engine.ts(2394,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2405,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157048128Z [inf]  src/services/results/trigger-engine.ts(2416,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157081375Z [inf]  src/services/results/trigger-engine.ts(2427,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157111375Z [inf]  src/services/results/trigger-engine.ts(2438,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157117247Z [inf]  src/services/results/trigger-engine.ts(2449,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157138488Z [inf]  src/services/results/trigger-engine.ts(2460,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157150717Z [inf]  src/services/results/trigger-engine.ts(2471,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157161708Z [inf]  src/services/results/trigger-engine.ts(2497,74): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157179215Z [inf]  src/services/results/trigger-engine.ts(2504,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157221435Z [inf]  src/services/results/trigger-engine.ts(2511,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2518,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2525,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157228872Z [inf]  src/services/results/trigger-engine.ts(2532,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157242128Z [inf]  src/services/results/trigger-engine.ts(2539,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157258872Z [inf]  src/services/results/trigger-engine.ts(2546,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157274119Z [inf]  src/services/results/trigger-engine.ts(2553,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15728941Z [inf]  src/services/results/trigger-engine.ts(2567,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.157307627Z [inf]  src/services/results/trigger-engine.ts(2587,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157321928Z [inf]  src/services/results/trigger-engine.ts(2599,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157338885Z [inf]  src/services/results/trigger-engine.ts(2610,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157353106Z [inf]  src/services/results/trigger-engine.ts(2621,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157364204Z [inf]  src/services/results/trigger-engine.ts(2632,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157385234Z [inf]  src/services/results/trigger-engine.ts(2643,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157409797Z [inf]  src/services/results/trigger-engine.ts(2654,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15741692Z [inf]  src/services/results/trigger-engine.ts(2665,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157440989Z [inf]  src/services/results/trigger-engine.ts(2676,77): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157448125Z [inf]  src/services/results/trigger-engine.ts(2702,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157468674Z [inf]  src/services/results/trigger-engine.ts(2709,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157472747Z [inf]  src/services/results/trigger-engine.ts(2716,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157486901Z [inf]  src/services/results/trigger-engine.ts(2723,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157513095Z [inf]  src/services/results/trigger-engine.ts(2730,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157518788Z [inf]  src/services/results/trigger-engine.ts(2737,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157560068Z [inf]  src/services/results/trigger-engine.ts(2744,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2751,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(2758,75): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157577765Z [inf]  src/services/results/trigger-engine.ts(2772,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.157589164Z [inf]  src/services/results/trigger-engine.ts(2792,74): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157605575Z [inf]  src/services/results/trigger-engine.ts(2804,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157617329Z [inf]  src/services/results/trigger-engine.ts(2815,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157643277Z [inf]  src/services/results/trigger-engine.ts(2826,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157655293Z [inf]  src/services/results/trigger-engine.ts(2837,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157663789Z [inf]  src/services/results/trigger-engine.ts(2848,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157682621Z [inf]  src/services/results/trigger-engine.ts(2859,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157695314Z [inf]  src/services/results/trigger-engine.ts(2870,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157720284Z [inf]  src/services/results/trigger-engine.ts(2907,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157739752Z [inf]  src/services/results/trigger-engine.ts(2914,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157754207Z [inf]  src/services/results/trigger-engine.ts(2921,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157773288Z [inf]  src/services/results/trigger-engine.ts(2928,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157783175Z [inf]  src/services/results/trigger-engine.ts(2934,58): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157794239Z [inf]  src/services/results/trigger-engine.ts(2941,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157809515Z [inf]  src/services/results/trigger-engine.ts(2948,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157813497Z [inf]  src/services/results/trigger-engine.ts(2955,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157823017Z [inf]  src/services/results/trigger-engine.ts(2962,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.1578278Z [inf]  src/services/results/trigger-engine.ts(2976,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.15783958Z [inf]  src/services/results/trigger-engine.ts(2997,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157847492Z [inf]  src/services/results/trigger-engine.ts(3009,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157866929Z [inf]  src/services/results/trigger-engine.ts(3020,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3031,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157881096Z [inf]  src/services/results/trigger-engine.ts(3042,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3053,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157890557Z [inf]  src/services/results/trigger-engine.ts(3064,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157907912Z [inf]  src/services/results/trigger-engine.ts(3075,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157912306Z [inf]  src/services/results/trigger-engine.ts(3086,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3097,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157936214Z [inf]  src/services/results/trigger-engine.ts(3124,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157940886Z [inf]  src/services/results/trigger-engine.ts(3131,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157969399Z [inf]  src/services/results/trigger-engine.ts(3138,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15797453Z [inf]  src/services/results/trigger-engine.ts(3145,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.157989397Z [inf]  src/services/results/trigger-engine.ts(3152,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158002099Z [inf]  src/services/results/trigger-engine.ts(3159,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15802466Z [inf]  src/services/results/trigger-engine.ts(3166,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158031235Z [inf]  src/services/results/trigger-engine.ts(3173,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158045096Z [inf]  src/services/results/trigger-engine.ts(3180,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158077229Z [inf]  src/services/results/trigger-engine.ts(3187,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3202,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.158097927Z [inf]  src/services/results/trigger-engine.ts(3223,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15812008Z [inf]  src/services/results/trigger-engine.ts(3234,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158125645Z [inf]  src/services/results/trigger-engine.ts(3245,72): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158134878Z [inf]  src/services/results/trigger-engine.ts(3256,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158149241Z [inf]  src/services/results/trigger-engine.ts(3267,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158168098Z [inf]  src/services/results/trigger-engine.ts(3278,73): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158184943Z [inf]  src/services/results/trigger-engine.ts(3289,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158193696Z [inf]  src/services/results/trigger-engine.ts(3300,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158208915Z [inf]  src/services/results/trigger-engine.ts(3311,73): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158224455Z [inf]  src/services/results/trigger-engine.ts(3322,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158238737Z [inf]  src/services/results/trigger-engine.ts(3349,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158251918Z [inf]  src/services/results/trigger-engine.ts(3356,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158269701Z [inf]  src/services/results/trigger-engine.ts(3363,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158281582Z [inf]  src/services/results/trigger-engine.ts(3370,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158292167Z [inf]  src/services/results/trigger-engine.ts(3377,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158305147Z [inf]  src/services/results/trigger-engine.ts(3384,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158319021Z [inf]  src/services/results/trigger-engine.ts(3391,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158333809Z [inf]  src/services/results/trigger-engine.ts(3398,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158346334Z [inf]  src/services/results/trigger-engine.ts(3405,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158364799Z [inf]  src/services/results/trigger-engine.ts(3412,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158382157Z [inf]  src/services/results/trigger-engine.ts(3427,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.158386628Z [inf]  src/services/results/trigger-engine.ts(3448,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158410213Z [inf]  src/services/results/trigger-engine.ts(3459,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158417072Z [inf]  src/services/results/trigger-engine.ts(3470,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158432674Z [inf]  src/services/results/trigger-engine.ts(3481,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158453174Z [inf]  src/services/results/trigger-engine.ts(3492,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158582383Z [inf]  src/services/results/trigger-engine.ts(3503,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3514,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3525,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3536,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158612713Z [inf]  src/services/results/trigger-engine.ts(3547,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3558,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158631281Z [inf]  src/services/results/trigger-engine.ts(3585,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158646909Z [inf]  src/services/results/trigger-engine.ts(3592,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158660575Z [inf]  src/services/results/trigger-engine.ts(3599,58): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15867585Z [inf]  src/services/results/trigger-engine.ts(3606,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158689121Z [inf]  src/services/results/trigger-engine.ts(3613,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158703072Z [inf]  src/services/results/trigger-engine.ts(3620,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158716849Z [inf]  src/services/results/trigger-engine.ts(3627,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158732982Z [inf]  src/services/results/trigger-engine.ts(3634,58): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15877917Z [inf]  src/services/results/trigger-engine.ts(3641,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3648,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3655,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158817625Z [inf]  src/services/results/trigger-engine.ts(3670,57): error TS7006: Parameter 'r' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3692,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158825521Z [inf]  src/services/results/trigger-engine.ts(3703,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158828867Z [inf]  src/services/results/trigger-engine.ts(3714,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158862052Z [inf]  src/services/results/trigger-engine.ts(3725,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158865679Z [inf]  src/services/results/trigger-engine.ts(3736,57): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158883381Z [inf]  src/services/results/trigger-engine.ts(3747,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3758,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158892271Z [inf]  src/services/results/trigger-engine.ts(3769,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.158906136Z [inf]  src/services/results/trigger-engine.ts(3780,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159006552Z [inf]  src/services/results/trigger-engine.ts(3791,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3802,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3830,63): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159017291Z [inf]  src/services/results/trigger-engine.ts(3837,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3844,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159042211Z [inf]  src/services/results/trigger-engine.ts(3851,60): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159048018Z [inf]  src/services/results/trigger-engine.ts(3858,55): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15907084Z [inf]  src/services/results/trigger-engine.ts(3865,61): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159074199Z [inf]  src/services/results/trigger-engine.ts(3872,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.15909518Z [inf]  src/services/results/trigger-engine.ts(3879,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159110781Z [inf]  src/services/results/trigger-engine.ts(3886,62): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159131092Z [inf]  src/services/results/trigger-engine.ts(3893,59): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159135271Z [inf]  src/services/results/trigger-engine.ts(3900,64): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159152228Z [inf]  src/services/results/trigger-engine.ts(3916,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.159168627Z [inf]  src/services/results/trigger-engine.ts(3938,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159179166Z [inf]  src/services/results/trigger-engine.ts(3949,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159217787Z [inf]  src/services/results/trigger-engine.ts(3960,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(3971,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159222563Z [inf]  src/services/results/trigger-engine.ts(3982,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159243285Z [inf]  src/services/results/trigger-engine.ts(3993,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.
src/services/results/trigger-engine.ts(4004,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159256291Z [inf]  src/services/results/trigger-engine.ts(4015,70): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159261093Z [inf]  src/services/results/trigger-engine.ts(4026,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159277012Z [inf]  src/services/results/trigger-engine.ts(4037,73): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159288166Z [inf]  src/services/results/trigger-engine.ts(4048,76): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159291824Z [inf]  src/services/results/trigger-engine.ts(4076,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159304975Z [inf]  src/services/results/trigger-engine.ts(4083,69): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159319075Z [inf]  src/services/results/trigger-engine.ts(4090,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159333207Z [inf]  src/services/results/trigger-engine.ts(4097,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159382756Z [inf]  src/services/results/trigger-engine.ts(4104,67): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159391281Z [inf]  src/services/results/trigger-engine.ts(4111,66): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159423192Z [inf]  src/services/results/trigger-engine.ts(4125,68): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159441802Z [inf]  src/services/results/trigger-engine.ts(4132,65): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159446235Z [inf]  src/services/results/trigger-engine.ts(4139,71): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159465981Z [inf]  src/services/results/trigger-engine.ts(4146,74): error TS7006: Parameter 'rec' implicitly has an 'any' type.

2025-10-15T20:41:37.159481155Z [inf]  src/services/results/trigger-engine.ts(4162,57): error TS7006: Parameter 'r' implicitly has an 'any' type.

2025-10-15T20:41:37.159508455Z [inf]  src/services/results/unified-results.ts(3,35): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../orchestrator/architect-ai.js'?
src/services/skills/skillsBotService.ts(8,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.159529013Z [inf]  src/services/skills/skillsBotService.ts(14,8): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.159533575Z [inf]  src/services/skills/skillsBotService.ts(15,23): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.159567649Z [inf]  src/services/skills/skillsBotService.ts(18,39): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.159640667Z [inf]  src/services/skills/skillsBotService.ts(62,14): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?
src/services/skills/skillsBotService.ts(70,21): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?

2025-10-15T20:41:37.159646845Z [inf]  src/services/skills/skillsBotService.ts(115,14): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:41:37.159650788Z [inf]  src/services/skills/skillsBotService.ts(181,14): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:41:37.159670885Z [inf]  src/services/skills/skillsBotService.ts(224,14): error TS2304: Cannot find name 'BotResponse'.
src/services/skills/skillsBotService.ts(270,14): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:41:37.159685952Z [inf]  src/services/skills/skillsBotService.ts(311,14): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:41:37.159689987Z [inf]  src/services/skills/skillsBotService.ts(426,15): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:41:37.159711531Z [inf]  src/services/skills/skillsBotService.ts(447,81): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?
src/services/skills/skillsBotService.ts(461,83): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?

2025-10-15T20:41:37.159724718Z [inf]  src/services/skills/skillsBotService.ts(473,85): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?
src/services/skills/skillsBotService.ts(492,88): error TS2552: Cannot find name 'BotResponse'. Did you mean 'Response'?

2025-10-15T20:41:37.159736919Z [inf]  src/services/skills/skillsBotService.ts(504,85): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:41:37.159751446Z [inf]  src/services/skills/skillsBotService.ts(516,80): error TS2304: Cannot find name 'BotResponse'.

2025-10-15T20:41:37.159756176Z [inf]  src/services/skills/skillsBotService.ts(546,57): error TS2339: Property 'length' does not exist on type '{}'.

2025-10-15T20:41:37.159764959Z [inf]  src/services/skills/skillsBotService.ts(574,58): error TS2339: Property 'length' does not exist on type '{}'.

2025-10-15T20:41:37.159774819Z [inf]  src/services/skills/skillsBotService.ts(577,56): error TS2339: Property 'length' does not exist on type '{}'.

2025-10-15T20:41:37.159782602Z [inf]  src/services/skills/skillsBotService.ts(580,50): error TS2339: Property 'length' does not exist on type '{}'.

2025-10-15T20:41:37.159837485Z [err]  {"logs":[{"vertex":"sha256:fb71d6d0b87c63752e8b459d3b95ecd4334a4b88d4bb5decb122fb9e93441e7c","stream":1,"data":"c3JjL3NlcnZpY2VzL2FnZW50cy9za2lsbHMtYWdlbnQudHMoNSw0MCk6IGVycm9yIFRTMjgzNTogUmVsYXRpdmUgaW1wb3J0IHBhdGhzIG5lZWQgZXhwbGljaXQgZmlsZSBleHRlbnNpb25zIGluIEVDTUFTY3JpcHQgaW1wb3J0cyB3aGVuICctLW1vZHVsZVJlc29sdXRpb24nIGlzICdub2RlMTYnIG9yICdub2R
2025-10-15T20:41:37.159854112Z [inf]  src/services/social-media/scheduler.ts(5,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.159866862Z [inf]  src/services/social-media/scheduler.ts(6,55): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.159870832Z [err]  lbmV4dCcuIERpZCB5b3UgbWVhbiAnLi9za2lsbHMvc2tpbGxzLWFnZW50LmpzJz8K","timestamp":"2025-10-15T20:41:37.15318841Z"},{"vertex":"sha256:fb71d6d0b87c63752e8b459d3b95ecd4334a4b88d4bb5decb122fb9e93441e7c","stream":1,"data":"c3JjL3NlcnZpY2VzL2FnZW50cy9za2lsbHMvc2tpbGxzLWFnZW50LnRzKDMsNTMpOiBlcnJvciBUUzI4MzU6IFJlbGF0aXZlIGltcG9ydCBwYXRocyBuZWVkIGV4cGxpY2l0IGZpbGUgZXh0ZW5zaW9ucyBpbiBFQ01BU2NyaXB0IGltcG9ydHMgd2hlbiAnLS1tb2R1bGVSZXNvbHV0aW9uJyBpcyAnbm9kZTE2JyBvciAnbm9kZW5leHQnLiBEaWQgeW91IG1lYW4gJy4uL2Jhc2UvdGhyZWUtZW5naW5lLWFnZW50LmpzJz8K","timestamp":"2025-10-15T20:41:37.15319226Z"}]}
2025-10-15T20:41:37.159889288Z [inf]  src/services/social-media/scheduler.ts(8,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean '../../utils/logger.js'?

2025-10-15T20:41:37.159960029Z [inf]  src/services/stripe-service.ts(3,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/stripe-service.ts(4,55): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/stripe-service.ts(6,30): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './email.js'?

2025-10-15T20:41:37.160041677Z [inf]  src/services/stripe.ts(4,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.
src/services/stripe.ts(5,35): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.160050197Z [inf]  src/services/workflow/automated-flow.ts(3,20): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.16005411Z [inf]  src/services/workflow/automated-flow.ts(4,48): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.160110867Z [inf]  src/types/agents.ts(7,51): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './shared.js'?

2025-10-15T20:41:37.160121981Z [inf]  src/types/hiring.ts(13,8): error TS2834: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Consider adding an extension to the import path.

2025-10-15T20:41:37.160126829Z [inf]  src/types/hiring.ts(15,75): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './shared.js'?

2025-10-15T20:41:37.160139326Z [inf]  src/types/index.ts(8,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './shared.js'?

2025-10-15T20:41:37.160143876Z [inf]  src/types/index.ts(11,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './lxp.js'?

2025-10-15T20:41:37.160147365Z [inf]  src/types/index.ts(12,15): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './performance.js'?

2025-10-15T20:41:37.161433780Z [err]  {"logs":[{"vertex":"sha256:fb71d6d0b87c63752e8b459d3b95ecd4334a4b88d4bb5decb122fb9e93441e7c","stream":1,"data":"c3JjL3NlcnZpY2VzL29yZy1kZXNpZ24tZXhwZXJ0LnRzKDE1MCw0NSk6IGVycm9yIFRTNzAwNjogUGFyYW1ldGVyICdyJyBpbXBsaWNpdGx5IGhhcyBhbiAnYW55JyB0eXBlLgpzcmMvc2VydmljZXMvb3JnLWRlc2lnbi1leHBlcnQudHMoMTU0LDQzKTogZXJyb3IgVFM3MDA2OiBQYXJhbWV0ZXIgJ3InIG
2025-10-15T20:41:37.161460748Z [err]  ltcGxpY2l0bHkgaGFzIGFuICdhbnknIHR5cGUuCg==","timestamp":"2025-10-15T20:41:37.15450358Z"}]}
2025-10-15T20:41:37.163257494Z [err]  {"logs":[{"vertex":"sha256:fb71d6d0b87c63752e8b459d3b95ecd4334a4b88d4bb5decb122fb9e93441e7c","stream":1,"data":"c3JjL3NlcnZpY2VzL3Jlc3VsdHMvdHJpZ2dlci1lbmdpbmUudHMoMTYxNCw2OCk6IGVycm9yIFRTNzAwNjogUGFyYW1ldGVyICdyZWMnIGltcGxpY2l0bH
2025-10-15T20:41:37.163284038Z [err]  kgaGFzIGFuICdhbnknIHR5cGUuCnNyYy9zZXJ2aWNlcy9yZXN1bHRzL3RyaWdnZXItZW5naW5lLnRzKDE2MjQsNjQpOiBlcnJvciBUUzcwMDY6IFBhcmFtZXRlciAncmVjJyBpbXBsaWNpdGx5IGhhcyBhbiAnYW55JyB0eXBlLgo=","timestamp":"2025-10-15T20:41:37.156041249Z"}]}
2025-10-15T20:41:37.165476955Z [err]  {"logs":[{"vertex":"sha256:fb71d6d0b87c63752e8b459d3b95ecd4334a4b88d4bb5decb122fb9e93441e7c","stream":1,"data":"c3JjL3NlcnZpY2VzL3Jlc3VsdHMvdHJpZ2dlci1lbmdpbmUudHMoMjg4MSw2OCk6
2025-10-15T20:41:37.165506687Z [err]  IGVycm9yIFRTNzAwNjogUGFyYW1ldGVyICdyZWMnIGltcGxpY2l0bHkgaGFzIGFuICdhbnknIHR5cGUuCg==","timestamp":"2025-10-15T20:41:37.157707579Z"}]}
2025-10-15T20:41:37.167497420Z [err]  {"logs":[{"vertex":"sha256:fb71d6d0b87c63
2025-10-15T20:41:37.167514510Z [err]  752e8b459d3b95ecd4334a4b88d4bb5decb122fb9e93441e7c","stream":1,"data":"c3JjL3NlcnZpY2VzL3Jlc3VsdHMvdHJpZ2dlci1lbmdpbmUudHMoNDExOCw2Nyk6IGVycm9yIFRTNzAwNjogUGFyYW1ldGVyICdyZWMnIGltcGxpY2l0bHkgaGFzIGFuICdhbnknIHR5cGUuCg==","timestamp":"2025-10-15T20:41:37.159403608Z"}]}
2025-10-15T20:41:37.322073225Z [err]  [builder 7/8] RUN npm run build
2025-10-15T20:41:37.345134192Z [err]  Dockerfile.prod:19
2025-10-15T20:41:37.345191693Z [err]  -------------------
2025-10-15T20:41:37.345198822Z [err]  17 |
2025-10-15T20:41:37.345205778Z [err]  18 |     # Build the application
2025-10-15T20:41:37.345212810Z [err]  19 | >>> RUN npm run build
2025-10-15T20:41:37.345227747Z [err]  20 |
2025-10-15T20:41:37.345233738Z [err]  21 |     # Remove devDependencies after build (keep only production dependencies)
2025-10-15T20:41:37.345239847Z [err]  -------------------
2025-10-15T20:41:37.345244125Z [err]  ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 2