const cache = new Map<string, { data: string; createdAt: number }>();

const MAX_ENTRIES = 200;
const TTL_MS = 10 * 60 * 1000; // 10 minutes

export function storeAudio(id: string, base64Audio: string) {
  // Cleanup expired entries
  const now = Date.now();
  for (const [key, value] of cache) {
    if (now - value.createdAt > TTL_MS) cache.delete(key);
  }
  // Enforce max size
  if (cache.size >= MAX_ENTRIES) {
    const oldest = cache.keys().next().value!;
    cache.delete(oldest);
  }
  cache.set(id, { data: base64Audio, createdAt: now });
}

export function getAudio(id: string): string | null {
  const entry = cache.get(id);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > TTL_MS) {
    cache.delete(id);
    return null;
  }
  return entry.data;
}
