import { useState, useMemo, useEffect } from 'react';

const useTableView = (data, columns) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedData.length / itemsPerPage);
  }, [sortedData, itemsPerPage]);

  return {
    sortConfig,
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    handleHeaderClick,
    handlePageChange,
    handleItemsPerPageChange,
  };
};

export default useTableView;
