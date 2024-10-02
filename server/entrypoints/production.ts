/* eslint-disable @typescript-eslint/ban-ts-comment */

import { createRequestHandler } from '@remix-run/cloudflare';
import { Hono } from 'hono';

// @ts-ignore sometimes doesn't exist
import * as build from '../../build/server';
import server from '../server';

// @ts-ignore sometimes doesn't exist
import { getLoadContext } from './loadContext';

const createGetLoadContextArgs = (c: any) => {
  return {
    context: {
      cloudflare: {
        env: c.env,
        cf: c.req.raw.cf,
        ctx: {
          ...c.executionCtx,
        },
        caches: globalThis.caches ? caches : undefined,
      },
    },
    request: c.req.raw,
  };
};

const app = new Hono<{ Bindings: Env }>();

// Attach routes
app.route('/', server);

// Quiet loud remix errors
app.get('/favicon.ico', c => {
  return c.text('', 404);
});

// In production, hono serves remix
app.all('*', async c => {
  const args = createGetLoadContextArgs(c);
  const remixContext = getLoadContext(args as any);
  const handler = createRequestHandler(build, 'production');
  return handler(c.req.raw, remixContext);
});

export default {
  fetch: app.fetch as any,
  async scheduled(event: ScheduledEvent, env: any, ctx: any) {
    if (event.cron === '* * * * *') {
      console.log('Running cron job');
    }
  },
};
