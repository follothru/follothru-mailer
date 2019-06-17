"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var StudentSchema = new _mongoose.Schema({
  _id: _mongoose.Schema.Types.ObjectId,
  preferName: String,
  email: String
});

exports.default = (0, _mongoose.model)('StudentModel', StudentSchema);