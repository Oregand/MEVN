'use strict';
const {
  EventEmitter
} = require('events');
const server = require('./server/server');
const repository = require('./repo/repo');
const config = require('./config/');
const mediator = new EventEmitter();

console.debug('--- Albums Service ---');
console.debug('Connecting to albums repository...');

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

mediator.on('db.ready', (db) => {
  let rep;
  repository.connect(db)
    .then(repo => {
      console.debug('Connected. Starting Server');
      rep = repo;
      return server.start({
        port: config.serverSettings.port,
        ssl: config.serverSettings.ssl,
        repo
      });
    })
    .then(app => {
      console.debug(`Server started succesfully, running on port: ${config.serverSettings.port}.`);
      app.on('close', () => {
        rep.disconnect();
      });
    });
});

mediator.on('db.error', (err) => {
  console.error(err);
});

config.db.connect(config.dbSettings, mediator);
mediator.emit('boot.ready');