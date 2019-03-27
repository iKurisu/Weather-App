<template>
<div class="-full-width -top">
  <div class="header">
    <div class="header-icon" @click="toggleForm">
      <img :src="add" />
    </div>
    <div 
      class="header-location" 
      @click="toggleList"
      v-if="!formIsActive"
    >
      <p v-if="city">
        {{ upperCase(city) }}
        <span>{{ upperCase(countryName()) }}</span>
      </p>
    </div>
    <div class="header-list" v-if="listIsActive">
      <ul>
        <li v-for="place in places">
          {{ place }}
        </li>
      </ul>
    </div>
    <form v-if="formIsActive" @submit="submitForm">
      <input 
        :class="{'header-form--error': !inputIsValid}" 
        type="text" 
        v-model="formValue" 
        placeholder="City, Country Code"
      />
    </form>
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
      listIsActive: false,
      formValue: ''
    }
  },
  computed: {
    ...mapState({
      city: ({ weather }) => weather && weather.data.name,
      countryCode: ({ weather}) => weather && weather.data.sys.country,
      places: ({ places }) => places,
      formIsActive: ({ formIsActive }) => formIsActive,
      inputIsValid: ({ inputIsValid }) => inputIsValid
    })
  },
  methods: {
    countryName() {
      return getCountry(this.countryCode);
    },
    upperCase(str) {
      return str.toUpperCase();
    },
    toggleForm() {
      this.$store.commit('toggleForm');
      this.$store.commit('setInput', true);
      this.formValue = '';
    },
    toggleList() {
      this.listIsActive = !this.listIsActive;
    },
    submitForm(e) {
      e.preventDefault();
      const place = this.formValue.split(', ');
      this.$store.dispatch('addPlace', place);
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

.header input {
  max-width: 19vh;
}

.header-form--error {
  background: #c86564d2;
}

.-top {
  position: absolute;
  top: 0;
}
</style>


