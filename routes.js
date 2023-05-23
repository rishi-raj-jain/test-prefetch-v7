import { load } from "cheerio";
import { Router } from "@edgio/core";
import { injectBrowserScript, starterRoutes } from "@edgio/starter";
import responseBodyToString from "@edgio/core/utils/responseBodyToString";

export default new Router()
  .match("/:path/:path1/:path2/:path3", ({ cache, proxy }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
      },
      browser: false,
    });
    proxy("origin", {
      transformResponse: (res, req) => {
        if (res.body && res.getHeader("content-type")?.includes("html")) {
          injectBrowserScript(res);
          const $ = load(responseBodyToString(res));
          res.body = $.html().replace(/https\:\/\/blog\.inshorts\.com\//g, "/");
        }
      },
    });
  })
  .match("/", ({ cache, proxy }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
      },
      browser: false,
    });
    proxy("origin", {
      transformResponse: (res, req) => {
        if (res.body && res.getHeader("content-type")?.includes("html")) {
          injectBrowserScript(res);
          const $ = load(responseBodyToString(res));
          res.body = $.html().replace(/https\:\/\/blog\.inshorts\.com\//g, "/");
        }
      },
    });
  })
  .use(starterRoutes);
