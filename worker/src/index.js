export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const backendUrl = new URL(request.url);

      backendUrl.protocol = "https:";
      backendUrl.hostname = "api.omnirentplatform.com";

      const headers = new Headers(request.headers);

      headers.set("X-Forwarded-Host", url.host);
      headers.set("X-Forwarded-Proto", url.protocol.replace(":", ""));

      return fetch(
        new Request(backendUrl, {
          method: request.method,
          headers,
          body: request.body,
          redirect: "manual",
        }),
      );
    }

    return env.ASSETS.fetch(request);
  },
};