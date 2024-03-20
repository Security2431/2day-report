"useClient";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T = unknown>(key: string, initialValue?: T) {
  const [state, setState] = useState<T | undefined>();

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(key);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setState(JSON.parse(value!) ?? initialValue);
    } catch (error) {
      console.warn(error);

      window.localStorage.setItem(key, JSON.stringify(initialValue));
      setState(initialValue);
    }
  }, [initialValue, key]);

  const setValue = useCallback(
    (value: T | ((value: T | undefined) => T)) => {
      try {
        const nextState = value instanceof Function ? value(state) : value;

        if (nextState === undefined || nextState === null) {
          window.localStorage.removeItem(key);
          setState(initialValue);
        } else {
          window.localStorage.setItem(key, JSON.stringify(nextState));
          setState(nextState);
        }
      } catch (error) {
        console.warn(error);
      }
    },
    [initialValue, key, state],
  );

  return [state, setValue] as const;
}

export default useLocalStorage;
