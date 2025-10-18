20:30:07.158 Running build in Washington, D.C., USA (East) – iad1
20:30:07.159 Build machine configuration: 2 cores, 8 GB
20:30:07.178 Cloning github.com/Annas82200/mizan-frontend (Branch: main, Commit: e84d799)
20:30:07.867 Warning: Failed to fetch one or more git submodules
20:30:07.868 Cloning completed: 689.000ms
20:30:08.824 Restored build cache from previous deployment (Gx28K6bHLzwpZa9jR1GZ5UCwhBe9)
20:30:09.424 Running "vercel build"
20:30:09.944 Vercel CLI 48.2.9
20:30:10.264 Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
20:30:10.278 Installing dependencies...
20:30:11.713 
20:30:11.714 up to date in 1s
20:30:11.714 
20:30:11.715 158 packages are looking for funding
20:30:11.715   run `npm fund` for details
20:30:11.744 Detected Next.js version: 14.2.33
20:30:11.748 Running "npm run build"
20:30:11.857 
20:30:11.858 > mizan-frontend@1.0.0 build
20:30:11.858 > next build
20:30:11.858 
20:30:12.467  ⚠ Invalid next.config.js options detected: 
20:30:12.468  ⚠     Expected object, received boolean at "experimental.serverActions"
20:30:12.468  ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
20:30:12.469  ⚠ Server Actions are available by default now, `experimental.serverActions` option can be safely removed.
20:30:12.531   ▲ Next.js 14.2.33
20:30:12.532 
20:30:12.662    Creating an optimized production build ...
20:30:22.944  ✓ Compiled successfully
20:30:22.945    Linting and checking validity of types ...
20:30:34.202 Failed to compile.
20:30:34.202 
20:30:34.203 ./src/app/dashboard/superadmin/tenants/page.tsx:56:13
20:30:34.203 Type error: Type '{ page: number; limit: number; tenants: { id: number; name: string; status: "active" | "suspended" | "trial" | "cancelled"; domain: string; plan: "enterprise" | "starter" | "professional"; userCount: number; createdAt: string; lastActivity: string; monthlyRevenue: number; }[]; total: number; totalPages: number; }' is not assignable to type 'ApiResponse'.
20:30:34.204   Types of property 'tenants' are incompatible.
20:30:34.204     Type '{ id: number; name: string; status: "active" | "suspended" | "trial" | "cancelled"; domain: string; plan: "enterprise" | "starter" | "professional"; userCount: number; createdAt: string; lastActivity: string; monthlyRevenue: number; }[]' is not assignable to type 'Tenant[]'.
20:30:34.204       Property 'updatedAt' is missing in type '{ id: number; name: string; status: "active" | "suspended" | "trial" | "cancelled"; domain: string; plan: "enterprise" | "starter" | "professional"; userCount: number; createdAt: string; lastActivity: string; monthlyRevenue: number; }' but required in type 'Tenant'.
20:30:34.204 
20:30:34.204 [0m [90m 54 |[39m       setError([36mnull[39m)[33m;[39m[0m
20:30:34.205 [0m [90m 55 |[39m[0m
20:30:34.205 [0m[31m[1m>[22m[39m[90m 56 |[39m       [36mconst[39m response[33m:[39m [33mApiResponse[39m [33m=[39m [36mawait[39m superadminService[33m.[39mgetTenants()[33m;[39m[0m
20:30:34.205 [0m [90m    |[39m             [31m[1m^[22m[39m[0m
20:30:34.205 [0m [90m 57 |[39m       setTenants(response[33m.[39mtenants [33m||[39m [])[33m;[39m[0m
20:30:34.205 [0m [90m 58 |[39m     } [36mcatch[39m (err[33m:[39m unknown) {[0m
20:30:34.205 [0m [90m 59 |[39m       console[33m.[39merror([32m'Error fetching tenants:'[39m[33m,[39m err)[33m;[39m[0m
20:30:34.235 Next.js build worker exited with code: 1 and signal: null
20:30:34.277 Error: Command "npm run build" exited with 1