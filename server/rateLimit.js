/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * Good enough for a single-process demo. If this ever runs on more than one
 * instance, move the counters to Redis or Postgres — per-process counters
 * silently multiply the real limit by the instance count.
 */
export function rateLimit({ windowMs = 60_000, max = 12 } = {}) {
  /** @type {Map<string, {count: number, resetAt: number}>} */
  const hits = new Map();

  // Bound memory: drop expired buckets on a timer rather than on every request.
  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of hits) {
      if (bucket.resetAt <= now) hits.delete(key);
    }
  }, windowMs);
  sweep.unref?.();

  return function middleware(req, res, next) {
    const key = req.ip || "unknown";
    const now = Date.now();
    let bucket = hits.get(key);

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      hits.set(key, bucket);
    }

    bucket.count += 1;

    if (bucket.count > max) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      res.set("Retry-After", String(retryAfter));
      return res.status(429).json({
        error: `That's a lot of questions at once. Try again in ${retryAfter}s.`,
      });
    }

    next();
  };
}
