import React from 'react';

const AppliedFilters = ({ appliedFilters, removeFilter, clearFilters }) => {
  return (
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
  );
};

export default AppliedFilters;
