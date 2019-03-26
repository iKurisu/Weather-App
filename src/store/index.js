import Vue from 'vue';
import Vuex from 'vuex';
import { fetchForecastByCoords, fetchWeatherByCoords } from '../api';
import { getForecastAtNoon } from '../utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: null,
    weather: null,
    forecasts: [],
    places: []
  },
  mutations: {
    setLocation(state, location) {
      state.location = location;
    },
    setWeather(state, weather) {
      state.weather = weather;
    },
    setForecasts(state, forecasts) {
      state.forecasts = forecasts
    }
  },
  actions: {
    async setData({ commit }, location) {
      commit('setLocation', location);
      const weather = await fetchWeatherByCoords(location.coords);
      const forecasts = await fetchForecastByCoords(location.coords);
      commit('setForecasts', getForecastAtNoon(forecasts));
      commit('setWeather', weather);
    }
  }
})