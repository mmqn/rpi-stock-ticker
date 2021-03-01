import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import AppContext from '../utils/AppContext';
import PrevPriceDescriptor from './PrevPriceDescriptor';
import PositionDescriptor from './PositionDescriptor';

const Ticker = ({ isFetching, symbol, price, refetch }) => {
  const [prevPriceInfo, setPrevPriceInfo] = useState({
    price: null,
    priceTime: null,
  });
  const [rotateDeg, setRotateDeg] = useState(0);

  const { position } = useContext(AppContext);

  const currentDateTime = new Date();

  // const priceChange =
  //   prevPriceInfo.price !== null
  //     ? parseFloat(price || 0) - prevPriceInfo.price
  //     : 0;

  // const isPriceIncreased = priceChange >= 0;

  const handleRotate = () =>
    setRotateDeg(prevState => {
      const newRotateDeg = prevState + 90;

      if (newRotateDeg > 270) return 0;

      return newRotateDeg;
    });

  const handleRefetch = () => {
    setPrevPriceInfo({ price, priceTime: currentDateTime });
    refetch();
  };

  return (
    <button
      style={{ transform: `rotate(${rotateDeg}deg)` }}
      onClick={e => (e.shiftKey ? handleRotate() : handleRefetch())}
    >
      <h3
        style={{
          paddingBottom: '10px',
          marginBottom: '10px',
          borderBottom: '1px solid #ffffff',
        }}
      >
        {currentDateTime.toDateString()}
      </h3>

      <h1>{symbol}</h1>

      {isFetching ? (
        <h3>Fetching…</h3>
      ) : (
        <>
          <h1 style={{ color: '#00ff9f' }}>${parseFloat(price).toFixed(4)}</h1>

          <h4>
            {isFetching ? '-' : format(currentDateTime, 'MMM dd yyyy hh:mm a')}
          </h4>

          {prevPriceInfo.price !== null && !position.shares && (
            <PrevPriceDescriptor
              curPrice={price}
              prevPrice={prevPriceInfo.price}
              prevPriceTime={prevPriceInfo.priceTime}
            />
          )}

          {position.shares && (
            <PositionDescriptor curPrice={price} position={position} />
          )}
        </>
      )}
    </button>
  );
};

Ticker.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  symbol: PropTypes.string,
  price: PropTypes.number,
  refetch: PropTypes.func.isRequired,
};

Ticker.defaultProps = {
  symbol: '',
  price: 0,
};

export default Ticker;
