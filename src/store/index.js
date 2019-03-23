import Vue from 'vue';
import Vuex from 'vuex';
import { fetchByCoords } from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: null,
    forecast: []
  },
  mutations: {
    setLocation(state, location) {
      state.location = location;
    },
    setForecast(state, forecast) {
      state.forecast = forecast
    }
  },
  actions: {
    async setData({ commit }, location) {
      const data = await fetchByCoords(location.coords);
      commit('setLocation', location);
      commit('setForecast', data.data.list)
    }
  }
})