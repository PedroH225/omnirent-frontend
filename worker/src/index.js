export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const backendUrl = new URL(request.url);

      backendUrl.protocol = "https:";
      backendUrl.hostname = "api.omnirentplatform.com";

      return fetch(new Request(backendUrl, request));
    }

    return env.ASSETS.fetch(request);
  },
};