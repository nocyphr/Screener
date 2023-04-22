import React, { useState, useEffect, useCallback } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Filter from './components/Filter';
import AppliedFilters from './components/AppliedFilters';
import Download from './components/Download';
import TableView from './components/TableView';
import useFetchData from './hooks/useFetchData';
import { applyFiltersToData } from './utils';

const App = () => {
  const headerTitle = 'Nocyphr Stock Screener';
  const { data, columns, loading } = useFetchData(process.env.REACT_APP_API_URL);
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    setFilteredData(data);
    setSortedData(data);
  }, [data]);

  const handleApplyFilters = useCallback((updateAppliedFilters) => {
    const newAppliedFilters = updateAppliedFilters(appliedFilters);
    setAppliedFilters(newAppliedFilters);

    const newData = applyFiltersToData(data, newAppliedFilters);
    setFilteredData(newData);
    setSortedData([...newData]);
  }, [data, appliedFilters]);

  return (
    <Container>
      <Header title={headerTitle} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <Filter data={data} columns={columns} onApplyFilters={handleApplyFilters} appliedFilters={appliedFilters} />
            <Download data={data} filteredSortedData={sortedData} columns={columns} />
          </div>
          <AppliedFilters
            appliedFilters={appliedFilters}
            removeFilter={(index) => {
              handleApplyFilters((currentFilters) => {
                return currentFilters.filter((_, filterIndex) => filterIndex !== index);
              });
            }}
            clearFilters={() => {
              setAppliedFilters([]);
              handleApplyFilters(data, []);
            }}
          />

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
