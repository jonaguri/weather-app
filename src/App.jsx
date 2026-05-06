import React from "react";
import SearchBar from "./components/SearchBar";
import TemperatureToggle from "./components/TemperatureToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";
import { useWeather } from "./hooks/useWeather";


function App() {
  const {
  currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
} = useWeather();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
"url('https://environment.co/wp-content/uploads/sites/4/2022/07/diego-ph-BCuxVP5WEsU-unsplash.jpg.webp')",}}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
  <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]">
    Climate
  </span>{" "}
  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
    Flow
  </span>
</h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover real-time weather updates with stunning visuals and accurate forecasts for cities around the globe.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 mb-12">
            <SearchBar onSearch={fetchWeatherByCity} onLocationSearch={fetchWeatherByLocation}  loading={loading}/>
            <TemperatureToggle unit={unit} onToggle={toggleUnit} />
          </div>

          <div className="space-y-8">
            {loading && (
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <LoadingSpinner />

                  <p className="text-white/80 text-center mt-4 font-medium">
                    Fetching latest weather data...
                  </p>
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="max-w-2xl mx-auto">
                <ErrorMessage />
              </div>
            )}

            {currentWeather && !loading && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <WeatherCard weather={currentWeather} unit={unit} />
                </div>

                <div className="xl:col-span-1">
                  {forecast && <WeatherForecast forecast={forecast} unit={unit}  />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;