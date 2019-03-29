import { 
  fetchWeatherByCoords, 
  fetchForecastByCoords,
  fetchWeatherByCity,
  fetchForecastByCity
} from "../../api";
import { getForecastAtNoon } from "../../utils";

const setWeather = (weatherFn, forecastFn) => async ({ commit }, place) => {
  const currentWeather = await weatherFn(place);
  const forecasts = await forecastFn(place);
  commit('setWeather', { currentWeather, forecasts });
}

export default {
  namespaced: true,
  state: {
    currentWeather: null,
    forecasts: []
  },
  getters: {
    city: ({ currentWeather }) => currentWeather && currentWeather.name,
    countryCode: ({ currentWeather }) => currentWeather && currentWeather.sys.country
  },
  mutations: {
    setWeather(state, { currentWeather, forecasts }) {
      state.currentWeather = currentWeather.data;
      state.forecasts = getForecastAtNoon(forecasts.data);
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