'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
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
          daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset'
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
      <p className='flex justify-center'>Test</p>
    </>
  )
}


//https://api.open-meteo.com/v1/forecast?latitude=44.4192&longitude=-72.0151&hourly=temperature_2m,precipitation_probability,precipitation&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York