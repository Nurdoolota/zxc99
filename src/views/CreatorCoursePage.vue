<template>
  <div class="create-course-page">
    <h2 class="title">Создать курс</h2>
    <form @submit.prevent="createCourse">
      <form-input v-model="courseData.name" label="Название" required />
      <form-input v-model="courseData.description" label="Описание" required />
      <form-button type="submit" label="Создать" />
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";

export default {
  components: {
    FormInput,
    FormButton,
  },
  data() {
    return {
      courseData: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    async createCourse() {
      try {
        const response = await fetch("/api/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.courseData),
        });
        if (response.ok) {
          console.log("Курс успешно создан");
          // Реализуйте редирект или другую необходимую логику после создания курса
        } else {
          throw new Error("Ошибка при создании курса");
        }
      } catch (error) {
        console.error("Ошибка при создании курса", error);
      }
    },
  },
};
</script>

<style scoped>
.create-course-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-bottom: 10px;
}
</style>
