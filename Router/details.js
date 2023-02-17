var express = require('express');
var router = express.Router();

const DetailsController = require("../App/Controller/DetailController")
const UserController = require("../App/Controller/UserController")
const passport = require("../App/Middleware/passport")
/* GET home page. */
router.post('/create',  DetailsController.createDetails);
router.get('/details', DetailsController.getDetail);
router.get('/match/details',  DetailsController.MatchersDetails);

module.exports = router;