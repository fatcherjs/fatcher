/**
 * Confirm an error whether is DOMException
 * @param error
 * @returns
 *
 * @deprecated use `@import('@fatcherjs/middleware-aborter').isAbortError` instead.
 */
export function isAbortError(error: unknown): error is DOMException {
    return error instanceof DOMException && error.name === 'AbortError';
}
