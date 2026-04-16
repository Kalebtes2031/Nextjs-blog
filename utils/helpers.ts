/**
 * General helper functions including Caching with TTL support.
 */

// --- CACHING HELPERS ---

interface CacheItem<T> {
  data: T;
  expiry: number;
}

export const setCache = <T>(key: string, data: T, ttlMs: number = 3600000): void => {
  if (typeof window === "undefined") return;

  const item: CacheItem<T> = {
    data,
    expiry: Date.now() + ttlMs,
  };

  localStorage.setItem(`cache_${key}`, JSON.stringify(item));
};

export const getCache = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;

  const itemStr = localStorage.getItem(`cache_${key}`);
  if (!itemStr) return null;

  try {
    const item: CacheItem<T> = JSON.parse(itemStr);
    
    if (Date.now() > item.expiry) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
    
    return item.data;
  } catch (error) {
    localStorage.removeItem(`cache_${key}`);
    return null;
  }
};

export const clearCache = (key: string): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`cache_${key}`);
};

// --- FORMATTING HELPERS ---

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};
