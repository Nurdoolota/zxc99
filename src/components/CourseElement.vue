<template>
  <a href="" class="course">
    <div class="course__name">Курс: {{ course.name }}</div>
    <div class="course__author">Описание: {{ course.describtion }}</div>
  </a>
</template>

<script>
export default {
  props: {
    course: Object,
  },
};
</script>
<style scoped>
.course {
  display: flex;
  flex-direction: column;
  border: 2px solid #7a956b;
}
.course__name {
}
.course__author {
}
</style>
