import React from 'react';

const TableView = ({ data, columns }) => {
  return (
    <table className="w-full text-gray-400 mt-8">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="text-left">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
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
