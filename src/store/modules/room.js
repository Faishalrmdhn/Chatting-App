import axios from 'axios'

export default {
    state: {
        allRoom: [],
        roomById: [],
        room: [],
        chat:{},
        nextRoomChats:{},
        urlAPI : process.env.VUE_APP_URL,
        messages: [],
        messagesHistory:[],
        lastMessage:''
    },
    mutations: {
        setRoomById(state, payload) {
            state.roomById = payload.data.data;
        },
        setAllRoom(state, payload) {
            console.log("get all room");
            console.log(payload);
            state.allRoom = payload.data.data.allRoom;
            // state.lastMessage = payload.data.data.lastChat
        },
        setPostRoom(state, payload) {
            state.room = payload.data.data
        },
        setChat(state, payload){
            state.chat = payload
        },
        setSocketdataMutation(state, payload){
            state.nextRoomChats.push(payload)
            console.log(payload)
        },
        setMessages(state, payload){
            state.messages.push(payload)
        },
        setMessagesHistory(state, payload){
            state.messagesHistory = payload
            // const newPayload = payload.chat[payload.chat.length-1]
            // state.lastMessage = newPayload.chat
        }
    },
    actions: {
        getAllRoom(context, payload) {
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios
                    .post(`${context.state.urlAPI}room/all`, { user_id: payload })
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
                    .post(`${context.state.urlAPI}room/chat/by-id`, payload)
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
        postRoomById(context, payload) {
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios
                    .post(`${context.state.urlAPI}room/post`, payload)
                    .then((res) => {
                        console.log(res);
                        console.log("done post room");
                        context.commit("setPostRoom", res);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        postChat(context, payload) {
            console.log(payload)
            return new Promise((resolve, reject) => [
              axios
                .post(`${context.state.urlAPI}room/chatting`, payload)
                .then(response => {
                  console.log(response)
                  context.commit('setChat', response.data.data)
                  resolve(response)
                })
                .catch(error => {
                  reject(error.response.data.msg)
                })
            ])
          },
        // socketData(context, payload){
        //     console.log(payload)
        //     context.commit('setSocketdataMutation', payload)
        //   },
        getRoomChatHistory(context, payload){
        console.log(payload)
        return new Promise((resolve, reject) => [
            axios
              .get(`${context.state.urlAPI}room/roomchat/${payload}`)
              .then(response => {
                console.log(response)
                context.commit('setMessagesHistory', response.data.data[0])
                resolve(response)
              })
              .catch(error => {
                reject(error.response.data.msg)
              })
          ])
        }


    },
    getters: {
        getAllRoom(state) {
            console.log(state.allRoom);
            return state.allRoom;
        },
        getRoomByIdGetters(state) {
            return state.roomById;
        },
        getRoom(state) {
            return state.room;
        },
        getNextRoomChat(state){
            return state.nextRoomChats
        },
        getMessages(state){
            return state.messages
        },
        getMessagesHistory(state){
            return state.messagesHistory
        },
        getLastMessages(state){
            return state.lastMessage
        }
    }
}