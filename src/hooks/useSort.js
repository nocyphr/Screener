import { useState, useMemo } from 'react';

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

const useSort = (data) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

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