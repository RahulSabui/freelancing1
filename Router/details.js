var express = require('express');
var router = express.Router();

const DetailsController = require("../App/Controller/DetailController")
const UserController = require("../App/Controller/UserController")
const passport = require("../App/Middleware/passport")
/* GET home page. */
router.post('/create',  passport.verifyUser, DetailsController.createDetails);
router.post('/details', passport.verifyUser, DetailsController.getDetail);
router.post('/match/details', passport.verifyUser, DetailsController.MatchersDetails);

module.exports = router;