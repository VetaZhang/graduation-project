var express = require('express');
var router = express.Router();
var Friends = require('../controllers/friends')
var Groups = require('../controllers/groups')
var Requests = require('../controllers/requests')

/* GET home page. */
router.get('/friends/:id', Friends.getFriends);
router.post('/friends', Friends.addFriend);
router.post('/friends/agree', Friends.agree);

router.post('/newGroup', Groups.newGroup);
router.get('/getGroups/:id', Groups.getGroups);
router.post('/applyEnterGroup', Groups.applyEnterGroup);
router.post('/groups/agree', Groups.agree);

router.get('/requests/:id', Requests.getRequestsList);

module.exports = router;
