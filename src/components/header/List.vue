<template>
  <div class="header-list container -center -text-center">
    <ul v-if="places.length > 0">
      <li v-for="{ place, id } in places" :key="id" @click="setPlace(place)">
        {{ place.city.toUpperCase() }}
        <span>{{ place.code.toUpperCase() }}</span>
      </li>
    </ul>
    <p v-else>Empty</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "HeaderList",
  props: {
    toggleList: {
      type: Function,
      required: true
    }
  },
  computed: mapState({
    places: state => state.place.places
  }),
  methods: {
    ...mapActions({
      setWeatherFromCity: "weather/setWeatherFromCity"
    }),
    setPlace(place) {
      console.log(place);
      this.setWeatherFromCity(place);
      this.toggleList();
    }
  }
};
</script>

<style lang="scss">
.header-list {
  max-height: 27vh;
  z-index: 10;
  overflow-y: scroll;
}

.header-list p {
  color: #1a1a1a;
  font-style: italic;
  cursor: default;
}

.header-list li {
  cursor: pointer;
  list-style: none;
}

.header-list li:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.header-list {
  p,
  li {
    font-size: 14px;
    padding: 6px 0;
  }
}
</style>
