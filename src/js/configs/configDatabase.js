import mongoose, { connection } from 'mongoose';
import { mongoDatabaseUrl, nodeEnv, devMongoDatabaseUrl } from './config';
import { createLogger } from '../utils/loggers';

const logger = createLogger('configDatabase.js');

export default function () {
  mongoose.connect(devMongoDatabaseUrl, { useNewUrlParser: true }).catch(err => {
    logger.error('Failed to connect to database.', err);
  });

  connection.once('open', () => {
    logger.info('Connected to database.');
  })
};
