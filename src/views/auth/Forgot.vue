<template>
  <b-row class="login" fluid align-h="center">
    <b-col sm="6" class="container">
      <b-alert :show="alert" class="m-3" variant="danger">
        {{ isMsg }}
      </b-alert>
      <b-row class="content" align-h="center" align-v="center">
        <b-col md="10" class="card">
          <div class="text-left">
            <h3 class="text-center" style="color:#7e98df; font-weight:500;">
              Forgot Password
            </h3>
            <p><strong> You'll get messages soon on your e-mail</strong></p>

            <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
              <b-form-group label="Email">
                <b-form-input
                  type="email"
                  id="input-1"
                  required
                  placeholder="Enter email"
                  v-model="form.user_email"
                ></b-form-input>
              </b-form-group>

              <b-row class="text-center m-4">
                <b-col>
                  <button class="button">
                    Send
                  </button>
                </b-col>
              </b-row>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Forgot",
  data() {
    return {
      form: {
        user_email: "",
      },
      alert: false,
      isMsg: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["forgotPassword"]),
    onSubmit() {
      this.forgotPassword(this.form)
        .then((result) => {
          this.$bvToast.toast(result.data.msg, {
            title: "Status :",
            autoHideDelay: 2000,
            appendToast: true,
          });
        })
        .catch((error) => {
          this.alert = true;
          this.isMsg = error.data.msg;
          setTimeout(() => {
            this.alert = false;
          }, 2000);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap");

.login {
  font-family: "Rubik", sans-serif;
  text-align: center;
  width: 100%;
  margin: 0px;
  height: 100vh;
  background-color: #f6f7f8;
}

.content {
  height: 100%;
}

.container {
  /* color: aqua; */
  height: 100%;
  width: 100%;
}

.card {
  background-color: white;
  border-radius: 30px;
  height: 90%;
}

.button {
  color: white;
  width: 70%;
  height: 60px;
  background: #7e98df;
  border-radius: 70px;
  border: 1px solid #7e98df;
}

.button:hover {
  background-color: white;
  color: #7e98df;
}

h6.sidelines {
  text-align: center;
  border-bottom: 1px solid #848484;
  height: 0.5em;
}
h6.sidelines span {
  display: inline-block;
  background: #fff;
  padding: 0 4em;
}
</style>
