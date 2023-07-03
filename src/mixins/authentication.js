export default {
  methods: {
    async sendPostRequest(data, url) {
      console.log(data);
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    },

    async sendGetRequest(url) {
      return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    },
  },
};
