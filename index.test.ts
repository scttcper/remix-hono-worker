import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { UnstableDevWorker } from 'wrangler';
import { unstable_dev } from 'wrangler';

describe('Worker', () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev('./server/entrypoints/production.ts', {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it('should get /api', async () => {
    const resp = await worker.fetch('/api', {
      method: 'GET',
    });
    const response = await resp.json();
    expect(response).toEqual({ 
      message: 'Hello',
      var: 'My Value'
    });
  });
});
