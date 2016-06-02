var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./db');

var groupSchema = mongoose.Schema({
  name: String,
  creator: String,
  member: Array,
  history: Array
});

var GrouptModel = db.model('groups', groupSchema);

module.exports = GrouptModel;
