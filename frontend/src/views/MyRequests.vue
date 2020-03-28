<template>
  <div>
    <div class="header mt-3">
      <v-row>
        <v-col :cols="12" :md="3" :sm="3" :xs="12" class="py-0">
          <v-select
            v-model="status"
            :items="statuses"
            label="Statut de la demande"
            @change="refreshChatrooms"
            solo
          ></v-select>
        </v-col>
        <v-col :cols="12" :md="9" :sm="9" :xs="12" class="py-0">
          <v-text-field
            v-model="search"
            placeholder="Recherche..."
            append-icon="mdi-magnify"
            label="Rechercher"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
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
        message="Il semblerait que nous n'ayez aucune demande de ce type."
      />
      <v-card
        class="my-3"
        light
        v-for="(chatroom, index) in chatrooms"
        :key="index"
      >
        <v-card-title class="headline">{{ chatroom.name }}</v-card-title>

        <v-card-subtitle>
          Votre message: {{ getRequest(chatroom).message }}
          <!-- {{getParticipants(chatroom)}} participant(s) situé(s) à environ {{getDistance(chatroom)}} mètres de vous. -->
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            text
            color="brown lighten-2"
            v-if="getRequest(chatroom).status === 'ACCEPTED'"
            >Rejoindre le salon</v-btn
          >
          <v-btn
            text
            color="red lighten-1"
            v-if="getRequest(chatroom).status === 'ACCEPTED'"
            @click.stop="deleteDialog(chatroom)"
            >Quitter le salon</v-btn
          >
          <v-btn
            text
            color="red lighten-1"
            v-else
            @click.stop="deleteDialog(chatroom)"
            >Supprimer ma demande</v-btn
          >
          <!-- <v-btn text v-else color="brown lighten-2">Demander à participer</v-btn> -->
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Êtes-vous sûr?</v-card-title>

        <v-card-text>
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

export default {
  name: 'Home',
  components: {
    'no-data': NoData
  },
  data: () => ({
    search: '',
    toDelete: '',
    dialog: false,
    loading: true,
    error: '',
    statuses: [
      {
        text: 'En attente',
        value: 'PENDING'
      },
      {
        text: 'Refusées',
        value: 'REJECTED'
      },
      {
        text: 'Acceptées',
        value: 'ACCEPTED'
      }
    ],
    status: 'PENDING',
    initData: [],
    chatrooms: []
  }),
  methods: {
    getRequest: function(chatroom) {
      const p = chatroom.participants.filter(p => p.user === this.user.id);
      if (p.length > 0) {
        return p[0];
      }
      return null;
    },
    deleteDialog: function(chatroom) {
      // const request = this.getRequest(chatroom);
      this.dialog = true;
      this.toDelete = chatroom._id;
    },
    validateDelete: function() {
      this.dialog = false;
      this.loading = true;
      let url = `${config.API_URL}/chatrooms/request/${this.toDelete}`;
      this.$http
        .delete(url)
        .then(() => {
          this.loading = false;
          this.refreshChatrooms();
        })
        .catch(() => {
          this.error = 'Une erreur inconnue est survenue';
          this.loading = false;
        });
    },
    refreshChatrooms: function() {
      this.loading = true;
      let url = `${config.API_URL}/chatrooms/requests?status=${this.status}`;
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
  mounted() {
    this.refreshChatrooms();
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
