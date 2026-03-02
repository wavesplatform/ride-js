import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // This makes describe, it, expect etc. available globally
  },
});
