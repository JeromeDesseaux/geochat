<template>
  <div class="home">
    <v-parallax dark :src="require('../assets/communicate.jpg')" height="600">
      <v-row align="center" justify="start">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Geochat</h1>
          <h4 class="subheading">Communication géographique.</h4>
          <!-- <v-btn
              dark
              color="brown lighten-2"
              class="mt-3"
              to="/enregistrement"
              >Créer un compte</v-btn
            > -->
        </v-col>
      </v-row>
    </v-parallax>
    <!-- <section>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Geochat</h1>
          <h4 class="subheading">Favoriser la communication géographique.</h4>
        </v-col>
      </v-row>
    </section> -->
    <section>
      <v-container>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-center">
              <h2 class="headline">
                Communiquer avec des personnes proches de chez-vous.
              </h2>
              <span class="subheading">
                Favoriser les liens, l'entraide et la solidarité géographique
                durant le confinement.
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="brown--text text--lighten-2"
                        >public</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Communiquer</div>
                    </v-card-title>
                    <v-card-text>
                      Créer et rechercher des conversations proches de votre
                      lieu de confinement sur des thématiques dont vous avez
                      besoin. L'écoles des enfants, les courses de nécessité
                      pour les voisins malades ou âgés ... ou simplement l'envie
                      de discuter, d'échanger en ces périodes troublées.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="brown--text text--lighten-2"
                        >flash_on</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Chat temps-réel</div>
                    </v-card-title>
                    <v-card-text>
                      Echangez et conversez en temps-réel avec vos voisins
                      connectés sur vos espaces de discussion. Geochat cherche à
                      favoriser l'interaction et l'entraide entre les habitants
                      d'une même zone géographique en vous mettant en relation
                      de façon simple et rapide.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="brown--text text--lighten-2"
                        >share</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        Créer des liens
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Recherchez ou créez de nouvelles conversations et
                      découvrez de nouvelles personnes à proximité de chez-vous!
                      Que vous cherchiez de l'aide, du soutien ou simplement à
                      discuter, geochat est là pour vous y aider.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <v-footer dark>
      <v-container>
        <v-layout row>
          <router-link class="link" to="/a-propos">A propos</router-link>
          <v-spacer></v-spacer>
          <a class="link" href="mailto:contact@geochat.fr">Contact</a>
        </v-layout>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {}
}
</script>

<style lang="stylus" scoped>
.v-parallax img {
  filter: brightness(70%)
}
.link {
  color: white;
}
</style>
