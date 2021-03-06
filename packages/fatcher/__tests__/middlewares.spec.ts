import { fatcher, Middleware, isFatcherError, canActivate, readStreamByChunk } from '../src';
import fetchMock from 'jest-fetch-mock';
import { BASE_URL } from './utils';
import { getRandomString, getStringStream } from '../../../shared/tests';

describe('Custom Middlewares', () => {
    const TEXT_LENGTH = 1_000_000;

    let longText = '';

    beforeEach(() => {
        fetchMock.mockIf(new RegExp(`${BASE_URL}/.*`), async request => {
            if (request.url === `${BASE_URL}/getLongText`) {
                if (request.method !== 'POST') {
                    return {
                        status: 405,
                    };
                }

                longText = getRandomString(TEXT_LENGTH);

                return {
                    status: 200,
                    body: longText,
                };
            }

            return {
                status: 404,
            };
        });

        fetchMock.enableMocks();
    });

    function pre(): Middleware {
        return {
            name: 'fatcher-middleware-pre',
            use(context, next) {
                if (context.url === `${BASE_URL}/get`) {
                    return next({
                        url: `${BASE_URL}/getLongText`,
                        method: 'POST',
                    });
                }

                return next();
            },
        };
    }

    it("Don't use pre middleware", async () => {
        try {
            await fatcher({
                baseUrl: BASE_URL,
                url: '/get',
            });
        } catch (error: any) {
            expect(isFatcherError(error)).toBe(true);

            const json = error.toJSON();

            expect(json.status).toBe(404);
        }
    });

    it('Using pre middleware', async () => {
        const { status, data } = await fatcher({
            baseUrl: BASE_URL,
            url: '/get',
            middlewares: [pre()],
        });

        expect(status).toBe(200);
        expect(data.toString()).toBe(longText);
    });

    function post(cof: number): Middleware {
        return {
            name: 'fatcher-middleware-post',
            async use(context, next) {
                const { data: response, ...rest } = await next();

                if (!canActivate(response)) {
                    return {
                        data: response,
                        ...rest,
                    };
                }

                return {
                    ...rest,
                    response,
                    data: getStringStream(await response.text(), cof),
                };
            },
        };
    }

    it('Compose Middlewares', async () => {
        const COF = 1000;

        const textDecoder = new TextDecoder();

        const { data } = await fatcher<ReadableStream<Uint8Array>>({
            baseUrl: BASE_URL,
            url: '/get',
            middlewares: [pre(), post(COF)],
        });

        const result: string[] = [];
        await readStreamByChunk(data, str => result.push(textDecoder.decode(str)));
        expect(result[0].length).toBe(COF);
        expect(result.length).toBe(longText.length / COF);
        expect(result.join('')).toBe(longText);
    });

    it('Presets Middlewares', async () => {
        const returnedData = 'returned by fatcher-middleware-return';

        const url = '/test/presets';

        const test = (): Middleware => {
            return {
                name: 'fatcher-middleware-test',
                async use(context, next) {
                    const result = await next({
                        url,
                    });

                    expect(result.data).toBe(returnedData);
                    expect(result.status).toBe(200);
                    expect(result.statusText).toBe('ok');
                    expect(result.url).toBe(url);

                    return result;
                },
            };
        };

        const middleware = (): Middleware => {
            return {
                name: 'fatcher-middleware-return',
                use(context) {
                    expect(context.url).toBe(url);

                    return {
                        status: 200,
                        statusText: 'ok',
                        data: returnedData,
                        headers: new Headers(),
                        url: context.url!,
                    };
                },
                presets: [test()],
            };
        };

        await fatcher({ url: '/presets', middlewares: [middleware()] });
    });

    afterEach(() => fetchMock.disableMocks());
});
