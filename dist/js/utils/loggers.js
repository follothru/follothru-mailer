'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogger = createLogger;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatter = _winston.format.printf(function (_ref) {
  var level = _ref.level,
      label = _ref.label,
      message = _ref.message,
      timestamp = _ref.timestamp;

  return timestamp + ' [' + label + '] ' + level + ': ' + message;
});

function createLogger(label) {
  return _winston2.default.createLogger({
    format: _winston.format.combine(_winston.format.label({ label: label }), _winston.format.json(), _winston.format.timestamp(), formatter),
    transports: [new _winston2.default.transports.Console()]
  });
}