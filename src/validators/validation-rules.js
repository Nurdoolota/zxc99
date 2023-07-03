import { extend } from "vee-validate";
import { required, email, confirmed } from "vee-validate/dist/rules";

extend("confirmed", {
  ...confirmed,
  message: "Пароли должны совпадать",
});

extend("required", {
  ...required,
  message: "Это поле обязательно",
});

extend("min", {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ["length"],
  message: `Минимальная длина пароля {length} символов`,
});

extend("email", { ...email, message: "Неккоректные данные" });
