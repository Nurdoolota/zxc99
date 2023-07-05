export default {
  data() {
    return {};
  },
  methods: {
    async sendRequest(request, url, data = {}) {
      console.log(data);
      const requestOptions = {
        method: request,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      if (request === "POST") {
        requestOptions.body = JSON.stringify(data);
        console.log(data);
      }

      return fetch(url, requestOptions);
    },
    async sendGetRequest(url) {
      return await this.sendRequest(
        "GET",
        `${process.env.VUE_APP_BACKEND_URL}${url}`
      );
    },
    async sendPostRequest(url, data = {}) {
      return await this.sendRequest(
        "POST",
        `${process.env.VUE_APP_BACKEND_URL}${url}`,
        data
      );
    },
  },
};
