'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var StudentGroupSchema = new _mongoose.Schema({
  _id: _mongoose.Schema.Types.ObjectId,
  name: String,
  students: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'StudentModel' }]
});

exports.default = (0, _mongoose.model)('StudentGroupModel', StudentGroupSchema);