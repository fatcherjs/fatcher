import { Context, RequestHeaders } from '../../src';
import { createContext, mergeContext } from '../../src/context';

describe('Context', () => {
    it('createContext', () => {
        const baseUrl = '/';
        const url = '/test';

        const context = createContext({ baseUrl, url });

        expect(context.baseUrl).toBe(baseUrl);
        expect(context.url).toBe(url);
    });

    it('createContext without url', () => {
        try {
            createContext({ baseUrl: '/' });
        } catch (error: any) {
            expect(error.message).toBe('__vp__ URL is required.');
        }
    });

    it('createContext with empty', () => {
        try {
            createContext({});
        } catch (error: any) {
            expect(error.message).toBe('__vp__ URL is required.');
        }
    });

    it('mergeContext without headers', () => {
        const context: Context = {
            url: '/a/test/',
            method: 'POST',
            baseUrl: '/a/',
            credentials: 'same-origin',
            requestHeaders: new Headers(),
        };

        const patchContext: Partial<Context> = {
            url: '/b/test',
            method: 'PATCH',
            headers: {},
        };

        const mergedContext = mergeContext(context, patchContext);

        expect(mergedContext.url).toBe(patchContext.url);
        expect(mergedContext.baseUrl).toBe(context.baseUrl);
        expect(mergedContext.credentials).toBe(context.credentials);
        expect(mergedContext.headers).toStrictEqual(patchContext.headers);

        expect([...mergedContext.requestHeaders.values()].length).toBe(
            Object.keys(patchContext.headers as RequestHeaders).length
        );
    });

    it('mergeContext with headers', () => {
        const context: Context = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Origin: 'origin',
            },
            requestHeaders: new Headers(),
        };

        const patchContext: Partial<Context> = {
            headers: {
                'Content-Type': 'application/json',
                Test: 'test',
            },
        };

        const patchContextWithEmptyHeaders: Partial<Context> = {};

        const mergedContext = mergeContext(context, patchContext, patchContextWithEmptyHeaders);

        expect(mergedContext.headers!['Content-Type']).toBe(patchContext.headers!['Content-Type']);
        expect(mergedContext.headers!['Test']).toBe(mergedContext.headers!['Test']);
        expect(mergedContext.headers!['Origin']).toBe(context.headers!['Origin']);

        expect(mergedContext.requestHeaders.get('content-type')).toBe(patchContext.headers!['Content-Type']);
        expect(mergedContext.requestHeaders.get('test')).toBe(mergedContext.headers!['Test']);
        /**
         * Origin is a forbidden header name
         *
         * So we can't set it to anything
         *
         * @see https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
         */
        expect(mergedContext.requestHeaders.get('origin')).toBe(null);
    });
});
