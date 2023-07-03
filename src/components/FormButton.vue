<template>
  <div>
    <button @click="click">{{ label }}</button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped></style>
