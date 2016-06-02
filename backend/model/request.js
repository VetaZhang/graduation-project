var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./db');

var requestSchema = mongoose.Schema({
  type:  String,
  userId: String, // Schema.Types.ObjectId,
  username: String,
  targetId: String,
  groupId: String,
  groupName: String,
  result: Boolean
});

var RequestModel = db.model('requests', requestSchema);

module.exports = RequestModel;
