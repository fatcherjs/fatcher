import { buildFatcherResponse } from './buildFatcherResponse';
import {
  FatcherContext,
  FatcherFunctionalMiddleware,
  FatcherResponse,
  FatcherResponseState,
} from './types';

/**
 * Compose middlewares to a higher-order function.
 *
 * If want to change request context.Should pass a new request context to `next()`.
 *
 * If don't want to change result, should return `next()`
 *
 * @param middlewares array of middlewares.
 * @returns
 * A async function of promise chain.
 *
 * @examples
 *
 * ```ts
 * async function use(context: Context, next: Next) {
 *      //pass a new context to lower middlewares.
 *      const result = await next({
 *          method: 'GET',
 *      })
 *
 *      // pass result to upper middlewares
 *      return result;
 * }
 * ```
 */
export function composeMiddlewares(middlewares: FatcherFunctionalMiddleware[]) {
  return function use(init: FatcherContext) {
    let currentIndex = -1;

    let response: FatcherResponse;
    const state: FatcherResponseState = Object.create(null);
    let context: FatcherContext = init;

    async function dispatch(
      index: number,
      patch?: Partial<FatcherContext>,
    ): Promise<FatcherResponse> {
      if (index <= currentIndex) {
        throw new Error('next() called multiple times');
      }

      currentIndex = index;

      const middleware = middlewares[index];

      if (patch) {
        context = {
          ...context,
          ...patch,
          request: patch.request || context.request,
        };
      }

      const newResponse = await middleware(context, async _ => dispatch(index + 1, _));
      response = newResponse !== response ? buildFatcherResponse(newResponse, state) : newResponse;
      return response;
    }

    return dispatch(0);
  };
}
