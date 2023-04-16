import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="text-center py-4 border-b border-gray-600">
      <h1 className="text-5xl font-bold text-gray-400">{title}</h1>
    </header>
  );
};

export default Header;
