'use strict';
const status = require('http-status');

module.exports = (app, options, authCheck) => {
  const {repo} = options;

  app.get('/albums', authCheck, (req, res, next) => {
    repo.getAllAlbums().then(albums => {
      res.status(status.OK).json(albums);
    }).catch(next);
  });

  app.get('/album/:id', authCheck, (req, res, next) => {
    repo.getAlbumById(req.params.id).then(album => {
      res.status(status.OK).json(album);
    }).catch(next);
  });
};