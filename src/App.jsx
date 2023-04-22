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
  
    const storedAppliedFilters = localStorage.getItem("appliedFilters");
    if (storedAppliedFilters) {
      const parsedAppliedFilters = JSON.parse(storedAppliedFilters);
      setAppliedFilters(parsedAppliedFilters);
      const newData = applyFiltersToData(data, parsedAppliedFilters);
      setFilteredData(newData);
      setSortedData([...newData]);
    }
  }, [data]);
  

  const handleApplyFilters = useCallback(
    (updateAppliedFilters) => {
      const newAppliedFilters = updateAppliedFilters(appliedFilters);
      setAppliedFilters(newAppliedFilters);
  
      // Store applied filters in localStorage
      localStorage.setItem("appliedFilters", JSON.stringify(newAppliedFilters));
  
      const newData = applyFiltersToData(data, newAppliedFilters);
      setFilteredData(newData);
      setSortedData([...newData]);
    },
    [data, appliedFilters]
  );
  

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
                const updatedFilters = currentFilters.filter(
                  (_, filterIndex) => filterIndex !== index
                );

                // Update localStorage
                localStorage.setItem("appliedFilters", JSON.stringify(updatedFilters));

                return updatedFilters;
              });
            }}
            clearFilters={() => {
              setAppliedFilters([]);
              const newData = applyFiltersToData(data, []);
              setFilteredData(newData);
              setSortedData([...newData]);
            
              // Clear applied filters from localStorage
              localStorage.removeItem("appliedFilters");
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
