<template>
  <div>
    <h2 class="title">Изменить курс</h2>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(updateCourse)" class="form">
        <ValidationProvider
          class="form__validator"
          rules="required"
          v-slot="{ errors }"
        >
          <form-input
            class="form__input"
            v-model.trim="course.name"
            label="Название"
            name="name"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form__validator"
          rules="required"
          v-slot="{ errors }"
        >
          <form-input
            class="form__input"
            v-model.trim="course.description"
            label="Описание"
            name="description"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <form-button type="submit" label="Сохранить" />
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";

extend("required", {
  ...required,
  message: "Поле {_field_} обязательно для заполнения",
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    FormInput,
    FormButton,
  },
  data() {
    return {
      course: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    async updateCourse() {
      // Отправка запроса на сервер для обновления курса
      try {
        // Ваш код для отправки запроса на сервер с обновленными данными курса
        // используйте this.course для получения данных из формы
        // Обработка успешного обновления курса
        console.log("Курс успешно обновлен");
      } catch (error) {
        console.error("Ошибка при обновлении курса", error);
      }
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

.form__validator {
  text-align: center;
}
</style>
