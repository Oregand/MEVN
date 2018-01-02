/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')

describe('Albums API', () => {
  let app = null
  const testCinemasCity = [{
    '_id': '588ac3a02d029a6d15d0b5c4',
    'name': 'Plaza Morelia'
  }, {
    '_id': '588ac3a02d029a6d15d0b5c5',
    'name': 'Las Americas'
  }]

  const testCinemaId = {
    '_id': '588ac3a02d029a6d15d0b5c4',
    'name': 'Plaza Morelia',
    'cinemaPremieres': [
      {
        'id': '1',
        'title': 'Assasins Creed',
        'runtime': 115,
        'plot': 'Lorem ipsum dolor sit amet',
        'poster': 'link to poster...'
      },
      {
        'id': '2',
        'title': 'Aliados',
        'runtime': 124,
        'plot': 'Lorem ipsum dolor sit amet',
        'poster': 'link to poster...'
      },
      {
        'id': '3',
        'title': 'xXx: Reactivado',
        'runtime': 107,
        'plot': 'Lorem ipsum dolor sit amet',
        'poster': 'link to poster...'
      }
    ]
  }

  const testSchedulesMovie = [{
    '_id': 'Plaza Morelia',
    'schedules': [{
      'room': 2.0,
      'schedules': [ '10:15' ]
    }, {
      'room': 1.0,
      'schedules': [ '6:55', '4:35', '10:15' ]
    }, {
      'room': 3.0,
      'schedules': [ '10:15' ]
    }]
  }, {
    '_id': 'Las Americas',
    'schedules': [ {
      'room': 2.0,
      'schedules': [ '3:25', '10:15' ]
    }, {
      'room': 1.0,
      'schedules': [ '12:15', '10:15' ]
    }]
  }]

  let testRepo = {
    getStoresByCity (location) {
      console.log(location)
      return Promise.resolve(testStoresCity)
    },
    getStoreById (storeId) {
      console.log(storeId)
      return Promise.resolve(testStoreId)
    },
    getStoreScheduleByAlbum (storeId, albumId) {
      console.log(storeId, albumId)
      return Promise.resolve(testSchedulesAlbum)
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can return stores by location', (done) => {
    const location = {
      city: '588ababf2d029a6d15d0b5bf'
    }
    request(app)
      .get(`/stores?cityId=${location.city}`)
      .expect((res) => {
        res.body.should.containEql(testStoresCity[0])
        res.body.should.containEql(testStoresCity[1])
      })
      .expect(200, done)
  })

  it('can get movie premiers by store', (done) => {
    request(app)
    .get('/stores/588ac3a02d029a6d15d0b5c4')
    .expect((res) => {
      res.body.should.containEql(testStoreId)
    })
    .expect(200, done)
  })

  it('can get schedules by store and album', (done) => {
    request(app)
      .get('/stores/588ababf2d029a6d15d0b5bf/1')
      .expect((res) => {
        res.body.should.containEql(testSchedulesAlbum[0]),
        res.body.should.containEql(testSchedulesAlbum[1]),
      })
      .expect(200, done)
  })
})