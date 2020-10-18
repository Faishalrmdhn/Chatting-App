import axios from 'axios'

export default {
    state: {
        allRoom: [],
        roomById: [],
        room: []
    },
    mutations: {
        setRoomById(state, payload) {
            console.log("room by id");
            console.log(payload);
            state.roomById = payload.data.data;
        },
        setAllRoom(state, payload) {
            console.log("get all room");
            console.log(payload);
            state.allRoom = payload.data.data;
        },
        setPostRoom(state, payload) {
            state.room = payload.data.data
        }
    },
    actions: {
        getAllRoom(context, payload) {
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios
                    .post("http://localhost:3000/room/chat", { user_id: payload })
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
        postRoomById(context, payload) {
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios
                    .post("http://localhost:3000/room/post", payload)
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
    },
    getters: {
        getAllRoom(state) {
            console.log(state.allRoom);
            return state.allRoom;
        },
        getRoomById(state) {
            return state.roomById;
        },
        getRoom(state) {
            return state.room;
        },
    }
}