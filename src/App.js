import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';
import UnitToggle from './components/UnitToggle';
import Forecast from './components/Forecast';
import ErrorDisplay from './components/ErrorDisplay';
import styles from './styles/App.module.css';

function App() {
  return (
    <WeatherProvider>
      <div className={styles.app}>
        <SearchInput />
        <ErrorDisplay />
        <UnitToggle />
        <WeatherInfo />
        <Forecast />
        {/* Optional: <Forecast />, <UnitToggle /> */}
      </div>
    </WeatherProvider>
  );
}

export default App;
