import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(url, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error occurred');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setColumns(Object.keys(data[0]));
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, columns, loading, error };
};

export default useFetchData;
