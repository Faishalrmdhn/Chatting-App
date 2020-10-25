<template>
  <b-row class="container">
    <!-- ===========================================
    <div>\\\\\\\\\\\\\\{{ lastMessage }}////////////////////</div>
    <div>**************{{ user }}>**************</div>
    <div>{{ roomById[0] }}</div>
    <div>
      iniiiiiiiiiiiiiiiiiiiiiii <br />
      {{ messages }}
    </div>
    <hr />
    <div>messageshistory ==== {{ messagesHistory.chat }}==========</div>
    <br />
    <div v-for="(value, index) in messagesHistory.chat" :key="index">
      <div>{{ value.chat }}</div>
    <div>222222222</div>
    </div> -->

    <!-- <div v-if=""></div> -->
    <!-- =========================================== -->
    <b-col style="padding: 0px" cols="12" md="12" lg="12">
      <b-row class="chat">
        <b-col style="width: 100%" class="m-0 p-0">
          <b-row
            style="width: 100%"
            class="header-chat"
            align-h="between"
            align-v="center"
          >
            <b-col
              @click="$bvModal.show('modalFriendProfile')"
              style="cursor: pointer"
              cols="2"
            >
              <div v-if="roomById[0].profileImage !== ''">
                <img
                  class="profileImage"
                  :src="url_API + roomById[0].profileImage"
                  alt="friend image"
                />
              </div>
              <div v-if="roomById[0].profileImage === ''">
                <img
                  class="profileImage"
                  src="../assets/default.png"
                  alt="friend image"
                /></div></b-col
            ><b-col cols="6"
              ><h5>{{ roomById[0].user_name }}</h5></b-col
            ><b-col style="cursor: pointer" cols="2"
              ><img src="../assets/dot.png" alt=""
            /></b-col>
          </b-row>
          <b-row class="chat-window">
            <b-col class="output">
              <b-container>
                <b-row
                  ><b-col>
                    <!-- <p v-if="typing">
                <em>{{ typing }} is typing a message...</em>
              </p> -->
                    <div
                      v-for="(value, index) in messagesHistory.chat"
                      :key="index"
                      class="bubble-wrap"
                    >
                      <!-- user -->
                      <div
                        v-if="user.user_id === value.user_id"
                        class="bubble-right"
                      >
                        <p>
                          <strong>{{ user.user_name }} :</strong>
                          {{ value.chat }}
                        </p>
                      </div>
                      <!-- sender -->
                      <div v-if="user.user_id !== value.user_id" class="bubble">
                        <p>
                          <strong>{{ value.sender }} :</strong>
                          {{ value.chat }}
                        </p>
                      </div>
                    </div>

                    <div
                      class="bubble-send"
                      v-for="(value, index) in messages"
                      :key="index"
                    >
                      <p>
                        <strong>{{ value.username }} :</strong>
                        {{ value.chat }}
                      </p>
                    </div>
                  </b-col></b-row
                >
              </b-container>
            </b-col>
          </b-row>
          <b-row align-v="center"
            ><b-col cols="10"
              ><b-input
                class="text-left"
                type="text"
                v-model="message"
                placeholder="Type your message..."
              ></b-input></b-col
            ><b-col cols="2"
              ><b-button class="send" @click="sendMessage"
                ><h6>Send</h6></b-button
              ></b-col
            ></b-row
          >
        </b-col>
      </b-row>
    </b-col>
    <b-modal id="modalFriendProfile" size="lg" hide-header hide-footer style>
      <b-row
        ><b-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
          <b-row
            ><b-col
              @click="$bvModal.hide('modalFriendProfile')"
              style="cursor: pointer"
              ><img src="../assets/back.png" alt=""
            /></b-col>
          </b-row>
          <b-row class="text-center"
            ><b-col>
              <div v-if="roomById[0].profileImage !== ''">
                <img
                  class="friendImage"
                  :src="url_API + roomById[0].profileImage"
                  alt="friend image"
                />
              </div>
              <div v-if="roomById[0].profileImage === ''">
                <img
                  class="friendImage"
                  src="../assets/default.png"
                  alt="friend image"
                /></div></b-col
          ></b-row>
          <b-row class="text-center"
            ><b-col>
              <h5>{{ roomById[0].user_name }}</h5>
              <p>Online</p></b-col
            >
          </b-row>
          <b-row
            ><b-col
              ><h5>Phone Number</h5>
              <p>soon</p></b-col
            >
          </b-row>
          <b-row align-h="around"
            ><b-col cols="4"
              ><b-button @click="onLoc" pill>Location</b-button></b-col
            ><b-col cols="4"
              ><b-button @click="onImg" pill>Image</b-button></b-col
            ><b-col cols="4"
              ><b-button @click="onDoc" pill>Document</b-button></b-col
            ></b-row
          >
          <b-row class="mt-4 text-left" align-h="center"
            ><b-col cols="12" v-show="isLoc" style="text-align: center">
              <h5>{{ roomById[0].user_name }}'s Location</h5>

              <GmapMap
                :center="coordinate"
                :zoom="15"
                map-type-id="terrain"
                style="
                  width: 400px;
                  height: 275px;
                  position: relative;
                  left: 25%;
                "
              >
                <GmapMarker
                  :position="coordinate"
                  @click="clickMarker"
                  :clickable="true"
                  :draggable="true"
                  icon="https://img.icons8.com/color/48/000000/map-pin.png"
                /> </GmapMap></b-col
            ><b-col v-show="isImg" cols="12"
              ><h5>This feature available soon!</h5></b-col
            ><b-col v-show="isDoc" cols="12"
              ><h5>This feature available soon!</h5></b-col
            ></b-row
          >
        </b-col></b-row
      >
    </b-modal>
  </b-row>
</template>

<script>
import io from "socket.io-client";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Chat",
  data() {
    return {
      wadah: {},
      socket: io("http://localhost:3000"),
      username: "",
      room: "",
      // oldRoom: '',
      message: "",
      // messages: [],
      url_API: process.env.VUE_APP_URL,
      isLoc: true,
      isImg: false,
      isDoc: false,
      coordinate: {
        lat: 0,
        lng: 0,
      },
      // typing: false // false || 'nama si pengetik'
    };
  },
  // watch: {
  //   message(value) {
  //     value
  //       ? this.socket.emit("typing", this.user.user_name)
  //       : this.socket.emit("typing", false);
  //   },
  // },
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
    // this.lastMessage
  },
  computed: {
    ...mapGetters({
      user: "user",
      friendList: "getFriendList",
      friend: "getFriend",
      roomById: "getRoomByIdGetters",
      nextRoomChat: "getNextRoomChat",
      messages: "getMessages",
      messagesHistory: "getMessagesHistory",
      lastMessage: "getLastMessages",
    }),
  },
  mounted() {
    // console.log(this.$route.params)
    // proses get message axios
    // this.socket.emit("welcomeMessage", {
    //   username: "BOT",
    //   message: `Welcome Back ${this.user.user_name} !`,
    // });
    // this.socket.on('typingMessage', data => {
    //   this.typing = data
    // })
  },
  methods: {
    ...mapActions(["postChat"]),
    sendMessage() {
      const setData = {
        username: this.user.user_name,
        user_id: this.user.user_id,
        friend_id: this.roomById[0].friend_id,
        chat: this.message,
        // room: this.roomById[0].room_chat_id,
        room_chat_id: this.roomById[0].room_chat_id,
      };
      // [1] menjalankan scoket io untuk mendapatkan realtimenya
      // this.socket.emit('roomMessage', setData)
      // // [2] menjalankan proses axios post data message untuk menyimpan data ke dalam database
      // // ........
      this.socket.emit("roomMessage", setData);
      console.log(setData);
      this.message = "";

      this.postChat(setData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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
    onLoc() {
      this.isLoc = true;
      this.isImg = false;
      this.isDoc = false;
    },
    onImg() {
      this.isLoc = false;
      this.isImg = true;
      this.isDoc = false;
    },
    onDoc() {
      this.isLoc = false;
      this.isImg = false;
      this.isDoc = true;
    },
    // selectRoom(data) {
    //   if (this.oldRoom) {
    //     // console.log('sudah pernah klik room ' + this.oldRoom);
    //     // console.log('dan akan masuk ke room ' + data);
    //     this.socket.emit('changeRoom', { oldRoom: this.oldRoom, newRoom: data} )
    //     this.oldRoom = data
    //   } else {
    //     // console.log('belum pernah klik room');
    //     // console.log('dan akan masuk ke room ' + data);
    //     this.socket.emit('welcomeMessage', {
    //       username: this.username,
    //       room: this.room
    //     })
    //     this.oldRoom = data
    //   }
    // }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.chat {
  width: 100%;
}

h2 {
  font-size: 18px;
  padding: 10px 20px;
  color: #575ed8;
}

.chat-window {
  height: 500px;
  overflow: auto;
  background: #f9f9f9;
}

.header-chat {
  background-color: white;
  width: 100%;
  min-height: 70px;
  margin: 0px;
}

.output p {
  text-align: left;
  padding: 14px 0px;
  margin: 0 20px;
  border-bottom: 1px solid #e9e9e9;
}

.feedback p {
  color: #aaa;
  padding: 14px 0px;
  margin: 0 20px;
}

/* .output {
  display: flex;
} */

.output strong {
  color: #575ed8;
}

input {
  padding: 10px 20px;
  box-sizing: border-box;
  background: #eee;
  border: 0;
  display: block;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  font-family: Nunito;
  font-size: 16px;
}

button {
  background: #575ed8;
  color: #fff;
  font-size: 18px;
  border: 0;
  padding: 12px 0;
  width: 100%;
  border-radius: 0 0 2px 2px;
}

.bubble {
  /* position: relative;
  right: 20px; */
  position: relative;
  float: left;
  text-align: left;
  width: 400px;
  height: 50px;
  margin: 30px;
  background: #7e98df;
  color: white;
  border-radius: 10px 35px 35px 35px;
}

.bubble-right {
  /* position: relative;
  right: -450px; */
  position: relative;
  float: right;
  text-align: left;
  width: 400px;
  height: 50px;
  margin: 30px;
  background: #7e98df;
  color: white;
  border-radius: 35px 35px 10px 35px;
}

.bubble-send {
  position: relative;
  float: right;
  text-align: left;
  width: 400px;
  height: 50px;
  margin: 30px;
  background: #7e98df;
  color: white;
  border-radius: 35px 35px 10px 35px;
}

.profileImage {
  width: 3em;
  height: 3em;
  border-radius: 50%;
}

.friendImage {
  text-align: center;
  width: 8em;
  height: 8em;
  border-radius: 30%;
}
</style>
