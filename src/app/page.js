'use client'

import { useEffect, useState } from "react";
import { DayPicker } from "./components/daypicker";

export default function Home() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          console.log(coords)
          setLocation({ latitude, longitude });
      })
    }
  }, [])
  
  useEffect(() => {
    const fetchWeather = async () => {
      if(location) {
        const url = new URL('https://api.open-meteo.com/v1/forecast')
        const weatherParams = {
          latitude: location.latitude,
          longitude: location.longitude,
          current_weather: true,
          temperature_unit: 'fahrenheit',
          windspeed_unit: 'mph',
          precipitation_unit: 'inch',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode',
          hourly: 'temperature_2m,relativehumidity_2m,precipitation,precipitation_probability,weathercode',
          forecast_days: '7',
        }
        for (const key in weatherParams) {
          url.searchParams.set(key, weatherParams[key])
        }
        let response = await fetch(url)
        let data = await response.json()
        setWeather(data)
      }
    }
    fetchWeather();
    }, [location])

    console.log(weather)

  return (
    <>
      <DayPicker weather={weather} />
    </>
  )
}

//<DisplayDailyForecast weather={weather} hidden={true}/>
/*
function DisplayDailyForecast({ weather }) {
  if (weather) {
    return (
      <table className='flex flex-col justify-center items-center'>
        <caption className='text-2xl'>Daily Weather</caption>
        <tbody className='w-full'>
          <tr className='h-28 flex items-center justify-evenly border-2'>
            <th className=''>Date</th>
            <th>Max/Min Temperature</th>
            <th>Sunrise/Sunset</th>
          </tr>
          <BuildRow daily={weather.daily}/>
        </tbody>
      </table>
    )
  }
}

function BuildRow({ daily }) {
  if (daily) {
    let row = [];
    for (let x in daily.time) {
      row.push(
        <tr key={x} className='h-28 flex items-center justify-evenly'>
          <td className='whitespace-pre-line'>{convertDate(daily.time[x])}</td>
          <td>{daily.temperature_2m_max[x]}/{daily.temperature_2m_min[x]}</td>
          <td>{convertTime(daily.sunrise[x])}/{convertTime(daily.sunset[x])}</td>
        </tr>
      )
    }
    return row;
  }
}


function convertDate(isoDate) {
  if (isoDate){
    const date = new Date(isoDate)
    const string = date.toLocaleString('default', { weekday:'short', month: 'short', day: 'numeric' })
    const output = `${string.slice(0, 3)}\n${string.slice(5)}`

    return output
  }
}

function convertTime(isoDate) {
  if (isoDate) {
    const date = new Date(isoDate)
    const string = date.toLocaleString('default', { hour: 'numeric', minute: 'numeric' })

    return string
  }
}
*/