<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="nav">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/facilities">Sub </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/messages">Messages</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/login">Login</router-link>
            </li>
            <li>
              Logged in as {{this.$root.mockAccount.username}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped>

</style>