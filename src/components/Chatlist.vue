<template>
  <div class="content-wrapper">
    <b-sidebar id="editProfile" bg-variant="light" title="@wdlam" width="35%">
      <div class="px-3 py-2 text-center">
        <b-avatar size="3em">{{ user.user_image }} </b-avatar>
        <h6>{{ user.user_name }}</h6>
        <p>@wdlam</p>

        <div class="edit-option"><h5>Account</h5></div>
        <div class="edit-option">
          {{ user.user_phone }}
          <p @click="$bvModal.show('modalEditPhone')">
            Tap to change phone number
          </p>
          <!-- ==============================Modal Edit Phone Start====================== -->
          <b-modal id="modalEditPhone">
            <template v-slot:modal-header>Edit phone number</template>
            <b-form v-on:submit.prevent="searchFriends()">
              <b-input
                v-model="search"
                placeholder="search friends..."
                type="search"
              ></b-input>
            </b-form>
            <template v-slot:modal-footer></template>
          </b-modal>
          <!-- ==============================Modal Edit Phone Ends====================== -->
        </div>
        <hr />
        <div class="edit-option">
          @Wdlam
          <p>username</p>
        </div>
        <hr />
        <div class="edit-option">
          {{ user.user_bio }}
          <p>Bio</p>
        </div>
        <div class="edit-option">
          <h5>Location</h5>
          <GmapMap
            :center="coordinate"
            :zoom="15"
            map-type-id="terrain"
            style="width: 400px; height: 275px"
          >
            <GmapMarker
              :position="coordinate"
              @click="clickMarker"
              :clickable="true"
              :draggable="true"
              icon="https://img.icons8.com/color/48/000000/map-pin.png"
            />
          </GmapMap>
        </div>
        <div class="edit-option"><h5>Edit Profile</h5></div>
      </div>
    </b-sidebar>
    <div class="outer-container">
      <div class="container-header">
        <div class="top">Telegram</div>
        <div
          class="top"
          id="Settings"
          style="cursor: pointer"
          variant="primary"
        >
          <img src="../assets/Menu.png" alt="" />
        </div>
      </div>
      <div v-if="user.user_image !== ''" class="text-center">
        <b-avatar size="3em">{{ user.user_image }}</b-avatar>
      </div>
      <div v-if="user.user_image === ''" class="text-center">
        <img style="max-width: 3em" src="../assets/account.png" alt="" />
      </div>
      <div class="text">
        <h5>
          <strong> {{ user.user_name }}</strong>
        </h5>
        <p>@wdiam</p>
      </div>
      <div class="search">
        <div style="margin-right:10px">
          <input placeholder="Type your message..." type="search" />
        </div>

        <div>
          <img src="../assets/Plus.png" alt="" />
        </div>
      </div>
      <div class="column">
        <div><button class="button-option">All</button></div>
        <div><button class="button-option">Unread</button></div>
        <div><button class="button-option">Read</button></div>
      </div>

      <b-container style="over-flow: auto" fluid class="containerChatList px-0">
        <b-row
          class="text-center mb-2"
          align-h="between"
          v-for="(value, index) in roomById"
          :key="index"
          ><b-col
            ><img
              style="max-width: 2em"
              src="../assets/tony.jpg"
              alt=""/></b-col
          ><b-col style="font-size: 18px; font-weight: 500"
            ><b-row>{{ value.user_name }}</b-row
            ><b-row style="color: grey; font-size: 14px; font-weight: 400"
              >Why did you do that?</b-row
            ></b-col
          ><b-col class="text-center"
            ><b-row>15:20</b-row
            ><b-row><b-badge variant="info">99+</b-badge></b-row></b-col
          ></b-row
        >
      </b-container>
      <!-- ======================Popover Settings Start==================================== -->

      <b-popover placement="bottomleft" target="Settings" triggers=" hover">
        <template v-slot:title></template>
        <b-container style="cursor: pointer" fluid>
          <b-row v-b-toggle.editProfile>Settings</b-row>
          <b-row @click="showModalFriendList()">Contacts</b-row>
          <b-row>Save Messages</b-row>
          <b-row @click="$bvModal.show('modal-search-friend')"
            >Invite Friends</b-row
          >

          <b-row>Telegram FAQ</b-row>
          <b-row @click="logout">Logout</b-row>
        </b-container>
      </b-popover>
      <!-- =======================Popover Settings Ends=========================== -->
      <!-- ===========================Modal Get FriendList Start===================================== -->
      <b-modal id="modalShowFriendList">
        <template v-slot:modal-header>Friend List</template>

        <b-container>
          <b-row
            class="mt-3 text-center"
            v-for="(value, index) in friendList"
            :key="index"
            ><b-col><b-avatar size="2em"></b-avatar></b-col
            ><b-col>{{ value.user_name }}</b-col
            ><b-col @click="getRoomChatById(value.friend_id)"
              ><img src="../assets/Plus.png" alt="add friend"
            /></b-col>
          </b-row>
        </b-container>

        <template v-slot:modal-footer></template>
      </b-modal>
      <!-- ===========================Modal Get FriendList Ends===================================== -->
      <!-- ==============Modal search friend start================ -->

      <b-modal id="modal-search-friend">
        <template v-slot:modal-header>Search Friend</template>
        <b-form v-on:submit.prevent="searchFriends()">
          <b-input
            v-model="search"
            placeholder="search friends..."
            type="search"
          ></b-input>
          <b-container>
            <b-row
              class="mt-3 text-center"
              v-for="(value, index) in userList"
              :key="index"
              ><b-col><b-avatar size="2em"></b-avatar></b-col
              ><b-col>{{ value.user_name }}</b-col
              ><b-col @click="inviteFriend(value.user_id)"
                ><img src="../assets/Plus.png" alt="add friend"/></b-col
            ></b-row>
          </b-container>
        </b-form>
        <template v-slot:modal-footer></template>
      </b-modal>
      <!-- ==============Modal search friend Ends================ -->
    </div>
    <div v-show="edit" class="content-wrapper"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
// import Chatlist from "../components/Chatlist.vue";
export default {
  name: "Main",
  components: {
    // Chatlist,
  },
  data() {
    return {
      coordinate: {
        lat: 0,
        lng: 0,
      },
      search: "",
      edit: false,
    };
  },
  computed: {
    ...mapGetters({
      userList: "getUserList",
      friendList: "getFriendList",
      user: "user",
      user_id: "getUserId",
      allRoom: "getAllRoom",
      roomById: "getRoomById",
    }),
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng,
        };
      })
      .catch((error) => {
        alert(error);
      });
    // this.getRoomById();
  },
  methods: {
    ...mapActions([
      "getAllRoom",
      "searchUserByEmail",
      "inviteFriends",
      "getUserFriendList",
      "logout",
      "getRoomById",
    ]),
    ...mapMutations(["searchMutation"]),
    searchFriends() {
      this.searchMutation(this.search);
      this.searchUserByEmail();
    },
    inviteFriend(data) {
      const setData = {
        user_id: this.user.user_id,
        friend_id: data,
      };
      console.log(setData);
      this.inviteFriends(setData)
        .then((response) => {
          this.$bvToast.toast(response.data.msg, {
            title: "Status :",
            autoHideDelay: 500,
            appendToast: true,
          });
        })
        .catch((error) => {
          this.$bvToast.toast(error.data.msg, {
            title: "Status :",
            autoHideDelay: 500,
            appendToast: true,
          });
        });
    },
    getTheUserId() {
      console.log(this.user.user_id);
    },
    editProfile() {
      this.edit = true;
    },
    clickMarker(position) {
      console.log(position);
      console.log(position.latLng.lat());
      console.log(position.latLng.lng());
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng(),
      };
    },
    showModalFriendList() {
      this.$bvModal.show("modalShowFriendList");
      this.getUserFriendList(this.user.user_id);
    },
    getAllRoomChat(data) {
      console.log(data);
      const result = {
        user_id: this.user.user_id,
        friend_id: data,
      };
      this.getAllRoom(result);
    },
    getRoomChatById(data) {
      console.log(data);
      const result = {
        user_id: this.user.user_id,
        friend_id: data,
      };
      this.getRoomById(result);
    },
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
