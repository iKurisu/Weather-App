<template>
  <div class="-full-width -top">
    <div class="header">
      <div class="header-icon" @click="toggleForm">
        <img :src="add" />
      </div>
      <div v-show="!formIsActive" class="header-location" @click="toggleList">
        <p v-if="city">
          {{ city.toUpperCase() }}
          <span>{{ countryName().toUpperCase() }}</span>
        </p>
      </div>
      <HeaderList v-show="listIsActive" :toggle-list="toggleList" />
      <HeaderForm v-show="formIsActive" />
      <div class="header-icon" @click="toggleMenu">
        <img :src="hamburger" />
      </div>
      <HeaderMenu v-show="menuIsActive" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getCountry } from "../utils/country";
import HeaderForm from "./header/Form";
import HeaderList from "./header/List";
import HeaderMenu from "./header/Menu";
import add from "../assets/icons/add.svg";
import hamburger from "../assets/icons/hamburger.svg";

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
    };
  },
  computed: {
    ...mapGetters({
      city: "weather/city",
      countryCode: "weather/countryCode"
    }),
    ...mapState({
      formIsActive: state => state.form.formIsActive
    })
  },
  methods: {
    ...mapActions({
      toggleForm: "form/toggleForm"
    }),
    countryName() {
      return getCountry(this.countryCode);
    },
    toggleList() {
      this.listIsActive = !this.listIsActive;
    },
    toggleMenu() {
      this.menuIsActive = !this.menuIsActive;
    }
  }
};
</script>

<style lang="scss">
.header {
  margin: 0 9vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-location,
.header-icon {
  cursor: pointer;
}

.header-location p {
  color: #fff;
  font-size: 14px;
}

.header-icon {
  width: 15px;
}

.header p span,
.header li span {
  opacity: 0.75;
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
