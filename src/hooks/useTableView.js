import useSort from './useSort';
import usePagination from './usePagination';

const useTableView = (data) => {
  const { sortedData, sortConfig, handleHeaderClick } = useSort(data);
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(sortedData, 10, [sortedData]);

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
