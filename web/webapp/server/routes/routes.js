// server/routes.js
module.exports = (server, Album, authCheck) => {
  // Fetch all albums
  server.get('/albums', authCheck, (req, res) => {
    Album.find({}, 'title description', (error, albums) => {
      if (error) {
        console.error(error);
      }
      res.send({
        albums,
      });
    }).sort({
      _id: -1
    });
  });


  // Fetch single album
  server.get('/album/:id', authCheck, (req, res) => {
    const db = req.db;
    Album.findById(req.params.id, 'title description', (error, album) => {
      if (error) {
        console.error(error);
      }
      res.send(album);
    });
  });

  // Add new Album
  server.post('/albums', authCheck, (req, res) => {
    const db = req.db,
      title = req.body.title,
      description = req.body.description,
      newAlbum = new Album({
        title,
        description,
      });

    newAlbum.save((error) => {
      if (error) {
        console.log(error);
      }
      res.send({
        success: true,
        message: 'Album saved successfully!',
      });
    });
  });


  // Update a album
  server.put('/album/:id', authCheck, (req, res) => {
    const db = req.db;
    Album.findById(req.params.id, 'title description', (error, album) => {
      if (error) {
        console.error(error);
      }

      album.title = req.body.title;
      album.description = req.body.description;
      album.save((error) => {
        if (error) {
          console.log(error);
        }
        res.send({
          success: true,
        });
      });
    });
  });

  // Delete a album
  server.delete('/albums/:id', authCheck, (req, res) => {
    const db = req.db;
    Album.remove({
      _id: req.params.id,
    }, (err) => {
      if (err) {
        res.send(err);
      }

      res.send({
        success: true,
      });
    });
  });
};
