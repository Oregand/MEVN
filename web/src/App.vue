<template>
  <v-app id="inspire">
     <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link v-bind:to="{ name: 'Albums' }">Home</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>create</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link v-bind:to="{ name: 'NewAlbum' }">Add Album</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link v-bind:to="{ name: 'Login' }">Login/Register</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <tool-bar v-on:updateDrawer="updateDrawer" :drawer="drawer"></tool-bar>
    <router-view/>
  </v-app>
</template>

<script>

import ToolBar from '@/components/ToolBar';
import t from 'vue-types';

export default {
  data: () => ({
    drawer: false,
  }),
  props: {
    source: t.string,
  },
  methods: {
    updateDrawer() {
      this.drawer = !this.drawer;
    },
  },
  components: {
    ToolBar,
  },
};
</script>

<style src='vuetify/dist/vuetify.min.css'></style>
