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
    <div class="header-list -center -text-center" v-if="listIsActive">
      <ul v-if="places.length > 0">
        <li 
          v-for="{place, id} in places" 
          :key="id" 
          @click="setPlace(place)"
        >
          {{ place[0].toUpperCase() }} 
          <span>{{ place[1].toUpperCase() }}</span>
        </li>
      </ul>
      <p v-else>Empty</p>
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

.header p span, .header li span {
  opacity: .75;
}

.header input {
  max-width: 19vh;
}

.header-form--error {
  background: #c86564d2;
}

.header-list {
  background: #fff;
  width: 42vw;
  max-height: 27vh;
  overflow-y: scroll;
  position: absolute;
  top: 10vh;
  border-radius: 5px;
  box-shadow: 0 2px 7px .2px rgba(0, 0, 0, .2);
}

.header-list p {
  color: #1a1a1a;
  font-style: italic;
  cursor: default;
}

.header-list li {
  cursor: pointer;
  list-style: none;
}

.header-list li:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.header-list {
  p, li {
    font-size: 14px;
    padding: 6px 0;
  }
}

.-top {
  position: absolute;
  top: 0;
}
</style>


