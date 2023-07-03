<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent class="form" method="post">
        <ValidationProvider
          class="form__validator"
          rules="required|email"
          v-slot="{ errors }"
        >
          <form-input v-model.trim="email" label="Почта" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form__validator"
          rules="required"
          v-slot="{ errors }"
        >
          <form-input v-model.trim="name" label="Логин" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form__validator"
          rules="required|min:7"
          vid="confirmation"
          v-slot="{ errors }"
        >
          <form-input v-model.trim="password" label="Пароль" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form__validator"
          rules="required|confirmed:confirmation"
          v-slot="{ errors }"
        >
          <form-input
            v-model.trim="confirmPassword"
            label="Подтверждение пароля"
          />
          <span class="form__error-message">{{ errors[0] }}</span>
        </ValidationProvider>
        <form-button
          @click="handleSubmit(register)"
          label="Зарегистрироваться"
        />
        <p v-if="error" class="form__error-message">{{ error }}</p>
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
  name: "RegistrationPage",
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
  mixins: [authentication],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.sendPostRequest(
          {
            email: this.email,
            name: this.name,
            password: this.password,
          },
          "http://localhost:3000/authentication/register"
        );
        console.log(await response.json());
        if (response.ok) {
          this.$router.push({ name: "authorization" });
        } else if (response.status === 400) {
          throw Error("Ошибка регистрации: Такой пользователь уже существует");
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

<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form__validator {
  text-align: center;
}
</style>
