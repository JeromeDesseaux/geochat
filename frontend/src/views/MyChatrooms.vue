<template>
<div>
    <div class="header mt-3">
        <v-text-field
            v-model="search"
            placeholder="Recherche..."
            append-icon="mdi-magnify"
            label="Rechercher"
            solo
        ></v-text-field>
    </div>
  <v-progress-linear
    indeterminate
    color="brown lighten-2"
    v-if="loading"
  ></v-progress-linear>
  <div class="home" v-else>
      <no-data
        v-if="chatrooms.length === 0"
        header="Oops! Petit problème 😅"
        message="Il semblerait que nous n'ayez rejoint aucun salon pour le moment."
        to="/closest"
        action="Cliquez ici pour rechercher des salons proches de chez vous!"
      />
    <v-card class="my-3" light v-for="(chatroom, index) in chatrooms" :key="index">
      <v-card-title class="headline">{{chatroom.name}}</v-card-title>

      <!-- <v-card-subtitle>
          {{getParticipants(chatroom)}} participant(s) situé(s) à environ {{getDistance(chatroom)}} mètres de vous.
        </v-card-subtitle> -->

      <v-card-actions>
        <v-btn text color="brown lighten-2">Rejoindre le salon</v-btn>
        <!-- <v-btn text v-else color="brown lighten-2">Demander à participer</v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</div>
</template>

<script>
import config from "../config/config";
import NoData from "../components/NoData";

export default {
  name: "Home",
  data: () => ({
    search: "",
    loading: true,
    initData: [],
    chatrooms: [],
  }),
  methods: {},
  components: {
      "no-data": NoData
  },
  mounted() {
    this.loading = true;
    let url = `${config.API_URL}/chatrooms/getmine`;
    this.$http
    .get(url)
    .then(response => {
        this.chatrooms = response.data;
        this.initData = response.data;
        this.loading = false;
    })
    .catch(err => {
        console.log(err);
        this.loading = false;
    });
  },
  watch: {
      search: function() {
          this.chatrooms = this.initData.filter(chatroom => chatroom.name.includes(this.search));
      }
  }
};
</script>
