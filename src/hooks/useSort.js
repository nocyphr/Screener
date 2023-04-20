import { useState, useMemo, useEffect } from 'react';

const sortData = (data, config) => {
  const sorted = [...data];

  if (config.key && config.direction !== 'none') {
    sorted.sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  return sorted;
};

const initialSortConfig = () => {
  const storedSortConfig = localStorage.getItem("sortConfig");
  return storedSortConfig ? JSON.parse(storedSortConfig) : { key: null, direction: 'none' };
};

const useSort = (data) => {
  const [sortConfig, setSortConfig] = useState(initialSortConfig);

  useEffect(() => {
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [sortConfig]);

  const handleHeaderClick = (columnKey) => {
    let direction = 'ascending';
    if (sortConfig.key === columnKey && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: columnKey, direction });
  };

  const sortedData = useMemo(() => {
    return sortData(data, sortConfig);
  }, [data, sortConfig]);

  return { sortedData, sortConfig, handleHeaderClick };
};

export default useSort;
