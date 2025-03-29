const BASE_URL = "https://veganfuture.org";

export function withBaseUrl(path: string): string {
  return `${BASE_URL}${path}`
}