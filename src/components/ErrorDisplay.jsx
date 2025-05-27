import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import styles from '../styles/ErrorDisplay.module.css';

export default function ErrorDisplay() {
  const { errorMsg } = useContext(WeatherContext);
  if (!errorMsg) return null;
  return <div className={styles.error}>{errorMsg}</div>;
}
