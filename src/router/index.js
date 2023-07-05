import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import CoursesPage from "@/views/CoursesPage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import rAuth from "./rAuth";
import authentication from "@/mixins/authentication";
import PersonalPage from "@/views/PersonalPage";
import CreatorCoursePage from "@/views/CreatorCoursePage";
import EditCoursePage from "@/views/EditCoursePage";

Vue.use(VueRouter);

const routes = [
  ...rAuth,
  {
    path: "/",
    name: "courses",
    component: CoursesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    name: "error",
    component: ErrorPage,
  },
  {
    path: "/personal",
    name: "personal",
    component: PersonalPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/createcourse",
    name: "createcourse",
    component: CreatorCoursePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/editcourse",
    name: "editcourse",
    component: EditCoursePage,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

console.log(process.env.BASE_URL);

router.beforeEach(async (to, from, next) => {
  const response = await authentication.methods.sendGetRequest(
    "authentication"
  );
  if (response.ok) store.commit("mAuth/changeAuth", true);
  else store.commit("mAuth/changeAuth", false);

  if (to.meta.requiresAuth)
    if (store.state.mAuth.isAuthenticated) next();
    else next({ name: "authorization" });
  else if (to.meta.guest)
    if (!store.state.mAuth.isAuthenticated) next();
    else next(from);
  else next();
});

export default router;
