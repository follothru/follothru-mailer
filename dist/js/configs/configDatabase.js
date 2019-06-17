'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  _mongoose2.default.connect(_config.devMongoDatabaseUrl, { useNewUrlParser: true });
  _mongoose.connection.on('error', function (err) {
    console.error('Failed to connect to database.', err);
  });
  _mongoose.connection.once('open', function () {
    console.log('Connected to database.');
  });
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;