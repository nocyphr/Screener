import { useState, useCallback } from 'react';
import { applyFiltersToData } from '../utils';

const useFilter = (data, columns, onApplyFilters, initialFilter) => {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter || columns[0]);
  const [filterValue, setFilterValue] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);

  const handleApplyFilter = useCallback(() => {
    if (filterValue.trim() !== '') {
      const camelCaseType = selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);
      const newFilter = { type: camelCaseType, value: filterValue };
      const newAppliedFilters = [...appliedFilters, newFilter];
      setAppliedFilters(newAppliedFilters);
      setFilterValue('');

      const newData = applyFiltersToData(data, newAppliedFilters, columns);
      onApplyFilters(newData);
    }
  }, [selectedFilter, filterValue, appliedFilters, data, onApplyFilters, columns]);

  const handleRemoveFilter = useCallback(
    (index) => {
      const newAppliedFilters = appliedFilters.filter(
        (_, filterIndex) => filterIndex !== index
      );
      setAppliedFilters(newAppliedFilters);

      const newData = applyFiltersToData(data, newAppliedFilters, columns);
      onApplyFilters(newData);
    },
    [appliedFilters, data, onApplyFilters, columns]
  );

  const handleClearFilters = useCallback(() => {
    setAppliedFilters([]);
    onApplyFilters(data);
  }, [data, onApplyFilters]);

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
    appliedFilters,
    handleFilterChange,
    handleFilterValueChange,
    handleKeyPress,
    applyFilter: handleApplyFilter,
    removeFilter: handleRemoveFilter,
    clearFilters: handleClearFilters,
  };
};

export default useFilter;
