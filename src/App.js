import React from 'react';
import useFetch from './utils/useFetch';
import StockTicker from './components/StockTickerWrapper';
import CryptoTicker from './components/CryptoTickerWrapper';

// TODO Calculate equity & profit using config endpoint

const CONFIG_ENDPOINT =
  'https://personal-mmqn-default-rtdb.firebaseio.com/rpi-stock-ticker.json';
const GET_FINNHUB_ENDPOINT = symbol =>
  `https://finnhub.io/api/v1/quote?token=${process.env.REACT_APP_FINNHUB_API_KEY}&symbol=${symbol}`;
const GET_NOMICS_ENDPOINT = symbol =>
  `https://api.nomics.com/v1/currencies/ticker?key=${process.env.REACT_APP_NOMICS_API_KEY}&ids=${symbol}`;

const tickers = {
  stock: StockTicker,
  crypto: CryptoTicker,
};

const endpointGetters = {
  stock: GET_FINNHUB_ENDPOINT,
  crypto: GET_NOMICS_ENDPOINT,
};

const App = () => {
  const { responseData, errorData, isFetching } = useFetch(CONFIG_ENDPOINT);

  if (errorData) {
    console.error(errorData);
    return <h3>Error retrieving configuration</h3>;
  }

  const { symbol, type } =
    responseData && !errorData ? responseData : { symbol: '', type: '' };

  const Ticker = tickers[type];
  const getEndpoint = endpointGetters[type];

  return isFetching ? (
    'Initializing…'
  ) : (
    <Ticker symbol={symbol} getEndpoint={getEndpoint} />
  );
};

export default App;
