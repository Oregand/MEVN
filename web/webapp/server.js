'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  serveStatic = require('serve-static'),
  app = express(),
  jwt = require('express-jwt'),
  jwks = require('jwks-rsa'),
  history = require('connect-history-api-fallback'),  
  mongoDBConnection = require('./server/db/connection'),
  db = mongoDBConnection.connect(),
  Album = require('./server/models/album');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(history());
app.use(serveStatic(`${__dirname}/dist`));

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://david-personal.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'http://mvenstarter.com',
  issuer: 'https://david-personal.eu.auth0.com/',
  algorithms: ['RS256'],
});

require('./server/routes/routes.js')(app, Album, authCheck);

app.listen(process.env.PORT || 8082);
