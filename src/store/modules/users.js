import axios from "axios";

export default {
  state: {
    userList: [],
    userFriendList: [],
    search: "",
    user: {},
    user_id: 0,
    friend:[],
    urlAPI: process.env.VUE_APP_URL
  },
  mutations: {
    setUser(state, payload) {
      state.userList = payload.data;
    },
    searchMutation(state, payload) {
      state.search = payload;
    },
    setUserById(state, payload) {
      // console.log(payload.data.data[0].user_id);
      state.user = payload.data.data[0];
      state.user_id = payload.data.data.user_id;
    },
    setUserFriendList(state, payload) {
      console.log("get friend list");
      console.log(payload);
      state.userFriendList = payload.data.data;
    },
    setFriendById(state, payload){
      state.friend = payload.data.data
    }

  },
  actions: {
    searchUserByEmail(context) {
      axios
        .get(
          `${context.state.urlAPI}user/search/email?user_email=${context.state.search}`
        )
        .then((response) => {
          context.commit("setUser", response.data);
          console.log("bisa");
        })
        .catch((error) => {
          console.log(error.response);
          console.log("gabisa");
          
        });
    },
    getUserById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlAPI}user/${payload}`)
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
          .post(`${context.state.urlAPI}friend/invite`, payload)
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
          .post(`${context.state.urlAPI}user/search/friendlist`, {
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
    getFriendById(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlAPI}friend/`, payload)
          .then((res) => {
            console.log(res);
            context.commit("setFriendById", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
            // console.log(err);
          });
      });
    },
    editProfile(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .patch(`${context.state.urlAPI}user/${payload.user_id}`, payload.form)
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
          .patch(`${context.state.urlAPI}user/image/${payload.user_id}`, payload.form)
          .then((response) => {
            console.log(response);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //===================================delete image under process==================//
    deleteImageUser(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .delete(`${context.state.urlAPI}user/image/delete/${payload.user_id}`)
          .then((response) => {
            console.log(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
        //===================================delete image under process==================//
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
    getFriend(state){
      return state.friend
    }

  },
};
