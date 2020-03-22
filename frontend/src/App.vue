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
  name: "App",

  components: {
    Menu
    // MenuBar,
    // Toolbar
  },

  data: () => ({
    //
  })
};
</script>
