export default {
  namespaced: true,
  state: {
    places: []
  },
  mutations: {
    addPlace(state, place) {
      const id = new Date().getTime();
      state.places.push({ place, id });
    }
  },
};