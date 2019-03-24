import axios from 'axios';

const APPID = "e63619f529ef55f19299184ab165dcd9";
const url = "https://api.openweathermap.org/data/2.5"

const handleError = fn => (...params) => fn(...params).catch(console.error);

const makeRequest = async (url, params) => {
  const response = await axios.get(url, { params });
  return response;
}

const byCoords = url => ({ latitude: lat, longitude: lon }) => {
  const params = { lat, lon, APPID };
  return makeRequest(url, params);
}

const byCity = url => city => {
  const params = { city, APPID };
  return makeRequest(url, params);
}

const fetchWeather = fn => handleError(fn(`${url}/weather`));
const fetchForecast = fn => handleError(fn(`${url}/forecast`));

export const fetchWeatherByCoords = fetchWeather(byCoords);
export const fetchForecastByCoords = fetchForecast(byCoords);
export const fetchWeatherByCity = fetchWeather(byCity);
export const fetchForecastByCity = fetchForecast(byCity);
