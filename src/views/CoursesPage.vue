<template>
  <div class="courses">
    <h1 class="courses__title">Курсы</h1>
    <button class="courses__button" @click="logOut">Выход</button>
    <div class="courses__list">
      <course-element
        class="courses__item"
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import CourseElement from "@/components/CourseElement.vue";
import authentication from "../mixins/authentication";
export default {
  components: {
    CourseElement,
  },
  mixins: [authentication],
  data() {
    return {
      courses: [],
      error: null,
    };
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    async logOut() {
      try {
        const response = await this.sendPostRequest(
          {
            email: this.email,
            password: this.password,
          },
          "http://localhost:3000/authentication/log-out"
        );

        if (response.ok) {
          this.$router.push("/authorization");
        } else {
          throw new Error("Ошибка при выходе");
        }
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async getCourses() {
      try {
        const response = await this.sendGetRequest(
          "http://localhost:3000/subjects/"
        );

        if (!response.ok) {
          throw new Error("Ошибка при получении курсов");
        }

        this.courses = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.courses {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.courses__title {
  margin: 0px 0px 10px 0px;
}
.courses__button {
  margin: 0px 0px 10px 0px;
}
.courses__list {
}
.courses__item {
}

.courses__item:not(:last-child) {
  margin: 0px 0px 10px 0px;
}
</style>
