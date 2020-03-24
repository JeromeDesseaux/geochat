
<template>
  <v-app style="background: #f6f6f6;">
    <Menu /> 
    <v-content>
      <v-container >
        <!-- <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/register">Register</router-link>
            <router-link to="/login">Login</router-link>
        </nav> -->
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import MenuBar from "./components/SideMenu";
// import Toolbar from "./components/Toolbar";
import Menu from "./components/Menu";

export default {
  /* eslint-disable */

  name: "App",

  components: {
    Menu
    // MenuBar,
    // Toolbar
  },

  data: () => ({
    //
  }),
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  }
};
/* eslint-enable */
</script>

<style lang="stylus">
.routerLink{
     text-decoration: none;
 }
</style>