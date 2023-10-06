import { useEffect, useState } from 'react';

const KEY = 'a5c707e8';
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  async function fetchMovies(query, controller) {
    try {
      setIsLoading(true);
      setError(''); // reset error
      const res = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
        controller,
      );

      if (!res.ok)
        throw new Error(
          `Something went wrong with fetching movies: ${res.status}`,
        );

      const moviesData = await res.json();
      if (moviesData.Response === 'False')
        throw new Error(`${moviesData.Error}`);

      setMovies(moviesData.Search);
      setError('');
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    fetchMovies(query, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
