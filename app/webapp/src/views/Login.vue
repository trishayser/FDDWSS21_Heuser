<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form class="">
            <div class="form-group"> <label>Username</label> <input type="text" v-model="input.username" class="form-control" placeholder="Enter username"> <small class="form-text text-muted"></small> </div>
            <div class="form-group"> <label>Password</label> <input type="password" v-model="input.password" class="form-control" placeholder="Password"> </div> <button v-on:click="login()" type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {validateUser} from "../services/user-service";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      if(this.input.username != "" && this.input.password != "") {
        validateUser(this.input.username).then(function (isValidated) {
          if (isValidated) {
            console.log("validated");
            this.$root.mockAccount.username = this.input.username;
            this.$emit("authenticated", true);
            this.$router.replace({name: "Home"})
          }
        });
      } else console.log("please apssword");
    }
  }
}
</script>

<style scoped>

</style>