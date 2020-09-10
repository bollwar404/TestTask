const Express = require('express');

const bodyParser = require('body-parser');

require('express-async-errors');

const Account = require('./controllers/account');
const Transfer = require('./controllers/transfer');

const log = require('../logger').create('APP');
const middlewares = require('./middlewares');

const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middlewares.log(log));

app.use('/account', Account);
app.use('/transfer', Transfer);

app.use(middlewares.success);
app.use(middlewares.error);

module.exports = app;
