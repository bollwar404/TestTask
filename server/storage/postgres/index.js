'use strict';

const config = require('config');
const Sequelize = require('sequelize');

const dbConfig = config.get('db.postgres');

async function init() {
  const sequelize = new Sequelize(dbConfig);
  await sequelize.authenticate();
  return sequelize;
}

module.exports = {
  init,
};
