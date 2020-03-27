<template>
  <v-app style="background: #f6f6f6;">
    <Menu />
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Menu from './components/Menu'

export default {
  /* eslint-disable */

  name: 'App',

  components: {
    Menu
    // MenuBar,
    // Toolbar
  },
  methods: {
    isRootPath: function() {
      return this.$router.currentRoute.name === 'Home' ? true : false
    }
  },
  data: () => ({
    //
  }),
  created: function() {
    console.log(this.isRootPath())
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  },
  watch: {
    '$router.currentRoute': function() {
      console.log('route changed')
    }
  }
}
/* eslint-enable */
</script>

<style lang="stylus">
.routerLink{
     text-decoration: none;
 }
</style>
