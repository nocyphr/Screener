import React, { useState, useEffect } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Filter from './components/Filter';
import TableView from './components/TableView';

const App = () => {
  const headerTitle = 'Nocyphr Stock Screener';
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
  };

  return (
    <Container>
      <Header title={headerTitle} />
      {columns.length > 0 && (
        <Filter data={data} columns={columns} onApplyFilters={handleApplyFilters} />
      )}
      <TableView data={filteredData} columns={columns} />
    </Container>
  );
};

export default App;
