import React from 'react';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';
import useFetch from '../utils/useFetch';
import Ticker from './Ticker';

const CryptoTickerWrapper = ({ symbol, getEndpoint }) => {
  const { responseData, errorData, isFetching, refetch } = useFetch(
    getEndpoint(symbol),
  );

  if (errorData) {
    console.error(errorData);
    return <h3>Error retrieving crypto data</h3>;
  }

  const { price, price_timestamp: priceTime } =
    responseData && !errorData
      ? responseData[0]
      : {
          price: 0,
          price_timestamp: '',
        };

  return (
    <Ticker
      isFetching={isFetching}
      symbol={symbol}
      price={parseFloat(price)}
      priceTime={priceTime ? parseISO(priceTime) : new Date()}
      refetch={refetch}
    />
  );
};

CryptoTickerWrapper.propTypes = {
  symbol: PropTypes.string.isRequired,
  getEndpoint: PropTypes.func.isRequired,
};

export default CryptoTickerWrapper;
