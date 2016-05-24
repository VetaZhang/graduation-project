var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./db');

var historySchema = mongoose.Schema({
    sender: String,
    senderName: String,
    receiver: String,
    content: String,
    time: String
});

var HistoryModel = db.model('histories', historySchema);

module.exports = HistoryModel;
