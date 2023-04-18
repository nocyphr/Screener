import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setColumns(Object.keys(data[0]));
        setLoading(false);
      });
  }, [url]);

  return { data, columns, loading };
};

export default useFetchData;
