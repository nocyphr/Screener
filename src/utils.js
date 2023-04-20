const isGreaterThanThreshold = (item, filterType, filterThreshold) =>
  parseFloat(item[filterType]) > parseFloat(filterThreshold);

const isLessThanThreshold = (item, filterType, filterThreshold) =>
  parseFloat(item[filterType]) < parseFloat(filterThreshold);

const notIncludesFilter = (item, filterType, filterValue) =>
  !item[filterType].toString().toLowerCase().includes(filterValue.toLowerCase());

const includesFilter = (item, filterType, filterValue, columns) =>
  columns.includes(filterType) &&
  item[filterType].toString().toLowerCase().includes(filterValue.toLowerCase());

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

export const applyFiltersToData = (data, appliedFilters, columns) => {
  return appliedFilters.reduce(
    (filteredData, filter) => filteredData.filter((item) => applyFilter(item, filter, columns)),
    data
  );
};

const formatDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const formatTime = (date) => {
  return `${date
    .getHours()
    .toString()
    .padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
};

export const getDateTimeStamp = () => {
  const currentdate = new Date();
  return `${formatDate(currentdate)}_${formatTime(currentdate)}`;
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
