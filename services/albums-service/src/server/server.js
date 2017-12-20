const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const api = require('../api/albums');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const history = require('connect-history-api-fallback');

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'));
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'));
    }

    const app = express();
    app.use(morgan('dev'));
    //app.use(history());
    app.use(helmet());
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err));
      res.status(500).send('Something went wrongnpm !');
    });

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

    api(app, options, authCheck);

    const server = app.listen(options.port, () => resolve(server));
  });
};

module.exports = Object.assign({}, {
  start
});