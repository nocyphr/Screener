import React from 'react';
import useFilter from '../hooks/useFilter';

const Filter = ({ data, columns, onApplyFilters, initialFilter, appliedFilters }) => {
  const {
    selectedFilter,
    filterValue,
    handleFilterChange,
    handleFilterValueChange,
    handleKeyPress,
    applyFilter,
  } = useFilter(data, columns, onApplyFilters, initialFilter, appliedFilters);

  return (
    <div className="my-4">
      <div className="flex items-center" id="filter-section">
        <select
          className="bg-gray-700 text-gray-400 p-2 rounded mr-2"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          {columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="bg-gray-700 text-gray-400 p-2 rounded mr-2"
          placeholder={`Filter by ${selectedFilter}`}
          value={filterValue}
          onChange={handleFilterValueChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-gray-600 text-gray-200 p-2 rounded"
          onClick={applyFilter}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
