'use strict';

module.exports = function (log) {
  return (req, res, next) => {
    log.info(`INCOMING_REQUEST: ${req.method}:${req.url}`);
    next();
  }
};
