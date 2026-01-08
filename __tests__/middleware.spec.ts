import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { defineMiddleware, fatcher } from '../src';

const server = setupServer(
  http.get('https://foo.bar/get', async () => {
    return HttpResponse.json({});
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Middleware', () => {
  it('Middleware calling next() multiple times should throw', async () => {
    await expect(
      fatcher('https://foo.bar/get', {
        middlewares: [
          defineMiddleware(async (_ctx, next) => {
            const res = await next();
            await next(); // ❌ illegal
            return res;
          }),
        ],
      }),
    ).rejects.toThrow(/multiple times/i);
  });
});
