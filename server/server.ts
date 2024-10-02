// server/index.ts
import { Hono } from 'hono';

const app = new Hono<{
  Bindings: Env;
}>();

app.use(async (c, next) => {
  await next();
});

app.get('/api', c => {
  return c.json({
    message: 'Hello',
    var: c.env.MY_VAR,
  });
});

export default app;
