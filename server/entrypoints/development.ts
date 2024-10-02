import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

import server from '../server';

const app = new Hono<{
  Bindings: Env;
}>();

// Attach routes
app.route('/', server);

// Only for local development
// This serves the public folder since for some reason remix vite doesn't seem to want to
app.use(
  '/public/*',
  serveStatic({
    root: './public',
    // Attempt to limit only public folder assets
    rewriteRequestPath(path) {
      return path.replace(/^\/public/, '');
    },
  }),
);

export default app;
