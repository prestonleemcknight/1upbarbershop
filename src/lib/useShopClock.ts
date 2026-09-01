import { useSyncExternalStore } from 'react';
import { getOpenStatus, type OpenStatus } from './hours';

/**
 * Client-only, time-dependent values (is the shop open right now, what year is it)
 * read through an external store rather than an effect, so the prerendered HTML
 * hydrates cleanly and no cascading render is triggered on mount.
 */

const listeners = new Set<() => void>();
let timer: number | undefined;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (timer === undefined) {
    timer = window.setInterval(() => listeners.forEach((l) => l()), 60_000);
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

// useSyncExternalStore compares snapshots by reference, so cache until the value changes.
let cached: OpenStatus | null = null;
let cachedKey = '';

function getStatusSnapshot(): OpenStatus {
  const next = getOpenStatus();
  const key = `${next.today?.dayIndex}|${next.isOpen}|${next.label}`;
  if (key !== cachedKey) {
    cachedKey = key;
    cached = next;
  }
  return cached as OpenStatus;
}

/** Null until hydration finishes, so the server and client agree on the first paint. */
export function useShopStatus(): OpenStatus | null {
  return useSyncExternalStore(subscribe, getStatusSnapshot, () => null);
}

/** Null on the server; the visitor's current year once hydrated. */
export function useCurrentYear(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
}
