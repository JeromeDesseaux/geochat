/* eslint-disable */

import Vue from "vue";
import Vuex from "vuex";
import config from "@/config/config.js";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from '@/router/index'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  plugins: [createPersistedState()],
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.token;
      state.user = data.user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
            url: `${config.API_URL}/users/login`,
            data: user,
            method: "POST"
          })
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", {
              token: token,
              user: JSON.parse(window.atob(token.split(".")[1]))
            });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        console.log(user);
        axios({
            url: `${config.API_URL}/users/register`,
            data: user,
            method: "POST"
          })
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", {
              token: token,
              user: JSON.parse(window.atob(token.split(".")[1]))
            });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        router.push('/');
        resolve();
      });
    }
  },
  modules: {}
});

/* eslint-enable */