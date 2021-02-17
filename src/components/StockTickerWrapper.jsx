import React from 'react';
import PropTypes from 'prop-types';
// import { toDate } from 'date-fns';
import useFetch from '../utils/useFetch';
import Ticker from './Ticker';

const StockTickerWrapper = ({ symbol, getEndpoint }) => {
  const { responseData, errorData, isFetching, refetch } = useFetch(
    getEndpoint(symbol),
  );

  if (errorData) {
    console.error(errorData);
    return <h3>Error retrieving stock data</h3>;
  }

  // const { c: price, t: priceTime } =
  //   responseData && !errorData ? responseData : { c: 0, t: 0 };

  const { c: price } = responseData && !errorData ? responseData : { c: 0 };

  return (
    <Ticker
      isFetching={isFetching}
      symbol={symbol}
      price={price}
      // priceTime={toDate(parseInt(`${priceTime}000`, 10))}
      refetch={refetch}
    />
  );
};

StockTickerWrapper.propTypes = {
  symbol: PropTypes.string.isRequired,
  getEndpoint: PropTypes.func.isRequired,
};

export default StockTickerWrapper;
