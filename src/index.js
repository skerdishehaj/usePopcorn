import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from "./App";
// import StarRating from "./components/StarRating";
import App from './App';

/* const Test = () => {
  const [rate, setRate] = useState(0);

  return (
    <div>
      <StarRating
        maxRating={5}
        onSetRating={setRate}
        defaultRating={3}
        messages={["Terrible!", "Bad!", "Okay!", "Good!", "Amazing!"]}
        color="#FF0000"
        size={5}
      />
      <p>You rated {rate}</p>
    </div>
  );
}; */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

