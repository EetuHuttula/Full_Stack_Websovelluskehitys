import React from 'react';

const Filter = ({ filterWords, handleFilterChange }) => {
  return (
    <div>
      Filter shown with
      <input
        value={filterWords}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
