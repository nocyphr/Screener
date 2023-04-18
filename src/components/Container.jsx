import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-400 flex">
      <div className="flex-grow"></div>
      <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-8 bg-gray-800">
        {children}
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default Container;
