function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date)
  );
}

function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '')
  );
}

/**
 * Deeply merges a Keystatic value over a fallback.
 *
 * Keystatic's reader returns `''` for unset text fields and `[]` for unset
 * arrays, so "missing" is detected as null/undefined/empty-string (and empty
 * arrays when a non-empty default exists). This guarantees the UI never shows
 * blank gaps when a field has not been filled in yet.
 */
export function withFallback<T>(value: unknown, fallback: T): T {
  if (isEmpty(value)) return fallback;

  if (Array.isArray(value)) {
    if (value.length === 0 && Array.isArray(fallback) && fallback.length > 0) {
      return fallback;
    }
    return value as T;
  }

  if (isPlainObject(value) && isPlainObject(fallback)) {
    const merged: Record<string, unknown> = { ...fallback };
    for (const key of Object.keys(value)) {
      merged[key] = withFallback(
        value[key],
        (fallback as Record<string, unknown>)[key],
      );
    }
    return merged as T;
  }

  return value as T;
}
