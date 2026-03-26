# Rsbuild project

## Setup

Install the dependencies:

```bash
npm install
```

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Learn more

To learn more about Rsbuild, check out the following resources:

- [Rsbuild documentation](https://rsbuild.rs) - explore Rsbuild features and APIs.
- [Rsbuild GitHub repository](https://github.com/web-infra-dev/rsbuild) - your feedback and contributions are welcome!




how to create module federation micro front end with rspack build


To create a micro-frontend architecture using Rspack and Rsbuild, you should use the Module Federation v2.0 plugin. This version provides enhanced features like runtime plugins and dynamic type hints. 
Rspack
Rspack
 +2
1. Initialize Your Projects
You will need at least two projects: a Provider (Remote) that exposes components and a Host that consumes them. 
Module federation
Module federation
 +2
bash
# Create the Provider project
npx create-rsbuild@latest rspack-remote
# Create the Host project
npx create-rsbuild@latest rspack-host
Use code with caution.

2. Configure the Provider (Remote)
The Provider "exposes" specific files or components to be used by other apps. 

Install the plugin:
bash
npm add @module-federation/rsbuild-plugin @module-federation/enhanced -D
Use code with caution.

Update rsbuild.config.ts:
typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remote_app',
      exposes: {
        './Button': './src/components/Button.tsx',
      },
      filename: 'remoteEntry.js',
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { port: 3002 },
});
Use code with caution.

 
3. Configure the Host
The Host "consumes" the exposed modules from the Provider. 
Rsbuild
Rsbuild
 +1
Update rsbuild.config.ts:
typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host_app',
      remotes: {
        remote: 'remote_app@http://localhost:3002/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: { port: 3001 },
});
Use code with caution.

 
4. Use the Remote Component in the Host 
In your Host application code, use React.lazy to load the remote component. 

tsx
import React, { Suspense } from 'react';
// @ts-ignore
const RemoteButton = React.lazy(() => import('remote/Button'));

const App = () => (
  <div>
    <h1>Host Application</h1>
    <Suspense fallback="Loading Button...">
      <RemoteButton />
    </Suspense>
  </div>
);
Use code with caution.

Key Requirements & Tips
Asynchronous Bootstrapping: Ensure your entry file (e.g., index.ts) uses a dynamic import('./bootstrap') to allow Module Federation to initialize shared dependencies before the app runs.
Shared Dependencies: Always include react and react-dom in the shared section to avoid loading multiple versions of React, which can cause runtime errors.
Asset Prefix: Rsbuild automatically sets the assetPrefix to true when Module Federation is detected, ensuring remote assets (like images or CSS) load with the correct absolute URLs. 


Topic : for prod with multi stage deployment
============================================
 
Would you like to see how to implement Dynamic Remotes so you can change your micro-frontend URLs at runtime?





undefined
undefined
undefined
20 sites
moduleFederation.options - Rsbuild
Introduction. When using Module Federation, it is recommended that you use the moduleFederation. options option provided by Rsbuil...

Rsbuild
Micro Frontends - Vite, RSBuild and Module Federation V2
To ensure proper functionality and avoid conflicts in a micro frontend architecture, sharing dependencies like React and React DOM...

YouTube
·
Russell Canfield

48s
Module Federation - Rspack
Module Federation 2.0 provides some additional out-of-the-box features based on Module Federation, such as dynamic TS type hints, ...

Rspack
Show all
yes
3 hours ago

To implement Dynamic Remotes in a React micro-frontend using Rsbuild and Rspack, you move the remote configuration from your build-time config to your application's runtime code. This allows you to load modules from URLs determined at runtime (e.g., from an API or environment variables). 
YouTube
YouTube
 +1
1. Update rsbuild.config.ts
Remove the static remotes URLs from your host configuration. You still need the plugin to initialize the federation environment. 
Rsbuild
Rsbuild
 +1
typescript
// rsbuild.config.ts (Host)
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginModuleFederation({
      name: 'host_app',
      remotes: {}, // Leave empty or only include static ones
      shared: ['react', 'react-dom'],
    }),
  ],
});
Use code with caution.

2. Implement Runtime Loading 
Use the @module-federation/enhanced/runtime package to register and load remotes dynamically. 
GitHub
GitHub
 +1
tsx
import React, { Suspense, lazy } from 'react';
import { init, loadRemote } from '@module-federation/enhanced/runtime';

// Initialize the federation runtime with dynamic remotes
init({
  name: 'host_app',
  remotes: [
    {
      name: 'remote_app',
      // This URL can come from an API call or logic
      entry: 'http://localhost:3002/remoteEntry.js', 
    },
  ],
});

// Create a helper to load the dynamic component
const DynamicButton = lazy(() => 
  loadRemote('remote_app/Button') as Promise<{ default: React.ComponentType }>
);

export default function App() {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback="Loading...">
        <DynamicButton />
      </Suspense>
    </div>
  );
}
Use code with caution.

Key Advantages of Dynamic Remotes
Environment Flexibility: Use the same build for staging and production by injecting the correct URLs at runtime.
A/B Testing: Dynamically point to different remote versions based on user data.
Decoupled Releases: Update remote applications without redeploying the host application. 
YouTube
YouTube
 +3
Best Practices
Error Boundaries: Always wrap dynamic components in a React Error Boundary to prevent a failing remote from crashing your entire host app.
Preloading: If you know which remotes a user will likely need, use the preload feature in Module Federation v2.0 to fetch them in the background.
Style Isolation: Use Tailwind CSS prefixes in your remote applications to avoid class name collisions with the host. 
Rsbuild
Rsbuild
 +2
Would you like to see how to handle TypeScript types for these dynamic remotes so you don't have to use @ts-ignore?
