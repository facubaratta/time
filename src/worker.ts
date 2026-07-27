type AssetBinding = {
  fetch(request: Request): Promise<Response>;
};

type WorkerEnvironment = {
  ASSETS: AssetBinding;
};

export default {
  async fetch(request: Request, environment: WorkerEnvironment) {
    const response = await environment.ASSETS.fetch(request);

    if (
      response.status === 404 &&
      request.headers.get("accept")?.includes("text/html")
    ) {
      const fallbackUrl = new URL("/index.html", request.url);
      return environment.ASSETS.fetch(new Request(fallbackUrl, request));
    }

    return response;
  },
};
