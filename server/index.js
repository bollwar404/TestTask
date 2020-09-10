const { argv } = require('yargs');
const config = require('config');

const log = require('../logger').create('MAIN');

const storage = require('./storage');
const models = require('./models');

const app = require('./app');

let httpServer;

async function start() {
  log.info('Init stores...');
  await storage.init();
  await models.init();

  const {
    host = config.get('server.host'),
    port = config.get('server.port'),
  } = argv;

  httpServer = app.listen(port, host);
  log.info(`Server is listening at ${port}`);
}

function stop() {
  log.info('Received SIGTERM, shutting down gracefully');
  app.enable('closing');

  httpServer.close(() => {
    log.info('Closed out remaining connections');
    process.exit();
  });

  setTimeout(() => {
    log.error('Could not close connections in time, forcing shut down');
    process.exit(1);
  }, config.get('server.shutdownTimeout'));
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

start()
  .catch((err) => {
    log.error(`Unable to start server! ${err.message}`, err);
    process.exit(1);
  });
