<template>
  <div class="content-wrapper">
    <div class="outer-container">
      <div class="container-header">
        <div class="top">ChatHub</div>
        <!-- <div v-for="(value, index) in lastMessage" :key="index">
          <div>{{ value.chat }}</div>
        </div> -->
        <div
          class="top"
          id="Settings"
          style="cursor: pointer"
          variant="primary"
        >
          <img src="../assets/Menu.png" alt="" />
        </div>
      </div>

      <div class="text-center">
        <div v-if="user.profileImage !== ''">
          <img
            class="profileImage"
            :src="url_API + user.profileImage"
            alt="image profile"
          />
        </div>
        <div v-if="user.profileImage === ''">
          <img
            class="profileImage"
            src="../assets/default.png"
            alt="image default"
          />
        </div>
        <!-- <div>{{ room }}</div> -->
      </div>

      <div class="text">
        <h5>
          <strong> {{ user.user_name }}</strong>
        </h5>
        <p>{{ user.user_email }}</p>
      </div>
      <div class="search">
        <div style="margin-right: 10px">
          <input placeholder="Type your message..." type="search" />
        </div>

        <div>
          <img src="../assets/Plus.png" alt="" />
        </div>
      </div>
      <div class="column">
        <div>
          <button @click="getRoom()" class="button-option">All</button>
        </div>
        <div><button class="button-option">Unread</button></div>
        <div><button class="button-option">Read</button></div>
      </div>
      <b-container style="over-flow: auto" fluid class="containerChatList px-0">
        <b-row
          style="cursor: pointer"
          class="text-center mb-2"
          align-h="between"
          v-for="(value, index) in allRoom"
          :key="index"
          ><b-col v-if="value.profileImage !== ''"
            ><img
              style="height: 2em; width: 2em; border-radius: 50%"
              :src="url_API + value.profileImage"
              alt="user friend" /></b-col
          ><b-col v-if="value.profileImage === ''">
            <img
              style="height: 2em; width: 2em; border-radius: 50%"
              src="../assets/default.png"
              alt="" /></b-col
          ><b-col
            style="font-size: 18px; font-weight: 500"
            @click="GetRoomChat(value)"
            ><b-row>{{ value.user_name }}</b-row
            ><b-row style="color: grey; font-size: 14px; font-weight: 400">
              <b-col>last Message</b-col></b-row
            ></b-col
          ><b-col class="text-center"
            ><b-row><b-col>15.20</b-col> </b-row
            ><b-row
              ><b-col><b-badge variant="info">99+</b-badge></b-col>
            </b-row></b-col
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
          >
            <b-col v-if="value.profileImage !== ''"
              ><img
                class="profileImage"
                :src="url_API + value.profileImage"
                alt="user friend"
              /> </b-col
            ><b-col v-if="value.profileImage === ''">
              <img
                class="profileImage"
                src="../assets/default.png"
                alt="" /></b-col
            ><b-col>{{ value.user_name }}</b-col
            ><b-col @click="createRoom(value.friend_id)"
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
              ><b-col>
                <div v-if="value.profileImage !== ''">
                  <img
                    class="profileImage"
                    :src="url_API + value.profileImage"
                    alt="image profile"
                  />
                </div>
                <div v-if="value.profileImage === ''">
                  <img
                    class="profileImage"
                    src="../assets/default.png"
                    alt="image profile"
                  />
                </div> </b-col
              ><b-col>{{ value.user_name }}</b-col
              ><b-col @click="inviteFriend(value.user_id)"
                ><img src="../assets/Plus.png" alt="add friend" /></b-col
            ></b-row>
          </b-container>
        </b-form>
        <template v-slot:modal-footer></template>
      </b-modal>
      <!-- ==============Modal search friend Ends================ -->
    </div>

    <!-- =============================Modal sidebar========================== -->
    <b-sidebar id="editProfile" bg-variant="light" title="Settings" width="35%">
      <div class="px-3 py-2 text-center">
        <div>
          <div v-if="user.profileImage !== ''">
            <img
              class="profileImage"
              :src="url_API + user.profileImage"
              alt="image profile"
            />
          </div>
          <div v-if="user.profileImage === ''">
            <img
              class="profileImage"
              src="../assets/default.png"
              alt="image default"
            />
          </div>
          <input
            type="file"
            ref="file"
            @change="updateImage"
            style="display: none"
          />
          <span @click="$refs.file.click()" style="cursor: pointer">
            <b-icon icon="pencil-square"></b-icon>
          </span>
          <span @click="$bvModal.show('modalDelete')" style="cursor: pointer"
            ><b-icon icon="trash"></b-icon
          ></span>
        </div>
        <b-modal hide-footer style id="modalDelete"
          ><template v-slot:modal-header
            ><h5>Are you sure want to delete image?</h5></template
          ><b-row
            ><b-col cols="6">
              <b-button
                block
                @click="$bvModal.hide('modalDelete')"
                variant="warning"
                >Cancel</b-button
              ></b-col
            >
            <b-col cols="6"
              ><b-button block variant="danger" @click.prevent="deleteImage()">
                Delete</b-button
              ></b-col
            ></b-row
          >
        </b-modal>
        <h6>{{ user.user_name }}</h6>
        <p>{{ user.user_email }}</p>

        <div class="edit-option"><h5>Account</h5></div>
        <hr />
        <div class="edit-option">
          {{ user.user_phone }}
          <p>Phone number</p>
        </div>

        <div class="edit-option">
          {{ user.user_name }}
          <p>username</p>
        </div>

        <div class="edit-option">
          {{ user.user_bio }}
          <p>Bio</p>
        </div>
        <hr />
        <div class="edit-option-click">
          <h5 @click="$bvModal.show('modalEditProfile')">Edit Profile</h5>
        </div>
        <!-- ====================================Edit Profile Start================================ -->
        <b-modal id="modalEditProfile" size="lg" hide-footer style>
          <template v-slot:modal-header>Edit Profile</template>
          <b-form @submit.prevent>
            <div class="text-center">
              <div v-if="user.profileImage !== ''">
                <img
                  class="editProfile"
                  :src="url_API + user.profileImage"
                  alt="image profile"
                />
              </div>
              <div v-if="user.profileImage === ''">
                <img
                  class="editProfile"
                  src="../assets/default.png"
                  alt="image default"
                />
              </div>
            </div>
            <b-form-group style="mt-3" label="Name">
              <b-form-input
                v-model="form.user_name"
                type="text"
                required
                :placeholder="user.user_name"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="Phone">
              <b-form-input
                v-model="form.user_phone"
                type="number"
                :placeholder="user.user_phone"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="Bio">
              <b-form-textarea
                v-model="form.user_bio"
                :placeholder="user.user_bio"
              >
              </b-form-textarea>
            </b-form-group>
            <b-row
              ><b-col cols="12"
                ><h6>
                  User Position : {{ coordinate.lat }}.{{ coordinate.lng }}
                </h6></b-col
              ></b-row
            >

            <b-row>
              <b-col @click="$bvModal.hide('updateProfile')">
                <b-button
                  @click="editProfileUser()"
                  block
                  style="color: white"
                  variant="info"
                  type="submit"
                  class="my-3"
                  >Update</b-button
                >
              </b-col>
            </b-row>
          </b-form>
          <!-- <div>{{ user }}</div> -->

          <template v-slot:modal-footer></template>
        </b-modal>
        <!-- ====================================Edit Profile Ends================================ -->

        <div class="edit-option mb-5">
          <h5>Location</h5>
          <GmapMap
            :center="coordinate"
            :zoom="15"
            map-type-id="terrain"
            style="width: 100%; height: 275px"
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
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import io from "socket.io-client";

export default {
  name: "Chatlist",
  components: {
    // Chatlist,
  },
  data() {
    return {
      url_API: process.env.VUE_APP_URL,
      socket: io("http://localhost:3000"),
      coordinate: {
        lat: 0,
        lng: 0,
      },
      form: {
        user_name: "",
        user_bio: "",
        user_phone: "",
      },
      form2: {
        profileImage: {},
      },
      search: "",
      edit: false,
      recentRoom: "",
    };
  },
  computed: {
    ...mapGetters({
      userList: "getUserList",
      friendList: "getFriendList",
      user: "user",
      user_id: "getUserId",
      allRoom: "getAllRoom",
      room: "getRoom",
      messages: "getMessages",
      messagesHistory: "getMessagesHistory",
      lastMessage: "getLastMessages",
    }),
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng,
        };
        console.log(coordinates.lat);
        console.log(coordinates.lng);
      })
      .catch((error) => {
        alert(error);
      });
    this.getAllRoom(this.user.user_id);
  },
  mounted() {
    // this.socket.on("chatMessage", (data) => {
    //   this.socketData(data);
    //   console.log(this.socketData(data));
    //   console.log(this.socket);
    //   console.log(data);
    // });
    this.socket.on("chatMessage", (data) => {
      this.setMessages(data);
      // console.log(data);
    });
  },

  methods: {
    ...mapActions([
      "postRoomById",
      "getAllRoom",
      "searchUserByEmail",
      "inviteFriends",
      "getUserFriendList",
      "logout",
      "getRoomById",
      "patchImage",
      "getUserById",
      "editProfile",
      "socketData",
      "deleteImageUser",
      "getRoomChatHistory",
    ]),
    ...mapMutations(["searchMutation", "setMessages"]),
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
            variant: "success",
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.$bvToast.toast(error.response.data.msg, {
            title: "Status :",
            autoHideDelay: 500,
            variant: "danger",
            appendToast: true,
          });
        });
    },
    GetRoomChat(data) {
      console.log(data);
      const setData = {
        user_id: data.user_id,
        friend_id: data.friend_id,
      };
      this.getRoomById(setData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      if (this.recentRoom) {
        this.socket.emit("changeRoom", [data.room_chat_id, this.recentRoom]);
        this.recentRoom = data.room_chat_id;
        console.log("roombaru");
      } else {
        this.socket.emit("setRoom", data);
        console.log(data);
        this.recentRoom = data.room_chat_id;
        console.log("room awal");
      }
      // console.log(data.room_chat_id);
      this.getRoomChatHistory(data.room_chat_id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      // this.getRoomChatHistory(); =====================================
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
    getAllRoomChat() {
      // console.log(data);
      // const result = {
      //   user_id: this.user.user_id,
      //   friend_id: data,
      // };
      this.getAllRoom(this.user.user_id);
    },
    createRoom(data) {
      const result = {
        user_id: this.user.user_id,
        friend_id: data,
      };
      this.postRoomById(result)
        .then((response) => {
          // console.log(response);
          this.$bvToast.toast(`${response.data.msg}`, {
            title: "Status :",
            variant: "success",
            solid: true,
          });
        })
        .catch((error) => {
          // console.log(error.response);
          this.$bvToast.toast(`${error.response.data.msg}`, {
            title: "Status : ",
            variant: "danger",
            solid: true,
          });
        });
    },
    getRoom() {
      // console.log(this.user.user_id);
      this.getAllRoom(this.user.user_id);
    },
    handleFile(event) {
      this.form2.profileImage = event.target.files[0];
      console.log(event.target.files);
    },
    updateImage() {
      this.form2.profileImage = event.target.files[0];
      // console.log(event.target.files[0]);
      const data = new FormData();
      data.append("profileImage", this.form2.profileImage);
      // console.log(data);
      const setData = {
        user_id: this.user.user_id,
        form: data,
      };
      this.patchImage(setData)
        .then((response) => {
          // console.log("masuk patch image");
          // console.log(response);
          this.$bvToast.toast(`${response.data.msg}`, {
            title: "Status ",
            variant: "success",
            solid: true,
          });
          console.log("success update image");
          this.getUserById(this.user.user_id);
        })
        .catch((error) => {
          console.log(error);
          this.$bvToast.toast(`${error.response.data.msg}`, {
            title: "Status ",
            variant: "danger",
            solid: true,
          });
        });
    },
    deleteImage() {
      const setData = {
        user_id: this.user.user_id,
      };
      console.log(setData);
      this.deleteImageUser(setData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$bvModal.hide("modalDelete");
      this.getUserById(this.user.user_id);
    },
    editProfileUser() {
      const setData = {
        user_id: this.user.user_id,
        form: this.form,
      };
      console.log(setData);
      this.editProfile(setData)
        .then((response) => {
          console.log(response);
          this.$bvToast.toast(`${response.data.msg}`, {
            title: "Info ",
            variant: "info",
            solid: true,
          });
          this.getUserById(this.user.user_id);
        })
        .catch((error) => {
          console.log(error);
          this.$bvToast.toast(`${error.response}`, {
            title: "Info ",
            variant: "danger",
            solid: true,
          });
        });
    },
  },
};
</script>

<style scoped>
.headerChat {
  padding: 7px 10px;
  background-color: white;
  color: #7e98df;
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
  width: 100%;
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

.edit-option-click {
  font-family: "Rubik", sans-serif;
  text-align: left;
  color: black;
  width: 100%;
  cursor: pointer;
}

.profileImage {
  width: 3em;
  height: 3em;
  border-radius: 50%;
}

.editProfile {
  text-align: center;
  width: 8em;
  height: 8em;
  border-radius: 50%;
}

.imageEdit {
  width: 10em;
  height: 10em;
  border-radius: 50%;
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

input::placeholder {
  font-size: 14px;
}
</style>
