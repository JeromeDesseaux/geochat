<template>
  <div class="login">
    <v-layout justify-center>
      <v-card color="white" class="ma-5 pa-1" width="700">
        <h1 class="headline py-5 font-weight-light text-center">Connexion</h1>
        <p class="text-center font-weight-light caption">Pas de compte? <router-link to="/register">Enregistrez-vous</router-link></p>
        <v-alert class="mx-10 my-5" type="error" text prominent v-if="error">
          {{error}}
        </v-alert>
        <v-form class="px-10 pb-10" 
            ref="form"
            v-model="valid"
            :lazy-validation="false"
            @keyup.native.enter="valid && validate($event)"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Mot de passe"
            :type="'password'"
            required
          ></v-text-field>
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
            Connexion
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
        valid: false,
        email:"",
        password:"",
        error: "",
      emailRules: [
        value => !!value || 'Champs requis.',
        // value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail invalide'
        },
      ],
      passwordRules: [
        value => !!value || 'Champs requis.',
        value => (value || '').length >= 6 || '6 caractères minimum',
      ],
    }),
    methods: {
        validate () {
            this.loading = true;
            const userData = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('login', userData)
            .then(() => {
                this.loading=false;
                this.$router.push('/');
            })
            .catch(() => {
              this.loading=false;
              this.error = "Identifiants incorrects."
            });
        },
    }
  }
</script>
