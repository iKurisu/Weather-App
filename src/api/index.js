import axios from 'axios';
import { getWeatherAtNoon } from '../utils';

export const fetchByCoords = async ({ latitude: lat, longitude: lon }) => {  
  try {
    const url = "https://api.openweathermap.org/data/2.5/forecast";
    const APPID = "e63619f529ef55f19299184ab165dcd9";

    const response = await axios.get(url, {
      params: { lat, lon, APPID }
    });

const makeRequest = async (url, params) => {
  const response = await axios.get(url, { params });
  return getWeatherAtNoon(response);
}
  }
}