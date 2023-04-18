import { useState, useMemo } from 'react';

const useSort = (data) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  const handleHeaderClick = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = useMemo(() => {
    const sorted = [...data];
    if (sortConfig.key && sortConfig.direction !== 'none') {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [data, sortConfig]);

  return { sortedData, sortConfig, handleHeaderClick };
};

export default useSort;
