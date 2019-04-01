import { 
  fetchWeatherByCoords, 
  fetchForecastByCoords,
  fetchWeatherByCity,
  fetchForecastByCity
} from "../../api";
import { getForecastAtNoon, forecastFormat, nextThreeDays } from "../../utils";
import * as convert from '../../utils/temperature';

const setWeather = (weatherFn, forecastFn) => async ({ commit }, place) => {
  const currentWeather = await weatherFn(place);
  const forecasts = await forecastFn(place);
  commit('setWeather', { currentWeather, forecasts });
}

export default {
  namespaced: true,
  state: {
    currentWeather: null,
    forecasts: [],
    unit: 'Celsius'
  },
  getters: {
    city: ({ currentWeather }) => currentWeather && currentWeather.name,
    countryCode: ({ currentWeather }) => currentWeather && currentWeather.sys.country,
    weather: ({ currentWeather, unit }) => ({
      temperature: currentWeather && convert[`to${unit}`](currentWeather.main.temp_max),
      description: currentWeather && currentWeather.weather[0].description
    }),
    forecasts: ({ currentWeather, forecasts, unit }) => {
      if (currentWeather) {
        return [
          currentWeather, 
          ...forecasts.filter(nextThreeDays)
        ].map(forecastFormat(unit));
      }
      return [];
    }
  },
  mutations: {
    setWeather(state, { currentWeather, forecasts }) {
      state.currentWeather = currentWeather.data;
      state.forecasts = getForecastAtNoon(forecasts.data);
    },
    changeUnits(state, unit) {
      state.unit = unit;
    }
  },
  actions: {
    setWeatherFromCoords: setWeather( 
      fetchWeatherByCoords, fetchForecastByCoords
    ),
    setWeatherFromCity: setWeather(
      fetchWeatherByCity, fetchForecastByCity
    )
  }
};