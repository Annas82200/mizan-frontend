15:41:46.189 Running build in Washington, D.C., USA (East) – iad1
15:41:46.189 Build machine configuration: 2 cores, 8 GB
15:41:46.205 Cloning github.com/Annas82200/mizan-frontend (Branch: main, Commit: e68c8c0)
15:41:46.832 Warning: Failed to fetch one or more git submodules
15:41:46.833 Cloning completed: 628.000ms
15:41:47.518 Restored build cache from previous deployment (7o9r1YVAn3GksjzdGM2iL1dKBb3d)
15:41:48.090 Running "vercel build"
15:41:48.516 Vercel CLI 48.2.9
15:41:48.828 Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: http://vercel.link/node-version
15:41:48.841 Installing dependencies...
15:41:50.273 
15:41:50.274 up to date in 1s
15:41:50.275 
15:41:50.276 158 packages are looking for funding
15:41:50.276   run `npm fund` for details
15:41:50.305 Detected Next.js version: 14.2.33
15:41:50.310 Running "npm run build"
15:41:50.423 
15:41:50.423 > mizan-frontend@1.0.0 build
15:41:50.424 > next build
15:41:50.424 
15:41:51.108   ▲ Next.js 14.2.33
15:41:51.108 
15:41:51.163    Creating an optimized production build ...
15:42:03.557  ✓ Compiled successfully
15:42:03.558    Linting and checking validity of types ...
15:42:14.203 Failed to compile.
15:42:14.204 
15:42:14.204 ./src/app/dashboard/superadmin/clients/add/page.tsx:66:19
15:42:14.204 Type error: Property 'structureFile' does not exist on type 'FormData'.
15:42:14.204 
15:42:14.204 [0m [90m 64 |[39m     }[0m
15:42:14.204 [0m [90m 65 |[39m[0m
15:42:14.204 [0m[31m[1m>[22m[39m[90m 66 |[39m     [36mif[39m ([33m![39mformData[33m.[39mstructureFile) {[0m
15:42:14.204 [0m [90m    |[39m                   [31m[1m^[22m[39m[0m
15:42:14.204 [0m [90m 67 |[39m       setError([32m'Please upload a structure CSV file'[39m)[33m;[39m[0m
15:42:14.204 [0m [90m 68 |[39m       [36mreturn[39m[33m;[39m[0m
15:42:14.204 [0m [90m 69 |[39m     }[0m
15:42:14.228 Next.js build worker exited with code: 1 and signal: null
15:42:14.247 Error: Command "npm run build" exited with 1