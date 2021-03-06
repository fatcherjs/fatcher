import { getRandomString, getStringStream, sleep } from '../../../../shared/tests';
import { canActivate, isAbortError, readStreamByChunk } from '../../src/helpers';

describe('Helpers', () => {
    it('canActivate', () => {
        const body = {
            id: 'test',
            name: 'fatcher',
        };

        const response = new Response(JSON.stringify(body), { status: 200 });

        const usedResponse = new Response(JSON.stringify(body), { status: 200 });

        usedResponse.json();

        const nullBodyResponse = new Response(null, { status: 200 });

        expect(canActivate(response)).toBe(true);
        expect(canActivate(usedResponse)).toBe(false);
        expect(canActivate(nullBodyResponse)).toBe(false);
    });

    it('isAbortError', () => {
        const domException = new DOMException('The user aborted a request.', 'AbortError');

        expect(isAbortError(domException)).toBe(true);
        expect(isAbortError(new DOMException())).toBe(false);
    });

    it('readStreamByChunk', async () => {
        const cof = 1000;
        let text = '';
        const length = 1_000_000;

        text = getRandomString(length);

        const readableStream = getStringStream(text, cof);

        const result: string[] = [];

        const textDecoder = new TextDecoder();

        await readStreamByChunk(readableStream, chunk => {
            result.push(textDecoder.decode(chunk));
        });

        expect(result.join('')).toBe(text);
        expect(result.length).toBe(length / cof);
        expect(result[0].length).toBe(cof);
    });

    it('readStreamByChunk Async', async () => {
        const cof = 1000;
        const length = 100_000;

        const text = getRandomString(length);

        const readableStream = getStringStream(text, cof);

        const result: string[] = [];

        const textDecoder = new TextDecoder();

        await readStreamByChunk(readableStream, async chunk => {
            await sleep(5);
            result.push(textDecoder.decode(chunk));
        });

        expect(result.join('')).toBe(text);
        expect(result.length).toBe(length / cof);
        expect(result[0].length).toBe(cof);
    });
});
