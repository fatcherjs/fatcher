import { responseKeys } from './responseKeys';
import { FatcherResponse, FatcherResponseState } from './types';

export function buildFatcherResponse(
  response: Response,
  state: FatcherResponseState = Object.create(null),
): FatcherResponse {
  return new Proxy(response, {
    get(target, prop, receiver) {
      if (prop in state) {
        return state[prop];
      }

      const value = Reflect.get(target, prop, receiver);

      if (typeof value === 'function') {
        return value.bind(target);
      }

      return value;
    },

    set(_, prop, value) {
      if (responseKeys.includes(prop)) {
        return true;
      }

      state[prop] = value;
      return true;
    },

    has(target, prop) {
      return prop in state || prop in target;
    },
  }) as FatcherResponse;
}
