import React, { useState, useEffect } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Filter from './components/Filter';
import TableView from './components/TableView';
import Download from './components/Download';

const App = () => {
  const headerTitle = 'Nocyphr Stock Screener';
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setColumns(Object.keys(data[0]));
      });
  }, []);

  const handleApplyFilters = (filteredData) => {
    setFilteredData(filteredData);
    setSortedData(filteredData); // Add this line
  };
  

  return (
    <Container>
      <Header title={headerTitle} />
      {columns.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <Filter data={data} columns={columns} onApplyFilters={handleApplyFilters} />
          <Download
            data={data}
            filteredSortedData={sortedData}
            columns={columns}
          />
        </div>
      )}
      <TableView
        data={filteredData}
        columns={columns}
        onSort={setSortedData}
      />
    </Container>
  );
  
};

export default App;
