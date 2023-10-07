const ErrorMessage = ({ msg }) => {
  return (
    <p className='error'>
      <span role='img'>🔴</span>
      {msg}
    </p>
  );
};
export default ErrorMessage;
