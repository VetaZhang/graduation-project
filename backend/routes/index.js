var express = require('express');
var router = express.Router();
var Friends = require('../controllers/friends')
var Requests = require('../controllers/requests')

/* GET home page. */
router.get('/friends/:id', Friends.getFriends);
router.post('/friends', Friends.addFriend);
router.post('/friends/agree', Friends.agree);

router.get('/requests/:id', Requests.getRequestsList);

module.exports = router;
