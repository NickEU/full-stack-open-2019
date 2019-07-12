import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./components/search-results";
import CountryData from "./components/country-data";
import Filter from "./components/filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
      console.log(response.data);
    });
  };

  useEffect(hook, []);

  const handleInputChange = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const showResults = () => {
    let result = <p>so far so good</p>;
    if (countries.length > 0) {
      result = "";
      let filteredArr = countries.filter(item =>
        item.name.toLowerCase().includes(filter)
      );
      console.log(filteredArr);
      if (filteredArr.length > 1 && filteredArr.length < 10) {
        result = filteredArr.map(item => <div>{item.name}</div>);
      } else if (filteredArr.length > 10) {
        result = <p>Too many matches, specify another filter...</p>;
      } else if (filteredArr.length === 1) {
        result = <CountryData countryData={filteredArr[0]} />;
      }
    }

    return result;
  };

  return (
    <>
      <Filter onFilterInputChange={handleInputChange} filter={filter} />
      <SearchResults results={showResults()} />
    </>
  );
};

export default App;
