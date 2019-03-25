<template>
  <div class="main">
    <TheHeader />
    <TheForecast />
  </div>
</template>

<script>
import store from './store';
import TheHeader from './components/TheHeader';
import TheForecast from './components/TheForecast';

export default {
  name: "App",
  components: {
    TheHeader,
    TheForecast
  },
  store,
  created() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        store.dispatch('setData', position)
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
