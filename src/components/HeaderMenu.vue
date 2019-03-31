<template>
  <div class="container -right -text-center">
    <div class="menu-option">
      <p>T. units: </p>
      <div class="menu-option-units">
        <div 
          :class="[
            'menu-option-unit', 
            { 'menu-option-unit--inactive': unit === 'Fahrenheit' }
          ]" 
          @click="changeUnits('Celsius')"
        >
          <p>C</p>  
        </div>
        <div 
          :class="[
            'menu-option-unit', 
            { 'menu-option-unit--inactive': unit === 'Celsius' }
          ]" 
          @click="changeUnits('Fahrenheit')"
        >
          <p>F</p>
        </div>
      </div>
    </div>
  </diV>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "HeaderMenu",
  computed: {
    ...mapState('weather', [
      'unit'
    ])
  },
  methods: {
    ...mapMutations('weather', [
      'changeUnits'
    ])
  }
}
</script>

<style lang="scss">
.menu-option {
  padding: 6px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.menu-option p {
  font-size: 14px;
}

.menu-option-units {
  display: flex;
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
