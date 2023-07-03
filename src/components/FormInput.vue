<template>
  <div>
    <div class="form">
      <label>{{ label }}</label>
      <input :value="value" @input="input" type="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    value: String,
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
