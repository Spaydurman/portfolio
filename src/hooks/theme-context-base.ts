import React from 'react';
import type { ThemeSelection, Resolved } from './theme-context';

export type ThemeContextValue = {
  theme: ThemeSelection;
  resolvedTheme: Resolved;
  setTheme: (theme: ThemeSelection) => void;
};

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);
