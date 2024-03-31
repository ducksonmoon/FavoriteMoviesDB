interface ApiConfigOptions {
  method: string;
  headers: Record<string, string>;
}

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const defaultOptions: ApiConfigOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const buildUrl = (
  path: string,
  queryParams: Record<string, string | number | boolean> = {}
) => {
  const url = new URL(`${BASE_URL}${path}`);
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, String(queryParams[key]))
  );
  return url.toString();
};

export const apiEndpoints = {
  discover: (endpoing: string) =>
    buildUrl(endpoing, {
      include_adult: true,
      include_video: false,
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
    }),
};

export { defaultOptions };
