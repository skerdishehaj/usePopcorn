import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState = [], key = 'movie') {
  const [watched, setWatched] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue
      ? JSON.parse(localStorageValue)?.concat(initialState)
      : initialState;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(watched));
  }, [watched, key]);
  return [watched, setWatched];
}
