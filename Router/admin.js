var express = require('express');
var router = express.Router();

const AdminController = require("../App/Controller/AdminController")
router.get('/verify', UserController.verifyToken)
router.post('/create', passport.verifyUser, UserController.createUser);
router.get("/send", AdminController.makeMatches)


module.exports = router;