<template>
  <form @submit="submitForm">
    <input 
      :class="{'header-form--error': !inputIsValid}" 
      type="text" 
      v-model="formValue" 
      placeholder="City, Country Code"
    />
  </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "HeaderForm",
  data() {
    return {
      formValue: ''
    }
  },
  computed: {
    ...mapState({
      inputIsValid: ({ inputIsValid }) => inputIsValid
    })
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      const place = this.formValue.split(', ');
      this.$store.dispatch('addPlace', place);
    }
  }
}
</script>

<style lang="scss">
.header input {
  max-width: 19vh;
}

.header-form--error {
  background: #c86564d2;
}
</style>
