import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import styles from '../styles/UnitToggle.module.css';

export default function UnitToggle() {
  const { units, setUnits } = useContext(WeatherContext);
  return (
    <div className={styles.toggleWrap}>
      <button
        className={units === 'metric' ? styles.active : ''}
        onClick={() => setUnits('metric')}
        aria-pressed={units === 'metric'}
      >
        °C
      </button>
      <button
        className={units === 'imperial' ? styles.active : ''}
        onClick={() => setUnits('imperial')}
        aria-pressed={units === 'imperial'}
      >
        °F
      </button>
    </div>
  );
}
