const mAuth = {
  namespaced: true,
  state: { isAuthenticated: false },
  getters: {},
  mutations: {
    changeAuth(state, payload) {
      state.isAuthenticated = payload;
    },
  },
  actions: {
    async logOut() {
      try {
        const response = await this.sendPostRequest("authentication/log-out");
        if (!response.ok) throw new Error("Ошибка при выходе");
        this.$router.push("/authorization");
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async getCourses() {
      try {
        const response = await this.sendGetRequest("subjects");
        if (!response.ok) throw new Error("Ошибка при получении курсов");
        this.courses = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async register() {
      try {
        const response = await this.sendPostRequest(
          "/authentication/register",
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
    async login() {
      try {
        const response = await this.sendPostRequest(
          `authentication/log-in`,
          this.dataAuth
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
  modules: {},
};

export default mAuth;
