<template>
  <b-row class="register" fluid align-h="center">
    <b-col sm="6" class="container">
      <b-alert :show="alert" class="m-3" variant="danger">
        {{ isMsg }}
      </b-alert>
      <b-row class="content" align-h="center">
        <b-col md="9" class="card p-3">
          <div class="text-left">
            <h3 class="text-center" style="color: #7e98df; font-weight: 500">
              Register
            </h3>
            <p><strong> Let's create your account!</strong></p>

            <b-form
              style="color: grey"
              @submit.prevent="onSubmit"
              @reset.prevent="onReset"
            >
              <b-form-group label="Name" label-for="input-1">
                <b-form-input
                  id="input-1"
                  required
                  placeholder="Enter Name"
                  v-model="form.user_name"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Email">
                <b-form-input
                  required
                  placeholder="Enter email"
                  v-model="form.user_email"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="No. Hp:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  type="number"
                  required
                  v-model="form.user_phone"
                  placeholder="08xxxxxxxxxx"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Password">
                <b-form-input
                  type="password"
                  required
                  v-model="form.user_password"
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Confirm Password">
                <b-form-input
                  type="password"
                  required
                  v-model="form.user_confirm_password"
                  placeholder="Enter confirm password"
                ></b-form-input>
              </b-form-group>

              <b-row class="text-center m-4">
                <b-col>
                  <button class="button">Register</button>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <h6 class="sidelines"><span> Register with</span></h6>
                </b-col>
              </b-row>
              <b-row class="text-center m-4">
                <b-col>
                  <button class="button">
                    <img src="../../assets/google.png" alt="" /> Google
                  </button>
                </b-col>
              </b-row>
            </b-form>
            <b-row class="text-center">
              <b-col>
                Already have an account?
                <router-link to="/login"> Sign in </router-link>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  data: () => ({
    form: {
      //   room: null,
      user_name: "",
      user_password: "",
      user_confirm_password: "",
      user_email: "",
      user_phone: "",
    },
    alert: false,
    isMsg: "",
  }),
  methods: {
    ...mapActions(["register"]),
    onSubmit() {
      this.register(this.form)
        .then((result) => {
          console.log(result);
          this.$bvToast.toast(result.msg, {
            title: "Status :",
            autoHideDelay: 2000,
            appendToast: true,
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          this.alert = true;
          this.isMsg = error.data.msg;
          setTimeout(() => {
            this.alert = false;
          }, 2000);
        });
    },
    onReset() {
      this.form = {
        user_name: "",
        user_password: "",
        user_email: "",
      };
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap");

.register {
  font-family: "Rubik", sans-serif;
  text-align: center;
  width: 100%;
  margin: 0px;
  height: auto;
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
