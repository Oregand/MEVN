/* eslint-env mocha */
const request = require('supertest');
const server = require('../server/server');

describe('Albums API', () => {
  let app = null;
  let testAlbums = [{
    'id': '3',
    'title': 'xXx: Reactivado',
    'description': 'IMAX'
  }, {
    'id': '4',
    'title': 'Resident Evil: Capitulo Final',
    'description': 'IMAX'
  }, {
    'id': '1',
    'title': 'Assasins Creed',
    'description': 'IMAX'
  }];

  let testRepo = {
    getAllAlbums() {
      return Promise.resolve(testAlbums);
    },
    getAlbumById(id) {
      return Promise.resolve(testAlbums.find(album => album.id === id));
    }
  };

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: testRepo
    }).then(serv => {
      app = serv;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can return all albums', (done) => {
    request(app)
      .get('/albums')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'description': 'IMAX'
        });
      })
      .expect(200, done);
  });

  it('can get album premieres', (done) => {
    request(app)
      .get('/albums/premieres')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'description': 'IMAX'
        });
      })
      .expect(200, done);
  });

  it('returns 200 for an known album', (done) => {
    request(app)
      .get('/albums/1')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'description': 'IMAX'
        });
      })
      .expect(200, done);
  });
});