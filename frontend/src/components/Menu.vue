<template>
  <div>
    <side-menu :show="drawer" v-if="isLoggedIn" />
    <toolbar @show-drawer="showDrawer" :loggedIn="isLoggedIn" />
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
  components: {
    SideMenu,
    Toolbar
  },
  data() {
    return {
      drawer: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  methods: {
    showDrawer(value) {
      this.drawer = value;
    }
  },
  created() {
    this.drawer = window.innerWidth < 700;
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>
