'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/stores', (req, res, next) => {
    repo.getStoressByCity(req.query.cityId)
      .then(stores => {
        res.status(status.OK).json(stores)
      })
      .catch(next)
  })

  app.get('/stores/:storeId', (req, res, next) => {
    repo.getStoreById(req.params.storeId)
      .then(store => {
        res.status(status.OK).json(store)
      })
      .catch(next)
  })

  app.get('/stores/:cityId/:albumId', (req, res, next) => {
    const params = {
      cityId: req.params.cityId,
      albumId: req.params.albumId
    }
    repo.getStoreScheduleByAlbum(params)
      .then(schedules => {
        res.status(status.OK).json(schedules)
      })
      .catch(next)
  })
}