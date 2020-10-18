<template>
  <b-row fluid align-v="center">
    <b-col sm="4" class="px-0"> <Chatlist /> </b-col
    ><b-col sm="8" class="px-0 right">
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
</template>

<script>
// import { mapGetters, mapActions, mapGetters } from "vuex";
import Chatlist from "../components/Chatlist.vue";
import Chat from "../components/Chat";
export default {
  name: "Main",
  components: {
    Chatlist,
    Chat,
  },
  data() {
    return {
      // coordinate: {
      //   lat: 0,
      //   lng: 0,
      // },
      // search: "",
      // edit: false,
    };
  },
  computed: {
    // ...mapGetters({
    //   userList: "getUserList",
    //   friendList: "getFriendList",
    //   user: "user",
    //   user_id: "getUserId",
    //   allRoom: "getAllRoom",
    //   roomById: "getRoomById",
    // }),
  },
  created() {
    // this.$getLocation()
    //   .then((coordinates) => {
    //     this.coordinate = {
    //       lat: coordinates.lat,
    //       lng: coordinates.lng,
    //     };
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
    // this.getRoomById();
  },
  methods: {
    // ...mapActions([
    //   "getAllRoom",
    //   "searchUserByEmail",
    //   "inviteFriends",
    //   "getUserFriendList",
    //   "logout",
    //   "getRoomById",
    // ]),
    // ...mapMutations(["searchMutation"]),
    // searchFriends() {
    //   this.searchMutation(this.search);
    //   this.searchUserByEmail();
    // },
    // inviteFriend(data) {
    //   const setData = {
    //     user_id: this.user.user_id,
    //     friend_id: data,
    //   };
    //   console.log(setData);
    //   this.inviteFriends(setData)
    //     .then((response) => {
    //       this.$bvToast.toast(response.data.msg, {
    //         title: "Status :",
    //         autoHideDelay: 500,
    //         appendToast: true,
    //       });
    //     })
    //     .catch((error) => {
    //       this.$bvToast.toast(error.data.msg, {
    //         title: "Status :",
    //         autoHideDelay: 500,
    //         appendToast: true,
    //       });
    //     });
    // },
    // getTheUserId() {
    //   console.log(this.user.user_id);
    // },
    // editProfile() {
    //   this.edit = true;
    // },
    // clickMarker(position) {
    //   console.log(position);
    //   console.log(position.latLng.lat());
    //   console.log(position.latLng.lng());
    //   this.coordinate = {
    //     lat: position.latLng.lat(),
    //     lng: position.latLng.lng(),
    //   };
    // },
    // showModalFriendList() {
    //   this.$bvModal.show("modalShowFriendList");
    //   this.getUserFriendList(this.user.user_id);
    // },
    // getAllRoomChat(data) {
    //   console.log(data);
    //   const result = {
    //     user_id: this.user.user_id,
    //     friend_id: data,
    //   };
    //   this.getAllRoom(result);
    // },
    // getRoomChatById(data) {
    //   console.log(data);
    //   const result = {
    //     user_id: this.user.user_id,
    //     friend_id: data,
    //   };
    //   this.getRoomById(result);
    // },
  },
};
</script>

<style scoped>
.headerChat {
  padding: 7px 10px;
  background-color: white;
}

.right {
  color: #7e98df;
  text-align: center;
  height: 100vh;
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

.edit-option {
  font-family: "Rubik", sans-serif;
  text-align: left;
  color: black;
  width: 100%;
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
.button-option:hover {
  cursor: pointer;
  width: auto;
  /* height: 50px; */
  color: white;
  background-color: #7e98df;
  border-radius: 20px;
}
.column {
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.containerChatList {
  overflow: auto;

  height: 345px;
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

.search {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  text-align: center;

  /* border-radius: 20px; */
}
</style>
