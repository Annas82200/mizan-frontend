20:45:11.549 Running build in Washington, D.C., USA (East) – iad1
20:45:11.550 Build machine configuration: 2 cores, 8 GB
20:45:11.590 Cloning github.com/Annas82200/mizan-frontend (Branch: main, Commit: 6c99d0e)
20:45:12.325 Warning: Failed to fetch one or more git submodules
20:45:12.325 Cloning completed: 735.000ms
20:45:13.022 Restored build cache from previous deployment (Gx28K6bHLzwpZa9jR1GZ5UCwhBe9)
20:45:13.618 Running "vercel build"
20:45:14.007 Vercel CLI 48.2.9
20:45:14.334 Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
20:45:14.346 Installing dependencies...
20:45:16.249 
20:45:16.249 up to date in 1s
20:45:16.250 
20:45:16.250 158 packages are looking for funding
20:45:16.251   run `npm fund` for details
20:45:16.279 Detected Next.js version: 14.2.33
20:45:16.284 Running "npm run build"
20:45:16.391 
20:45:16.392 > mizan-frontend@1.0.0 build
20:45:16.392 > next build
20:45:16.392 
20:45:16.988  ⚠ Invalid next.config.js options detected: 
20:45:16.989  ⚠     Expected object, received boolean at "experimental.serverActions"
20:45:16.989  ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
20:45:16.990  ⚠ Server Actions are available by default now, `experimental.serverActions` option can be safely removed.
20:45:17.051   ▲ Next.js 14.2.33
20:45:17.052 
20:45:17.179    Creating an optimized production build ...
20:45:27.513  ✓ Compiled successfully
20:45:27.514    Linting and checking validity of types ...
20:45:39.080 Failed to compile.
20:45:39.081 
20:45:39.081 ./src/components/dashboard/TenantSelector.tsx:342:48
20:45:39.081 Type error: Property 'getEmployees' does not exist on type '{ getStats(): Promise<{ totalTenants: number; activeTenants: number; totalRevenue: number; monthlyGrowth: number; totalUsers: number; totalAnalyses: number; }>; getTenants(params?: TenantPaginationParams | undefined): Promise<...>; ... 16 more ...; getInvoices(params?: { ...; } | undefined): Promise<...>; }'.
20:45:39.081 
20:45:39.081 [0m [90m 340 |[39m       }[0m
20:45:39.082 [0m [90m 341 |[39m[0m
20:45:39.082 [0m[31m[1m>[22m[39m[90m 342 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m superadminService[33m.[39mgetEmployees({ [0m
20:45:39.082 [0m [90m     |[39m                                                [31m[1m^[22m[39m[0m
20:45:39.082 [0m [90m 343 |[39m         tenantId[33m,[39m[0m
20:45:39.082 [0m [90m 344 |[39m         page[33m:[39m [35m1[39m[33m,[39m[0m
20:45:39.083 [0m [90m 345 |[39m         limit[33m:[39m [35m100[39m[0m
20:45:39.121 Next.js build worker exited with code: 1 and signal: null
20:45:39.166 Error: Command "npm run build" exited with 1