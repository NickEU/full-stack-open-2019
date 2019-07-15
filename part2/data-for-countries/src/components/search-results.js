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
  console.log(weather);

  if (results.props.countryData === undefined) {
    return <div id="countryInfo">{results}</div>;
  } else if (
    weather !== undefined &&
    !weather.error &&
    results.props.countryData !== undefined &&
    weather.sys.country === results.props.countryData.alpha2Code
  ) {
    return (
      <div>
        <div id="countryInfo">{results}</div>
        <WeatherData weather={weather} />
      </div>
    );
  } else {
    return (
      <div>
        <div id="countryInfo">{results}</div>
        <div>Loading...</div>
      </div>
    );
    // console.log("weather nested = ", weather);
    // if (
    //   weather === undefined ||
    //   (weather !== undefined && weather.error === undefined)
    // ) {
    //   return (
    //     <div>
    //       <div id="countryInfo">{results}</div>
    //       <div>Loading...</div>
    //     </div>
    //   );
    // }
    // if (weather !== undefined && weather.error) {
    //   return (
    //     <div>
    //       <div id="countryInfo">{results}</div>
    //       <div>Error...</div>
    //     </div>
    //   );
    // }
  }
};

export default SearchResults;
