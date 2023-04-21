import React, { useState, useEffect } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Filter from './components/Filter';
import Download from './components/Download';
import TableView from './components/TableView';
import useFetchData from './hooks/useFetchData';

const App = () => {
  const headerTitle = 'Nocyphr Stock Screener';
  const { data, columns, loading } = useFetchData(process.env.REACT_APP_API_URL);
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
    setSortedData(data);
  }, [data]);

  const handleApplyFilters = (filteredData) => {
    setFilteredData(filteredData);
    setSortedData(filteredData);
  };

  return (
    <Container>
      <Header title={headerTitle} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Filter data={data} columns={columns} onApplyFilters={handleApplyFilters} />
            <Download
              data={data}
              filteredSortedData={sortedData}
              columns={columns}
            />
          </div>
          <TableView
            data={filteredData}
            columns={columns}
            onSortedDataChange={setSortedData}
          />
        </>
      )}
    </Container>
  );
};

export default App;
