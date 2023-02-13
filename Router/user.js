var express = require('express');
var router = express.Router();

const UserController = require("../App/Controller/UserController")
const passport = require("../App/Middleware/passport")
router.get('/verify', UserController.verifyToken)
router.post('/create', passport.verifyUser, UserController.createUser);


module.exports = router;