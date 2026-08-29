import { Injectable } from '@angular/core';

export enum CacheDuration {
  SHORT = 5 * 60 * 1000,
  MEDIUM = 30 * 60 * 1000,
  LONG = 24 * 60 * 60 * 1000,
}

interface CacheEntry<T> {
  version: number;
  value: T;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly CACHE_VERSION = 1;
  private readonly PREFIX = 'omnirent:cache:';

  get<T>(key: string): T | undefined {
    const storageKey = this.getStorageKey(key);
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      return undefined;
    }

    try {
      const entry = JSON.parse(raw) as CacheEntry<T>;

      if (entry.version !== this.CACHE_VERSION) {
        this.remove(key);
        return undefined;
      }

      if (Date.now() >= entry.expiresAt) {
        this.remove(key);
        return undefined;
      }

      return entry.value;
    } catch {
      this.remove(key);
      return undefined;
    }
  }

  set<T>(key: string, value: T, duration: CacheDuration): void {
    const entry: CacheEntry<T> = {
      version: this.CACHE_VERSION,
      value,
      expiresAt: Date.now() + duration,
    };

    localStorage.setItem(this.getStorageKey(key), JSON.stringify(entry));
  }

  remove(key: string): void {
    localStorage.removeItem(this.getStorageKey(key));
  }

  clear(): void {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key?.startsWith(this.PREFIX)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  private getStorageKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }
}
