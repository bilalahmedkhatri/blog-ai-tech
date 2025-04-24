import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/static/',
  plugins: [react()],
  envPrefix: 'BLOG_',
  build: {
    manifest: true,
    outDir: path.resolve(__dirname, '../frontend/ui-dist'),
  },
  esbuild: {
    loader: 'jsx',
    include: /\.jsx?$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});

