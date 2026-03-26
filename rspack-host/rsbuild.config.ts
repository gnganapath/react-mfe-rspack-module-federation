import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { rspack } from '@rspack/core';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
   entry: "./src/index",
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
