import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login.vue";
import Maps from "../views/Maps.vue";
import Register from "../views/auth/Register.vue";
import Forgot from "../views/auth/Forgot.vue";
import Main from "../views/Main.vue";
import store from "../store/index";
import Chat from '../views/chat.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresVisitor: true },
  },
  {
    path: "/maps",
    name: "Maps",
    component: Maps,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresVisitor: true },
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot,
    meta: { requiresVisitor: true },
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta: { requiresVisitor: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: "/main",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
