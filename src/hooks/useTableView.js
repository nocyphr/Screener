import { useState, useMemo, useEffect } from 'react';
import useSort from './useSort';

const useTableView = (data, columns) => {
  const { sortedData, sortConfig, handleHeaderClick } = useSort(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
