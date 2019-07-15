import React from "react";
import WeatherData from "./weather-data";

const SearchResults = ({ results, weather }) => {
  // console.log(`weather = `, weather);

  if (results === null) {
    return <p>Which country would you like to find?</p>;
  }

  if (results === undefined) {
    return <p>Too many matches, specify another filter...</p>;
  }

  if (results.props === undefined) {
    return <p>These aren't the droids you're looking for</p>;
  }

  if (
    weather !== undefined &&
    results.props.countryData !== undefined &&
    (results.props.countryData.name
      .toLowerCase()
      .includes(weather.location.country.toLowerCase()) ||
      (weather.location.country
        .toLowerCase()
        .includes(results.props.countryData.name.toLowerCase()) &&
        (results.props.countryData.capital
          .toLowerCase()
          .includes(weather.location.name.toLowerCase()) ||
          weather.location.name
            .toLowerCase()
            .includes(results.props.countryData.capital.toLowerCase()))))
  ) {
    console.log("---");
    console.log(results.props.countryData.name);
    console.log(weather.location.country);
    console.log("---");
    return (
      <div>
        <div id="countryInfo">{results}</div>
        <WeatherData weather={weather} />
      </div>
    );
  }
  return <div id="countryInfo">{results}</div>;
};

export default SearchResults;
