# remix hono worker

The goal is to use cloudflare worker's [new static asset hosting](https://blog.cloudflare.com/builder-day-2024-announcements/#static-asset-hosting) instead of cloudflare pages to deploy remix apps with hono as the api.

Based on the example in [yusukebe/hono-remix-adapter](https://github.com/yusukebe/hono-remix-adapter) that does not use cloudflare pages to deploy.

There is two entrypoints in this project:
- `server/entrypoints/development.ts` that handles serving the public folder that for some reason isn't being served by vite, could be a issue with hono-remix-adapter and does not have the remix server dependency.
- `server/entrypoints/production.ts` attaches cron listeners and calling remix from hono. I'm not sure how to get scheduled job testing to work with the remix dev server. So they're available using `pnpm run dev:cron` that does not use the remix dev server.
