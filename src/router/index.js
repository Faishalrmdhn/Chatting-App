import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login.vue";
import Maps from "../views/RealTime.vue";
import Register from "../views/auth/Register.vue";
import Forgot from "../views/auth/Forgot.vue";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/maps",
    name: "Maps",
    component: Maps,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
