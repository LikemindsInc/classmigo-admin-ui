import { useState, useEffect } from 'react';

export const useDebounce = <T>(initialValue: T, delay: number, queryFn:()=>void): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
      const timer = setTimeout(() => {
          setDebouncedValue(initialValue)
          queryFn()
      }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [initialValue, delay, queryFn]);

  return [debouncedValue, setDebouncedValue];
};