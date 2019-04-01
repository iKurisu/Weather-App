<template>
  <div class="weather-container">
    <div class="weather">
      <p class="weather-temperature">{{ weather.temperature }}<span>º</span></p>
      <p class="weather-description">{{ capitalize(weather.description) }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheWeather',
  computed: {
    ...mapGetters('weather', [
      'weather'
    ])
  },
  methods: {
    capitalize(str) {
      if (!str) return;

      const words = str.split(' ');
      const capitalizedWords = words.map(word => (
        word[0].toUpperCase() + word.slice(1)
      ))
      return capitalizedWords.join(' ');
    }
  }
}
</script>

<style lang='scss'>
.weather-container {
  width: 100%;
  position: absolute;
  top: 10vh;
}

.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7vh;
}

.weather p {
  color: #fff;
} 

.weather-temperature {
  font-size: 130px;
  transform: translateX(15.5px);
  opacity: .95;
}

.weather-temperature span {
  font-size: 70px;
  vertical-align: 43px;
}

.weather-temperature, .weather-temperature span {
  line-height: 100%;
}

.weather-description {
  font-size: 26px;
  opacity: .87;
  margin-top: 6vh;
  letter-spacing: .9px;
}
</style>