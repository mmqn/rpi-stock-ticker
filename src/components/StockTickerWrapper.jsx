import React from 'react';
import PropTypes from 'prop-types';
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

  const { c: price } = responseData && !errorData ? responseData : { c: 0 };

  return (
    <Ticker
      isFetching={isFetching}
      symbol={symbol}
      price={price}
      refetch={refetch}
    />
  );
};

StockTickerWrapper.propTypes = {
  symbol: PropTypes.string.isRequired,
  getEndpoint: PropTypes.func.isRequired,
};

export default StockTickerWrapper;
