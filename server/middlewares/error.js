'use strict';

const httpErrors = require('http-errors');

const log = require('../../logger').create('ERROR_MIDDLEWARE');

module.exports = function (err, req, res, next) {
  if (httpErrors.isHttpError(err)) {
    log.warn('END_WITH_ERROR', err);
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
    return;
  }
  log.error('END_WITH_UNKNOWN_ERROR', err);
  res.status(500).json({
    error: 'InternalServerError',
  });
};
