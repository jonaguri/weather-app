const API_KEY = "edd4d735ee1914ea8a481ee04c95021a";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `City ${city} not found, please check the spelling and try again`
        );
      } else if (response.status === 401) {
        throw new Error(
          "Invalid API key, please check your OpenWeatherMap API configuration"
        );
      } else {
        throw new Error(
          "Weather service is temporarily unavailable. Please try again later."
        );
      }
    }

    const data = await response.json();

    if (data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error, please check your internet connection and try again"
      );
    }

    throw error;
  }
};

export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Invalid API key, please check your OpenWeatherMap API configuration"
        );
      } else {
        throw new Error(
          "Weather service is temporarily unavailable. Please try again later."
        );
      }
    }

    const data = await response.json();

    if (data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error, please check your internet connection and try again"
      );
    }

    throw error;
  }
};

export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `City ${city} not found, please check the spelling and try again`
        );
      } else if (response.status === 401) {
        throw new Error(
          "Invalid API key, please check your OpenWeatherMap API configuration"
        );
      } else {
        throw new Error(
          "Weather service is temporarily unavailable. Please try again later."
        );
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error, please check your internet connection and try again"
      );
    }

    throw error;
  }
};

export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Invalid API key, please check your OpenWeatherMap API configuration"
        );
      } else {
        throw new Error(
          "Weather service is temporarily unavailable. Please try again later."
        );
      }
    }

    const data = await response.json();

    return data.map((city) => ({
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    }));
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error, please check your internet connection and try again"
      );
    }

    throw error;
  }
};