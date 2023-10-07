import Movie from './Movie';

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie
          onSelectMovie={onSelectMovie}
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
};
export default MovieList;
