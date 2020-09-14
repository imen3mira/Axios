import React from 'react'

function ForecastHour({ temp,
icon,
month,
day,
hour}) {
    return (
        <div className="Forecastbox">
          
      <h1 align="center">
        {month}.{day}
      </h1>
      <h2 align="center">{hour}:00</h2>
      <img  src={`http://openweathermap.org/img/w/${icon}.png`} />
      <label align="center" weight="400">
        {temp}&#176;
      </label>
   
        </div>
    )
}

export default ForecastHour
