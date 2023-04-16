import React from 'react';
import Container from './components/Container';
import Header from './components/Header';

const App = () => {
  const headerTitle = 'Nocyphr Stock Screener';

  return (
    <Container>
      <Header title={headerTitle} />
      {/* Your other components go here */}
    </Container>
  );
};

export default App;
