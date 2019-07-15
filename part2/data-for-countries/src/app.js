import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./components/search-results";
import Filter from "./components/filter";
import CountryList from "./components/country-list";
import CountryData from "./components/country-data";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [capital, setCapital] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined);

  // const testStuff = () => {
  //   console.log("s");
  //   let delay = 0;
  //   countries.forEach(item => {
  //     delay += 4000;
  //     setTimeout(() => {
  //       console.log(item);
  //       setFilter(item.name.toLowerCase());
  //     }, delay);
  //   });
  // };

  // useEffect(testStuff, [countries]);

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
      console.log(response.data);
    });
  };

  useEffect(hook, []);

  useEffect(() => {
    if (capital === undefined) {
      return;
    }
    console.log(
      `http://api.apixu.com/v1/current.json?key=cc2efc6fcf254caf9e671434191507&q=${capital}`
    );
    axios
      .get(
        `http://api.apixu.com/v1/current.json?key=cc2efc6fcf254caf9e671434191507&q=${capital}`
      )
      .then(response => {
        console.log(response.data);
        setWeatherData(response.data);
      })
      .catch(function(error) {
        // handle error
        setWeatherData(undefined);
      });
  }, [capital]);

  const handleInputChange = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleBtnClick = e => {
    setFilter(e.target.previousSibling.textContent.toLowerCase());
  };

  const showResults = () => {
    let result = <div>Loading...</div>;
    if (countries.length > 0) {
      if (filter === "") {
        return null;
      }
      result = "";
      let filteredArr = countries.filter(item =>
        item.name.toLowerCase().includes(filter)
      );
      // console.log(filteredArr);
      if (filteredArr.length > 10) {
        result = undefined;
      } else if (filteredArr.length === 1 || filter === "ireland") {
        result = <CountryData countryData={filteredArr[0]} />;
        if (capital !== filteredArr[0].capital) {
          if (filteredArr[0].capital === "Papeetē") {
            filteredArr[0].capital = "Papeete";
          } // weather api and countries api spell this capital differently
          setCapital(filteredArr[0].capital);
        }
      } else if (filteredArr.length > 1 && filteredArr.length < 10) {
        result = (
          <CountryList
            countries={filteredArr}
            handleBtnClick={handleBtnClick}
          />
        );
        if (filter === "sudan") {
          result = <CountryData countryData={filteredArr[1]} />;
          if (capital !== filteredArr[1].capital) {
            setCapital(filteredArr[1].capital);
          }
        }
      }
    }

    return result;
  };

  return (
    <>
      <Filter onFilterInputChange={handleInputChange} filter={filter} />
      <SearchResults results={showResults()} weather={weatherData} />
    </>
  );
};

export default App;
