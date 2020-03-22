<template>
    <div>
        <side-menu :show="drawer"/>
        <toolbar @show-drawer="showDrawer"/>
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
  }
  
};
</script>