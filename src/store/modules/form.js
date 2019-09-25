export default {
  namespaced: true,
  state: {
    formIsActive: false,
    inputIsValid: false,
    value: ""
  },
  mutations: {
    toggleForm(state) {
      state.formIsActive = !state.formIsActive;
      state.value = "";
    },
    setInput(state, bool) {
      state.inputIsValid = bool;
    },
    updateValue(state, value) {
      state.value = value;
    }
  },
  actions: {
    submitForm({ state, commit, dispatch }) {
      const [city, code] = state.value.split(", ");

      commit("setInput", !city || !code ? false : true);

      if (state.inputIsValid) {
        dispatch("weather/setWeatherFromCity", { city, code }, { root: true })
          .then(() => {
            commit("place/addPlace", { city, code }, { root: true });
            commit("toggleForm");
          })
          .catch(() => {
            commit("setInput", false);
          });
      }
    }
  }
};
