<template>
    <div>
        <side-menu :show="drawer" v-if="isLoggedIn"/>
        <toolbar @show-drawer="showDrawer" :loggedIn="isLoggedIn"/>
    </div>
    
</template>

<script>
import SideMenu from "@/components/SideMenu.vue";
import Toolbar from "@/components/Toolbar.vue";

export default {
    components: {
        SideMenu,
        Toolbar
    },
  data () {
    return {
      drawer: false,
    }
  },
  methods: {
      showDrawer(value){
          this.drawer = value;
      }
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  
};
</script>