import React from "react";

const WeatherData = ({ weather }) => {
  return (
    <div id="weatherInfo">
      <h4>Weather in {weather.location.name}</h4>
      <p>
        <strong>temperature:</strong> {weather.current.temp_c} celsius
      </p>
      <p>
        <img alt="weather icon" src={weather.current.condition.icon} />
      </p>
      <p>
        <strong>wind: </strong> {weather.current.wind_kph} kph direction{" "}
        {weather.current.wind_dir}
      </p>
    </div>
  );
};

export default WeatherData;
