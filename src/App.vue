<template>
  <div class="main">

    <TheForecast />
  </div>
</template>

<script>
import store from './store';
import TheForecast from './components/TheForecast';

export default {
  name: "App",
  components: {
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
  computed: {
    message: () => store.state.location ? 'We know were you live...' : 'Please activate location'
  }
}
</script>
