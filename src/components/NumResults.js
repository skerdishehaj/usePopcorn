const NumResults = ({ moviesQty }) => {
  return (
    <p className='num-results'>
      Found <strong>{moviesQty}</strong> results
    </p>
  );
};
export default NumResults;
