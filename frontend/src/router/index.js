import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ClosestChatrooms from "../views/ClosestChatrooms.vue";
import CreateChatroom from "../views/CreateChatroom.vue";
import MyChatrooms from "../views/MyChatrooms.vue";
import MyRequests from "../views/MyRequests.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/connexion",
    name: "Login",
    component: Login
  },
  {
    path: "/enregistrement",
    name: "Register",
    component: Register
  },
  {
    path: "/mes-salons",
    name: "MyChatrooms",
    component: MyChatrooms,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/salons/proches",
    name: "Closest",
    component: ClosestChatrooms,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/salon/creer",
    name: "Create",
    component: CreateChatroom,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/demandes",
    name: "MyRequests",
    component: MyRequests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/a-propos",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;
