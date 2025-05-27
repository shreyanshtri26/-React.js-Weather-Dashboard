import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [units, setUnits] = useState('metric'); // 'metric' or 'imperial'

  // Load last city from localStorage on mount
  useEffect(() => {
    const last = localStorage.getItem('lastCity');
    if (last) setCity(last);
  }, []);

  // Fetch weather when city or units change
  useEffect(() => {
    if (!city) return;
    let ignore = false;
    const fetchWeather = async () => {
      try {
        const API_KEY = process.env.REACT_APP_OWM_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`City not found (${res.status})`);
        const data = await res.json();
        if (!ignore) {
          setWeatherData(data);
          setErrorMsg('');
          localStorage.setItem('lastCity', city);
        }
      } catch (err) {
        if (!ignore) {
          setErrorMsg(err.message);
          setWeatherData(null);
        }
      }
    };
    fetchWeather();
    // Polling every 30s
    const intervalId = setInterval(fetchWeather, 30000);
    return () => {
      ignore = true;
      clearInterval(intervalId);
    };
  }, [city, units]);

  // Geolocation fetch
  const fetchByCoords = async (lat, lon) => {
    try {
      const API_KEY = process.env.REACT_APP_OWM_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Location weather not found');
      const data = await res.json();
      setWeatherData(data);
      setErrorMsg('');
      setCity(data.name);
      localStorage.setItem('lastCity', data.name);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <WeatherContext.Provider value={{
      city, setCity, weatherData, errorMsg, units, setUnits, fetchByCoords
    }}>
      {children}
    </WeatherContext.Provider>
  );
}
