export const applyFilters = (data, appliedFilters, columns) => {
    return data.filter((item) => {
      return appliedFilters.every((filter) => {
        const operator = filter.value[0];
        const filterValue = filter.value.slice(1).trim();
  
        switch (operator) {
          case '>':
            return parseFloat(item[filter.type]) > parseFloat(filterValue);
          case '<':
            return parseFloat(item[filter.type]) < parseFloat(filterValue);
          case '!':
            const value = isNaN(parseFloat(filterValue))
              ? filterValue
              : parseFloat(filterValue);
            return item[filter.type].toString().toLowerCase() !== value.toString().toLowerCase();
          default:
            if (columns.includes(filter.type)) {
              return item[filter.type].toString().toLowerCase().includes(filter.value.toLowerCase());
            } else {
              return true;
            }
        }
      });
    });
  };
  
  export const handleApplyFilter = (
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
  
  export const handleRemoveFilter = (appliedFilters, setAppliedFilters, data, onApplyFilters, columns) => (
    index
  ) => {
    const newAppliedFilters = appliedFilters.filter(
      (_, filterIndex) => filterIndex !== index
    );
    setAppliedFilters(newAppliedFilters);
  
    const newData = applyFilters(data, newAppliedFilters, columns);
    onApplyFilters(newData);
  };
  
  export const handleClearFilters = (setAppliedFilters, onApplyFilters, data) => () => {
    setAppliedFilters([]);
    onApplyFilters(data);
  };
  