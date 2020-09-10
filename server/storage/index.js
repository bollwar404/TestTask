'use strict';

const postgres = require('./postgres');

class Storage {
  async init() {
    this.sequelize = await postgres.init();
  }
}

module.exports = new Storage();
