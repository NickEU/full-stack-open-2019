import React from "react";

const Filter = ({ onChange, inputValue }) => {
  return (
    <div id="filterForm">
      <br />
      <span>Filter results:</span>
      <input onChange={onChange} value={inputValue} />
    </div>
  );
};

export default Filter;
