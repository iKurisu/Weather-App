<template>
    <div class="header-icon">
      <img :src="add" />
    </div>
    <p v-if="city">
      {{ upperCase(city) }} 
      <span>{{ upperCase(countryName()) }}</span>
    </p>
  </div>
    <div class="header-icon">
      <img :src="hamburger" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import add from '../assets/icons/add.svg';
import hamburger from '../assets/icons/hamburger.svg';

export default {
  name: "TheHeader",
  data() {
    return {
      add,
      hamburger
    }
  },
  computed: {
    ...mapState({
      city: ({ weather }) => weather && weather.data.name,
      countryCode: ({ weather}) => weather && weather.data.sys.country
    })
  },
  methods: {
    countryName() {
      return getCountry(this.countryCode);
    },
    upperCase(str) {
      return str.toUpperCase();
    }
  }
}
</script>

<style lang="scss">
.header {
  width: 100%;
}

.header p {
  color: #fff;
  font-size: 14px;
}

.header p span {
  opacity: .75;
}

.top {
  position: absolute;
  top: 0;
}
</style>


