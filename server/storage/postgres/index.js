'use strict';

const config = require('config');
const Sequelize = require('sequelize');

const dbConfig = config.get('db.postgres');

async function init() {
  const sequelize = new Sequelize(dbConfig);
  await sequelize.authenticate();

  Sequelize.postgres.DECIMAL.parse = function (value) {
    return parseFloat(value);
  };

  return sequelize;
}

module.exports = {
  init,
};
