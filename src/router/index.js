import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
import RegistrationPage from "@/views/RegistrationPage.vue";
import AuthorizePage from "@/views/AuthorizePage.vue";
import CoursesPage from "@/views/CoursesPage.vue";
import ErrorPage from "@/views/ErrorPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "courses",
    component: CoursesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/registration",
    name: "registration",
    component: RegistrationPage,
    meta: { guest: true },
  },
  {
    path: "/authorization",
    name: "authorization",
    component: AuthorizePage,
    meta: { guest: true },
  },
  {
    path: "*",
    name: "error",
    component: ErrorPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

async function sendGetRequest(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
}

router.beforeEach(async (to, from, next) => {
  const response = await sendGetRequest(
    "http://localhost:3000/authentication/"
  );
  if (response.ok) store.commit("changeAuth", true);
  else store.commit("changeAuth", false);

  if (to.matched.some((record) => record.meta.requiresAuth))
    if (store.state.isAuthenticated) next();
    else next({ name: "authorization" });
  else if (to.matched.some((record) => record.meta.guest))
    if (!store.state.isAuthenticated) next();
    else next(from);
  else next();
});

export default router;
