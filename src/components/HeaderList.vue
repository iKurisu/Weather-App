<template>
  <div class="header-list -center -text-center">
    <ul v-if="places.length > 0">
      <li 
        v-for="{place, id} in places" 
        :key="id" 
        @click="setPlace(place)"
      >
        {{ place[0].toUpperCase() }} 
        <span>{{ place[1].toUpperCase() }}</span>
      </li>
    </ul>
    <p v-else>Empty</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "HeaderList",
  computed: {
    ...mapState({
      places: ({ places }) => places
    })
  },
  methods: {
    setPlace(place) {
      this.$store.dispatch('setPlace', place)
      this.toggleList();
    }
  }
}
</script>

<style lang="scss">
.header-list {
  background: #fff;
  width: 42vw;
  max-height: 27vh;
  overflow-y: scroll;
  position: absolute;
  top: 10vh;
  border-radius: 5px;
  box-shadow: 0 2px 7px .2px rgba(0, 0, 0, .2);
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
  p, li {
    font-size: 14px;
    padding: 6px 0;
  }
}
</style>
