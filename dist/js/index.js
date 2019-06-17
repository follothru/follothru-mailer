"use strict";

var _FolloThruMailer = require("./FolloThruMailer");

var _FolloThruMailer2 = _interopRequireDefault(_FolloThruMailer);

var _configDatabase = require("./configs/configDatabase");

var _configDatabase2 = _interopRequireDefault(_configDatabase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _configDatabase2.default)();

var mailer = new _FolloThruMailer2.default();
mailer.start();