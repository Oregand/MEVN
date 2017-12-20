const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
  title: String,
  description: String,
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
