<template>
<div>
    <v-alert prominent dense type="info" color="blue lighten-3" v-if="pending.length > 0">
        <v-row align="center">
            <v-col class="grow">
                Votre conversation a {{pending.length}} demande(s) en attente.
            </v-col>
            <v-col class="shrink">
            <v-btn :to="to">Gérer les demandes</v-btn>
            </v-col>
        </v-row>
    </v-alert>

</div>
</template>

<script>
export default {
  props: ["chatroom", "to"],
  data: () => ({
        pending: [],
  }),
  methods: {
    hasUncheckedParticipants: function() {
        this.pending = this.chatroom.participants.filter(participant => participant.status === "PENDING"); 
        if(this.pending.length > 0) {
            return true;
        }
        return false;
    },
  },
  mounted() {
      this.hasUncheckedParticipants();
  },
}
</script>