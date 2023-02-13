var express = require('express');
var router = express.Router();

const AdminController = require("../App/Controller/AdminController")



router.post('/create', AdminController.createAdmin);
router.post('/login', AdminController.loginAdmin);
router.get('/list', AdminController.listDetail);
router.post('/sendMessage', AdminController.sendMessage);


router.get("/send", AdminController.makeMatches)


module.exports = router;