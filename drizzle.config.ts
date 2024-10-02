import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'postgresql://postgres:postgres@127.0.0.1/hono',
  },
});
