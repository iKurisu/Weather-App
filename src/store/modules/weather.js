import {
  fetchWeatherByCoords,
  fetchForecastByCoords,
  fetchWeatherByCity,
  fetchForecastByCity
} from "../../api";
import { getForecastAtNoon, forecastFormat, nextFourDays } from "../../utils";
import * as convert from "../../utils/temperature";

const state = {
  currentWeather: null,
  forecasts: [],
  unit: "Celsius"
};

const getters = {
  city({ currentWeather }) {
    if (currentWeather) return currentWeather.name;
  },
  countryCode({ currentWeather }) {
    if (currentWeather) return currentWeather.sys.country;
  },
  currentWeather({ currentWeather, unit }) {
    if (currentWeather) {
      return {
        temperature: convert[`to${unit}`](currentWeather.main.temp_max),
        description: currentWeather.weather[0].description,
        main: currentWeather.weather[0].main.toLowerCase()
      };
    } else {
      return {};
    }
  },
  forecasts({ currentWeather, forecasts, unit }) {
    if (currentWeather) {
      return [currentWeather, ...forecasts.filter(nextFourDays)].map(
        forecastFormat(unit)
      );
    }

    return [];
  }
};

const mutations = {
  setCurrentWeather(state, currentWeather) {
    state.currentWeather = currentWeather.data;
  },
  setForecasts(state, forecasts) {
    state.forecasts = getForecastAtNoon(forecasts.data);
  },
  changeUnits(state, unit) {
    state.unit = unit;
  }
};

const setWeather = (getWeather, getForecast) => async ({ commit }, place) => {
  const currentWeather = await getWeather(place);
  const forecasts = await getForecast(place);

  commit("setCurrentWeather", currentWeather);
  commit("setForecasts", forecasts);
};

const actions = {
  setWeatherFromCoords: setWeather(fetchWeatherByCoords, fetchForecastByCoords),
  setWeatherFromCity: setWeather(fetchWeatherByCity, fetchForecastByCity)
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
