import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
     pluginReact(),
     pluginModuleFederation({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      exposes: {
       //'./ButtonComponent': './src/components/ButtonComponent.tsx',
        './MfeOne': './src/App.tsx',
      },      
      shared: ['react', 'react-dom'],
    }),
    ],
    server: { port: 3002 },
});
