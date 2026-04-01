import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: [
      'src/app/pages/home/home.spec.ts',
      'src/app/pages/login/login.spec.ts',
      'src/app/pages/routes-list/routes-list.spec.ts',
    ],
  },
});