<template>
  <!-- <b-container class="bv-example-row"> -->
  <b-row>
    <b-col cols="12">
      <div class="chat">
        <div class="chat-window">
          <div class="output">
            <!-- <p v-if="typing">
                <em>{{ typing }} is typing a message...</em>
              </p> -->
            <p v-for="(value, index) in messages" :key="index">
              <strong>{{ value.username }} :</strong>
              {{ value.message }}
            </p>
          </div>
        </div>
        <input
          class="message"
          type="text"
          v-model="message"
          placeholder="Message"
        />
        <button class="send" @click="sendMessage">Send</button>
      </div>
    </b-col>
  </b-row>
  <!-- </b-container> -->
</template>

<script>
import io from "socket.io-client";
import { mapGetters } from "vuex";
export default {
  name: "Chat",
  data() {
    return {
      socket: io("http://localhost:3000"),
      username: "",
      // room: '',
      // oldRoom: '',
      message: "",
      messages: [],
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
    ...mapGetters({ user: "user" }),
  },
  mounted() {
    // console.log(this.$route.params)
    // if (!this.$route.params.username) {
    //   this.$router.push('/about')
    // }
    // proses get message axios
    // this.getchat()
    // this.username = this.$route.params.username
    // this.room = this.$route.params.room
    // this.socket.emit('welcomeMessage', {
    //   username: 'BOT',
    //   message: `Welcome Back ${this.username} !`
    // })
    this.socket.on("chatMessage", (data) => {
      this.messages.push(data);
    });
    // this.socket.on('typingMessage', data => {
    //   this.typing = data
    // })
  },
  methods: {
    sendMessage() {
      const setData = {
        username: this.user.user_name,
        message: this.message,
      };
      // GLOBAL = semua orang dapat melihat
      // PRIVATE = hanya kita saja yang dapat melihat
      // BRROADCAST = semua orang dapat melihat kecuali kita
      this.socket.emit("globalMessage", setData);
      this.message = "";
      // this.socket.emit('privateMessage', setData)
      // this.socket.emit('broadcastMessage', setData)
      // =========================================================
      // const setData = {
      //   username: this.username,
      //   message: this.message,
      //   room: this.room
      // }
      // [1] menjalankan scoket io untuk mendapatkan realtimenya
      // this.socket.emit('roomMessage', setData)
      // // [2] menjalankan proses axios post data message untuk menyimpan data ke dalam database
      // // ........
      // this.message = ''
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
.chat {
  max-width: 600px;
  border: 1px solid #ddd;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.room {
  margin: 10px 0;
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
</style>
