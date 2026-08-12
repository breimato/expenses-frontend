import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function injectBuildId(): Plugin {
  const buildId = process.env.VITE_BUILD_ID ?? String(Date.now());

  return {
    name: 'inject-build-id',
    transformIndexHtml(html) {
      return html.replace(
        '</head>',
        `    <meta name="app-build-id" content="${buildId}" />\n  </head>`,
      );
    },
    config() {
      return {
        define: {
          __APP_BUILD_ID__: JSON.stringify(buildId),
        },
      };
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), injectBuildId()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
