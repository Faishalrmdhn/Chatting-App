<template>
  <b-row class="login" fluid align-h="center">
    <b-col sm="6" class="container">
      <b-alert :show="alert" class="m-3" variant="danger">
        {{ isMsg }}
      </b-alert>
      <b-row class="content" align-h="center" align-v="center">
        <b-col md="10" class="card p-3">
          <div class="text-left">
            <h3 class="text-center" style="color: #7e98df; font-weight: 500">
              Login
            </h3>
            <p><strong> Hi, Welcome back!</strong></p>

            <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
              <b-form-group style="color: grey" label="Email">
                <input
                  type="email"
                  id="input-1"
                  required
                  placeholder="Enter email"
                  v-model="form.user_email"
                />
                <!-- <b-form-input
                  type="email"
                  id="input-1"
                  required
                  placeholder="Enter email"
                  v-model="form.user_email"
                ></b-form-input> -->
              </b-form-group>

              <b-form-group
                style="color: grey"
                id="input-group-3"
                label="Your Password:"
                label-for="input-3"
              >
                <input
                  id="input-3"
                  type="password"
                  required
                  v-model="form.user_password"
                  placeholder="Enter password"
                />
              </b-form-group>

              <b-row align-h="center" class="text-right">
                <b-col>
                  <router-link to="/forgot">Forgot Password?</router-link>
                </b-col>
              </b-row>
              <b-row class="text-center m-4">
                <b-col>
                  <button class="button">Login</button>
                </b-col>
              </b-row>
            </b-form>

            <b-row>
              <b-col>
                <h6 class="sidelines"><span> Login with</span></h6>
              </b-col>
            </b-row>
            <b-row class="text-center m-4">
              <b-col>
                <button
                  class="button"
                  @click="$bvModal.show('modalComingSoon')"
                >
                  <img src="../../assets/google.png" alt="" /> Google
                </button>
              </b-col>
            </b-row>
            <b-row class="text-center">
              <b-col>
                Don't have an account?
                <router-link to="/register"> Sign up </router-link>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-modal id="modalComingSoon">
      <template v-slot:modal-header class="text-center"
        ><h4>Coming Soon !</h4>
      </template>
      <b-row><b-col>This feature will soon available </b-col></b-row>
    </b-modal>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        user_email: "",
        user_password: "",
      },
      alert: false,
      isMsg: "",
    };
  },
  methods: {
    ...mapActions(["login", "getUserById"]),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          this.$bvToast.toast(result.msg, {
            title: "Status :",
            autoHideDelay: 2000,
            appendToast: true,
          });
          setTimeout(() => {
            this.$router.push("/main");
          }, 1500);
          console.log(result.data.user_id);
          this.getUserById(result.data.user_id);
        })
        .catch((error) => {
          this.alert = true;
          this.isMsg = error.data.msg;
          // this.isMsg = error.data;
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

input {
  width: 100%;
  height: 65px;
  border: 1px solid rgba(169, 169, 169, 0.6);

  border-radius: 10px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)) center
    bottom 5px / calc(100% - 10px) 2px no-repeat;

  border: 1px solid transparent;
  margin: 5px;
}

::placeholder {
  font-size: 14px;
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
