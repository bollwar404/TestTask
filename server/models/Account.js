'use strict';

const { DataTypes, Model } = require('sequelize');
const { NotFound, UnprocessableEntity } = require('http-errors');

const log = require('../../logger').create('ACCOUNT_MODEL');

const storage = require('../storage');

class Account extends Model {
  static get modelSchema() {
    return {
      account_id: {
        type: DataTypes.BIGINT,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: DataTypes.DECIMAL(12, 0),
        min: 1,
      }
    }
  }

  static get modelName() {
    return 'account';
  }

  static async makeTransfer(from, to, amount) {
    const accountFrom = await Account.findByPk(from);
    if (!accountFrom) {
      throw new NotFound(`SOURCE_ACCOUNT_NOT_FOUND_${from}`);
    }
    const accountTo = await Account.findByPk(to);
    if (!accountTo) {
      throw new NotFound(`DESTINATION_ACCOUNT_NOT_FOUND_${to}`);
    }
    // Нет какого либо аккаунта - 404
    const transaction = await storage.sequelize.transaction();

    try {
      await accountFrom.update({
        balance: storage.sequelize.literal(`COALESCE(balance, 0)-${amount}`)
      }, {transaction});
      await accountTo.update({
        balance: storage.sequelize.literal(`COALESCE(balance, 0)+${amount}`)
      }, {transaction});
      await transaction.commit();
    }
    catch (e) {
      log.warn(`TRANSFER_ERROR:${e.message}`);
      await transaction.rollback();
      throw new UnprocessableEntity('COULD_NOT_PROCESS_TRANSFER'); // Не можем выполнить
    }
  }
}

module.exports = Account;
