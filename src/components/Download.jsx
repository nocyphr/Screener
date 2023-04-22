import React from 'react';
import useDownload from '../hooks/useDownload';

const Download = ({ filteredSortedData, columns, filename, children }) => {
  const { handleClick } = useDownload(filteredSortedData, columns, filename);

  return (
    <button className="bg-green-600 text-gray-200 p-2 rounded mt-4" id="download-button" onClick={handleClick}>
      {children || 'Download CSV'}
    </button>
  );
};

export default Download;
