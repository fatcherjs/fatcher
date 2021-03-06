## v1.6.1

-   ๐ fix parse error when query string had absolute url ([#180](https://github.com/fatcherjs/fatcher/pull/180))
-   ๐ fix parse exception when base url with an absolute request url ([#181](https://github.com/fatcherjs/fatcher/pull/181))

## v1.6.0

-   ๐ add options `validateCode` for passing custom response status code. ([#174](https://github.com/fatcherjs/fatcher/pull/174))
-   โก๏ธ `normalizeURL` downgrade to use `match`. ([#179](https://github.com/fatcherjs/fatcher/pull/179))

## v1.5.0

-   ๐ `readStreamByChunk` supports async callback ([#167](https://github.com/fatcherjs/fatcher/pull/167))
-   ๐ request url supports relative path like `../` and `./` ([#170](https://github.com/fatcherjs/fatcher/pull/170))

## v1.4.1

-   ๐ง Remove some overt options ([#161](https://github.com/fatcherjs/fatcher/pull/161))

## v1.4.0

-   โ Deprecate `isAbortError`, move it to `@fatcherjs/middleware-aborter`. ([#157](https://github.com/fatcherjs/fatcher/pull/157))

## v1.3.0

-   ๐ `Middleware` add `presets` options, can set preset middlewares before using this middleware. ([#152](https://github.com/fatcherjs/fatcher/pull/152))

## v1.2.0

-   ๐ Use `Headers` class for sending http headers. ([#129](https://github.com/fatcherjs/fatcher/pull/129))
-   ๐ Add `params` into request options ([#128](https://github.com/fatcherjs/fatcher/pull/128))
-   ๐ Change context in `middleware.use` to readonly ([#127](https://github.com/fatcherjs/fatcher/pull/127))
-   ๐ When using `createScopedRequest`, headers will cover another request headers ([#140](https://github.com/fatcherjs/fatcher/pull/140))
-   ๐ Should not return request headers but response headers ([#137](https://github.com/fatcherjs/fatcher/pull/137))
-   ๐ง Using `requestHeaders` instead of `headers` in context ([#142](https://github.com/fatcherjs/fatcher/pull/142))

## v1.1.3

-   ๐ `ResponseResult` headers should be response headers ([#126](https://github.com/fatcherjs/fatcher/pull/126))
-   ๐งช Upgrade node version to `18` and setup units tests ([#124](https://github.com/fatcherjs/fatcher/pull/124))

## v1.1.2

-   ๐ It is not exported `isAbortError` and `readStreamByChunk` ([#120](https://github.com/fatcherjs/fatcher/pull/120))
-   ๐ง Rename `chunkStreamReader` to `readStreamByChunk` ([#119](https://github.com/fatcherjs/fatcher/pull/119))
-   ๐ The global options `overriding` headers rather than `merging` headers ([#118](https://github.com/fatcherjs/fatcher/pull/118))

## v1.1.1

-   ๐ Using body instead of inline url params with `application/x-www-form-urlencoded` ([#113](https://github.com/fatcherjs/fatcher/pull/113))
-   โก๏ธ Headers using `Record<string, string>` to send request ([#109](https://github.com/fatcherjs/fatcher/pull/109))

## v1.1.0

-   ๐ง Move `@fatcherjs/utils-shared` to `utils`
-   ๐ Add default request init for same behavior during fetch in different browsers

## v1.0.0

-   ๐ Add `payload-consumer`

## v1.0.0-beta.1

-   ๐ Add `createScopedRequest`
-   โ Deprecate `clone` helper function
-   โ Deprecate Auto Transform Response Data
-   โ Deprecate Middleware Apply.
-   ๐ง Refactor Typings
-   ๐ง Refactor Immutable Context
-   ๐ง Move Download Progress Middleware to [@fatcherjs/middleware-download-progress](https://github.com/fatcherjs/middlewares/tree/master/packages/download-progress)
-   ๐ง Move Cancelable Middlewares to [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/middlewares/tree/master/packages/aborter)

## v0.3.2

-   ๐ fix normalize error when baseURL is not '/' [#62](https://github.com/fatcherjs/fatcher/pull/62)

## v0.3.1

-   ๐ fix normalize url error
-   ๐ fix merge options error

## v0.3.0

-   ๐ add `FatcherError`
-   ๐ add `isFatcherError` for custom middleware
-   ๐ฆ export `clone` helper function

## v0.2.0

-   ๐ Add Timeout aborter.
-   ๐ Throw AbortError during aborting fetch.
-   ๐ง Add compatibility with esModule

## v0.1.1

-   ๐ Fix can not abort fetch when request pending.

## v0.1.0

-   ๐ Basic Fetch.
-   ๐ Cancelable.
-   ๐ Add custom middlewares.
-   ๐ Auto Transform Request Payload.
-   ๐ Auto Transform Response data
-   ๐ Immutable Context
-   ๐ Download Progress
