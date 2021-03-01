import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [responseData, setResponseData] = useState(undefined);
  const [errorData, setErrorData] = useState(undefined);
  const [refetchCounter, setRefetchCounter] = useState(0);

  useEffect(() => {
    // Resets data on refetch
    setResponseData(undefined);
    setErrorData(undefined);

    if (url) {
      fetch(url, options)
        .then(response => response.json())
        .then(data => setResponseData(data))
        .catch(error => setErrorData(error));
    }
  }, [url, options, refetchCounter]);

  return {
    responseData,
    errorData,
    isFetching: !(responseData !== undefined || errorData !== undefined),
    refetch: () => setRefetchCounter(prevState => prevState + 1),
  };
};

export default useFetch;
