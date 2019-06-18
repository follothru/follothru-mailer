'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _configMailer = require('./configs/configMailer');

var _configMailer2 = _interopRequireDefault(_configMailer);

var _emailTemplates = require('email-templates');

var _emailTemplates2 = _interopRequireDefault(_emailTemplates);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./configs/config');

var _ReminderService = require('./services/Reminder/ReminderService');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loggers = require('./utils/loggers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emailRoot = _path2.default.join(__dirname, 'resources/emails');

var transport = (0, _configMailer2.default)();

var logger = (0, _loggers.createLogger)('FolloThruMailer.js');

function sendEmail(to, template, locals) {
  var email = new _emailTemplates2.default({
    views: { root: emailRoot },
    message: {
      from: _config.emailAccountUsername
    },
    transport: transport
  });

  return email.send({
    template: template,
    message: {
      to: to
    },
    locals: locals
  });
}

function sendEmailsToStudentGroup(studentGroup, template) {
  var locals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var students = studentGroup.students;

  var promises = _lodash2.default.map(students, function (student) {
    return new Promise(function (resolve) {
      var preferName = student.preferName,
          email = student.email;

      locals.recipient = preferName;
      sendEmail(email, template, locals).then(function () {
        return resolve({ success: true, student: student });
      }).catch(function (error) {
        logger.error('Failed to send email to \'' + email + '\'', error);
        resolve({ success: false, student: student, error: error });
      });
    });
  });

  return Promise.all(promises);
}

var sendNotification = function sendNotification(notification) {
  return sendEmailsToStudentGroup(notification.studentGroup, 'follothru').then(function (results) {
    var successes = _lodash2.default.filter(results, function (result) {
      return result.success;
    });
    logger.info('(success: ' + successes.length + '/' + results.length + ') send notification(' + notification._id + ') completed.');
  }).then(function () {
    return notification;
  });
};

var handleUpdateNotificationResponse = function handleUpdateNotificationResponse(res) {
  if (res && res.nModified > 0) {
    logger.info('Reminder notification statuses updated.', res);
  }
  return res;
};

var FolloThruMailer = function () {
  function FolloThruMailer() {
    _classCallCheck(this, FolloThruMailer);
  }

  _createClass(FolloThruMailer, [{
    key: 'sendNotifications',
    value: function sendNotifications() {
      (0, _ReminderService.getNotifications)().then(function (notifications) {
        var sentPromises = _lodash2.default.map(notifications, sendNotification);

        return Promise.all(sentPromises).then(function (notifications) {
          return (0, _ReminderService.updateNotificationStatuses)(notifications).then(handleUpdateNotificationResponse);
        }).then(function () {
          return sentPromises;
        }).catch(function (err) {
          logger.error('Failed to update notification statuses.', err);
        });
      }).then(function (sents) {
        return logger.info('Update completed. ' + sents.length + ' notification(s) processed.');
      }).catch(function (err) {
        logger.error('Failed to fetch reminder notifications.', err);
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      this.sendNotifications();
      setInterval(function () {
        _this.sendNotifications();
      }, _config.fetchInterval);
    }
  }]);

  return FolloThruMailer;
}();

exports.default = FolloThruMailer;