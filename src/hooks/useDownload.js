import { useCallback } from 'react';
import { convertToCSV, downloadCSV, getDateTimeStamp } from '../utils';

const useDownload = (data, filteredSortedData = [], columns = [], filename, sortColumn, sortOrder) => {
  const handleClick = useCallback(() => {
    const dateTimeStamp = getDateTimeStamp();
    const customFilename = filename ? `${filename}_${dateTimeStamp}.csv` : `data_${dateTimeStamp}.csv`;

    const sortedData = [...filteredSortedData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
    const csv = convertToCSV(sortedData, columns);

    downloadCSV(csv, customFilename, document);
  }, [filteredSortedData, columns, filename, sortColumn, sortOrder]);

  return { handleClick };
};

export default useDownload;
