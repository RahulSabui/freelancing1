var express = require('express');
var router = express.Router();

const AdminController = require("../App/Controller/AdminController")



router.post('/create', AdminController.createUser);
router.get("/send", AdminController.makeMatches)


module.exports = router;