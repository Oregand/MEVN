'use strict';

const repository = (db) => {
  const collection = db.collection('albums');

  const getAllAlbums = () => {
    return new Promise((resolve, reject) => {
      const albums = [];
      const cursor = collection.find({}, {
        title: 1,
        id: 1
      });
      const addAlbum = (album) => {
        albums.push(album);
      };
      const sendAlbums = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all Albums, err:' + err));
        }
        resolve(albums.slice());
      };
      cursor.forEach(addAlbum, sendAlbums);
    });
  };

  const getAlbumById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = {
        _id: 0,
        id: 1,
        title: 1
      };
      const sendAlbum = (err, album) => {
        if (err) {
          reject(new Error(`An error occured fetching a album with id: ${id}, err: ${err}`));
        }
        resolve(album);
      };
      collection.findOne({
        id: id
      }, projection, sendAlbum);
    });
  };

  const createAlbum = (params) => {
    return new Promise((resolve, reject) => {
      const album = {
        title: params.title,
        description: params.description
      };
      album.save((err, album) => {
        if (err) {
          reject(new Error(`An error occured fetching a saveing album ${album}, err: ${err}`));
        }
        resolve(album);
      });
    });
  };

  const updateAlbum = (params) => {
    return new Promise((resolve, reject) => {
      const projection = {
        id: params.id,
      };
      const sendAlbum = (err, album) => {
        if (err) {
          reject(new Error(`An error occured fetching a album with id: ${id}, err: ${err}`));
        }
        resolve(album);
      };
      collection.findById({
        id: params.id
      }, projection, sendAlbum);
    });
  };

  const deleteAlbum = (params) => {
    return new Promise((resolve, reject) => {
      
    });
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    disconnect
  });
};

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'));
    }
    resolve(repository(connection));
  });
};

module.exports = Object.assign({}, {
  connect
});