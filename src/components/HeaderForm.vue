<template>
  <form @submit="submitForm">
    <input
      :class="{ 'header-form--error': !inputIsValid }"
      type="text"
      :value="value"
      placeholder="City, Country Code"
      @input="updateValue"
    />
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HeaderForm",
  computed: {
    ...mapState("form", ["value", "inputIsValid"])
  },
  methods: {
    updateValue(e) {
      this.$store.commit("form/updateValue", e.target.value);
    },
    submitForm(e) {
      e.preventDefault();
      this.$store.dispatch("form/submitForm");
    }
  }
};
</script>

<style lang="scss">
.header input {
  max-width: 19vh;
  padding: 7px 25px;
}

.header-form--error {
  background: #c86564d2;
}
</style>
