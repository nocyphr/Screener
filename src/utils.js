// Filter utility functions
export const isValueWithinThreshold = (item, filterType, filterThreshold, operator) => {
  const value = parseFloat(item[filterType]);
  const threshold = parseFloat(filterThreshold);

  return operator === '>' ? value > threshold : value < threshold;
};

export const isValueGreaterThanThreshold = (item, filterType, filterThreshold) => {
  return isValueWithinThreshold(item, filterType, filterThreshold, '>');
};

export const isValueLessThanThreshold = (item, filterType, filterThreshold) => {
  return isValueWithinThreshold(item, filterType, filterThreshold, '<');
};

export const filterIncludesValue = (item, filterType, filterValue, shouldInclude) => {
  const includesValue = item[filterType].toString().toLowerCase().includes(filterValue.toLowerCase());
  return shouldInclude ? includesValue : !includesValue;
};

const applyFilter = (item, filter) => {
  const operator = filter.value[0];
  const value = filter.value.slice(1).trim();

  switch (operator) {
    case '>':
      return isValueGreaterThanThreshold(item, filter.type, value);
    case '<':
      return isValueLessThanThreshold(item, filter.type, value);
    case '!':
      return filterIncludesValue(item, filter.type, value, false);
    default:
      return filterIncludesValue(item, filter.type, filter.value, true);
  }
};

export const applyFiltersToData = (data, appliedFilters, columns) => {
  return appliedFilters.reduce(
    (filteredData, filter) => filteredData.filter((item) => applyFilter(item, filter, columns)),
    data
  );
};

// Date and Time formatting utility functions
const formatDate = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const formatTime = (date) => {
  return `${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
};

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

export const downloadCSV = (csv, filename, document) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  createDownloadLink(url, filename, document);
};
