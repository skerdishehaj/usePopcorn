import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useState } from 'react';
import NavBar from './components/layouts/NavBar';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/layouts/Main';
import Box from './components/layouts/Box';
import Loader from './components/Loader';
import MovieDetails from './components/MovieDetails';
import MovieList from './components/MovieList';
import ErrorMessage from './components/ErrorMessage';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], 'movie');
  const { movies, isLoading, error } = useMovies(query);

  function handleDeleteWatched(id) {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== id),
    );
  }

  function handleAddWatched(movie) {
    setWatched((prevWatched) => [...prevWatched, movie]);
  }

  function handleSelectMovie(id) {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <>
      <NavBar>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <NumResults moviesQty={movies.length} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage msg={error} />
          ) : (
            <MovieList
              onSelectMovie={handleSelectMovie}
              movies={movies}
            />
          )}
          {/* {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage msg={error} />} */}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                onDeleteWatchedMovie={handleDeleteWatched}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

