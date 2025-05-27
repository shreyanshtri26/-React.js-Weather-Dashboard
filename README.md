# React Weather Dashboard

A modern weather dashboard built with React.js, demonstrating best practices in component architecture, state management, and API integration. Features real-time weather updates, city search, geolocation, error handling, and persistent state.

## Features

- **Search for a city** and display current weather details
- **Geolocation**: Get weather for your current location
- **Current weather**: Temperature, humidity, wind speed, conditions, and weather icon
- **Unit toggle**: Switch between Celsius and Fahrenheit
- **Auto-refresh**: Weather data updates every 30 seconds
- **Error handling**: User-friendly messages for API/network errors
- **Persistence**: Last searched city is saved and restored
- **Responsive UI**: Modern, glassmorphic design using CSS Modules
- **Accessible**: Keyboard and screen reader friendly

## Bonus (Optional/Planned)
- 5-day forecast (easy to add as a new component)
- Supabase login and data storage

## Project Structure

```
src/
  App.js
  index.js
  context/
    WeatherContext.jsx
  components/
    SearchInput.jsx
    WeatherInfo.jsx
    ErrorDisplay.jsx
    UnitToggle.jsx
  styles/
    App.module.css
    SearchInput.module.css
    WeatherInfo.module.css
    ErrorDisplay.module.css
    UnitToggle.module.css
  .env
```

## Setup & Usage

1. **Clone the repo**
   ```sh
   git clone <your-repo-url>
   cd -React.js-Weather-Dashboard
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Add your OpenWeatherMap API key**
   - Create a `.env` file in the root:
     ```env
     REACT_APP_OWM_KEY=your_openweathermap_api_key
     ```
4. **Start the app**
   ```sh
   npm start
   ```
   The app will run on http://localhost:3000 (or 3001 if 3000 is in use).

## Approach

This project uses React functional components and Context API for global state. Weather data is fetched from OpenWeatherMap, with polling every 30 seconds for live updates. The UI is modular and responsive, styled with CSS Modules for maintainability. All errors are handled gracefully, and the last city is persisted via localStorage. The codebase is optimized for clarity, reusability, and extensibility.

## Example API Call

```js
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching weather data:', error));
```

