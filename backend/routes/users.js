var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/users')

/* GET users listing. */
router.post('/register', Controllers.register);
router.post('/login', Controllers.login);

module.exports = router;
