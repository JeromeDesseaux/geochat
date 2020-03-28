import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ClosestChatrooms from '../views/ClosestChatrooms.vue';
import Chatroom from '../views/Chatroom.vue';
import CreateChatroom from '../views/CreateChatroom.vue';
import MyChatrooms from '../views/MyChatrooms.vue';
import ChatroomParticipants from '../views/ChatroomParticipants.vue';
import PageNotFound from '../views/PageNotFound.vue';
import MyRequests from '../views/MyRequests.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'home',
      requiresAnonymous: true
    }
  },
  {
    path: '/connexion',
    name: 'Login',
    component: Login,
    meta: {
      requiresAnonymous: true
    }
  },
  {
    path: '/enregistrement',
    name: 'Register',
    component: Register,
    meta: {
      requiresAnonymous: true
    }
  },
  {
    path: '/mes-salons',
    name: 'MyChatrooms',
    component: MyChatrooms,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/salons/participants/:id',
    name: 'ChatroomParticipants',
    component: ChatroomParticipants,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/salons/proches',
    name: 'Closest',
    component: ClosestChatrooms,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/salon/creer',
    name: 'Create',
    component: CreateChatroom,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/salon/:id',
    name: 'Salon',
    component: Chatroom,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/demandes',
    name: 'MyRequests',
    component: MyRequests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/a-propos',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '*',
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAnonymous)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/mes-salons');
  } else {
    next();
  }
});

export default router;
