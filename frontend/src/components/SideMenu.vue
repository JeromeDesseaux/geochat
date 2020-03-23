<template>
      <v-navigation-drawer
        color="blue-grey darken-2"
        clipped
        app
        :disable-resize-watcher="true"
        permanent
        :mini-variant="show"
        fixed
        dark
      >
        <v-list
          dense
          nav
          class="py-5"
        >
          <!-- <v-list-item two-line class='px-0'>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-account</v-icon>
                {{user.username}}
              </v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
            <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
          </v-list-item> -->

          <!-- <v-divider></v-divider> -->

          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
        </v-list>
        <!-- <template v-slot:append>
          <div class="pa-2">
            <v-btn block>Logout</v-btn>
          </div>
        </template> -->
      </v-navigation-drawer>
</template>

<script>
  export default {
    props: ['show'],
    data () {
      return {
        items: [
          { title: 'Salons à proximité', icon: 'mdi-crosshairs-gps', path:"/closest" },
          { title: 'Créer un salon', icon: 'mdi-plus', path:"/salon/creer" },
          { title: 'Mes salons', icon: 'mdi-email-newsletter', path:"/" },
          // { title: 'About', icon: 'mdi-help-box' },
        ],
        // mini: false,
      }
    },
    computed:{
      user: function(){ 
        console.log(this.$store.getters.user);
        return this.$store.getters.user}
    }
  }
</script>
