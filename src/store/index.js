import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/auth";
import Users from "./modules/users";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Auth, Users },
  state: {},
  mutation: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ["Auth.user", "Auth.user_id", "Users.user", " Users.roomById"],
      storage: window.sessionStorage,
    }),
  ],
});
