'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReminderNotificationSchema = new _mongoose.Schema({
  _id: _mongoose.Schema.Types.ObjectId,
  sent: Boolean,
  dateTime: Date,
  studentGroup: { type: _mongoose.Schema.Types.ObjectId, ref: 'StudentGroupModel' }
});

exports.default = (0, _mongoose.model)('ReminderNotificationModel', ReminderNotificationSchema);