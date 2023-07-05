<template>
  <div class="course-element">
    <h3>{{ course.name }}</h3>
    <p>{{ course.description }}</p>
    <form-button @click="deleteCourse" label="Удалить курс" />
  </div>
</template>

<script>
import FormButton from "@/components/FormButton.vue";

export default {
  props: {
    course: {
      course: Object,
    },
  },
  components: {
    FormButton,
  },
  methods: {
    async deleteCourse() {
      try {
        const response = await fetch(`/api/courses/${this.course.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Курс успешно удален");
          this.$emit("course-deleted");
        } else {
          throw new Error("Ошибка при удалении курса");
        }
      } catch (error) {
        console.error("Ошибка при удалении курса", error);
      }
    },
  },
};
</script>
