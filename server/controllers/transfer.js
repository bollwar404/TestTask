'use strict';

const router = require('express').Router({});

const Account = require('../models/Account');

async function transfer(req, res, next) {
  const { fromAccount, toAccount } = req.params;
  const { amount } = req.body;
  await Account.makeTransfer(fromAccount, toAccount, amount);
  res.emptyResponse = true;
  res.code = 204; // Нет требований что то показать, но все ок
  next();
}

router.post('/:fromAccount/:toAccount', transfer);

module.exports = router;
