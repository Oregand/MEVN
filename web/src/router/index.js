import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Albums from '@/components/Albums';
import NewAlbum from '@/components/NewAlbum';
import EditAlbum from '@/components/EditAlbum';
import Callback from '@/components/CallBack';
import { requireAuth } from '@/services/UserService';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Albums',
      component: Albums,
      beforeEnter: requireAuth,
    },
    {
      path: '/albums/new',
      name: 'NewAlbum',
      component: NewAlbum,
    },
    {
      path: '/albums/:id',
      name: 'EditAlbum',
      component: EditAlbum,
    },
    {
      path: '/callback',
      component: Callback,
    },
  ],
});
