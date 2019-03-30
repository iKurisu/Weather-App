<template>
  <div class="forecast-container -full-width -bottom">
    <div class="forecast">
      <div class="forecast-day" v-for="day in forecasts" :key="day.dt">
        <p class="forecast-day-header">{{ getDay(day) }}</p>
        <img :src="getIcon(day)" />
        <p class="forecast-day-temp">{{ toCelsius(day.main.temp_max) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { weekdays } from '../utils';
import { icon } from '../utils/icons';

export default {
  name: "TheForecast",
  computed: {
    ...mapState('weather', [
      'forecasts'
    ])
  },
  methods: {
    toCelsius(x) {
      return Math.round(x - 273.15) + "º";
    },
    getDay(day) {
      return weekdays[new Date(day.dt_txt).getDay()];
    },
    getIcon(day) {
      return icon[day.weather[0].main];
    }
  }
}
</script>

<style lang="scss">
.forecast-container {
  background: #fff;
  height: 25%;
}

.forecast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 5%;
}

.forecast-day {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: .8;
}

.forecast-day img {
  width: 47%;
  height: auto;
}

.forecast-day p {
  margin: 3px 0;
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

