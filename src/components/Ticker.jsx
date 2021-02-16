import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const Ticker = ({ isFetching, symbol, price, priceTime, refetch }) => {
  const [prevPriceInfo, setPrevPriceInfo] = useState({
    price: null,
    priceTime: null,
  });
  const [rotateDeg, setRotateDeg] = useState(0);

  const priceChange =
    prevPriceInfo.price !== null
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
      <h3
        style={{
          paddingBottom: '10px',
          marginBottom: '10px',
          borderBottom: '1px solid #ffffff',
        }}
      >
        {new Date().toDateString()}
      </h3>

      <h1>{symbol}</h1>

      <h1 style={{ color: isPriceIncreased ? '#00ff9f' : '#ff3000' }}>
        ${parseFloat(price).toFixed(4)}
      </h1>

      <h4>{isFetching ? '-' : format(priceTime, 'MMM dd yyyy hh:mm a')}</h4>

      {prevPriceInfo.price !== null && (
        <>
          <h5
            style={{
              paddingTop: '10px',
              marginTop: '10px',
              borderTop: '1px solid #ffffff',
              color: isPriceIncreased ? '#00ff9f' : '#ff3000',
            }}
          >
            {isPriceIncreased ? '+$' : '-$'}
            {priceChange.toFixed(4)}
          </h5>

          <h5>{format(prevPriceInfo.priceTime, 'MMM dd yyyy hh:mm a')}</h5>
        </>
      )}
    </button>
  );
};

Ticker.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  symbol: PropTypes.string,
  price: PropTypes.number,
  priceTime: PropTypes.instanceOf(Date),
  refetch: PropTypes.func.isRequired,
};

Ticker.defaultProps = {
  symbol: '',
  price: 0,
  priceTime: '',
};

export default Ticker;
