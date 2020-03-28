<template>
  <v-app-bar app fixed clipped-left color="white">
    <v-app-bar-nav-icon
      @click="showDrawer"
      v-if="loggedIn"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="brown--text">
      <!-- <router-link to="/" class="toolbar-title"> -->
      <!-- Geochat -->
      <v-btn depressed color="brown lighten-2" text to="/" exact>Geochat</v-btn>
      <!-- </router-link> -->
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div id="loggedIn" v-if="!loggedIn">
      <router-link class="routerLink" to="/connexion">
        <v-btn text color="brown lighten-2">
          <!-- <v-icon>mdi-heart</v-icon> -->
          Se connecter
        </v-btn>
      </router-link>

      <router-link class="routerLink" to="/enregistrement">
        <v-btn text color="brown lighten-2">
          <!-- <v-icon>mdi-account</v-icon> -->
          Créer un compte
        </v-btn>
      </router-link>
    </div>
    <div id="logout" v-else>
      <v-btn text color="brown lighten-2" @click="logout">
        <!-- <v-icon>mdi-heart</v-icon> -->
        Déconnexion
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  props: ['loggedIn'],
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    showDrawer() {
      this.drawer = !this.drawer;
      this.$emit('show-drawer', this.drawer);
    },
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style lang="stylus">
* {
    font-family: Roboto;
}
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
