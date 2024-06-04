import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

export const useRequest = <T,>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestFunction: (...args: any[]) => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultArgs: any = {},
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

      execute(defaultArgs);
    }
  }, [immediate, execute, defaultArgs]);

  const isLoading = useMemo(() => isLoadingRef.current, [isLoadingRef]);
  const initiated = useMemo(() => initiatedRef.current, [initiatedRef]);

  return { data, execute, error, isLoading, initiated };
};
