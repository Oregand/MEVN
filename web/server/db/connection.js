const mongoose = require('mongoose');

module.exports.connect = function () {
  mongoose.connect('mongodb://david:password@ds051615.mlab.com:51615/david-sandbox');
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", function (callback) {
    console.log("Connection Succeeded");
  });
  return db;
}