import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import styles from '../styles/Forecast.module.css';

export default function Forecast() {
  const { city, units } = useContext(WeatherContext);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) return;
    const API_KEY = process.env.REACT_APP_OWM_KEY;
    setLoading(true);
    setError('');
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`
    )
      .then(res => {
        if (!res.ok) throw new Error('Forecast not found');
        return res.json();
      })
      .then(data => {
        // Group by day, pick one forecast per day (e.g., 12:00)
        const daily = {};
        data.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0];
          const hour = item.dt_txt.split(' ')[1];
          if (!daily[date] && hour.startsWith('12')) {
            daily[date] = item;
          }
        });
        setForecast(Object.values(daily).slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setForecast([]);
        setLoading(false);
      });
  }, [city, units]);

  if (!city) return null;
  if (loading) return <div className={styles.forecastWrap}>Loading forecast...</div>;
  if (error) return <div className={styles.forecastWrap}>{error}</div>;
  if (!forecast.length) return null;

  return (
    <div className={styles.forecastWrap}>
      <h3>5-Day Forecast</h3>
      <div className={styles.forecastGrid}>
        {forecast.map((item, idx) => (
          <div key={item.dt} className={styles.dayCard}>
            <div className={styles.date}>{new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className={styles.icon}
            />
            <div className={styles.temp}>{Math.round(item.main.temp)}°{units === 'imperial' ? 'F' : 'C'}</div>
            <div className={styles.desc}>{item.weather[0].main}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
