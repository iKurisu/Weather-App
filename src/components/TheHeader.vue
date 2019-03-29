<template>
<div class="-full-width -top">
  <div class="header">
    <div class="header-icon" @click="toggleForm">
      <img :src="add" />
    </div>
    <div 
      class="header-location" 
      @click="toggleList"
      v-show="!formIsActive"
    >
      <p v-if="city">
        {{ city.toUpperCase() }}
        <span>{{ countryName().toUpperCase() }}</span>
      </p>
    </div>
    <HeaderList v-show="listIsActive" :toggleList="toggleList" />
    <HeaderForm v-show="formIsActive" />
    <div class="header-icon">
      <img :src="hamburger" />
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getCountry } from '../utils/country';
import HeaderForm from './HeaderForm';
import HeaderList from './HeaderList';
import add from '../assets/icons/add.svg';
import hamburger from '../assets/icons/hamburger.svg';

export default {
  name: "TheHeader",
  components: {
    HeaderList,
    HeaderForm
  },
  data() {
    return {
      add,
      hamburger,
      listIsActive: false
    }
  },
  computed: {
    ...mapGetters('weather', [
      'city',
      'countryCode'
    ]),
    ...mapState('form', [
      'formIsActive'
    ])
  },
  methods: {
    countryName() {
      return getCountry(this.countryCode);
    },
    toggleList() {
      this.listIsActive = !this.listIsActive;
    },
    toggleForm() {
      this.$store.commit('form/toggleForm');
      this.$store.commit('form/setInput', true);
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

.header-location p {
  color: #fff;
  font-size: 14px;
}

.header-icon {
  width: 4.5vw;
  max-width: 6vh;
}

.header p span, .header li span {
  opacity: .75;
}

.-top {
  position: absolute;
  top: 0;
}
</style>


