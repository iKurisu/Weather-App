<template>
  <div class="menu container -right -text-center">
    <div class="menu-option">
      <p>T. units:</p>
      <span class="menu-option-units">
        <span
          :class="[
            'menu-option-unit',
            { 'menu-option-unit--inactive': unit === 'Fahrenheit' }
          ]"
          @click="changeUnits('Celsius')"
          >C</span
        >
        <span
          :class="[
            'menu-option-unit',
            { 'menu-option-unit--inactive': unit === 'Celsius' }
          ]"
          @click="changeUnits('Fahrenheit')"
          >F</span
        >
      </span>
      </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "HeaderMenu",
  computed: mapState({
    unit: "weather/unit"
  }),
  methods: mapMutations({
    changeUnits: "weather/changeUnits"
  })
};
</script>

<style lang="scss">
.menu {
  z-index: 10;
}

.menu.container {
  width: 20vh;
}

.menu-option {
  padding: 6px 10px;
}

.menu-option p {
  display: inline;
}

.menu-option p,
.menu-option span {
  font-size: 14px;
}

.menu-option-units {
  margin-left: 10px;
}

.menu-option-unit {
  cursor: pointer;
  padding: 2px 10px;
}

.menu-option-unit--inactive {
  color: #a1a1a1;
}
</style>
