import React, { useState } from 'react';

const TableView = ({ data, columns }) => {
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

  const sortedData = React.useMemo(() => {
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

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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
