import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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

