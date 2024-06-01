import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  if (process.env.NODE_ENV === 'staging') {
    dotenv.config({ path: '.env.staging' });
  }

  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      'process.env': process.env,
    },
  };
});

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   define: {
//     'process.env': process.env,
//   },
// });
