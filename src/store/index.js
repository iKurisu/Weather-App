import Vue from 'vue';
import Vuex from 'vuex';
import { 
  fetchForecastByCoords, 
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchWeatherByCity 
} from '../api';
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
    },
    addPlace(state, place) {
      state.places.push(place);
    }
  },
  actions: {
    async setData({ commit }, location) {
      commit('setLocation', location);
      const weather = await fetchWeatherByCoords(location.coords);
      const forecasts = await fetchForecastByCoords(location.coords);
      commit('setForecasts', getForecastAtNoon(forecasts));
      commit('setWeather', weather);
    },
    async addPlace({ commit }, place) {
      commit('addPlace', place);
      const weather = await fetchWeatherByCity(place);
      const forecasts = await fetchForecastByCity(place);
      commit('setForecasts', getForecastAtNoon(forecasts));
      commit('setWeather', weather);
    }
  }
})