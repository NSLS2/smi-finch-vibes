import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// App build config: produces a static SPA (index.html + assets) for hosting.
// Unlike vite.config.ts (a library build), this bundles React and emits a
// browser-ready app to `dist-app/`. VITE_* values are inlined at build time
// from the active mode's env file (.env.production for `vite build`).
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const qserverRest = env.VITE_QSERVER_REST?.trim() || 'http://localhost:60610';
  const qserverWs = env.VITE_QSERVER_WS?.trim() || 'ws://localhost:8001/api/v1/qs-console-socket';
  const cameraWs = env.VITE_CAMERA_WS?.trim() || 'ws://localhost:8001/api/v1/camera-socket';
  const tiffWs = env.VITE_TIFF_WS?.trim() || 'ws://localhost:8002/tiff-socket';
  const tiledTarget = env.VITE_TILED_TARGET?.trim() || 'https://tiled.nsls2.bnl.gov';

  return {
    define: {
      'import.meta.env.VITE_QSERVER_REST': JSON.stringify(qserverRest),
      'import.meta.env.VITE_QSERVER_WS': JSON.stringify(qserverWs),
      'import.meta.env.VITE_CAMERA_WS': JSON.stringify(cameraWs),
    },
    plugins: [
      react(),
      tsConfigPaths(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/api/qserver': {
          target: qserverRest,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/qserver/, ''),
        },
        '/api/qserver/console': {
          target: qserverWs,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/qserver\/console/, ''),
        },
        '/api/camera': {
          target: cameraWs,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/camera/, ''),
        },
        '/api/tiff': {
          target: tiffWs,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tiff/, ''),
        },
        '/api/tiled': {
          target: tiledTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/tiled/, ''),
        },
      },
    },
    build: {
      outDir: 'dist-app',
      emptyOutDir: true,
    },
  };
});
