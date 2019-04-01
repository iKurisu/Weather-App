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
    <div class="header-icon" @click="toggleMenu">
      <img :src="hamburger" />
    </div>
    <HeaderMenu v-show="menuIsActive" />
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getCountry } from '../utils/country';
import HeaderForm from './HeaderForm';
import HeaderList from './HeaderList';
import HeaderMenu from './HeaderMenu';
import add from '../assets/icons/add.svg';
import hamburger from '../assets/icons/hamburger.svg';

export default {
  name: "TheHeader",
  components: {
    HeaderList,
    HeaderForm,
    HeaderMenu
  },
  data() {
    return {
      add,
      hamburger,
      listIsActive: false,
      menuIsActive: false
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
    toggleMenu() {
      this.menuIsActive = !this.menuIsActive;
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
  width: 15px;
}

.header p span, .header li span {
  opacity: .75;
}

@media (min-width: 768px) {
  .header {
    margin: 0 7%;
  }

  .header-location p {
    font-size: 16px;
  }

  .header-icon {
    width: 17px;
  }
}
</style>


