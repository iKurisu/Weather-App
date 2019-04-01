<template>
  <div class="forecast-container -full-width -bottom">
    <div class="forecast">
      <div 
        class="forecast-day" 
        v-for="{ day, weather, temperature, id } in forecasts" 
        :key="id"
      >
        <p class="forecast-day-header">{{ getDay(day) }}</p>
        <img :src="getIcon(weather)" />
        <p class="forecast-day-temp">{{ temperature }}º</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { weekdays } from '../utils';
import { icon } from '../utils/icons';

export default {
  name: "TheForecast",
  computed: {
    ...mapGetters('weather', [
      'forecasts'
    ])
  },
  methods: {
    getDay(day) {
      return day === 'NOW' ? day : weekdays[new Date(day).getDay()];
    },
    getIcon(weather) {
      return icon[weather];
    }
  }
}
</script>

<style lang="scss">
.forecast-container {
  background: #fff5;
  height: 25%;
}

.forecast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 10%;
}

.forecast-day {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: .8;
}

.forecast-day img {
  width: 28px;
  height: auto;
}

.forecast-day p {
  margin: 3px 0;
  color: #0a0a0a;
}

.forecast-day-header {
  font-size: 14px;
  font-weight: 500;
}

.forecast-day-temp {
  font-size: 18px;
  transform: translateX(4px);
}

.-bottom {
  position: absolute;
  bottom: 0;
}
</style>

