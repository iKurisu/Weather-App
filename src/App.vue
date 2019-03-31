<template>
  <div class="main">
    <TheHeader />
    <TheWeather />
    <TheForecast />
  </div>
</template>

<script>
import store from './store';
import TheHeader from './components/TheHeader';
import TheWeather from './components/TheWeather';
import TheForecast from './components/TheForecast';

export default {
  name: "App",
  components: {
    TheHeader,
    TheWeather,
    TheForecast
  },
  store,
  created() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { coords: place } = position;
        store.dispatch('weather/setWeatherFromCoords', place);
      })
    }
  },
}
</script>

<style lang="scss">
.main {
  background: #65a8a6;
  height: 100vh;
}
</style>
