export function apiUrl(path: string): string {
  if (typeof window === "undefined") return path;
  const host = window.location.hostname;
  if (host.includes("institutoi10.com.br")) {
    return `/apm-fundeb${path}`;
  }
  return path;
}
