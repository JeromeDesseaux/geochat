<template>
  <div>
    <div v-if="loading">
      Chargement...
    </div>
    <div v-else>
      <h1 class="display-3 mt-5">{{ chatroom.name }}</h1>
      <h2 class="headline my-5">
        {{ chatroom.participants.length }} participants dont
        {{ pending.length }} en attente
      </h2>
      <v-row justify-center>
        <v-col>
          <v-btn color="success" class="mr-5" @click="sendRequest(true)"
            >Accepter</v-btn
          >
          <v-btn color="red lighten-1" dark @click="sendRequest(false)"
            >Refuser</v-btn
          >
        </v-col>
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Rechercher"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="chatroom.participants"
        :items-per-page="15"
        item-key="_id"
        show-select
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item)" dark>{{ getStatus(item) }}</v-chip>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import config from '../config/config'
/* eslint-disable */

export default {
  data: () => ({
    search: '',
    selected: [],
    loading: true,
    chatroom: null,
    headers: [
      { text: 'Utilisateur', value: 'user.username' },
      { text: 'Message', value: 'message' },
      { text: 'Statut', value: 'status' }
    ],
    pending: []
  }),
  methods: {
    sendRequest: function(isAccepted) {
      let url = `${config.API_URL}/chatrooms/request/${this.chatroom._id}`
      const toSend = this.selected.map(function(value) {
        return {
          request: value._id,
          status: isAccepted ? 'ACCEPTED' : 'REJECTED'
        }
      })
      var done = new Promise((resolve, reject) => {
        toSend.forEach((value, index, array) => {
          this.loading = true
          this.$http
            .put(url, value)
            .then(() => {})
            .catch(() => {})
          if (index === array.length - 1) resolve()
        })
      })

      done.then(() => {
        this.loading = false
        this.selected = []
        this.refreshData()
      })
    },
    getStatus: function(participant) {
      switch (participant.status) {
        case 'PENDING':
          return 'En attente'
        case 'ACCEPTED':
          return 'Accepté'
        case 'REJECTED':
          return 'Refusé'
        default:
          return 'En attente'
      }
    },
    getColor: function(participant) {
      switch (participant.status) {
        case 'PENDING':
          return ''
        case 'ACCEPTED':
          return 'green lighten-2'
        case 'REJECTED':
          return 'red lighten-2'
        default:
          return 'En attente'
      }
    },
    hasUncheckedParticipants: function() {
      this.pending = this.chatroom.participants.filter(
        participant => participant.status === 'PENDING'
      )
      if (this.pending.length > 0) {
        return true
      }
      return false
    },
    refreshData: function() {
      let url = `${config.API_URL}/chatrooms/${this.$route.params.id}`
      this.$http
        .get(url)
        .then(response => {
          this.chatroom = response.data
          if (this.chatroom.admin !== this.user.id) {
            this.$router.push('/404')
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.$router.push('/404')
        })
    }
  },
  mounted() {},
  created() {
    this.refreshData()
  },
  computed: {
    user: function() {
      return this.$store.getters.user
    }
  }
  //   mounted() {
  //       this.hasUncheckedParticipants();
  //   },
}
/* eslint-enable */
</script>
