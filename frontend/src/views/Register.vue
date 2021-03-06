<template>
  <div class="login">
    <v-layout justify-center>
      <v-card color="white" class="ma-5 pa-1" width="700">
        <h1 class="headline py-5 font-weight-light text-center">
          Création de compte
        </h1>
        <p class="text-center font-weight-light caption">
          Déjà enregistré?
          <router-link to="/connexion">connectez-vous</router-link>
        </p>
        <v-alert
          text
          outlined
          color="deep-orange"
          icon="mdi-fire"
          v-if="error"
          class="mx-5"
        >
          {{ error }}
        </v-alert>
        <v-form
          class="px-10 pb-10"
          ref="form"
          v-model="valid"
          :lazy-validation="false"
        >
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Nom d'utilisateur"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Mot de passe"
            :type="'password'"
            required
          ></v-text-field>
          <div id="location" v-if="!location">
            <v-alert
              text
              outlined
              color="primary"
              icon="mdi-information-outline"
              class="mx-5 my-2"
            >
              Vos données de localisation nous permettent de rechercher les
              conversations autour de votre zone de confinement. Celles-ci
              restent privées et ne seront jamais exploitées dans un autre but
              que celui de vous fournir ce service.
            </v-alert>
            <div class="text-center" v-if="!error">
              <v-btn
                outlined
                color="blue-grey darken-2"
                @click="locateMe"
                :loading="gettingLocation"
              >
                <v-icon key="geolocate" v-text="'mdi-crosshairs-gps'"></v-icon>
                Localisez-moi
              </v-btn>
            </div>
            <v-autocomplete
              v-else
              v-model="city"
              :loading="loading"
              :items="items"
              :search-input.sync="search"
              cache-items
              hide-no-data
              hide-details
              label="Dans quelle commune êtes-vous confiné ?"
            >
            </v-autocomplete>
          </div>
          <v-btn
            block
            :light="!formValid"
            :dark="formValid"
            color="brown lighten-2"
            class="mr-4 mt-5"
            @click="validate"
            :disabled="!formValid"
          >
            Créer mon compte
          </v-btn>
        </v-form>
        <!-- <v-img height="100%" width="100%">
            <l-map :zoom="zoom" :center="marker" style="position: relative; display:block;">
                <l-tile-layer
                    :url="url"
                    :attribution="attribution"
                />
                <l-marker :lat-lng="marker" />
            </l-map>
          </v-img> -->
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import axios from 'axios'
import _ from 'lodash'
// import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  data: () => ({
    zoom: 12,
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    marker: latLng(49.4431, 1.0993),
    valid: false,
    email: '',
    password: '',
    username: '',
    error: '',
    location: null,
    gettingLocation: false,
    loading: false,
    items: [],
    search: null,
    states: [],
    isTyping: true,
    city: '',
    emailRules: [
      value => !!value || 'Champs requis.',
      // value => (value || '').length <= 20 || 'Max 20 characters',
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail invalide'
      }
    ],
    usernameRules: [
      value => !!value || 'Champs requis.',
      value => (value || '').length <= 30 || '30 caractères maximum'
    ],
    passwordRules: [
      value => !!value || 'Champs requis.',
      value => (value || '').length >= 6 || '6 caractères minimum'
    ]
  }),
  watch: {
    search: _.debounce(function(val) {
      this.isTyping = false
      this.querySelections(val)
    }, 1500),
    city: function() {
      this.location = this.city.centre.coordinates
    }
  },
  computed: {
    formValid: function() {
      if (this.location) {
        if (this.location[0] != 0 && this.location[1] != 0) {
          return this.valid
        }
      }
      return false
    }
  },
  methods: {
    validate() {
      const userData = {
        username: this.username,
        password: this.password,
        email: this.email,
        location: {
          type: 'Point',
          coordinates: this.location
        }
      }
      this.$store
        .dispatch('register', userData)
        .then(() => {
          this.loading = false
          this.$router.push('/salons/proches')
        })
        .catch(() => {
          this.loading = false
          this.error = 'Identifiants incorrects.'
        })
      //   this.$refs.form.validate();
    },
    querySelections(v) {
      const URL = `https://geo.api.gouv.fr/communes?nom=${v}&fields=nom,code,codesPostaux,centre,codeDepartement,codeRegion,population&format=json&geometry=centre`
      this.loading = true
      axios.get(URL).then(result => {
        const data = result.data
        this.items = data.map(function(city) {
          return { text: `${city.nom} - ${city.codesPostaux[0]}`, value: city }
        })
        this.loading = false
      })
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    async locateMe() {
      this.gettingLocation = true
      try {
        let location = await this.getLocation()
        this.location = [location.coords.longitude, location.coords.latitude]
        this.marker = latLng(this.location[1], this.location[0])
      } catch (e) {
        this.error =
          "Impossible d'obtenir votre localisation. Veuillez à défaut indiquer votre commune de confinement."
      } finally {
        this.gettingLocation = false
      }
    }
  }
}
</script>
