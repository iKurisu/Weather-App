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
    value: state => state.form.value,
    inputIsValid: state => state.form.inputIsValid
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
  border-radius: 5px;
}

.header-form--error {
  background: #c86564d2;
}

@media (min-width: 768px) {
  .header input {
    width: 30vw;
    max-width: 40vh;
    font-size: 14px;
  }
}

@media (min-width: 1366px) {
  .header input {
    width: 260px;
  }
}
</style>
