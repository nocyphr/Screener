import { useState } from 'react';

const useFilter = (data, columns, onApplyFilters, initialFilter) => {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter || columns[0]);
  const [filterValue, setFilterValue] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);

  const applyFilters = (data, appliedFilters, columns) => {
    return appliedFilters.reduce((filteredData, filter) => {
      return filteredData.filter((item) => {
        const operator = filter.value[0];
        const filterValue = filter.value.slice(1).trim();

        switch (operator) {
          case '>':
            return parseFloat(item[filter.type]) > parseFloat(filterValue);
          case '<':
            return parseFloat(item[filter.type]) < parseFloat(filterValue);
          case '!':
            return !item[filter.type].toString().toLowerCase().includes(filterValue.toLowerCase());
          default:
            if (columns.includes(filter.type)) {
              return item[filter.type].toString().toLowerCase().includes(filter.value.toLowerCase());
            } else {
              return true;
            }
        }
      });
    }, data);
  };

  const handleApplyFilter = (
    selectedFilter,
    filterValue,
    appliedFilters,
    setAppliedFilters,
    setFilterValue,
    data,
    onApplyFilters,
    columns
  ) => () => {
    if (filterValue.trim() !== '') {
      const camelCaseType = selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);
      const newFilter = { type: camelCaseType, value: filterValue };
      const newAppliedFilters = [...appliedFilters, newFilter];
      setAppliedFilters(newAppliedFilters);
      setFilterValue('');

      const newData = applyFilters(data, newAppliedFilters, columns);
      onApplyFilters(newData);
    }
  };

  const handleRemoveFilter = (appliedFilters, setAppliedFilters, data, onApplyFilters, columns) => (
    index
  ) => {
    const newAppliedFilters = appliedFilters.filter(
      (_, filterIndex) => filterIndex !== index
    );
    setAppliedFilters(newAppliedFilters);

    const newData = applyFilters(data, newAppliedFilters, columns);
    onApplyFilters(newData);
  };

  const handleClearFilters = (setAppliedFilters, onApplyFilters, data) => () => {
    setAppliedFilters([]);
    onApplyFilters(data);
  };

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
