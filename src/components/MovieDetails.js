import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';
import { useKey } from '../hooks/useKey';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

const KEY = 'a5c707e8';

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(null);
  const isWatched = watched.some((movie) => movie.imdbID === selectedId);

  const ratingClicked = useRef(0);

  const userRatingFromWatched = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Plot: plot,
    Director: director,
    Released: released,
    Genre: genre,
    Actors: actors,
  } = movie || {};

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ')[0]),
      userRating,
      ratingClicked: ratingClicked.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  async function fetchMovieDetails(id) {
    try {
      setIsLoading(true);
      setError(''); // reset error
      const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${KEY}`);

      if (!res.ok)
        throw new Error(
          `Something went wrong with fetching movie details: ${res.status}`,
        );

      const movieData = await res.json();
      if (movieData.Response === 'False') throw new Error(`${movieData.Error}`);

      setMovie(movieData);
      setError('');
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchMovieDetails(selectedId);
  }, [selectedId]);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
    // The clean up runs after the component has been unmounted AND after each re-render, so how does the function knows the title
    // and does not return undefined?
    // This happens due to Closures, the time the function was created the title variable had that sepcific value.
    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  useKey('Escape', onCloseMovie);

  useEffect(() => {
    if (userRating === null) return;
    ratingClicked.current++;
  }, [userRating]);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage msg={error} />
      ) : (
        <>
          <header>
            <button
              className='btn-back'
              onClick={onCloseMovie}
            >
              &larr;
            </button>
            <img
              src={poster}
              alt={`Poster of ${title} movie.`}
            />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={2.5}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className='btn-add'
                      onClick={handleAdd}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {userRatingFromWatched} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
