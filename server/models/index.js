'use strict';

const Account = require('./Account');

const storage = require('../storage');

class Models {
  async init() {
    Account.init(Account.modelSchema, {
      sequelize: storage.sequelize,
      modelName: Account.modelName,
      timestamps: false,
    });

    await storage.sequelize.sync();
  }
}

module.exports = new Models();
