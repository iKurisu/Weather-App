<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
import store from './store';

export default {
  name: "App",
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
