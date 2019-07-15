import React from "react";

const CountryData = ({ countryData }) => {
  return (
    <div>
      <h2>{countryData.name}</h2>
      <p>capital {countryData.capital}</p>
      <p>population {countryData.population}</p>
      <h4>Languages:</h4>
      <ul>
        {countryData.languages.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <img src={countryData.flag} className="flag" alt="flag" />
    </div>
  );
};

export default CountryData;
