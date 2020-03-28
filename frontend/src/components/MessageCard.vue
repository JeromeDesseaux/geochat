<template>
  <!-- <v-row v-if="isSender">
    <v-col :cols="6"></v-col>
    <v-col :cols="6" class="justify-space-between">
        <div style="margin-left: auto">
        </div>
        <v-spacer></v-spacer>
        <div id="content">
            <v-card color="green lighten-5">
                <v-card-text>
                {{ message.message }}
                </v-card-text>
            </v-card>
            <p class="caption ml-2">Username</p>
        </div>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="auto">
      <v-card color="" width="100%">
        <v-card-text>
          {{ message.message }}
        </v-card-text>
      </v-card>
        <p class="caption ml-2">Username</p>
    </v-col>
  </v-row> -->
  <div :class="getClass()">
    <v-card :color="getColor()" class="my-2" style="max-width: 80%">
      <v-card-text>
        <p class="caption">
          {{ message.user.username }} le {{ getTime(message) }}
        </p>
        {{ message.message }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['message'],
  data: () => ({
    isSender: true
  }),
  methods: {
    getTime: function(message) {
      const dt = message.createdAt;
      if (dt) {
        return moment(String(dt)).format('DD/MM/YYYY à hh:mm');
      }
      return '';
    },
    hasSentMessage: function() {
      if (this.message.user) {
        const id = this.message.user._id || this.message.user.id;
        if (id === this.user.id) {
          this.isSender = true;
          return true;
        }
      }
      this.isSender = false;
      return false;
    },
    getClass: function() {
      return this.hasSentMessage() ? 'd-flex justify-end' : 'd-flex';
    },
    getColor: function() {
      return this.hasSentMessage() ? 'green lighten-5' : '';
    }
  },
  mounted() {
    this.hasSentMessage();
  },
  computed: {
    user: function() {
      return this.$store.getters.user;
    }
  }
};
</script>
