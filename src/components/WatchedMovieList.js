import WatchedMovie from './WatchedMovie';

const WatchedMovieList = ({ watched, onDeleteWatchedMovie }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
};
export default WatchedMovieList;
