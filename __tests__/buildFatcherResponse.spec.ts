import { describe, expect, it } from 'vitest';
import { buildFatcherResponse } from '../src/buildFatcherResponse';

describe('Build Fatcher Response', () => {
  it('preserves Response methods and getters', async () => {
    const response = new Response(JSON.stringify({ a: 1 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    const res = buildFatcherResponse(response);

    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({ a: 1 });
  });

  it('binds Response methods correctly', async () => {
    const response = new Response('hello');

    const res = buildFatcherResponse(response);

    const text = await res.text();
    expect(text).toBe('hello');
  });

  it('does not allow overriding Response native properties', () => {
    const response = new Response('ok');
    const res = buildFatcherResponse(response);

    // @ts-expect-error
    res.ok = false;

    expect(res.ok).toBe(true);
  });

  it('allows adding custom extension properties', () => {
    const response = new Response('ok');
    const res = buildFatcherResponse(response) as any;

    const fn = () => 123;

    res.test = fn;

    expect(res.test).toBe(fn);
  });

  it('does not pollute original Response object', () => {
    const response = new Response('ok');
    const res = buildFatcherResponse(response) as any;

    res.foo = 'bar';

    expect((response as any).foo).toBeUndefined();
    expect(res.foo).toBe('bar');
  });

  it('supports "in" operator for both response and extensions', () => {
    const response = new Response('ok');
    const res = buildFatcherResponse(response) as any;

    res.extra = 42;

    expect('ok' in res).toBe(true); // Response getter
    expect('text' in res).toBe(true); // Response method
    expect('extra' in res).toBe(true); // extension
  });

  it('is a instance of Response', () => {
    const response = new Response('ok');
    const res = buildFatcherResponse(response);
    expect(res instanceof Response).toBe(true);
  });
});
