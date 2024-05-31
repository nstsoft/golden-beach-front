import { useState, useEffect, useCallback } from 'react';

let isLoading = false;

export const useRequest = <T>(
  requestFunction: (...args: unknown[]) => unknown,
  { immediate = true } = {},
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: unknown[]) => {
      if (!isLoading) {
        setError(null);

        try {
          const response = await requestFunction(...args);
          setData(response as T);
        } catch (err) {
          setError(err as Error);
        } finally {
          isLoading = false;
        }
      }
    },
    [requestFunction],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, error, isLoading, execute };
};
