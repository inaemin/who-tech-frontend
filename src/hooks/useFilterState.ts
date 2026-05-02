import { useState, useCallback, useLayoutEffect, useRef } from 'react';

const STORAGE_KEY = 'who-tech:filters';

function readFilters(): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeFilters(filters: Record<string, unknown>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
}

function readUrlParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

function getInitialState<T extends Record<string, unknown>>(pageKey: string, defaults: T): T {
  const stored = readFilters();
  const pageFilters = stored[pageKey] as T | undefined;
  if (pageFilters) {
    return { ...defaults, ...pageFilters };
  }
  try {
    const urlParams = readUrlParams();
    const urlFilters = Object.fromEntries(
      Object.entries(defaults).map(([key]) => {
        const value = urlParams[key];
        if (value === undefined) return [key, defaults[key]];
        if (typeof defaults[key] === 'number') return [key, Number(value)];
        if (typeof defaults[key] === 'boolean') return [key, value === 'true'];
        return [key, value];
      }),
    ) as T;
    if (Object.keys(urlParams).length > 0) {
      writeFilters({ ...stored, [pageKey]: urlFilters });
    }
    return { ...defaults, ...urlFilters };
  } catch {
    return defaults;
  }
}

export function useFilterState<T extends Record<string, unknown>>(
  pageKey: string,
  defaults: T,
): [T, (patch: Partial<T>) => void, () => string, boolean] {
  const defaultsRef = useRef(defaults);
  const [state, setState] = useState<T>(() => getInitialState(pageKey, defaultsRef.current));
  const [hydrated, setHydrated] = useState(false);

  useLayoutEffect(() => {
    setHydrated(true);
  }, []);

  const apply = useCallback(
    (patch: Partial<T>) => {
      setState((prev) => {
        const next = { ...prev, ...patch };
        const stored = readFilters();
        writeFilters({ ...stored, [pageKey]: next });
        return next;
      });
    },
    [pageKey],
  );

  const getShareUrl = useCallback(() => {
    const d = defaultsRef.current;
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (value !== d[key as keyof T] && value !== null && value !== undefined) {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return query ? `${window.location.pathname}?${query}` : window.location.pathname;
  }, [state]);

  return [state, apply, getShareUrl, hydrated];
}
