<template>
<div>
    <v-alert prominent dense type="info" color="blue lighten-3" v-if="pending.length == 0">
        <v-row align="center">
            <v-col class="grow">
                Votre conversation a {{pending.length}} demande(s) en attente.
            </v-col>
            <v-col class="shrink">
            <v-btn :to="to">Gérer les demandes</v-btn>
            </v-col>
        </v-row>
    </v-alert>
        <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar tile dark color="blue-grey darken-2">
            <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Gérer les demandes</v-toolbar-title>
            <v-spacer></v-spacer>
            </v-toolbar>
            <v-container>
                <v-alert prominent dense type="info" color="blue lighten-3">
                    <v-row align="center">
                        <v-col class="grow">
                            Sélectionnez les différentes demandes à valider / refuser puis cliquez sur un des boutons ci-dessous.
                        </v-col>
                    </v-row>
                </v-alert>
                <v-row>
                    <v-col>
                        <v-btn>Accepter</v-btn>
                        <v-btn>Refuser</v-btn>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>

                </v-row>
                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="requests"
                    :items-per-page="15"
                    item-key="user._id"
                    show-select
                    :search="search"
                    class="elevation-1"
                ></v-data-table>
            </v-container>
        </v-card>
        </v-dialog> -->

</div>
</template>

<script>
export default {
  props: ["chatroom", "to"],
  data: () => ({
        pending: [],
    //   search: '',
    //   selected: [],
    //   headers: [
    //       {
    //         text: "Nom d'utilisateur",
    //         align: 'start',
    //         sortable: true,
    //         value: 'user.username',
    //       },
    //       { text: 'Message', value: 'message' },
    //     ],
    //     requests: [
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdzqdqdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdaqzdqdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdaqzdqzddzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadqzdqzdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdaqzdzddzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadqzdqzddzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdaqzdqzdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadqzdqzdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdaqzdqzddzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdzqdqzdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdqzdqdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadqzdqzdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdqzdqzdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzqzdqzddq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzqzdqzddq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdaqzdzqddzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdaqzdqzdqzdqdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadqzdqzdqzdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdaqzdqzdqzdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadqzdqzdzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzqzddqzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //       {
    //         user: {
    //             username: "JohnDoe1",
    //             _id:"abcdadzdq"
    //         },
    //         message: "Coucouc l'ami! ",
    //       },
    //     ],
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