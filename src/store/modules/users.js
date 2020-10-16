import axios from "axios";

export default {
  state: {
    userList: [],
    userFriendList: [],
    allRoom: [],
    roomById: [],
    search: "",
    user: {},
    user_id: 0,
  },
  mutations: {
    setUser(state, payload) {
      state.userList = payload.data;
    },
    searchMutation(state, payload) {
      state.search = payload;
    },
    setUserById(state, payload) {
      console.log(payload.data.data[0].user_id);
      state.user = payload.data.data[0];
      state.user_id = payload.data.data.user_id;
    },
    setUserFriendList(state, payload) {
      console.log("get friend list");
      console.log(payload);
      state.userFriendList = payload.data.data;
    },
    setAllRoom(state, payload) {
      console.log("get all room");
      console.log(payload);
      state.allRoom = payload.data.data;
    },
    setRoomById(state, payload) {
      console.log("room by id");
      console.log(payload);
      state.roomById = payload.data.data;
    },
  },
  actions: {
    searchUserByEmail(context) {
      axios
        .get(
          `http://localhost:3000/user/search/email?user_email=${context.state.search}`
        )
        .then((response) => {
          context.commit("setUser", response.data);
          console.log("bisa");
        })
        .catch((error) => {
          console.log(error);
          console.log("gabisa");
        });
    },
    getUserById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/user/${payload}`)
          .then((res) => {
            // console.log(res);
            context.commit("setUserById", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    inviteFriends(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/friend/invite", payload)
          .then((response) => {
            // console.log(payload);
            // console.log(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
            // console.log(err);
          });
      });
    },
    getUserFriendList(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/user/search/friendlist", {
            user_id: payload,
          })
          .then((res) => {
            console.log(res);
            context.commit("setUserFriendList", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
            // console.log(err);
          });
      });
    },
    getAllRoom(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/room/chat", payload)
          .then((res) => {
            console.log(res);
            console.log("done!");
            context.commit("setAllRoom", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getRoomById(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/room/chat/by-id", payload)
          .then((res) => {
            console.log(res);
            console.log("done!");
            context.commit("setRoomById", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    editProfile(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .patch(`http://localhost:3000/user/${payload.user_id}`, payload.form)
          .then((response) => {
            console.log(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    patchImage(context, payload) {

      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .patch(`http://localhost:3000/user/image/${payload.user_id}`, payload.form)
          .then((response) => {
            console.log(response);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getUserList(state) {
      return state.userList;
    },
    user(state) {
      return state.user;
    },
    getUserId(state) {
      return state.user_id;
    },
    getFriendList(state) {
      console.log(state.userFriendList);
      return state.userFriendList;
    },
    getAllRoom(state) {
      console.log(state.allRoom);
      return state.allRoom;
    },
    getRoomById(state) {
      return state.roomById;
    },
  },
};
