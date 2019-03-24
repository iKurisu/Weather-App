<template>
  <div class="forecast-container bottom">
    <div class="forecast">
      <div class="forecast-day" v-for="day in forecast" :key="day.dt">
        <img :src="getIcon(day)" />
      </div>
    </div>
  </div>
</template>

<script>
import { weekdays } from '../utils';

export default {
  name: "TheForecast",
  computed: {
    forecast() {
      return this.$store.state.forecasts;
    }
  },
  methods: {
    toCelsius(x) {
      return Math.round(x - 273.15) + "º";
    },
    getDay(day) {
      return weekdays[new Date(day.dt_txt).getDay() - 1];
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
  width: 100%;
  height: 26%;
}

.forecast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 11%;
}

.forecast-day {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.forecast-day p {
  font-family: 'Poppins';
  // align-self: flex-start;
}

.bottom {
  position: absolute;
  bottom: 0;
}
</style>

