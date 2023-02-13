var express = require('express');
var router = express.Router();

const UserController = require("../App/Controller/UserController")
const AdminController = require("../App/Controller/AdminController")
const passport = require("../App/Middleware/passport")
router.get('/verify', UserController.verifyToken)
router.post('/create', passport.verifyUser, UserController.createUser);
router.post("/send", AdminController.makeMatches)


module.exports = router;