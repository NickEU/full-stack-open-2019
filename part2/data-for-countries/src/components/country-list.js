import React from "react";

const CountryList = ({ countries, handleBtnClick }) => {
  return countries.map(item => (
    <div key={item.name}>
      {item.name}
      <button onClick={handleBtnClick}>Show</button>
    </div>
  ));
};

export default CountryList;
