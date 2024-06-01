import { useState, useCallback } from 'react';

export const useDebounce = <T>(value: T, delay = 400): [T, (data: T) => void] => {
  const [val, setValue] = useState<T>(value);
  const [timeout, setTimeoutValue] = useState<NodeJS.Timeout>();

  const updateValue = useCallback(
    (data: T) => {
      clearTimeout(timeout);
      const timeoutValue = setTimeout(() => {
        setValue(data);
      }, delay);
      setTimeoutValue(timeoutValue);
    },
    [delay, timeout],
  );

  return [val, updateValue];
};
