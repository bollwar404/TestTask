'use strict';

const router = require('express').Router({});

const {NotFound} = require('http-errors');

const Account = require('../models/Account');

/**
 * Returns accounts data.
 * @param {Object} req - default express request object
 * @param {Object} res - default express response object
 * @param {Function} next - next pipeline run
 * @returns {Promise<void>}
 */
async function get(req, res, next) {
  const {accountId} = req.params;
  const account = await Account.findByPk(accountId);
  if (!account) {
    throw new NotFound(`NO_ACCOUNT_BY_${accountId}`); // Аккаунта нет - 404
  }
  const {balance} = account;
  res.result = {balance}; // Все ок, стандартное 200
  next();
}

router.get('/:accountId', get);

module.exports = router;
