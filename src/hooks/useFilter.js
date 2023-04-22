import { useState, useEffect, useCallback } from 'react';
import { applyFiltersToData } from '../utils';

const useFilter = (data, columns, onApplyFilters, initialFilter, appliedFilters) => {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter || columns[0]);
  const [filterValue, setFilterValue] = useState('');

  const handleApplyFilter = useCallback(() => {
    if (filterValue.trim() !== '') {
      const camelCaseType = selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);
      const newFilter = { type: camelCaseType, value: filterValue };

      onApplyFilters(prevAppliedFilters => {
        // Check if there is an existing filter with the same type and value
        const existingFilterIndex = prevAppliedFilters.findIndex(
          (filter) => filter.type === newFilter.type && filter.value === newFilter.value
        );

        // If the filter exists, don't add it again
        if (existingFilterIndex !== -1) {
          return prevAppliedFilters;
        }

        // Add the new filter
        return [...prevAppliedFilters, newFilter];
      });

      setFilterValue('');
    }
  }, [selectedFilter, filterValue, appliedFilters]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilter();
    }
  };

  return {
    selectedFilter,
    filterValue,
    handleFilterChange,
    handleFilterValueChange,
    handleKeyPress,
    applyFilter: handleApplyFilter,
  };
};

export default useFilter;
