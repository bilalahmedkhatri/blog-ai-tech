import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // base: '/static/',
  // build: {
  //   manifest: true,
  //   rollupOptions: {
  //     assetFileNames: (file) => 'assets/css/index.min.css',
  //     entryFileNames: (file) => 'assets/js/[name].min.js',
  //   },
  // },
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

