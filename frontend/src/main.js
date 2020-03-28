import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import HomeLayout from './layouts/home-layout.vue';
import DefaultLayout from './layouts/default-layout.vue';

Vue.config.productionTip = false;

Vue.component('home-layout', HomeLayout);
Vue.component('default-layout', DefaultLayout);

Vue.prototype.$http = axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
