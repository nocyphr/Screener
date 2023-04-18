import { useState } from 'react';
import {
  applyFilters,
  handleApplyFilter,
  handleRemoveFilter,
  handleClearFilters,
} from '../helpers/FilterLogic';

const useFilter = (data, columns, onApplyFilters, initialFilter) => {
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

  return {
    selectedFilter,
    filterValue,
    appliedFilters,
    handleFilterChange,
    handleFilterValueChange,
    handleKeyPress,
    applyFilter,
    removeFilter,
    clearFilters,
  };
};

export default useFilter;
