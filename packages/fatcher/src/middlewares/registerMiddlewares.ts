import { UnregisteredMiddlewares, Middleware } from '../interfaces';
import { isFunction } from '../utils';

/**
 * Register Middlewares for fatcher.
 *
 * @param middlewares array of middleware
 * @returns
 */
export function registerMiddlewares(unregisteredMiddlewares: UnregisteredMiddlewares): Middleware[] {
    return unregisteredMiddlewares.reduce<Middleware[]>((total, current) => {
        let middleware: Middleware[];

        if (Array.isArray(current)) {
            middleware = registerMiddlewares(current);
        } else {
            middleware = [isFunction(current) ? current() : current];

            if (middleware[0].presets?.length) {
                middleware = registerMiddlewares(middleware[0].presets).concat(middleware);
            }
        }

        return total.concat(middleware);
    }, []);
}
