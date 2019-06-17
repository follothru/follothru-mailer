require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;

export const nodeEnv = process.env.NODE_ENV;

export const fetchInterval = process.env.FETCH_INTERVAL;

export const emailAccountUsername = process.env.EMAIL_ACCOUNT_USERNAME;

export const emailAccountPassword = process.env.EMAIL_ACCOUNT_PASSWORD;

export const devMongoDatabaseUrl = 'mongodb://mongo:27017/follothru';

export const mongoDatabaseUrl = nodeEnv === 'prod' ?
  `mongodb+srv://follothru:${encodeURI(dbPassword)}@follothru-db-rsgd2.mongodb.net/test?retryWrites=true&w=majority`
  : devMongoDatabaseUrl;
