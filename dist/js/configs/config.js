'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

var dbPassword = process.env.DB_PASSWORD;

var nodeEnv = exports.nodeEnv = process.env.NODE_ENV;

var fetchInterval = exports.fetchInterval = process.env.FETCH_INTERVAL || 5000;

var emailAccountUsername = exports.emailAccountUsername = process.env.EMAIL_ACCOUNT_USERNAME;

var emailAccountPassword = exports.emailAccountPassword = process.env.EMAIL_ACCOUNT_PASSWORD;

var devMongoDatabaseUrl = exports.devMongoDatabaseUrl = 'mongodb://mongo:27017/follothru';

var mongoDatabaseUrl = exports.mongoDatabaseUrl = nodeEnv === 'prod' ? 'mongodb+srv://follothru:' + encodeURI(dbPassword) + '@follothru-db-rsgd2.mongodb.net/test?retryWrites=true&w=majority' : devMongoDatabaseUrl;