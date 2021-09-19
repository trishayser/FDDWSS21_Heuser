import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  router,
  data() {
    return {
      authenticated: true,
      mockAccount: {
        username: "test",
        password: ""
      }
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    },
    userLogin(user) {
      this.mockAccount = user;
    }
  },
  render: h => h(App),
}).$mount('#app')
