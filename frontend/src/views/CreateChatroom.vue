<template>
  <div class="login">
    <v-layout justify-center>
      <v-card color="white" class="ma-5 pa-1" width="700">
        <h1 class="headline py-5 font-weight-light text-center">Créer un nouveau salon</h1>
        <p class="text-center font-weight-light body-2">
          Vous allez créer un nouveau salon: merci pour vos voisins. Certains en ont sûrement besoin 😍! Ce salon utilisera la localisation renseignée lors de votre inscription et sera disponible à toutes les personnes confinées proches de vous.
        </p>
        <v-form
          class="px-10 pb-10"
          ref="form"
          v-model="valid"
          :lazy-validation="false"
          @keyup.native.enter="valid && validate($event)"
        >
          <v-text-field
            v-model="chatname"
            :rules="chatroomRules"
            label="Nom du salon"
            required
            autofocus
          ></v-text-field>
          <v-radio-group v-model="status" mandatory row>
            <template v-slot:label>
                <div>Votre salon est :</div>
            </template>
            <v-radio label="Public" value="PUBLIC"></v-radio>
            <v-radio label="Privé" value="PRIVATE"></v-radio>
          </v-radio-group>
          <v-alert
      text
      dense
      color="teal"
      icon="mdi-clock-fast"
      border="left"
    >
        {{getInfo()}}
    </v-alert>
          <v-btn
            block
            :light="!valid"
            :dark="valid"
            color="brown lighten-2"
            class="mr-4 mt-5"
            :disabled="!valid"
            :loading="loading"
            @click="validate"
          >
            Créer le salon
          </v-btn>
        </v-form>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    status: "",
    chatname: "",
    valid: false,
    chatroomRules: [
      value => !!value || "Champs requis.",
      value => (value || "").length >= 6 || "6 caractères minimum"
    ]
  }),
  methods: {
    validate() {
      // this.loading = true;
      // const userData = {
      //     email: this.email,
      //     password: this.password
      // }
      // this.$store.dispatch('login', userData)
      // .then(() => {
      //     this.loading=false;
      //     this.$router.push('/');
      // })
      // .catch((err) => console.log(err));
    },
    getInfo() {
        let info = "Votre salon sera accessible à tous les participants qui le désirent sans validation de votre part."
        if(this.status === "PRIVATE") {
            info = "Votre salon sera accessible uniquement sur demande et validation de votre part. Vos messages resteront privés."
        }
        return info;
    }
  }
};
</script>
