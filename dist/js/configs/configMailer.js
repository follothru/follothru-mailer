'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _nodemailer2.default.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: _config.emailAccountUsername,
      pass: _config.emailAccountPassword
    }
  });
};

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var host = 'smtp.gmail.com';
var port = 587;
var secure = false;

;