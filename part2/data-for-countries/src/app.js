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
    if (capital === undefined || capital.capital === "") {
      return;
    }
    const apiKey = `85f0719e252d31fe5685f525f0617e99`;
    const apiReqLink = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${
      capital.capital
    },${capital.countryCode.toLowerCase()}&units=metric&APPID=${apiKey}`;
    //console.log(apiReqLink);
    //console.log(capital);
    axios
      .get(apiReqLink, {
        headers: {
          "X-Requested-With": "XMLHttpRequest" //the token is a variable which holds the token
        }
      })
      .then(response => {
        //console.log(`response = `, response);
        setWeatherData(response.data);
      })
      .catch(function(error) {
        //console.log(`error = `, error);
        setWeatherData({ error: true });
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
      let countriesIndexZero = [
        "ireland",
        "congo",
        "dominica",
        "georgia",
        "mali",
        "niger",
        "oman"
      ];
      if (filteredArr.length > 10) {
        result = undefined;
      } else if (
        filteredArr.length === 1 ||
        countriesIndexZero.indexOf(filter) !== -1
      ) {
        result = <CountryData countryData={filteredArr[0]} />;
        //console.log(capital);
        if (
          capital === undefined ||
          (capital !== undefined && capital.capital !== filteredArr[0].capital)
        ) {
          if (filteredArr[0].capital === "Papeetē") {
            filteredArr[0].capital = "Papeete";
          } else if (filteredArr[0].capital === "Hagåtña") {
            filteredArr[0].capital = "Hagatna";
          } // weather api and countries api spell this capital differently
          setCapital({
            capital: filteredArr[0].capital,
            countryCode: filteredArr[0].alpha2Code
          });
        }
      } else if (filteredArr.length > 1 && filteredArr.length < 10) {
        result = (
          <CountryList
            countries={filteredArr}
            handleBtnClick={handleBtnClick}
          />
        );
        const countriesIndexOne = ["samoa", "sudan", "guinea", "india"];
        if (countriesIndexOne.indexOf(filter) !== -1) {
          result = <CountryData countryData={filteredArr[1]} />;
          if (
            capital === undefined ||
            (capital !== undefined &&
              capital.capital !== filteredArr[1].capital)
          ) {
            setCapital({
              capital: filteredArr[1].capital,
              countryCode: filteredArr[1].alpha2Code
            });
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
