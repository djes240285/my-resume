const cache = new Map<string, Promise<boolean>>();

const UA =
  'Mozilla/5.0 (compatible; ezhukov-resume/1.0; +https://github.com/)';

function aliveStatus(status: number): boolean {
  return (status >= 200 && status < 400) || status === 401 || status === 403;
}

async function checkUrlResolvesUncached(url: string): Promise<boolean> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 12_000);
  const headers = { 'User-Agent': UA };
  const common: RequestInit = {
    redirect: 'follow',
    signal: controller.signal,
    headers,
  };

  try {
    let res = await fetch(url, { ...common, method: 'HEAD' });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        ...common,
        method: 'GET',
        headers: { ...headers, Range: 'bytes=0-0' },
      });
    }
    return aliveStatus(res.status);
  } catch {
    try {
      const res = await fetch(url, { ...common, method: 'GET' });
      return aliveStatus(res.status);
    } catch {
      return false;
    }
  } finally {
    clearTimeout(id);
  }
}

/** Проверка «сайт отвечает» при статической сборке (без CORS). Результат кэшируется по URL. */
export function checkUrlResolves(url: string): Promise<boolean> {
  if (process.env.SKIP_URL_CHECK === '1') {
    return Promise.resolve(true);
  }
  if (!cache.has(url)) {
    cache.set(url, checkUrlResolvesUncached(url));
  }
  return cache.get(url)!;
}
