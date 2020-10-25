<template>
  <!-- <b-container-fluid> -->
  <b-row fluid align-v="center" align-h="between">
    <b-col sm="4"> <Chatlist /> </b-col
    ><b-col sm="8" class="right">
      <Chat />

      <!-- =====================If any friends chat room exist================================= -->
      <!-- <b-row style="height: 100%" align-v="center"
        ><b-col
          ><h4>Please select a chat to start messaging</h4>
          <br />
          <img src="../assets/live-chat.png" alt=""
        /></b-col>
      </b-row> -->
      <!-- =====================If any friends chat room exist================================= -->
    </b-col>
  </b-row>
  <!-- </b-container-fluid> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Chatlist from "../components/Chatlist.vue";
import Chat from "../components/Chat";
export default {
  name: "Main",
  components: {
    Chatlist,
    Chat,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ user: "user" }),
  },
  created() {
    this.getAllRoom(this.user.user_id);
  },
  methods: {
    ...mapActions(["getAllRoom"]),
  },
};
</script>

<style scoped>
.right {
  color: #7e98df;
  text-align: center;
  height: 100%;
  background-color: #fafafa;
}

/* ============================================= */
.content-wrapper {
  font-family: "Rubik", sans-serif;
  /* color: ; */
  padding: 10px;
  height: 100vh;
  background-color: white;
}

.container-header {
  font-size: 29px;
  color: #7e98df;
  font-weight: 1000;
  margin-bottom: 10px;
  padding: 10px;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.button-option {
  background-color: white;
  border-radius: 20px;
  margin: 0px 2px;
  text-align: center;
  border: 1px solid white;
}

.text {
  text-align: center;
  margin-top: 10px;
}

.text p {
  color: grey;
}

input[type="search"] {
  padding: 1px;
  font-family: "Rubik", sans-serif;
  border: 1px solid #fafafa;
  background: rgb(219, 215, 215);
  border-radius: 15px;
  line-height: 1.5;
}
</style>
