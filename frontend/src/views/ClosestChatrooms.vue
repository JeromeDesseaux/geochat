<template>
  <div>
    <div class="header mt-3">
      <v-row>
        <v-col :cols="12" :md="3" :sm="3" :xs="12" class="py-0">
          <v-select
            v-model="distance"
            :items="distances"
            label="Distance en kilomètres"
            @change="refresh"
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
    <!-- <v-progress-linear
      indeterminate
      color="brown lighten-2"
      v-if="loading"
    ></v-progress-linear> -->
    <div class="home">
      <v-card
        class="my-3"
        light
        v-for="(chatroom, index) in chatrooms"
        :key="index"
      >
        <v-card-title class="headline">{{ chatroom.name }}</v-card-title>

        <v-card-subtitle>
          {{ getParticipants(chatroom) }} participant(s) situé(s) à environ
          {{ getDistance(chatroom) }} mètres de vous.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn text v-if="chatroom.requested" disabled color="brown lighten-2"
            >Demande envoyée</v-btn
          >
          <v-btn text v-else color="brown lighten-2" @click="ask(chatroom)"
            >Demander à participer</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">Demander à rejoindre</v-card-title>

        <v-card-text>
          <v-textarea
            counter
            label="Message"
            placeholder="Indiquez ici un message à destination de l'administrateur du groupe."
            solo
            :rules="messageRules"
            :value="message"
            v-model="message"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="dialog = false">
            Fermer
          </v-btn>

          <v-btn color="brown lighten-2" text @click="sendRequest()">
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <infinite-loading
      @infinite="scroll"
      infinite-scroll-disabled="busy"
      spinner="waveDots"
    >
      <span slot="no-more">
        <no-data
          header="Oops! Vous avez atteint le fond 😅"
          message="Nous n'avons plus de conversations à vous proposer.."
          to="/salon/creer"
          action="Cliquez ici créer votre salon"
        />
      </span>
      <span slot="no-results">
        <no-data
          header="Oops! Aucun résultat 😅"
          message="Apparemment personne n'a encore créé de conversation dans votre zone. Souhaitez-vous être le premier ?"
          to="/salon/creer"
          action="Cliquez ici créer votre salon"
        />
      </span>
    </infinite-loading>
  </div>
</template>

<script>
import config from '../config/config';
import InfiniteLoading from 'vue-infinite-loading';

// import { distance } from "../utils/distance";
import NoData from '../components/NoData';
import _ from 'lodash';

export default {
  name: 'Home',
  data: () => ({
    search: '',
    loading: true,
    dialog: false,
    chatroomId: '',
    message: '',
    chatrooms: [],
    distance: null,
    distances: [1, 2, 5, 10, 20],
    itemsPerPage: 0,
    nbChatrooms: 0,
    currentPage: 0,
    state: null,
    busy: false,
    messageRules: [value => !!value || 'Champs requis.']
  }),
  methods: {
    ask: function(chatroom) {
      this.dialog = true;
      this.chatroomId = chatroom._id;
    },
    sendRequest: function() {
      this.dialog = false;
      let url = `${config.API_URL}/chatrooms/request/${this.chatroomId}`;
      this.$http
        .post(url, { message: this.message })
        .then(() => {
          this.chatrooms.map(chatroom => {
            if (chatroom._id === this.chatroomId) {
              chatroom.requested = true;
            }
          });
          this.message = '';
          this.chatroomId = '';
          this.$forceUpdate();
        })
        .catch(() => {});
    },
    getDistance: function(chatroom) {
      return Math.round(chatroom.distance);
    },
    getParticipants: function(chatroom) {
      return chatroom.nbParticipants + 1;
    },
    isParticipant: function(chatroom) {
      if (chatroom.admin == this.user.id) {
        return true;
      }
      if (chatroom.participants.length > 0) {
        var t = chatroom.participants.filter(part => part.user == this.user.id);
        return t.length > 0;
      }
      return false;
    },
    scroll: function($state) {
      this.state = $state;
      const pageToFetch = this.currentPage + 1;
      const distance = this.distance || 10;
      let url = `${config.API_URL}/chatrooms/closest?distance=${distance}&page=${pageToFetch}`;
      if (this.search) {
        url += `&name=${this.search}`;
      }
      // if(this.chatrooms.length < this.nbChatrooms){
      // $state.reset();
      setTimeout(() => {
        this.$http
          .get(url)
          .then(response => {
            if (response.data.paginatedResults.length > 0) {
              this.chatrooms = this.chatrooms.concat(
                response.data.paginatedResults
              );
              this.currentPage += 1;
              $state.loaded();
            } else {
              $state.complete();
            }
            this.loading = false;
            this.busy = false;
          })
          .catch(() => {
            this.loading = false;
            this.busy = false;
          });
      }, 1500);
    },
    refresh: function() {
      if (this.state) {
        this.chatrooms = [];
        this.currentPage = 0;
        this.state.reset();
      }
    }
  },
  components: {
    'no-data': NoData,
    InfiniteLoading
  },
  watch: {
    search: _.debounce(function() {
      this.refresh();
    }, 1500)
  },
  computed: {
    user: function() {
      return this.$store.getters.user;
    }
  }
};
</script>
