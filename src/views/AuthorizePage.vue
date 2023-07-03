<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent method="post">
        <ValidationProvider
          class="form__validator"
          rules="required"
          v-slot="{ errors }"
        >
          <form-input class="form__input" v-model.trim="email" label="Почта" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form__validator"
          rules="required"
          v-slot="{ errors }"
        >
          <form-input
            class="form__input"
            v-model.trim="password"
            label="Пароль"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <form-button @click="handleSubmit(login)" label="Войти" />

        <form-button
          @click="$router.push({ name: 'registration' })"
          label="Регистрация"
        />

        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import authentication from "@/mixins/authentication";

export default {
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
  mixins: [authentication],
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.sendPostRequest(
          {
            email: this.email,
            password: this.password,
          },
          "http://localhost:3000/authentication/log-in"
        );
        if (response.ok) {
          this.$router.push({ name: "courses" });
        } else if (response.status === 401) {
          throw Error("Ошибка авторизации: неверный email или пароль");
        } else {
          throw Error("Неизвестная ошибка");
        }
      } catch (error) {
        this.error = error.message;
        console.log(error);
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
