import { getGifMapping } from "./gifs";

export default {
  async fetch(request: Request, ctx: ExecutionContext): Promise<Response> {
    const accountHash = "OvWjU0wI7pR8YbTJqpuqlA";

    const gifMapping = getGifMapping();

    const { pathname } = new URL(request.url);

    if (pathname == "/") {
      return new Response(gifMapping.index(), {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }
    const gif = gifMapping.get(pathname);
    if (!gif) {
      return Response.redirect(request.url.replace(pathname, ""), 303);
    }

    return fetch(`https://imagedelivery.net/${accountHash}/${gif.id}/public`);
  },

  buildIndex(): Response {
    return new Response();
  },
};
