import Vue from "vue";
import Vuex from "vuex";
import form from "./modules/form";
import weather from "./modules/weather";
import place from "./modules/place";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    form,
    weather,
    place
  }
});
