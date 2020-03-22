<template>
    <v-app-bar app fixed clipped-left color="white">
      <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/">
              Geochat
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

        <router-link to="/login" >
            <v-btn text color="brown lighten-2">
                <!-- <v-icon>mdi-heart</v-icon> -->
                Se connecter
            </v-btn>
        </router-link>

      <router-link to="/register" >
        <v-btn text color="brown lighten-2">
          <!-- <v-icon>mdi-account</v-icon> -->
          Créer un compte
        </v-btn>
      </router-link>
      
    </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
    }
  },
  methods: {
    showDrawer() {
      this.drawer = !this.drawer;
      this.$emit("show-drawer", this.drawer);
    }
  }
}
</script>

<style lang="stylus">
* {
    font-family: Roboto;
}
</style>