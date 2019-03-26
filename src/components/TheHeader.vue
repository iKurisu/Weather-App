<template>
<div class="-full-width -top">
  <div class="header">
    <div class="header-icon">
      <img :src="add" />
    </div>
    <div class="header-location" @click="toggleList">
      <p v-if="city">
        {{ upperCase(city) }}
        <span>{{ upperCase(countryName()) }}</span>
      </p>
    </div>
    <div class="header-icon">
      <img :src="hamburger" />
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { getCountry } from '../utils/country';
import add from '../assets/icons/add.svg';
import hamburger from '../assets/icons/hamburger.svg';

export default {
  name: "TheHeader",
  data() {
    return {
      add,
      hamburger,
      listIsActive: false
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
    },
    toggleList() {
      this.listIsActive = !this.listIsActive;
    }
  }
}
</script>

<style lang="scss">
.header {
  margin: 0 5%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-location, .header-icon {
  cursor: pointer;
}

.header p {
  color: #fff;
  font-size: 14px;
}

.header-icon {
  width: 4.5vw;
  max-width: 6vh;
}

.header p span {
  opacity: .75;
}

.-top {
  position: absolute;
  top: 0;
}
</style>


