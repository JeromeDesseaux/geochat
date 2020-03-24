<template>
  <div>
    <div class="header mt-3">
      <v-row>
        <v-col :cols="12" :md="3" :sm="3" :xs="12" class="py-0">
          <v-select
            v-model="distance"
            :items="distances"
            label="Distance en kilomètres"
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
          <v-btn text v-if="chatroom.requested" disabled color="brown lighten-2">Demande envoyée</v-btn
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
  </div>
</template>

<script>
import config from "../config/config";
import { distance } from "../utils/distance";
import _ from "lodash";

export default {
  name: "Home",
  data: () => ({
    search: "",
    loading: true,
    dialog: false,
    chatroomId:"",
    message: "",
    chatrooms: [],
    distance: null,
    distances: [1, 2, 5, 10, 20],
    itemsPerPage: 0,
    nbChatrooms: 0,
    messageRules: [
      value => !!value || "Champs requis."
    ]
  }),
  methods: {
    ask: function(chatroom) {
      this.dialog = true;
      this.chatroomId = chatroom._id;
    },
    sendRequest: function() {
      console.log(this.chatroomId);
      this.dialog = false;
      let url = `${config.API_URL}/chatrooms/request/${this.chatroomId}`;
      this.$http.post(url, {message: this.message}).then(() => {
        this.chatrooms.map(chatroom => {
          if(chatroom._id === this.chatroomId) {
            chatroom.requested = true;
          }
        });
        this.message = "";
        this.chatroomId = "";
        this.$forceUpdate();
        // console.log(response);
      }).catch(err => {
        console.log(err);
      })
    },
    getDistance: function(chatroom) {
      return (
        1000 *
        parseInt(
          distance(
            this.user.coordinates[1],
            this.user.coordinates[0],
            chatroom.location.coordinates[1],
            chatroom.location.coordinates[0],
            "K"
          )
        )
      );
    },
    getParticipants: function(chatroom) {
      if (chatroom.participants) {
        return (
          chatroom.participants.filter(part => part.status === "ACCEPTED")
            .length + 1
        );
      }
      return 1;
    },
    isParticipant: function(chatroom) {
      console.log(chatroom);
      if (chatroom.admin == this.user.id) {
        return true;
      }
      if (chatroom.participants.length > 0) {
        var t = chatroom.participants.filter(part => part.user == this.user.id);
        return t.length > 0;
      }
      return false;
    },
    refreshChatrooms: function() {
      const distance = this.distance || 10;
      this.loading = true;
      let url = `${config.API_URL}/chatrooms/closest?distance=${distance}`;
      if (this.search) {
        url += `&name=${this.search}`;
      }
      this.$http
        .get(url)
        .then(response => {
          this.chatrooms = response.data.chatrooms;
          this.itemsPerPage = response.data.resPerPage;
          this.nbChatrooms = response.data.total;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    }
  },
  components: {},
  mounted() {
    this.refreshChatrooms();
  },
  watch: {
    search: _.debounce(function() {
      this.refreshChatrooms();
    }, 1500)
  },
  computed: {
    user: function() {
      return this.$store.getters.user;
    }
  }
};
</script>
