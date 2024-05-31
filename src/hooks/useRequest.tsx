import { useState, useCallback, useEffect, useRef } from 'react';

export const useRequest = <T,>(
  requestFunction: (...args: unknown[]) => Promise<T>,
  immediate = true,
) => {
  const initiatedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();

  const execute = useCallback(
    async (...args: unknown[]) => {
      if (!isLoadingRef.current) {
        setError(null);
        try {
          isLoadingRef.current = true;
          const response = await requestFunction(...args);
          setData(response);
        } catch (err) {
          setError(err as Error);
        } finally {
          isLoadingRef.current = false;
        }
      }
    },
    [requestFunction],
  );

  useEffect(() => {
    if (immediate && !initiatedRef.current) {
      initiatedRef.current = true;

      execute();
    }
  }, [immediate, execute]);

  return { data, execute, error, isLoading: isLoadingRef.current };
};
