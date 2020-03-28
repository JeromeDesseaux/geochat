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
        message="Il semblerait que vous n'ayez rejoint aucun salon pour le moment."
        to="/salons/proches"
        action="Cliquez ici pour rechercher des salons proches de chez vous!"
      />
      <v-card
        class="my-3"
        light
        v-for="(chatroom, index) in chatrooms"
        :key="index"
      >
        <v-card-title class="headline">{{ chatroom.name }}</v-card-title>
        <v-card-subtitle class="caption" v-if="chatroom.participants.length > 0"
          >{{ chatroom.participants.length }} participant(s)</v-card-subtitle
        >

        <v-card-text class="red--text" v-if="chatroom.admin == user.id">
          <requests-alert
            :chatroom="chatroom"
            :to="{ name: 'ChatroomParticipants', params: { id: chatroom._id } }"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn text color="brown lighten-2" :to="getPath(chatroom)"
            >Rejoindre le salon</v-btn
          >
          <v-btn
            text
            color="green lighten-2"
            v-if="chatroom.admin == user.id"
            :to="{ name: 'ChatroomParticipants', params: { id: chatroom._id } }"
            >Gérer les participants</v-btn
          >
          <v-btn
            text
            color="red lighten-2"
            @click.stop="deleteDialog(chatroom)"
            v-if="chatroom.admin == user.id"
            >Supprimer</v-btn
          >
          <v-btn
            text
            color="red lighten-2"
            @click.stop="deleteDialog(chatroom)"
            v-else
            >Quitter</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Êtes-vous sûr?</v-card-title>

        <v-card-text v-if="toDelete.admin == user.id">
          Cette action entraînera la suppression complète du salon et de ses
          messages de façon irréversible.
        </v-card-text>
        <v-card-text v-else>
          Cette action est irréversible.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="dialog = false">
            Fermer
          </v-btn>

          <v-btn color="red darken-1" text @click="validateDelete()">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import config from '../config/config';
import NoData from '../components/NoData';
import RequestsAlert from '../components/RequestsAlert';

export default {
  name: 'Home',
  data: () => ({
    search: '',
    loading: true,
    dialog: false,
    participantsChatroom: null,
    participantsDialog: false,
    toDelete: '',
    initData: [],
    chatrooms: []
  }),
  methods: {
    getPath: function(chatroom) {
      return '/salon/' + chatroom._id;
    },
    showDialog(chatroom) {
      this.participantsDialog = true;
      this.participantsChatroom = chatroom;
    },
    deleteDialog: function(chatroom) {
      this.dialog = true;
      this.toDelete = chatroom;
    },
    validateDelete: function() {
      this.dialog = false;
      this.loading = true;
      let url = `${config.API_URL}/chatrooms/request/${this.toDelete._id}`;
      if (this.toDelete.admin == this.user.id) {
        url = `${config.API_URL}/chatrooms/${this.toDelete._id}`;
      }
      this.$http
        .delete(url)
        .then(() => {
          this.loading = false;
          this.refreshData();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    refreshData: function() {
      this.loading = true;
      let url = `${config.API_URL}/chatrooms/getmine`;
      this.$http
        .get(url)
        .then(response => {
          this.chatrooms = response.data;
          this.initData = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  components: {
    'no-data': NoData,
    'requests-alert': RequestsAlert
  },
  mounted() {
    this.refreshData();
  },
  watch: {
    search: function() {
      this.chatrooms = this.initData.filter(chatroom =>
        chatroom.name.includes(this.search)
      );
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.user;
    }
  }
};
</script>
