import { useEffect, useState } from "react";

const useDebouncer = (callback: () => void, delay: number) => {
  const [debouncedCallback, setDebouncedCallback] = useState<() => void>(
    () => undefined,
  );

  useEffect(() => {
    // Update the debounced callback after the delay has passed
    const timer = setTimeout(() => {
      setDebouncedCallback(callback);
    }, delay);

    // Clear the timer and invoke the debounced callback if it changes
    return () => {
      clearTimeout(timer);
      if (debouncedCallback) {
        debouncedCallback();
      }
    };
  }, [callback, debouncedCallback, delay]);

  return debouncedCallback;
};

export default useDebouncer;
