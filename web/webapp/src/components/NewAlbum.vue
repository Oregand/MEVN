<template>
  <v-layout column>
    <v-flex xs12 sm6 offset-sm3>
      <v-container fluid grid-list-md>
        <h3 class="headline mb-0">Add New Album</h3>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Title" v-model="title" :rules="titleRules" :counter="10" required ></v-text-field>
          <v-text-field label="Description" v-model="description" :rules="descriptionRules" required ></v-text-field>
          <v-btn @click="addAlbum" :disabled="!valid">
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import AlbumService from '@/services/AlbumService';

export default {
  name: 'NewAlbum',
  data() {
    return {
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        (v => v && v.length >= 10) || 'Title must be less than 10 characters',
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
        (v => v && v.length >= 10) || 'Description must be greater than 10 characters',
      ],
    };
  },
  methods: {
    async addAlbum() {
      await AlbumService.addAlbum({
        title: this.title,
        description: this.description,
      });
      this.$router.push({ name: 'Albums' });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
.layout {
  margin-top: 5em;
}
</style>