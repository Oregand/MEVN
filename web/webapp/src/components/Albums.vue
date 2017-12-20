<template>
  <v-layout row>
      <v-container v-if="isLoggedIn">
        <v-card>
          <v-card-title>
          <router-link :to="{ name: 'NewAlbum' }">         
            <v-btn
              color="pink"
              dark
              small
              absolute
              bottom
              left
              fab
            >
              <v-icon>add</v-icon>
            </v-btn></router-link>
            Albums
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-model="selected"
              :headers="headers"
              :items="items"
              :search="search"
              select-all
              :pagination.sync="pagination"
              item-key="title"
              class="elevation-1"
            >
            <template slot="headers" slot-scope="props">
              <tr>
                <th>
                  <v-checkbox
                    primary
                    hide-details
                    @click.native="toggleAll"
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                  ></v-checkbox>
                </th>
                <th v-for="header in props.headers" :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    :input-value="props.selected"
                  ></v-checkbox>
                </td>
                <td>{{ props.item.title }}</td>
                <td class="text-xs-right">{{ props.item.description }}</td>
                <td>
                  <router-link class="black--text" :to="{ name: 'EditAlbum', params: { id: props.item._id } }">
                    <v-btn color="primary" fab small dark>
                    <v-icon>edit</v-icon>
                  </v-btn>
                  </router-link>
                  <v-btn color="error" @click="deleteAlbum(props.item._id)" fab small dark>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="indigo" icon="info">
                <v-progress-circular indeterminate color="pink"></v-progress-circular>
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
      <v-container v-else>
        <v-flex xs12 sm6 offset-sm3>
          <v-snackbar :timeout="timeout":color="color" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="snackbar">
            {{ text }}
            <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-flex>
      </v-container>
  </v-layout>
</template>

<script>
import AlbumService from '@/services/AlbumService';
import { isLoggedIn } from '@/services/UserService';

export default {
  name: 'albums',
  data() {
    return {
      items: [],
      pagination: {
        sortBy: 'title',
      },
      selected: [],
      tmp: '',
      search: '',
      headers: [
        {
          text: 'Title',
          align: 'left',
          value: 'title',
        },
        { text: 'Description', value: 'description' },
      ],
      snackbar: true,
      color: 'red',
      mode: '',
      timeout: 6000,
      text: 'You need to login before you can view albums',
    };
  },
  mounted() {
    this.getAlbums();
  },
  methods: {
    async getAlbums() {
      const response = await AlbumService.fetchAlbums();
      this.items = response.data;
    },
    async deleteAlbum(id) {
      await AlbumService.deleteAlbum(id);
      this.$router.push({ name: 'Albums' });
    },
    isLoggedIn() {
      if (isLoggedIn() === false) {
        this.snackbar = true;
      }
      return isLoggedIn();
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  margin-left: 0.5em;
}
</style>