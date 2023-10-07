import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener('keydown', callback);
    return () => {
      // eslint-disable-next-line no-restricted-globals
      removeEventListener('keydown', callback);
    };
  }, [action, key]);
}
