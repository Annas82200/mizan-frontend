20:10:27.027 Running build in Washington, D.C., USA (East) – iad1
20:10:27.028 Build machine configuration: 2 cores, 8 GB
20:10:27.057 Cloning github.com/Annas82200/mizan-frontend (Branch: main, Commit: 6263da4)
20:10:27.787 Warning: Failed to fetch one or more git submodules
20:10:27.787 Cloning completed: 730.000ms
20:10:29.927 Restored build cache from previous deployment (Gx28K6bHLzwpZa9jR1GZ5UCwhBe9)
20:10:30.503 Running "vercel build"
20:10:30.905 Vercel CLI 48.2.9
20:10:31.220 Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
20:10:31.234 Installing dependencies...
20:10:32.653 
20:10:32.654 up to date in 1s
20:10:32.655 
20:10:32.655 158 packages are looking for funding
20:10:32.656   run `npm fund` for details
20:10:32.682 Detected Next.js version: 14.2.33
20:10:32.686 Running "npm run build"
20:10:32.793 
20:10:32.794 > mizan-frontend@1.0.0 build
20:10:32.794 > next build
20:10:32.795 
20:10:33.416  ⚠ Invalid next.config.js options detected: 
20:10:33.416  ⚠     Expected object, received boolean at "experimental.serverActions"
20:10:33.417  ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
20:10:33.418  ⚠ Server Actions are available by default now, `experimental.serverActions` option can be safely removed.
20:10:33.480   ▲ Next.js 14.2.33
20:10:33.481 
20:10:33.612    Creating an optimized production build ...
20:10:43.754  ✓ Compiled successfully
20:10:43.755    Linting and checking validity of types ...
20:10:55.580 Failed to compile.
20:10:55.581 
20:10:55.581 ./src/app/dashboard/superadmin/analytics/page.tsx:86:21
20:10:55.581 Type error: Argument of type '{ totalAnalyses: number; totalApiCalls: number; activeUsers: number; storageUsed: number; dailyStats: { date: string; activeUsers: number; apiCalls: number; analyses: number; }[]; }' is not assignable to parameter of type 'SetStateAction<UsageStats>'.
20:10:55.581 
20:10:55.581 [0m [90m 84 |[39m       ])[33m;[39m[0m
20:10:55.581 [0m [90m 85 |[39m[0m
20:10:55.581 [0m[31m[1m>[22m[39m[90m 86 |[39m       setUsageStats(usage)[33m;[39m[0m
20:10:55.582 [0m [90m    |[39m                     [31m[1m^[22m[39m[0m
20:10:55.582 [0m [90m 87 |[39m       setApiStats(api)[33m;[39m[0m
20:10:55.582 [0m [90m 88 |[39m       setAgentStats(agents[33m.[39magents [33m||[39m [])[33m;[39m[0m
20:10:55.582 [0m [90m 89 |[39m       setPerformanceMetrics(performance[33m.[39mmetrics [33m||[39m [])[33m;[39m[0m
20:10:55.611 Next.js build worker exited with code: 1 and signal: null
20:10:55.653 Error: Command "npm run build" exited with 1