import React, { useState, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import styles from '../styles/SearchInput.module.css';

// Visually hidden label for accessibility (improves screen reader support)
const VisuallyHidden = ({ children }) => (
  <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>{children}</span>
);

// SearchInput component: handles city search and geolocation
export default function SearchInput() {
  // Access setCity (for search) and fetchByCoords (for geolocation) from context
  const { setCity, fetchByCoords } = useContext(WeatherContext);
  // State for input text
  const [text, setText] = useState('');
  // State for geolocation loading
  const [geoLoading, setGeoLoading] = useState(false);

  // Handle form submission (city search)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setCity(text.trim()); // update city in context
    setText(''); // clear input
  };

  // Handle geolocation button click
  const handleGeo = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchByCoords(latitude, longitude);
        setGeoLoading(false);
      },
      (err) => {
        alert('Location loading......') ;
        setGeoLoading(false);
      }
    );
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit} autoComplete="off" role="search" aria-label="Weather search form">
      <label htmlFor="city-input">
        <VisuallyHidden>City Name</VisuallyHidden>
      </label>
      <input
        id="city-input"
        className={styles.searchInput}
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter city"
        aria-label="Enter city name"
        autoFocus
        autoComplete="off"
      />
      <button
        className={styles.searchBtn}
        type="submit"
        aria-label="Search weather by city"
        disabled={geoLoading}
      >
        Search
      </button>
      <button
        className={styles.geoBtn}
        type="button"
        onClick={handleGeo}
        aria-label="Use my location for weather"
        disabled={geoLoading}
      >
        {geoLoading ? 'Locating...' : 'Use My Location'}
      </button>
    </form>
  );
}
