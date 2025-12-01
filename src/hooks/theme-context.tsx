import React from 'react';
import { ThemeContext } from './theme-context-base';
export type ThemeSelection = 'light' | 'dark' | 'system';
export type Resolved = 'light' | 'dark';
export type ThemeContextValue = {
  theme: ThemeSelection;
  resolvedTheme: Resolved;
  setTheme: (theme: ThemeSelection) => void;
};

const STORAGE_KEY = 'theme';

function getSystemResolved(): Resolved {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyHtmlClass(resolved: Resolved) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeSelection>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeSelection | null;
      return stored ?? 'system';
    } catch {
      return 'system';
    }
  });

  const resolvedTheme: Resolved = theme === 'system' ? getSystemResolved() : theme;

  React.useEffect(() => {
    // Persist selection
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore persistence errors
    }
    // Apply HTML class
    applyHtmlClass(resolvedTheme);
  }, [theme, resolvedTheme]);

  // Keep in sync with system changes when on 'system'
  React.useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyHtmlClass(getSystemResolved());
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = React.useCallback((next: ThemeSelection) => {
    setThemeState(next);
  }, []);

  const value: ThemeContextValue = { theme, resolvedTheme, setTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
// Intentionally export only the Provider component from this file to
// satisfy fast-refresh constraints. Hooks live in `use-theme.ts`.
