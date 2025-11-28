import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist'
    },
    base: '/',
    css: {
      modules: {
        generateScopedName: '[local]_[hash:base64:5]',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@styles': path.resolve(__dirname, './src/styles')
      }
    },

    define: {
      'process.env': env,
    },
  };
});
