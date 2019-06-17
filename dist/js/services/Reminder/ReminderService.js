"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotifications = getNotifications;
exports.updateNotificationStatuses = updateNotificationStatuses;

var _ReminderNotificationModel = require("../../models/ReminderNotificationModel");

var _ReminderNotificationModel2 = _interopRequireDefault(_ReminderNotificationModel);

var _StudentGroupModel = require("../../models/StudentGroupModel");

var _StudentGroupModel2 = _interopRequireDefault(_StudentGroupModel);

var _StudentModel = require("../../models/StudentModel");

var _StudentModel2 = _interopRequireDefault(_StudentModel);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNotifications() {
  return _ReminderNotificationModel2.default.find({ sent: false, dateTime: { $lte: new Date() } }).populate({
    path: 'studentGroup',
    model: 'StudentGroupModel',
    populate: {
      path: 'students',
      model: 'StudentModel'
    }
  });
}

function updateNotificationStatuses(notifications) {
  var sent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (!notifications || notifications.length <= 0) {
    return Promise.resolve();
  }
  var ids = _lodash2.default.map(notifications, function (notification) {
    return notification._id;
  });
  return _ReminderNotificationModel2.default.updateMany({ _id: { $in: ids } }, { $set: { sent: sent } });
}