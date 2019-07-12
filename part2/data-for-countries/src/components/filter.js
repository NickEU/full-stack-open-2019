import React from "react";

const Filter = ({ filter, onFilterInputChange }) => {
  return (
    <>
      find countries <input onChange={onFilterInputChange} value={filter} />{" "}
    </>
  );
};

export default Filter;
