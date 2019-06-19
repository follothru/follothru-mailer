import mongoose, { connection } from 'mongoose';
import { mongoDatabaseUrl } from './config';
import { createLogger } from '../utils/loggers';

const logger = createLogger('configDatabase.js');

const retryInterval = 60000;

function connectDatabase() {
  return mongoose.connect(mongoDatabaseUrl, { useNewUrlParser: true }).catch(err => {
    logger.error(`Failed to connect to database. Retrying in ${retryInterval / 1000} seconds.`);
    logger.error(err);

    setTimeout(connectDatabase, retryInterval);
  });
}

connection.once('open', () => {
  logger.info('Connected to database.');
});

export default connectDatabase;
