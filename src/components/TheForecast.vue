<template>
  <div class="forecast-container -full-width -bottom">
    <div class="forecast">
      <div
        v-for="{ day, weather, temperature, id } in forecasts"
        :key="id"
        class="forecast-day"
      >
        <p class="forecast-day-header">{{ getDay(day) }}</p>
        <img :src="getIcon(weather)" />
        <p class="forecast-day-temp">{{ temperature }}º</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { weekdays } from "../utils";
import { icon } from "../utils/icons";

export default {
  name: "TheForecast",
  computed: {
    ...mapGetters("weather", ["forecasts"])
  },
  methods: {
    getDay(day) {
      return day === "NOW" ? day : weekdays[new Date(day).getDay()];
    },
    getIcon(weather) {
      return icon[weather];
    }
  }
};
</script>

<style lang="scss">
.forecast-container {
  background: #fff5;
  height: 26%;
  max-height: 40vw;
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
  opacity: 0.73;
}

.forecast-day img {
  width: 28px;
  height: auto;
}

.forecast-day p {
  margin: 3px 0;
  color: #000;
}

.forecast-day-header {
  font-size: 14px;
  font-weight: 500;
}

.forecast-day-temp {
  font-size: 18px;
  transform: translateX(4px);
}

@media (min-width: 768px) {
  .forecast-container {
    height: 33%;
    max-height: 20vw;
  }

  .forecast {
    margin: 0 15%;
  }

  .forecast img {
    width: 34px;
  }

  .forecast-day-header {
    font-size: 16px;
  }

  .forecast-day-temp {
    font-size: 20px;
  }
}

@media (min-width: 1000px) {
  .forecast-container {
    height: 30%;
    max-height: 16vw;
  }

  .forecast {
    margin: 0 20%;
  }

  .forecast img {
    width: 36px;
  }
}

@media (min-width: 1366px) {
  .forecast-container {
    height: 24%;
    max-height: 14vw;
  }
}
</style>
