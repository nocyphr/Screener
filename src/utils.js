const applyFilter = (item, filter, columns) => {
  const comparisonOperator = filter.value[0];
  const filterThreshold = filter.value.slice(1).trim();

  switch (comparisonOperator) {
    case '>':
      return parseFloat(item[filter.type]) > parseFloat(filterThreshold);
    case '<':
      return parseFloat(item[filter.type]) < parseFloat(filterThreshold);
    case '!':
      return !item[filter.type].toString().toLowerCase().includes(filterThreshold.toLowerCase());
    default:
      if (columns.includes(filter.type)) {
        return item[filter.type].toString().toLowerCase().includes(filter.value.toLowerCase());
      } else {
        return true;
      }
  }
};

export const applyFiltersToData = (data, appliedFilters, columns) => {
  return appliedFilters.reduce(
    (filteredData, filter) => filteredData.filter((item) => applyFilter(item, filter, columns)),
    data
  );
};

export const convertToCSV = (data, columns) => {
  const header = columns.join(',');
  const rows = data.map((row) =>
    columns.map((columnName) => JSON.stringify(row[columnName])).join(',')
  );
  return [header, ...rows].join('\r\n');
};

export const createDownloadLink = (url, filename, document) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
};

export const downloadCSV = (csv, filename, document) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  createDownloadLink(url, filename, document);
};


export const getDateTimeStamp = () => {
  const currentdate = new Date();
  const datetime = `${currentdate.getFullYear()}-${(currentdate.getMonth()+1).toString().padStart(2, '0')}-${currentdate.getDate().toString().padStart(2, '0')}_${currentdate.getHours().toString().padStart(2, '0')}-${currentdate.getMinutes().toString().padStart(2, '0')}-${currentdate.getSeconds().toString().padStart(2, '0')}`;
  return datetime;
};
