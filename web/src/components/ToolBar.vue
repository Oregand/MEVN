<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="updateDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>MVEN Starter</v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn color="primary" v-show="isLoggedIn()" @click="handleLogout()">Logout</v-btn>
      <v-btn color="primary" v-show="!isLoggedIn()" @click="handleLogin()">Login</v-btn>
    </v-toolbar>
</template>

<script>
import { isLoggedIn, login, logout } from '@/services/UserService';
import t from 'vue-types';

export default {
  name: 'ToolBar',
  data() {
    return {};
  },
  props: {
    drawer: t.bool.isRequired,
  },
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    },
    updateDrawer() {
      return this.$emit('updateDrawer');
    },
  },
};
</script>
<style scoped>
.layout {
  margin-top: 5em;
}
</style>