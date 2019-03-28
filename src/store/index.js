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
    places: [],
    formIsActive: false,
    inputIsValid: false
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
    addPlace(state, [ city, code ]) {
      const id = new Date().getTime();
      state.places.push({ 
        id,
        place: [ city, code ], 
      });
    },
    toggleForm(state) {
      state.formIsActive = !state.formIsActive;
    },
    setInput(state, bool) {
      state.inputIsValid = bool;
    }
  },
  actions: { 
    storeData({ commit }, { weather, forecasts }) {
      if (weather) {
        commit('setForecasts', getForecastAtNoon(forecasts));
        commit('setWeather', weather);
      }
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

      if (weather && forecasts) {
        commit('setInput', true);
        commit('toggleForm');
        dispatch('storeData', { weather, forecasts });
      } else {
        commit('setInput', false);
      }
    }
  }
})