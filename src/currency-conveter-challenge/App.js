// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setisLoading] = useState(false);

  /*   const areFromAndToEqual = (url) => {
    // Create a URL object from the provided URL string
    const urlObject = new URL(url);

    // Get the 'from' and 'to' parameters from the URL
    const fromParam = urlObject.searchParams.get('from');
    const toParam = urlObject.searchParams.get('to');

    // Check if 'from' and 'to' are equal
    return fromParam === toParam;
  }; */

  useEffect(() => {
    const fetchAmount = async (
      amount,
      fromCurrency,
      toCurrency,
      controller,
    ) => {
      try {
        setisLoading(true);
        setError('');
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
          controller,
        );
        if (!response.ok) {
          /*           setOutput('');
          setAmount('');
          if (areFromAndToEqual(response.url)) {
            throw new Error('From and To currencies cannot be equal!');
          } */
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setOutput(data.rates[toCurrency]);
        setError('');
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setisLoading(false);
      }
    };

    if (amount === '') return;

    if (fromCurrency === toCurrency) {
      setOutput(amount);
      return; // Stop the execution of the function
    }

    const controller = new AbortController();
    fetchAmount(amount, fromCurrency, toCurrency, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type='text'
        value={amount}
        onChange={(e) => Number(setAmount(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select
        disabled={isLoading}
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>
        {isLoading
          ? 'Loading...'
          : output
          ? `${output} ${toCurrency}`
          : 'Output...'}
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
