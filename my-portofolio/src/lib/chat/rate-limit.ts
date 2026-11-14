interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 15;
const MAX_TRACKED_KEYS = 1000;

const buckets = new Map<string, RateLimitBucket>();

function pruneExpiredBuckets(now: number) {
  if (buckets.size < MAX_TRACKED_KEYS) return;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function getClientIdentifier(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "anonymous";
}

/**
 * Fixed-window per-IP rate limiter to protect Gemini API quota against bursts and bot abuse.
 */
export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      retryAfterSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - existing.count,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

