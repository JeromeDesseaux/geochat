<template>
<div>
    Coucou les participants
</div>
</template>

<script>
import config from "../config/config";

export default {
  data: () => ({
        loading: true,
        chatroom: null,
        pending: [],
  }),
  methods: {
    hasUncheckedParticipants: function() {
        // this.pending = this.chatroom.participants.filter(participant => participant.status === "PENDING"); 
        // if(this.pending.length > 0) {
        //     return true;
        // }
        // return false;
    },
  },
  mounted() {
      let url = `${config.API_URL}/chatrooms/${ this.$route.params.id }`;
      this.$http
        .get(url)
        .then((response) => {
            console.log(response);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });

  },
//   mounted() {
//       this.hasUncheckedParticipants();
//   },
}
</script>