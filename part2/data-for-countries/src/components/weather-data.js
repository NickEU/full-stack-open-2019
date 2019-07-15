import React from "react";

const WeatherData = ({ weather }) => {
  //console.log(weather);
  if (weather === undefined || weather.error !== undefined) {
    return <div>shit</div>;
  }

  let directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
  ];
  //console.log(`wind degress = ${weather.wind.deg}`);
  let i = Math.floor((weather.wind.deg + 11.25) / 22.5);
  let windDirection = weather.wind.deg ? `direction ${directions[i % 16]}` : ``;

  var iconurl =
    "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
  return (
    <div id="weatherInfo">
      <h4>Weather in {weather.name}</h4>
      <p>
        <strong>temperature:</strong> {weather.main.temp} celsius
      </p>
      <p>
        <img alt="weather icon" src={iconurl} />
      </p>
      <p>
        <strong>wind: </strong> {weather.wind.speed} kph {windDirection}
      </p>
    </div>
  );
};

export default WeatherData;
