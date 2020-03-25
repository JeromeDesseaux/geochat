<template>
  <div class="chatroom">
    Chatroom {{ $route.params.id }}

    <div>
        <chatroom v-for="(message, index) in messages" :key="index" :message="message">
        </chatroom>
    </div>


    <v-footer
      absolute
      color="white"
      fixed
      elevation="1"
      tile
    >
        <v-row align="center" justify="center">
            <v-col
                class="text-center"
                cols="10"
            >
            <v-textarea
            v-model="message"
            solo
            name="message"
            label="Votre message"
            auto-grow
            ></v-textarea>
            </v-col>
            <v-col
                class="text-center"
                cols="2"
            >
            <v-btn color="brown lighten-2" raised dark block>Envoyer</v-btn>
            </v-col>


        </v-row>
    </v-footer>
  </div>
</template>

<script>
import Chatroom from "../components/MessageCard";

export default {
    components: {
        "chatroom": Chatroom
    },
    data: () => ({
        message: "",
         messages: [
             {
                 user: "5e7a342d07a2fe0c8ceaff82",
                 message: "Salut les copains!Salut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copainsSalut les copains"
             },
             {
                 user: "coucou",
                 message: "Salut les copains!"
             },
             {
                 user: "5e7a342d07a2fe0c8ceaff82",
                 message: "Salut les copains!"
             },
             {
                 user: "coucou",
                 message: "Salut les copains!"
             },
             {
                 user: "5e7a342d07a2fe0c8ceaff82",
                 message: "Salut les copains!"
             },
         ]
    }),
};
</script>
