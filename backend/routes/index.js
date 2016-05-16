var express = require('express');
var router = express.Router();
var Friends = require('../controllers/friends')
// var Request = require('../controllers/request')

/* GET home page. */
router.get('/friends/:id', Friends.getFriends);
router.post('/friends/:user/:name/:target', Friends.addFriend);

// router.post('/request/:user/:target', Request.request);

module.exports = router;
