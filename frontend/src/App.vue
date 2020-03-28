<template>
  <v-app style="background: #f6f6f6;">
    <Menu />
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import Menu from './components/Menu'
const default_layout = 'default'

export default {
  /* eslint-disable */
  name: 'App',
  components: {
    Menu
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
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
