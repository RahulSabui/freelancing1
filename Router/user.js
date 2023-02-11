var express = require('express');
var router = express.Router();

const UserController = require("../App/Controller/UserController")
router.post('/create', UserController.createUser);


module.exports = router;