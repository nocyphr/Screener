export const applyFiltersToData = (data, appliedFilters, columns) => {
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

export const convertToCSV = (data, columns) => {
  const header = columns.join(',');
  const rows = data.map((row) =>
    columns.map((columnName) => JSON.stringify(row[columnName])).join(',')
  );
  return [header, ...rows].join('\r\n');
};

export const downloadCSV = (csv, filename) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getDateTimeStamp = () => {
  const currentdate = new Date();
  const datetime = `${currentdate.getFullYear()}-${(currentdate.getMonth()+1).toString().padStart(2, '0')}-${currentdate.getDate().toString().padStart(2, '0')}_${currentdate.getHours().toString().padStart(2, '0')}-${currentdate.getMinutes().toString().padStart(2, '0')}-${currentdate.getSeconds().toString().padStart(2, '0')}`;
  return datetime;
};
