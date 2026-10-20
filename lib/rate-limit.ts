type AttemptRecord = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, AttemptRecord>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function registerFailedLogin(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  const record = !current || current.resetAt <= now
    ? { count: 1, resetAt: now + WINDOW_MS }
    : { count: current.count + 1, resetAt: current.resetAt };

  attempts.set(key, record);
  return {
    blocked: record.count > MAX_ATTEMPTS,
    retryAfter: Math.ceil(Math.max(record.resetAt - now, 0) / 1000),
  };
}

export function isLoginBlocked(key: string) {
  const record = attempts.get(key);
  if (!record || record.resetAt <= Date.now()) {
    attempts.delete(key);
    return false;
  }

  return record.count >= MAX_ATTEMPTS;
}

export function clearFailedLogins(key: string) {
  attempts.delete(key);
}
