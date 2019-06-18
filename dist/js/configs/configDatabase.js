'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  _mongoose2.default.connect(_config.devMongoDatabaseUrl, { useNewUrlParser: true }).catch(function (err) {
    logger.error('Failed to connect to database.', err);
  });

  _mongoose.connection.once('open', function () {
    logger.info('Connected to database.');
  });
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _loggers = require('../utils/loggers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _loggers.createLogger)('configDatabase.js');

;