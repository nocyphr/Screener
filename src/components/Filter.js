import React, { useState } from 'react';
import {
  applyFilters,
  handleApplyFilter,
  handleRemoveFilter,
  handleClearFilters,
} from '../helpers/FilterLogic';

const Filter = ({ data, columns, onApplyFilters, initialFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter || columns[0]);
  const [filterValue, setFilterValue] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applyFilter();
    }
  };

  const applyFilter = handleApplyFilter(
    selectedFilter,
    filterValue,
    appliedFilters,
    setAppliedFilters,
    setFilterValue,
    data,
    onApplyFilters,
    columns
  );

  const removeFilter = handleRemoveFilter(
    appliedFilters,
    setAppliedFilters,
    data,
    onApplyFilters,
    columns
  );

  const clearFilters = handleClearFilters(setAppliedFilters, onApplyFilters, data);

  return (
    <div className="my-4">
      <div className="flex items-center">
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
      <div className="mt-4">
        <div className="flex flex-wrap">
          {appliedFilters.map((filter, index) => (
            <div key={index} className="bg-gray-700 rounded p-2 m-1">
              <span className="text-gray-400 mr-1">{`${filter.type}: ${filter.value}`}</span>
              <button
                className="text-red-600"
                onClick={() => removeFilter(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        {appliedFilters.length > 0 && (
          <div className="mt-4">
            <button
              className="bg-red-600 text-gray-200 p-2 rounded"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Filter;
