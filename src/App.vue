<template>
  <div id="app">
    <!-- <loading-screen :is-loading="isLoading"></loading-screen> -->
    <router-view />
  </div>
</template>

//
<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import splashScreen from "./components/splashScreen.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  // data() {
  //   return {
  //     isLoading: true,
  //   };
  // },
  // mounted() {
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 5000);
  // },
  methods: {
    ...mapActions(["interceptorRequest", "interceptorResponse"]),
  },
  created() {
    this.interceptorRequest();
    this.interceptorResponse();
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap");
html,
body {
  font-family: "Rubik", sans-serif;
  background-color: #f6f7f8;
  margin: 0;
  padding: 0;
}
</style>
