import { useEffect, useState } from "react";
import {
  tempMovieData,
  tempWatchedData,
  KEY,
  NavBar,
  Search,
  NumResults,
  Main,
  Box,
  WatchedSummary,
  WatchedMovieList,
} from "./App-v1";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function getMovies(query) {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=${KEY}`
      );

      if (!res.ok)
        throw new Error(
          `Something went wrong with fetching movies: ${res.status}`
        );

      const moviesData = await res.json();
      if (moviesData.Response === "False")
        throw new Error(`${moviesData.Error}`);

      setMovies(moviesData.Search);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMovies("Matrix");
  }, []);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults moviesQty={movies.length} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage msg={error} />
            ) : (
              <MovieList movies={movies} />
            )} */}
          {/* {isLoading && <Loader />}
            {!isLoading && !error && <MovieList movies={movies} />}
            {error && <ErrorMessage msg={error} />} */}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
