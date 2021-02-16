import React, { useState } from 'react';
import useFetch from './useFetch';

const SYMBOL = 'DOGE';

const DEFAULT_DATA = { symbol: SYMBOL, price: 0 };

const App = () => {
  const [prevPriceInfo, setPrevPriceInfo] = useState({
    price: null,
    priceTime: null,
  });
  const [rotateDeg, setRotateDeg] = useState(0);

  const { responseData, isFetching, refetch } = useFetch(
    `https://api.nomics.com/v1/currencies/ticker?key=${process.env.REACT_APP_NOMICS_API_KEY}&ids=${SYMBOL}`,
  );

  const currentDate = new Date();

  const { symbol, price } = responseData ? responseData[0] : DEFAULT_DATA;

  const priceTime = new Date(
    responseData ? responseData[0].price_timestamp : null,
  ).toLocaleTimeString();

  const priceChange =
    responseData && prevPriceInfo.price !== null
      ? parseFloat(price || 0) - prevPriceInfo.price
      : 0;

  const isPriceIncreased = priceChange >= 0;

  const handleRefetch = e => {
    if (e.shiftKey) {
      setRotateDeg(prevState => {
        const newRotateDeg = prevState + 90;

        if (newRotateDeg > 270) return 0;

        return newRotateDeg;
      });
    } else {
      setPrevPriceInfo({ price, priceTime });
      refetch();
    }
  };

  return (
    <button
      style={{ transform: `rotate(${rotateDeg}deg)` }}
      onClick={handleRefetch}
    >
      <h4
        style={{
          paddingBottom: '10px',
          marginBottom: '10px',
          borderBottom: '1px solid #ffffff',
        }}
      >
        {currentDate.toDateString()}
      </h4>

      <h1>{symbol}</h1>

      <h1 style={{ color: isPriceIncreased ? '#00ff9f' : '#ff3000' }}>
        ${parseFloat(price).toFixed(4)}
      </h1>

      <h4>{isFetching ? '-' : priceTime}</h4>

      {prevPriceInfo.price !== null && (
        <>
          <h4
            style={{
              paddingTop: '10px',
              marginTop: '10px',
              borderTop: '1px solid #ffffff',
              color: isPriceIncreased ? '#00ff9f' : '#ff3000',
            }}
          >
            {isPriceIncreased ? '+$' : '-$'}
            {priceChange.toFixed(4)}
          </h4>

          <h4>{prevPriceInfo.priceTime}</h4>
        </>
      )}
    </button>
  );
};

export default App;
