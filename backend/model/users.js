var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var uniqueValidator = require('mongoose-unique-validator');
var db = require('./db');

var userSchema = mongoose.Schema({
    name:  String,
    email: String,
    password: String,
    friends: Array,
    groups: Array
});

// appSchema.plugin(uniqueValidator, { message: 'Error' });

var UsersModel = db.model('users', userSchema);

module.exports = UsersModel;
