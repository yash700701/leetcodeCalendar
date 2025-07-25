import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'LeetCodeCalendar',
      fileName: 'leetcode-calendar',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
