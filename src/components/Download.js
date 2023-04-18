import React from 'react';
import useDownload from '../hooks/useDownload';

const Download = ({ data, filteredSortedData = [], columns = [], filename, children }) => {
  const { handleClick } = useDownload(data, filteredSortedData, columns, filename, children);

  return (
    <button className="bg-green-600 text-gray-200 p-2 rounded" id="download-button" onClick={handleClick}>
      {children || 'Download CSV'}
    </button>
  );
};

export default Download;
