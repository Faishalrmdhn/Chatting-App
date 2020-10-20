<template>
  <b-row class="container">
    <b-col cols="12" md="12" lg="12">
      <b-row class="chat"
        ><b-col>
          <div>{{ roomById[0].room_chat_id }}</div>
          <b-row class="header-chat" align-h="between" align-v="center">
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
                      class="bubble"
                      v-for="(value, index) in messages"
                      :key="index"
                    >
                      <p>
                        <strong>{{ value.username }} :</strong>
                        {{ value.message }}
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
    <b-modal id="modalFriendProfile" size="lg" hide-footer style>
      <template v-slot:modal-header><h4>Friends Profile</h4></template>
      <b-row
        ><b-col cols="12">
          <b-row
            ><h5>{{ roomById[0].user_name }}</h5></b-row
          >
          <b-row>body section</b-row> <b-row>footer section</b-row>
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
      messages: [],
      url_API: process.env.VUE_APP_URL,
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
  computed: {
    ...mapGetters({
      user: "user",
      friendList: "getFriendList",
      friend: "getFriend",
      roomById: "getRoomByIdGetters",
      nextRoomChat: "getNextRoomChat",
    }),
  },
  mounted() {
    // console.log(this.$route.params)
    // proses get message axios
    // this.socket.emit("welcomeMessage", {
    //   username: "BOT",
    //   message: `Welcome Back ${this.user.user_name} !`,
    // });
    this.socket.on("chatMessage", (data) => {
      this.messages.push(data);
      console.log(data);
    });
    // this.socket.on('typingMessage', data => {
    //   this.typing = data
    // })
  },
  methods: {
    ...mapActions(["postChat"]),
    sendMessage() {
      // const setData = {
      //   username: this.user.user_name,
      //   message: this.message,
      // };
      // GLOBAL = semua orang dapat melihat
      // PRIVATE = hanya kita saja yang dapat melihat
      // BRROADCAST = semua orang dapat melihat kecuali kita
      // this.socket.emit("globalMessage", setData);

      // this.socket.emit("globalMessage", setData);
      // this.socket.emit('broadcastMessage', setData)
      // =========================================================
      const setData = {
        username: this.user.user_name,
        message: this.message,
        room: this.roomById[0].room_chat_id,
      };
      // [1] menjalankan scoket io untuk mendapatkan realtimenya
      // this.socket.emit('roomMessage', setData)
      // // [2] menjalankan proses axios post data message untuk menyimpan data ke dalam database
      // // ........

      this.socket.emit("roomMessage", setData);
      console.log(setData);
      this.message = "";
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
  max-width: 100%;
  border: 1px solid #ddd;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

h2 {
  font-size: 18px;
  padding: 10px 20px;
  color: #575ed8;
}

.mario-chat {
  max-width: 600px;
  margin: 30px auto;
  border: 1px solid #ddd;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.chat-window {
  height: 400px;
  overflow: auto;
  background: #f9f9f9;
}

.header-chat {
  background-color: #fafafa;
  width: 100%;
  min-height: 70px;
}

.output p {
  text-align: left;
  padding: 14px 0px;
  margin: 0 20px;
  border-bottom: 1px solid #e9e9e9;
  color: #555;
}

.feedback p {
  color: #aaa;
  padding: 14px 0px;
  margin: 0 20px;
}

.output strong {
  color: #575ed8;
}

label {
  box-sizing: border-box;
  display: block;
  padding: 10px 20px;
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

.chat-window .output .bubble {
  text-align: left;
  width: 400px;
  height: 50px;
  margin: 30px;
  background: #7e98df;
  color: white;
  border-radius: 35px 35px 35px 10px;
}

.profileImage {
  width: 3em;
  height: 3em;
  border-radius: 50%;
}
</style>
