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
    storeData({ commit }, { weather, forecasts }) {
      commit('setForecasts', getForecastAtNoon(forecasts));
      commit('setWeather', weather);
    },
    async setData({ commit, dispatch }, location) {
      commit('setLocation', location);
      const weather = await fetchWeatherByCoords(location.coords);
      const forecasts = await fetchForecastByCoords(location.coords);
      dispatch('storeData', { weather, forecasts });
    },
    async addPlace({ commit, dispatch }, place) {
      commit('addPlace', place);
      const weather = await fetchWeatherByCity(place);
      const forecasts = await fetchForecastByCity(place);
      dispatch('storeData', { weather, forecasts });
    }
  }
})