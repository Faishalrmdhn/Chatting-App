<template>
  <b-row fluid>
    <b-col sm="4"><Chatlist class="left px-0"/></b-col
    ><b-col sm="8"
      ><div class="right"><h1>main page</h1></div></b-col
    >
  </b-row>
</template>

<script>
import Chatlist from "../components/Chatlist.vue";
export default {
  name: "Main",
  components: {
    Chatlist,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* .left {
  padding: 0px;
  position: relative;
  left: 0px;
} */

.right {
  height: 100vh;
  background-color: #fafafa;
  position: relative;
  right: 0px;
  padding: 0px;
}
</style>
