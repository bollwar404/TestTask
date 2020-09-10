'use strict';

const winston = require('winston');
const config = require('config');

const logger = winston.createLogger({
  level: config.get('logger.level'),
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});

function create(module) {
  return logger.child({module});
}

module.exports = {
  create,
};
