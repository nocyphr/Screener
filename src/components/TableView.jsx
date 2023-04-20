import React from 'react';
import useTableView from '../hooks/useTableView';

const TableView = ({ data, columns, onSortedDataChange }) => {
  const {
    sortConfig,
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    handleHeaderClick,
    handlePageChange,
    handleItemsPerPageChange,
  } = useTableView(data);

  React.useEffect(() => {
    if (onSortedDataChange) {
      onSortedDataChange(paginatedData);
    }
  }, [paginatedData, onSortedDataChange]);

  return (
    <>
      <table className="w-full text-gray-400 mt-8">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left cursor-pointer"
                onClick={() => handleHeaderClick(column)}
              >
                {column}
                {sortConfig.key === column && (
                  <span className="inline-block ml-1">
                    {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} className="border-t border-gray-600">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={colIndex === 0 ? 'py-2' : ''}>
                  {item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4">
        <span className="text-gray-400 mr-2">Items per page:</span>
        <select
          className="bg-gray-700 text-gray-400 p-2 rounded mr-4"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <button
          className="bg-gray-600 text-gray-200 p-2 rounded mr-1"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-gray-400 mr-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-600 text-gray-200 p-2 rounded"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TableView;
