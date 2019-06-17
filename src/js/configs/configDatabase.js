import mongoose, { connection } from 'mongoose';
import { mongoDatabaseUrl, nodeEnv, devMongoDatabaseUrl } from './config';

export default function () {
  mongoose.connect(devMongoDatabaseUrl, { useNewUrlParser: true });
  connection.on('error', err => {
    console.error('Failed to connect to database.', err);
  });
  connection.once('open', () => {
    console.log('Connected to database.');
  })
};
