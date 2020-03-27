<template>
  <div class="chatroom">
    <div>
      <chatroom
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      >
      </chatroom>
    </div>

    <v-footer color="white" fixed elevation="1" tile inset app>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" md="10" no-gutters>
          <v-textarea
            class="ma-0 pa-0"
            v-model="message"
            autofocus
            dense
            solo
            name="message"
            placeholder="Votre message"
            @keyup.stop.enter="sendMessage"
          ></v-textarea>
        </v-col>
        <v-col class="mt-0" cols="12" md="2" no-gutters>
          <v-btn color="brown lighten-2" raised dark block @click="sendMessage"
            >Envoyer</v-btn
          >
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import Chatroom from '../components/MessageCard'
import io from 'socket.io-client'
import config from '../config/config'

export default {
  components: {
    chatroom: Chatroom
  },
  data: () => ({
    loading: true,
    socket: null,
    chatroom: null,
    message: '',
    messages: []
  }),
  methods: {
    playSound: function() {
      const soundUrl = 'http://soundbible.com/grab.php?id=2156&type=mp3'
      var audio = new Audio(soundUrl)
      audio.play()
    },
    sendMessage: function() {
      let message = {
        message: this.message,
        chatroom: this.$route.params.id,
        user: this.$store.getters.user
      }
      this.messages.push(message)
      this.socket.emit('sendmessage', message)
      this.message = ''
    },
    receivedMessage: function() {
      this.socket.on('received', data => {
        this.playSound()
        this.messages.push(data)
      })
    },
    refreshData: function() {
      let url = `${config.API_URL}/chatrooms/${this.$route.params.id}`
      this.$http
        .get(url)
        .then(response => {
          this.chatroom = response.data
          this.messages = response.data.messages
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.$router.push('/404')
        })
    }
  },
  created() {
    this.socket = io(config.API_URL)
    this.socket.emit('joinchatroom', this.$route.params.id)
    this.receivedMessage()
    this.refreshData()
  },
  updated() {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    )
  }
}
</script>

<style lang="stylus" scoped>
.v-input__control {
    margin-bottom: 0;
}
</style>
