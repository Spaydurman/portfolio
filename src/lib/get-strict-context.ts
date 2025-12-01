import * as React from 'react';

type ProviderProps<T> = {
  value: T;
  children?: React.ReactNode;
};

export function getStrictContext<T>(name = 'Context') {
  const ctx = React.createContext<T | undefined>(undefined);

  function useCtx(): T {
    const value = React.useContext(ctx);
    if (value === undefined) {
      throw new Error(`${name} is missing. Did you forget to wrap the tree with ${name} provider?`);
    }
    return value as T;
  }

  const Provider: React.FC<ProviderProps<T>> = ({ value, children }) => {
    return React.createElement(ctx.Provider, { value }, children);
  };

  return [Provider, useCtx] as const;
}

export default getStrictContext;
