import Vue from "vue";
import Vuex from "vuex";
import form from "./modules/form";
import weather from "./modules/weather";
import place from "./modules/place";

Vue.use(Vuex);

const actions = {
  loadDefaultCity({ dispatch, commit }) {
    const defaultCity = { city: "Madrid", code: "ES" };

    dispatch("weather/setWeatherFromCity", defaultCity)
      .then(() => commit("place/addPlace", defaultCity))
      .catch(console.err);
  }
};

export default new Vuex.Store({
  actions,
  modules: {
    form,
    weather,
    place
  }
});
