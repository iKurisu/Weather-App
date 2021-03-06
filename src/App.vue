<template>
  <div :class="['main', background]">
    <TheHeader />
    <TheWeather />
    <TheForecast />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TheHeader from "./components/TheHeader";
import TheWeather from "./components/TheWeather";
import TheForecast from "./components/TheForecast";

export default {
  name: "App",
  components: {
    TheHeader,
    TheWeather,
    TheForecast
  },
  data() {
    return {
      background: ""
    };
  },
  computed: {
    ...mapGetters({
      currentWeather: "weather/currentWeather"
    })
  },
  watch: {
    currentWeather() {
      const { temperature, main } = this.currentWeather;

      if (temperature > 20 && main === "clear") {
        this.background = "warm";
      } else {
        this.background = main;
      }
    }
  },
  created() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { coords: place } = position;
        this.setWeatherFromCoords(place);
      }, this.loadDefaultCity);
    } else {
      this.loadDefaultCity();
    }
  },
  methods: mapActions({
    setWeatherFromCoords: "weather/setWeatherFromCoords",
    loadDefaultCity: "loadDefaultCity"
  })
};
</script>

<style lang="scss">
$color-warm-1: rgb(255, 219, 121);
$color-warm-2: rgb(255, 140, 87);

$color-clear-1: rgb(132, 189, 255);
$color-clear-2: rgb(36, 119, 228);

$color-clouds-1: rgb(195, 212, 214);
$color-clouds-2: rgb(140, 168, 236);

$color-rain-1: rgb(195, 212, 214);
$color-rain-2: rgb(92, 114, 167);

$color-snow-1: rgb(223, 213, 204);
$color-snow-2: rgb(144, 182, 218);

@mixin background($color-1, $color-2) {
  background: linear-gradient(to top, $color-1, $color-2);
}

.warm {
  @include background($color-warm-1, $color-warm-2);
}

.rain {
  @include background($color-rain-1, $color-rain-2);
}

.clear {
  @include background($color-clear-1, $color-clear-2);
}

.snow {
  @include background($color-snow-1, $color-snow-2);
}

.clouds {
  @include background($color-clouds-1, $color-clouds-2);
}

.main {
  height: calc(100vh - 20vw);
  min-height: 67vh;
}

@media (min-width: 1000px) {
  .main {
    height: calc(100vh - 16vw);
    min-height: 70vh;
  }
}

@media (min-width: 1366px) {
  .main {
    height: calc(100vh - 14vw);
    min-height: 76vh;
  }
}
</style>
