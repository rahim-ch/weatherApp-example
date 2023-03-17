import { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const API_KEY = "b7039a402858b314e521d1e0453b7482";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`${API_URL}&q=${query}`);

      setWeather(data);
      setError("");
      setQuery("");
    } catch (error) {
      setError(error.response?.data?.message ?? error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-600 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-0 rotate-6 sm:rotate-0 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center">Weather App</h1>
          <form onSubmit={handleSearch}>
            <div className="flex mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a location"
                className="flex-1 border rounded py-2 px-3 mr-2"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <FaSearch />
              </button>
            </div>
          </form>
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          {weather.main && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{weather.name}, {weather.sys.country}</h2>
              <div className="mb-4">{weather.weather[0].description}</div>
              <div className="mb-4">{Math.round(weather.main.temp)}°C</div>
              <div className="mb-4">Feels like {Math.round(weather.main.feels_like)}°C</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
