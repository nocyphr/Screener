// Filter utility functions
export const isGreaterThanThreshold = (item, filterType, filterThreshold) => {
  return parseFloat(item[filterType]) > parseFloat(filterThreshold);
};

export const isLessThanThreshold = (item, filterType, filterThreshold) => {
  return parseFloat(item[filterType]) < parseFloat(filterThreshold);
};

export const notIncludesFilter = (item, filterType, filterValue) => {
  return !item[filterType].toString().toLowerCase().includes(filterValue.toLowerCase());
};

export const includesFilter = (item, filterType, filterValue, columns) => {
  return (
    columns.includes(filterType) &&
    item[filterType].toString().toLowerCase().includes(filterValue.toLowerCase())
  );
};

// Applies a single filter to an item
const applyFilter = (item, filter, columns) => {
  const filterOperator = filter.value[0];
  const filterValue = filter.value.slice(1).trim();

  switch (filterOperator) {
    case '>':
      return isGreaterThanThreshold(item, filter.type, filterValue);
    case '<':
      return isLessThanThreshold(item, filter.type, filterValue);
    case '!':
      return notIncludesFilter(item, filter.type, filterValue);
    default:
      return includesFilter(item, filter.type, filter.value, columns);
  }
};

// Applies multiple filters to the dataset
export const applyFiltersToData = (data, appliedFilters, columns) => {
  return appliedFilters.reduce(
    (filteredData, filter) => filteredData.filter((item) => applyFilter(item, filter, columns)),
    data
  );
};

// Date and Time formatting utility functions
const formatDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const formatTime = (date) => {
  return `${date
    .getHours()
    .toString()
    .padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
};

// Returns a formatted timestamp
export const getDateTimeStamp = () => {
  const currentdate = new Date();
  return `${formatDate(currentdate)}_${formatTime(currentdate)}`;
};

// CSV utility functions
export const convertToCSV = (data, columns) => {
  const header = columns.join(',');
  const rows = data.map((row) =>
    columns.map((columnName) => JSON.stringify(row[columnName])).join(',')
  );
  return [header, ...rows].join('\r\n');
};

const createDownloadLink = (url, filename, document) => {
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

// Downloads CSV file
export const downloadCSV = (csv, filename, document) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  createDownloadLink(url, filename, document);
};
