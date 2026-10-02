import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` produces a single self-contained dist/index.html that can be
// opened straight from disk (no server needed).
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 2000,
  },
});
