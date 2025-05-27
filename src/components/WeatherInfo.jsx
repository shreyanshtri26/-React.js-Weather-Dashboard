import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import styles from '../styles/WeatherInfo.module.css';

export default function WeatherInfo() {
  const { weatherData, units } = useContext(WeatherContext);
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;
  const iconCode = weather[0].icon;
  const description = weather[0].description;

  return (
    <div className={styles.weatherInfo}>
      <h2>{name}</h2>
      <img
        className={styles.weatherIcon}
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={description}
      />
      <p>Temperature: {Math.round(main.temp)}°{units === 'imperial' ? 'F' : 'C'}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind: {Math.round(wind.speed)} {units === 'imperial' ? 'mph' : 'm/s'}</p>
      <p>Conditions: {description}</p>
    </div>
  );
}
