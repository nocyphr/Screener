import React, { useState } from 'react';

const TableView = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  const handleHeaderClick = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = React.useMemo(() => {
    const sorted = [...data];
    if (sortConfig.key && sortConfig.direction !== 'none') {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [data, sortConfig]);

  return (
    <table className="w-full text-gray-400 mt-8">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="text-left cursor-pointer"
              onClick={() => handleHeaderClick(column)}
            >
              {column}
              {sortConfig.key === column && (
                <span className="inline-block ml-1">
                  {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index} className="border-t border-gray-600">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className={colIndex === 0 ? 'py-2' : ''}>
                {item[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
