<template>
  <form @submit="submit">
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
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "HeaderForm",
  computed: mapState({
    value: "form/value",
    inputIsValid: "form/inputIsValid"
  }),
  methods: {
    ...mapMutations({
      updateFormValue: "form/updateValue"
    }),
    ...mapActions({
      submitForm: "form/submitForm"
    }),
    updateValue(e) {
      this.updateFormValue(e.target.value);
    },
    submit(e) {
      e.preventDefault();
      this.submitForm();
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
