'use strict'

const repository = (connection) => {
  const {db, ObjectID} = connection

  const getStoresByCity = (cityId) => {
    return new Promise((resolve, reject) => {
      const stores = []
      const query = {city_id: cityId}
      const projection = {_id: 1, name: 1}
      const cursor = db.collection('stores').find(query, projection)
      const addStore = (store) => {
        stores.push(store)
      }
      const sendStores = (err) => {
        if (err) {
          reject(new Error('An error occured fetching stores, err: ' + err))
        }
        resolve(stores)
      }
      cursor.forEach(addStore, sendStores)
    })
  }

  const getStoreById = (storeId) => {
    return new Promise((resolve, reject) => {
      const query = {_id: new ObjectID(storeId)}
      const projection = {_id: 1, name: 1, storePremieres: 1}
      const response = (err, store) => {
        if (err) {
          reject(new Error('An error occuered retrieving a store, err: ' + err))
        }
        resolve(store)
      }
      db.collection('stores').findOne(query, projection, response)
    })
  }

  const getStoreScheduleByAlbum = (options) => {
    return new Promise((resolve, reject) => {
      const match = { $match: {
        'city_id': options.cityId,
        'storeRooms.schedules.album_id': options.albumId
      }}
      const project = { $project: {
        'name': 1,
        'storeRooms.schedules.time': 1,
        'storeRooms.name': 1,
        'storeRooms.format': 1
      }}
      const unwind = [{ $unwind: '$storeRooms' }, { $unwind: '$storeRooms.schedules' }]
      const group = [{ $group: {
        _id: {
          name: '$name',
          room: '$storeRooms.name'
        },
        schedules: { $addToSet: '$storeRooms.schedules.time' }
      }}, { $group: {
        _id: '$_id.name',
        schedules: {
          $addToSet: {
            room: '$_id.room',
            schedules: '$schedules'
          }
        }
      }}]
      const sendSchedules = (err, result) => {
        if (err) {
          reject('An error has occured fetching schedules by album, err: ' + err)
        }
        resolve(result)
      }
      db.collection('stores').aggregate([match, project, ...unwind, ...group], sendSchedules)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getStoresByCity,
    getStoreById,
    getStoreScheduleByAlbum,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})