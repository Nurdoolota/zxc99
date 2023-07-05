<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent class="form" method="post">
        <ValidationProvider
          class="form__validator"
          rules="required|email"
          v-slot="{ errors }"
        >
          <form-input v-model.trim="dataReg.email" label="Почта" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form__validator"
          rules="required"
          v-slot="{ errors }"
        >
          <form-input v-model.trim="dataReg.name" label="Логин" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form__validator"
          rules="required|min:7"
          vid="confirmation"
          v-slot="{ errors }"
        >
          <form-input
            v-model.trim="dataReg.password"
            label="Пароль"
            type="password"
          />
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
            type="password"
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
      dataReg: {
        name: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.sendPostRequest(
          "authentication/register",
          this.dataReg
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
