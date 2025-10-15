15:21:37.221 Running build in Washington, D.C., USA (East) – iad1
15:21:37.221 Build machine configuration: 2 cores, 8 GB
15:21:37.261 Cloning github.com/Annas82200/mizan-frontend (Branch: main, Commit: 553a426)
15:21:37.817 Warning: Failed to fetch one or more git submodules
15:21:37.818 Cloning completed: 557.000ms
15:21:38.473 Restored build cache from previous deployment (7o9r1YVAn3GksjzdGM2iL1dKBb3d)
15:21:39.099 Running "vercel build"
15:21:39.505 Vercel CLI 48.2.9
15:21:39.825 Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
15:21:39.838 Installing dependencies...
15:21:41.350 
15:21:41.351 up to date in 1s
15:21:41.352 
15:21:41.352 158 packages are looking for funding
15:21:41.353   run `npm fund` for details
15:21:41.383 Detected Next.js version: 14.2.33
15:21:41.387 Running "npm run build"
15:21:41.496 
15:21:41.496 > mizan-frontend@1.0.0 build
15:21:41.497 > next build
15:21:41.497 
15:21:42.166   ▲ Next.js 14.2.33
15:21:42.168 
15:21:42.222    Creating an optimized production build ...
15:21:47.431 Failed to compile.
15:21:47.431 
15:21:47.431 ./src/components/skills/bot/SkillsBotInterface.tsx
15:21:47.432 Module not found: Can't resolve '@/components/ui/input'
15:21:47.432 
15:21:47.432 https://nextjs.org/docs/messages/module-not-found
15:21:47.432 
15:21:47.432 Import trace for requested module:
15:21:47.432 ./src/app/dashboard/skills/page.tsx
15:21:47.432 
15:21:47.443 
15:21:47.444 > Build failed because of webpack errors
15:21:47.476 Error: Command "npm run build" exited with 1