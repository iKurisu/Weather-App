import axios from 'axios';
import { getWeatherAtNoon } from '../utils';

export const fetchByCoords = async ({ latitude: lat, longitude: lon }) => {  
  try {
    const url = "https://api.openweathermap.org/data/2.5/forecast";
    const APPID = "e63619f529ef55f19299184ab165dcd9";

const handleError = fn => (...params) => fn(...params).catch(console.error);

const makeRequest = async (url, params) => {
  const response = await axios.get(url, { params });
  return getWeatherAtNoon(response);
}

const byCoords = url => ({ latitude: lat, longitude: lon }) => {
  const params = { lat, lon, APPID };
  return makeRequest(url, params);
  }

const byCity = url => city => {
  const params = { city, APPID };
  return makeRequest(url, params);
}